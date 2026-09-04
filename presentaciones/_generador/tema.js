/**
 * Sistema de diseño extraído del PDF "Introduccion_IA_Agentes_Sesion_Teorica_1".
 * Todas las medidas provienen de las coordenadas reales del PDF (lienzo 960x540 pt).
 * Los helpers reciben y devuelven puntos; la conversión a pulgadas es interna.
 */

const pt = (v) => v / 72;            // puntos -> pulgadas
const LOGO = __dirname + "/logo-duoc-bibliotecas.png";

const C = {
  amarillo:   "FFB800",
  tinta:      "1D1D1F",
  gris:       "6E6E73",
  grisSuave:  "86868B",
  rojo:       "FF3B30",
  borde:      "D9D9DE",
  fondoSuave: "F5F5F7",
  blanco:     "FFFFFF",
};

const F = {
  titulo: "Montserrat",     // el PDF usa Montserrat ExtraBold
  texto:  "Arial",        // Helvetica de macOS no trae la flecha U+2192; Arial sí
  codigo: "Courier New",
};

// Geometría del PDF
const G = {
  W: 960, H: 540,
  xTexto: 46.8,      // margen izquierdo del texto
  xForma: 39.6,      // margen izquierdo de tarjetas, reglas y tablas
  xDer:   920.2,     // margen derecho
  barra:  { y: 528, h: 12 },
  logo:   { x: 772.78, y: 455.04, w: 147.6, h: 54 },
};
G.ancho = G.xDer - G.xForma;   // 880.6

// ── Base de toda diapositiva ─────────────────────────────────────────────────
function base(pres) {
  const s = pres.addSlide();
  s.background = { color: C.blanco };
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: pt(G.barra.y), w: pt(G.W), h: pt(G.barra.h),
    fill: { color: C.amarillo }, line: { type: "none" },
  });
  return s;
}

function logo(s, { x = G.logo.x, y = G.logo.y, w = G.logo.w, h = G.logo.h } = {}) {
  s.addImage({ path: LOGO, x: pt(x), y: pt(y), w: pt(w), h: pt(h) });
}

// ── Cabecera: etiqueta roja a la izquierda, paginación gris a la derecha ─────
function cabecera(s, etiqueta, paginacion) {
  s.addText(etiqueta, {
    isTextBox: true, x: pt(G.xTexto - 4), y: pt(22), w: pt(560), h: pt(20),
    fontFace: F.texto, fontSize: 11, bold: true, color: C.rojo,
    charSpacing: 1.2, margin: 0, valign: "middle",
  });
  s.addText(paginacion, {
    isTextBox: true, x: pt(500), y: pt(22), w: pt(G.xDer - 500 + 4), h: pt(20),
    fontFace: F.texto, fontSize: 10, color: C.grisSuave,
    align: "right", margin: 0, valign: "middle",
  });
}

// ── Título de diapositiva de contenido ───────────────────────────────────────
// Devuelve la Y (pt) donde puede empezar el cuerpo.
function titulo(s, texto, subtitulo, { yTitulo = 62, tam = 30 } = {}) {
  const alto = texto.length > 42 ? 84 : 48;
  s.addText(texto, {
    isTextBox: true, x: pt(G.xTexto - 4), y: pt(yTitulo), w: pt(G.xDer - G.xTexto + 4), h: pt(alto),
    fontFace: F.titulo, fontSize: tam, bold: true, color: C.tinta,
    margin: 0, valign: "top", lineSpacingMultiple: 1.05,
  });
  let y = yTitulo + alto + 8;
  if (subtitulo) {
    s.addText(subtitulo, {
      isTextBox: true, x: pt(G.xTexto - 4), y: pt(y), w: pt(G.xDer - G.xTexto + 4), h: pt(20),
      fontFace: F.texto, fontSize: 14, italic: true, color: C.gris,
      margin: 0, valign: "middle",
    });
    y += 32;                       // 20 de caja + 12 de aire (PDF: regla en y=150.5)
  }
  s.addShape(reglaTipo, {
    x: pt(G.xForma), y: pt(y), w: pt(39.6), h: pt(3.2),
    fill: { color: C.amarillo }, line: { type: "none" },
  });
  return y + 3.2 + 30.4;           // PDF: contenido arranca en y=183.6
}

// Alturas estándar tomadas del PDF, según lo que lleve la diapositiva.
const ALTO = {
  unaFila:            136.8,   // 1 fila de tarjetas, sin destaque   (pág. 8)
  unaFilaConDestaque: 136.8,   // idem + destaque en 349.2
  dosFilas:           111.6,   // 2 filas sin destaque               (pág. 21)
  dosFilasConDestaque:104.4,   // 2 filas + destaque en 414          (pág. 6)
};
const Y_DESTAQUE = { unaFila: 349.2, dosFilas: 414 };
const LIMITE = 450;              // el logo empieza en 455: nada puede pasar de aquí

