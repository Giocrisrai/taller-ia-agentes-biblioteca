#!/usr/bin/env python3
"""Renderiza un .pptx a imágenes leyendo el archivo real con python-pptx y
dibujándolo con PIL usando las fuentes verdaderas. Sirve para revisión visual
cuando LibreOffice no está disponible, y de paso detecta:
  · texto que desborda su caja
  · elementos fuera del área segura (el logo empieza en y=455 pt)
  · solapamientos entre formas
Uso:  python3 revisar.py deck.pptx [carpeta_salida]
"""
import sys, os
from pptx import Presentation
from pptx.util import Emu
from PIL import Image, ImageDraw, ImageFont

EMU_PT = 12700
ESC = 1.5                      # px por punto
DIR = os.path.dirname(os.path.abspath(__file__))
LIMITE_Y = 450                 # el logo arranca en 455 pt

FUENTES = {
    ("Montserrat", True,  False): f"{DIR}/fuentes/Montserrat-ExtraBold.ttf",
    ("Montserrat", False, False): f"{DIR}/fuentes/Montserrat-Regular.ttf",
    ("Arial",      False, False): "/System/Library/Fonts/Supplemental/Arial.ttf",
    ("Arial",      True,  False): "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ("Arial",      False, True):  "/System/Library/Fonts/Supplemental/Arial Italic.ttf",
    ("Arial",      True,  True):  "/System/Library/Fonts/Supplemental/Arial Bold Italic.ttf",
    ("Helvetica",  False, False): ("/System/Library/Fonts/Helvetica.ttc", 0),
    ("Helvetica",  True,  False): ("/System/Library/Fonts/Helvetica.ttc", 1),
    ("Courier New", False, False): "/System/Library/Fonts/Supplemental/Courier New.ttf",
}
_cache = {}
_cmaps = {}

def tiene_glifo(f, ch):
    """¿La fuente cargada por PIL tiene realmente ese carácter?"""
    ruta, indice = f.path, getattr(f, "index", 0)
    clave = (ruta, indice)
    if clave not in _cmaps:
        from fontTools.ttLib import TTFont, TTCollection
        try:
            if str(ruta).lower().endswith(".ttc"):
                _cmaps[clave] = set(TTCollection(ruta).fonts[indice].getBestCmap())
            else:
                _cmaps[clave] = set(TTFont(ruta).getBestCmap())
        except Exception:
            _cmaps[clave] = None
    c = _cmaps[clave]
    return True if c is None else ord(ch) in c

def fuente(nombre, tam_pt, negrita, cursiva):
    clave = (nombre, bool(negrita), bool(cursiva), round(tam_pt, 1))
    if clave in _cache:
        return _cache[clave]
    ruta = FUENTES.get((nombre, bool(negrita), bool(cursiva))) \
        or FUENTES.get((nombre, bool(negrita), False)) \
        or FUENTES.get((nombre, False, False)) \
        or ("/System/Library/Fonts/Helvetica.ttc", 0)
    px = max(1, int(round(tam_pt * ESC)))
    f = ImageFont.truetype(ruta[0], px, index=ruta[1]) if isinstance(ruta, tuple) else ImageFont.truetype(ruta, px)
    _cache[clave] = f
    return f

def envolver(texto, f, ancho_px, dib):
    """Parte el texto en líneas que quepan en ancho_px."""
    lineas = []
    for parrafo in texto.split("\n"):
        if not parrafo.strip():
            lineas.append("")
            continue
        actual = ""
        for palabra in parrafo.split(" "):
            prueba = (actual + " " + palabra).strip()
            if dib.textlength(prueba, font=f) <= ancho_px or not actual:
                actual = prueba
            else:
                lineas.append(actual)
                actual = palabra
        lineas.append(actual)
    return lineas

def color_de(run, por_defecto=(29, 29, 31)):
    try:
        c = run.font.color
        if c and c.type is not None and c.rgb is not None:
            return tuple(bytes.fromhex(str(c.rgb)))
    except Exception:
        pass
    return por_defecto

