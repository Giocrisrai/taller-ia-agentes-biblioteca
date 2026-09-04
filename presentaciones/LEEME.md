# Presentaciones de las sesiones prácticas

| Archivo | Cuándo | Diapositivas |
|---|---|---|
| `Taller_Practico_1.pptx` | Viernes | 18 |
| `Taller_Practico_2.pptx` | Lunes | 18 |

Ambas replican el formato de `Introduccion_IA_Agentes_Sesion_Teorica_1.pdf`, y varias
llevan **notas del orador** con lo que conviene decir en ese momento (se ven en la
vista Presentador de PowerPoint o Keynote).

---

## ⚠️ Instala Montserrat antes de proyectar

Las diapositivas usan **Montserrat ExtraBold** para los títulos, igual que la teórica.
**No está instalada en tu Mac**: si abres el archivo así, PowerPoint sustituirá la fuente
y los títulos se verán distintos a los de la sesión teórica.

La familia ya está descargada aquí:

```
presentaciones/_generador/fuentes/
├── Montserrat-Regular.ttf
├── Montserrat-Bold.ttf
└── Montserrat-ExtraBold.ttf
```

**Para instalarla:** selecciona los tres archivos, doble clic, y en el Libro de Fuentes
pulsa *Instalar*. Después cierra y vuelve a abrir PowerPoint.

Si vas a presentar desde otro computador (el de la sala, por ejemplo), instálala también
allí, o exporta a PDF antes: `Archivo → Exportar → PDF`. El PDF lleva la fuente incrustada
y se ve igual en cualquier parte.

El texto de cuerpo usa **Arial**, que ya viene con Office en Mac y en Windows.

---

## El sistema de diseño

Extraído midiendo el PDF de la sesión teórica, no aproximado a ojo:

| Elemento | Valor |
|---|---|
| Lienzo | 960 × 540 pt (13,33 × 7,5 pulgadas) |
| Amarillo | `FFB800` — barra inferior de 12 pt y regla corta de 39,6 × 3,2 |
| Tinta | `1D1D1F` |
| Gris de texto | `6E6E73` · paginación `86868B` |
| Rojo de etiquetas | `FF3B30` |
| Borde de tarjetas | `D9D9DE` a 1 pt |
| Fondo de destaques y filas alternas | `F5F5F7` |
| Títulos | Montserrat ExtraBold 30 pt (40 en divisores, 44 en portada) |
| Cuerpo | Arial 11,5 pt · descripciones 10 pt · subtítulos cursiva 14 pt |
| Código | Courier New 11,5 pt |
| Margen izquierdo | 39,6 pt (formas) · 46,8 pt (texto) |
| Contenido arranca en | y = 183,6 pt |
| Contenido termina antes de | y = 450 pt (el logo empieza en 455) |

---

## Si quieres editarlas

Puedes editarlas directamente en PowerPoint como cualquier presentación.

Si prefieres cambiar el contenido y regenerarlas, están hechas con un script:

```bash
cd presentaciones/_generador
node deck1.js      # regenera Taller_Practico_1.pptx
node deck2.js      # regenera Taller_Practico_2.pptx
```

| Archivo | Qué contiene |
|---|---|
| `tema.js` | El sistema de diseño: colores, fuentes, y los helpers de tarjeta, tabla, destaque, código, divisor, portada y cierre |
| `deck1.js` | El contenido del viernes |
| `deck2.js` | El contenido del lunes |
| `revisar.py` | Control de calidad (ver abajo) |
| `logo-duoc-bibliotecas.png` | El logo extraído del PDF teórico, con su transparencia |
| `fuentes/` | La familia Montserrat |

⚠️ Regenerar **sobrescribe** el `.pptx`. Si editaste a mano en PowerPoint, perderás
esos cambios.

---

## El control de calidad

```bash
python3 _generador/revisar.py Taller_Practico_1.pptx /tmp/revision
```

Lee el `.pptx` real con python-pptx y lo redibuja con las fuentes verdaderas. Devuelve
un PNG por diapositiva y avisa de:

- texto que desborda su caja, en alto o en ancho
- elementos que pisan el logo o cruzan la barra amarilla
- caracteres que la fuente no tiene y saldrían como cuadraditos

Ese último ya detectó tres problemas reales que no se ven hasta proyectar: `🔑`, `①②③`
y la flecha `→`, que **Helvetica de macOS no incluye** (por eso el cuerpo usa Arial).

**Por qué existe este script:** LibreOffice, que es la vía habitual para convertir a
imágenes, falla en este entorno. Este renderizador lo sustituye.

**Su límite:** dibuja la geometría real del archivo, pero no es PowerPoint. El salto de
línea y el interlineado son aproximaciones. Ábrelas una vez en PowerPoint antes del
viernes.

---

## Lo que no está verificado

Las 36 diapositivas se revisaron con el renderizador propio, no con PowerPoint ni
LibreOffice. La geometría sale medida del PDF original y el archivo lo abre `python-pptx`
sin errores, pero **conviene que las abras tú una vez** antes de proyectar.

El validador de esquema del paquete reporta un error en `docProps/core.xml`. Está
comprobado que **no es de estos archivos**: una presentación mínima generada con la misma
librería da exactamente el mismo aviso. El XML parsea correctamente con lxml y con
python-pptx.