// Avisa si una diapositiva se sale del área segura.
function fin(y, nombre) {
  if (y > LIMITE + 0.5) {
    console.warn(`  ⚠️  "${nombre}" termina en y=${y.toFixed(1)} (límite ${LIMITE})`);
  }
  return y;
}

let reglaTipo = "rect";   // se fija en construir()

// ── Tarjetas numeradas ───────────────────────────────────────────────────────
/**
 * items: [{ n?, titulo, texto }]
 * Replica la tarjeta del PDF: rect redondeado blanco, borde D9D9DE,
 * círculo numerado con borde amarillo, título Montserrat, descripción gris.
 */
function tarjetas(pres, s, items, { y, cols = 2, alto = 104.4, gap = 15.8, numeradas = true, tamTitulo = 12.5 } = {}) {
  const ancho = (G.ancho - gap * (cols - 1)) / cols;
  const filas = Math.ceil(items.length / cols);
  items.forEach((it, i) => {
    const col = i % cols, fila = Math.floor(i / cols);
    const x = G.xForma + col * (ancho + gap);
    const yy = y + fila * (alto + 15.8);

    s.addShape(pres.ShapeType.roundRect, {
      x: pt(x), y: pt(yy), w: pt(ancho), h: pt(alto),
      fill: { color: C.blanco }, line: { color: C.borde, width: 1 }, rectRadius: 0.15,
    });

    let yTxt = yy + 21;
    if (numeradas) {
      s.addShape(pres.ShapeType.ellipse, {
        x: pt(x + 13), y: pt(yy + 10.8), w: pt(28.8), h: pt(28.8),
        fill: { color: C.blanco }, line: { color: C.amarillo, width: 1.75 },
      });
      // El círculo mide 28,8 pt: las etiquetas de varios caracteres ("10.1", "2.6")
      // necesitan un cuerpo menor para no desbordarlo.
      const etiqueta = String(it.n ?? i + 1);
      const tamNumero = etiqueta.length <= 1 ? 12 : etiqueta.length === 2 ? 10.5 : etiqueta.length === 3 ? 8.5 : 7.5;
      s.addText(etiqueta, {
        isTextBox: true, x: pt(x + 13), y: pt(yy + 10.8), w: pt(28.8), h: pt(28.8),
        fontFace: F.titulo, fontSize: tamNumero, bold: true, color: C.tinta,
        align: "center", valign: "middle", margin: 0,
      });
      yTxt = yy + 46;
    }

    s.addText(it.titulo, {
      isTextBox: true, x: pt(x + 19), y: pt(yTxt), w: pt(ancho - 34), h: pt(it.titulo.length > 26 ? 34 : 18),
      fontFace: F.titulo, fontSize: tamTitulo, bold: true, color: C.tinta,
      margin: 0, valign: "top", lineSpacingMultiple: 1.15,
    });

    if (it.texto) {
      const yDesc = yTxt + (it.titulo.length > 26 ? 36 : 24);
      s.addText(it.texto, {
        isTextBox: true, x: pt(x + 19), y: pt(yDesc), w: pt(ancho - 34), h: pt(yy + alto - yDesc - 10),
        fontFace: F.texto, fontSize: 10, color: C.gris,
        margin: 0, valign: "top", lineSpacingMultiple: 1.25,
      });
    }
  });
  return y + filas * alto + (filas - 1) * 15.8;
}

// ── Tabla al estilo del PDF ──────────────────────────────────────────────────
// cabeceras: [string], filas: [[string]], anchos: [pt]
function tabla(pres, s, cabeceras, filas, anchos, { y, altoFila = 40.3 } = {}) {
  const total = anchos.reduce((a, b) => a + b, 0);
  const esc = G.ancho / total;
  const w = anchos.map((a) => a * esc);

  const pinta = (celdas, yy, fondo, colorTexto, negrita, tam) => {
    let x = G.xForma;
    celdas.forEach((c, i) => {
      s.addShape(pres.ShapeType.rect, {
        x: pt(x), y: pt(yy), w: pt(w[i]), h: pt(altoFila),
        fill: { color: fondo }, line: { color: C.borde, width: 0.75 },
      });
      s.addText(c, {
        isTextBox: true, x: pt(x + 11), y: pt(yy), w: pt(w[i] - 22), h: pt(altoFila),
        fontFace: F.texto, fontSize: tam, bold: negrita, color: colorTexto,
        margin: 0, valign: "middle", lineSpacingMultiple: 1.15,
      });
      x += w[i];
    });
  };

  pinta(cabeceras, y, C.tinta, C.blanco, true, 11);
  filas.forEach((f, i) => {
    pinta(f, y + altoFila * (i + 1), i % 2 ? C.fondoSuave : C.blanco, C.tinta, false, 11);
  });
  return y + altoFila * (filas.length + 1);
}