def rgb_relleno(forma):
    try:
        f = forma.fill
        if f.type is not None and f.type == 1:
            return tuple(bytes.fromhex(str(f.fore_color.rgb)))
    except Exception:
        pass
    return None

def rgb_linea(forma):
    try:
        ln = forma.line
        if ln.fill.type is not None and ln.fill.type == 1:
            ancho = ln.width.pt if ln.width else 1
            return tuple(bytes.fromhex(str(ln.color.rgb))), max(1, int(round(ancho * ESC)))
    except Exception:
        pass
    return None, 0

def main(ruta, salida):
    os.makedirs(salida, exist_ok=True)
    pres = Presentation(ruta)
    W = int(pres.slide_width / EMU_PT * ESC)
    H = int(pres.slide_height / EMU_PT * ESC)
    problemas = []

    for i, dia in enumerate(pres.slides, 1):
        fondo = (255, 255, 255)
        try:
            bg = dia.background.fill
            if bg.type is not None and bg.type == 1:
                fondo = tuple(bytes.fromhex(str(bg.fore_color.rgb)))
        except Exception:
            pass
        img = Image.new("RGB", (W, H), fondo)
        dib = ImageDraw.Draw(img)
        cajas = []
        # ¿lleva logo abajo a la derecha? (las portadas lo llevan arriba)
        logo_caja = None
        for fm in dia.shapes:
            if fm.shape_type == 13 and fm.left is not None:
                lx, ly = fm.left / EMU_PT, fm.top / EMU_PT
                if ly > 400 and lx > 700:
                    logo_caja = (lx, ly, lx + fm.width / EMU_PT, ly + fm.height / EMU_PT)

        for forma in dia.shapes:
            if forma.left is None:
                continue
            x = forma.left / EMU_PT; y = forma.top / EMU_PT
            w = forma.width / EMU_PT; h = forma.height / EMU_PT
            X, Y, Wp, Hp = x * ESC, y * ESC, w * ESC, h * ESC

            # imágenes
            if forma.shape_type == 13:
                try:
                    from io import BytesIO
                    im = Image.open(BytesIO(forma.image.blob)).convert("RGBA")
                    im = im.resize((max(1, int(Wp)), max(1, int(Hp))))
                    img.paste(im, (int(X), int(Y)), im)
                except Exception:
                    dib.rectangle([X, Y, X + Wp, Y + Hp], outline=(200, 200, 200))
                continue

            relleno = rgb_relleno(forma)
            borde, grosor = rgb_linea(forma)
            if relleno or borde:
                try:
                    tipo = str(forma.auto_shape_type)
                except Exception:
                    tipo = ""
                radio = int(10 * ESC) if "ROUNDED" in tipo else 0
                caja = [X, Y, X + Wp, Y + Hp]
                if "OVAL" in tipo:
                    dib.ellipse(caja, fill=relleno, outline=borde, width=grosor or 1)
                elif radio:
                    dib.rounded_rectangle(caja, radius=radio, fill=relleno, outline=borde, width=grosor or 1)
                else:
                    dib.rectangle(caja, fill=relleno, outline=borde, width=grosor or 1)

            if not forma.has_text_frame:
                continue
            tf = forma.text_frame
            texto_plano = tf.text
            if not texto_plano.strip():
                continue

            # Se conserva el formato de cada run: color, negrita, cursiva y tamaño.
            segmentos = []            # [(texto, fuente, color)]
            for np, par in enumerate(tf.paragraphs):
                if np:
                    segmentos.append(("\n", None, None))
                for run in par.runs:
                    tam_r = run.font.size.pt if run.font.size else 12
                    nom_r = run.font.name or "Helvetica"
                    segmentos.append((run.text,
                                      fuente(nom_r, tam_r, run.font.bold, run.font.italic),
                                      color_de(run)))
            if not segmentos:
                continue

            run0 = next((rr for p in tf.paragraphs for rr in p.runs), None)
            if run0 is None:
                continue
            tam = run0.font.size.pt if run0.font.size else 12
            alineacion = str(tf.paragraphs[0].alignment or "")
            anclaje = str(tf.vertical_anchor or "")
            ancho_txt = max(4, Wp - 4)
            alto_linea = tam * ESC * 1.25

            # Reparte los segmentos en líneas respetando el ancho de la caja.
            lineas, actual, ancho_actual = [], [], 0.0
            desborde_h = False
            for texto_seg, f_seg, col_seg in segmentos:
                if f_seg is None:                       # salto de párrafo
                    lineas.append(actual); actual, ancho_actual = [], 0.0
                    continue
                for trozo in texto_seg.split("\n"):
                    if trozo is not texto_seg.split("\n")[0]:
                        lineas.append(actual); actual, ancho_actual = [], 0.0
                    for palabra in trozo.split(" "):
                        pieza = palabra + " "
                        pw = dib.textlength(pieza, font=f_seg)
                        if ancho_actual + pw > ancho_txt and actual:
                            lineas.append(actual); actual, ancho_actual = [], 0.0
                        if pw > ancho_txt:
                            desborde_h = True
                        actual.append((pieza, f_seg, col_seg)); ancho_actual += pw
            if actual:
                lineas.append(actual)

            alto_total = alto_linea * len(lineas)
            if "MIDDLE" in anclaje or "CENTER" in anclaje:
                y0 = Y + (Hp - alto_total) / 2
            elif "BOTTOM" in anclaje:
                y0 = Y + Hp - alto_total
            else:
                y0 = Y + 1

            for linea in lineas:
                lw = sum(dib.textlength(t, font=f) for t, f, _ in linea)
                if "CENTER" in alineacion:
                    x0 = X + (Wp - lw) / 2
                elif "RIGHT" in alineacion:
                    x0 = X + Wp - lw
                else:
                    x0 = X
                for t, f, col in linea:
                    dib.text((x0, y0), t, font=f, fill=col)
                    x0 += dib.textlength(t, font=f)
                y0 += alto_linea

            if alto_total > Hp + 2:
                problemas.append(f"  dia {i:>2} · DESBORDE VERTICAL: {alto_total/ESC:.0f}pt de texto en caja de {h:.0f}pt "
                                 f"→ {texto_plano[:46]!r}")
            if desborde_h:
                problemas.append(f"  dia {i:>2} · PALABRA MÁS ANCHA QUE LA CAJA → {texto_plano[:46]!r}")

            # glifos que la fuente realmente no tiene (saldrían como cuadraditos)
            for texto_seg, f_seg, _ in segmentos:
                if f_seg is None:
                    continue
                faltan = {ch for ch in texto_seg if ord(ch) > 127 and not tiene_glifo(f_seg, ch)}
                if faltan:
                    problemas.append(f"  dia {i:>2} · GLIFO AUSENTE {sorted(faltan)} en {f_seg.getname()} "
                                     f"→ {texto_seg[:36]!r}")

            cajas.append((x, y, w, h, texto_plano[:28]))

            # solape real con el logo inferior derecho (solo si esa diapositiva lo lleva)
            if logo_caja:
                lx, ly, lx1, ly1 = logo_caja
                if x < lx1 and x + w > lx and y < ly1 and y + h > ly:
                    problemas.append(f"  dia {i:>2} · PISA EL LOGO → {texto_plano[:40]!r}")
            if y + h > 527:
                problemas.append(f"  dia {i:>2} · CRUZA LA BARRA AMARILLA (y={y+h:.0f}) → {texto_plano[:40]!r}")

        img.save(f"{salida}/dia-{i:02d}.png")

    print(f"{len(pres.slides._sldIdLst)} diapositivas → {salida}/")
    if problemas:
        print(f"\n⚠️  {len(problemas)} problema(s):")
        for p in problemas:
            print(p)
    else:
        print("\n✅ Sin desbordes ni elementos fuera del área segura.")
    return len(problemas)

if __name__ == "__main__":
    sys.exit(1 if main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "revision") else 0)