// ── Caja de destaque: "Etiqueta: texto" sobre fondo gris claro ───────────────
function destaque(pres, s, etiqueta, texto, { y, alto = 44 } = {}) {
  s.addShape(pres.ShapeType.roundRect, {
    x: pt(G.xForma), y: pt(y), w: pt(G.ancho), h: pt(alto),
    fill: { color: C.fondoSuave }, line: { type: "none" }, rectRadius: 0.08,
  });
  s.addText(
    [
      { text: etiqueta + "  ", options: { bold: true, color: C.rojo } },
      { text: texto, options: { color: C.tinta } },
    ],
    {
      isTextBox: true, x: pt(G.xForma + 22), y: pt(y), w: pt(G.ancho - 44), h: pt(alto),
      fontFace: F.texto, fontSize: 11.5, margin: 0, valign: "middle", lineSpacingMultiple: 1.2,
    }
  );
  return y + alto;
}

/**
 * Coloca un destaque justo debajo del contenido: deja el aire del PDF (28,8 pt)
 * cuando hay sitio y se aprieta hasta 6 pt cuando el contenido llega bajo,
 * sin pasar nunca de 414 (el destaque mide 36 y el límite seguro es 450).
 */
function destaqueTras(pres, s, etiqueta, texto, yFinContenido) {
  let y = Math.min(yFinContenido + 28.8, 414);
  if (y < yFinContenido + 6) y = yFinContenido + 6;
  return destaque(pres, s, etiqueta, texto, { y, alto: 36 });
}

// ── Bloque de código ─────────────────────────────────────────────────────────
// lineas: [[{t, c?}]] o [string]. Fondo F5F5F7, Courier New.
function codigo(pres, s, lineas, { y, alto, ancho = G.ancho, x = G.xForma, tam = 11.5 } = {}) {
  const h = alto ?? lineas.length * (tam * 1.42) + 36;
  s.addShape(pres.ShapeType.roundRect, {
    x: pt(x), y: pt(y), w: pt(ancho), h: pt(h),
    fill: { color: C.fondoSuave }, line: { type: "none" }, rectRadius: 0.08,
  });
  const runs = [];
  lineas.forEach((ln, i) => {
    const partes = typeof ln === "string" ? [{ t: ln }] : ln;
    partes.forEach((p, j) => {
      runs.push({
        text: p.t === "" ? " " : p.t,
        options: {
          color: p.c || C.tinta,
          breakLine: j === partes.length - 1 && i < lineas.length - 1,
        },
      });
    });
  });
  s.addText(runs, {
    isTextBox: true, x: pt(x + 22), y: pt(y + 16), w: pt(ancho - 44), h: pt(h - 32),
    fontFace: F.codigo, fontSize: tam, margin: 0, valign: "top", lineSpacingMultiple: 1.22,
  });
  return y + h;
}

// ── Diapositiva divisoria de módulo ──────────────────────────────────────────
function divisor(pres, s, tituloTexto, subtitulo, pastillas) {
  // Anclado desde abajo, replicando la pág. 4 del PDF:
  // pastillas ~386, regla ~350, subtítulo ~316, título termina ~310.
  const lineas = tituloTexto.length > 34 ? 2 : 1;
  const altoTitulo = lineas * 52;
  const yT = 310 - altoTitulo;

  s.addText(tituloTexto, {
    isTextBox: true, x: pt(G.xTexto - 4), y: pt(yT), w: pt(G.xDer - G.xTexto + 4), h: pt(altoTitulo),
    fontFace: F.titulo, fontSize: 40, bold: true, color: C.tinta,
    margin: 0, valign: "top", lineSpacingMultiple: 1.05,
  });
  s.addText(subtitulo, {
    isTextBox: true, x: pt(G.xTexto - 4), y: pt(316), w: pt(G.xDer - G.xTexto + 4), h: pt(22),
    fontFace: F.texto, fontSize: 16, italic: true, color: C.gris, margin: 0, valign: "middle",
  });
  s.addShape(pres.ShapeType.rect, {
    x: pt(G.xForma), y: pt(350), w: pt(39.6), h: pt(3.2),
    fill: { color: C.amarillo }, line: { type: "none" },
  });

  let x = G.xForma;
  (pastillas || []).forEach((p) => {
    const w = p.length * 6.9 + 36;
    s.addShape(pres.ShapeType.roundRect, {
      x: pt(x), y: pt(386), w: pt(w), h: pt(31),
      fill: { color: C.blanco }, line: { color: C.tinta, width: 1 }, rectRadius: 0.09,
    });
    s.addText(p, {
      isTextBox: true, x: pt(x), y: pt(386), w: pt(w), h: pt(31),
      fontFace: F.texto, fontSize: 12, bold: true, color: C.tinta,
      align: "center", valign: "middle", margin: 0,
    });
    x += w + 18;
  });
  return 417;
}

// ── Portada ──────────────────────────────────────────────────────────────────
function portada(pres, s, { etiqueta, titulo: t, subtitulo, pie, fecha }) {
  logo(s, { x: 72, y: 67.68, w: 190.08, h: 69.84 });
  s.addText(etiqueta, {
    isTextBox: true, x: pt(75), y: pt(155), w: pt(760), h: pt(20),
    fontFace: F.texto, fontSize: 11, bold: true, color: C.rojo,
    charSpacing: 1.4, margin: 0, valign: "middle",
  });
  s.addText(t, {
    isTextBox: true, x: pt(75), y: pt(186), w: pt(830), h: pt(120),
    fontFace: F.titulo, fontSize: 44, bold: true, color: C.tinta,
    margin: 0, valign: "top", lineSpacingMultiple: 1.08,
  });
  s.addText(subtitulo, {
    isTextBox: true, x: pt(75), y: pt(308), w: pt(830), h: pt(30),
    fontFace: F.texto, fontSize: 20, color: C.gris, margin: 0, valign: "middle",
  });
  s.addText(pie, {
    isTextBox: true, x: pt(75), y: pt(446), w: pt(500), h: pt(20),
    fontFace: F.texto, fontSize: 12, color: C.grisSuave, margin: 0, valign: "middle",
  });
  s.addText(fecha, {
    isTextBox: true, x: pt(500), y: pt(446), w: pt(G.xDer - 500), h: pt(20),
    fontFace: F.texto, fontSize: 12, color: C.grisSuave,
    align: "right", margin: 0, valign: "middle",
  });
}

// ── Cierre ───────────────────────────────────────────────────────────────────
function cierre(pres, s, { titulo: t, subtitulo, bloques }) {
  s.background = { color: C.fondoSuave };
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: pt(G.barra.y), w: pt(G.W), h: pt(G.barra.h),
    fill: { color: C.amarillo }, line: { type: "none" },
  });
  logo(s, { x: 60, y: 44, w: 130, h: 47.6 });
  s.addText(t, {
    isTextBox: true, x: pt(80), y: pt(110), w: pt(800), h: pt(70),
    fontFace: F.titulo, fontSize: 44, bold: true, color: C.tinta,
    align: "center", margin: 0, valign: "middle",
  });
  s.addText(subtitulo, {
    isTextBox: true, x: pt(80), y: pt(184), w: pt(800), h: pt(26),
    fontFace: F.texto, fontSize: 18, color: C.gris,
    align: "center", margin: 0, valign: "middle",
  });
  const ancho = 260, gap = 24;
  const x0 = (G.W - (ancho * bloques.length + gap * (bloques.length - 1))) / 2;
  bloques.forEach((b, i) => {
    const x = x0 + i * (ancho + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x: pt(x), y: pt(248), w: pt(ancho), h: pt(168),
      fill: { color: C.blanco }, line: { type: "none" }, rectRadius: 0.16,
    });
    s.addText(b.titulo, {
      isTextBox: true, x: pt(x + 24), y: pt(274), w: pt(ancho - 48), h: pt(22),
      fontFace: F.titulo, fontSize: 15, bold: true, color: C.tinta,
      margin: 0, valign: "top",
    });
    s.addText(b.texto, {
      isTextBox: true, x: pt(x + 24), y: pt(304), w: pt(ancho - 48), h: pt(102),
      fontFace: F.texto, fontSize: 11, color: C.gris,
      margin: 0, valign: "top", lineSpacingMultiple: 1.35,
    });
  });
}

function construir(pres) {
  pres.layout = "LAYOUT_WIDE";       // 13.333 x 7.5 in = 960 x 540 pt
  reglaTipo = pres.ShapeType.rect;
  return pres;
}

module.exports = { pt, C, F, G, ALTO, Y_DESTAQUE, LIMITE, fin, base, logo, cabecera,
                   titulo, tarjetas, tabla, destaque, destaqueTras, codigo, divisor, portada, cierre, construir };
