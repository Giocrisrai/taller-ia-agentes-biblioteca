# Taller de IA aplicando agentes — Bibliotecas DUOC UC · Octubre 2026

Material de los **dos talleres prácticos** (60 min cada uno) del *Curso de Inteligencia
Artificial Aplicando Agentes — Nivel Básico-Medio*, versión octubre 2026: para personas que
**ya programan en Python**. Todo corre en **Google Colab** con el plan gratuito de **Groq**:
sin costo para estudiantes ni institución.

---

## 🚀 Abrir los notebooks

| Notebook | Cuándo | |
|---|---|---|
| **Taller Práctico 1** — agente básico con herramientas | Sesión 1 | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Giocrisrai/taller-ia-agentes-biblioteca/blob/main/notebooks/01_Taller_Practico_1.ipynb) |
| **Taller Práctico 2** — varias herramientas, memoria y proyecto integrador | Sesión 2 | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Giocrisrai/taller-ia-agentes-biblioteca/blob/main/notebooks/02_Taller_Practico_2.ipynb) |

**Antes del Taller 1:** cada estudiante crea su llave siguiendo el
[pre-trabajo de 10 minutos](estudiantes/guia-pre-trabajo.md).

> 📌 Dentro de Colab, lo primero: `Archivo → Guardar una copia en Drive`.

---

## Qué hay aquí

| Archivo | Para quién | Para qué |
|---|---|---|
| `estudiantes/guia-pre-trabajo.md` | Estudiantes, **antes** del Taller 1 | Crear y guardar la llave de Groq |
| `notebooks/01_Taller_Practico_1.ipynb` | Estudiantes | Taller 1 · 10 pasos |
| `notebooks/02_Taller_Practico_2.ipynb` | Estudiantes | Taller 2 · 10 pasos |
| `docente/pauta_soluciones.ipynb` | **Solo docente** | Todos los ejercicios resueltos, ejecutados contra la API real |
| `docente/guion-taller-1.md` · `guion-taller-2.md` | **Solo docente** | Minuto a minuto, qué decir, qué se observó, plan B |
| `docente/notas-tecnicas.md` | **Solo docente** | Versiones, cupos, errores en vivo, qué cambió respecto de septiembre |
| `docente/ejecucion_referencia/` | **Solo docente** | Los dos talleres ejecutados contra la API, con las salidas visibles (los ejercicios quedan sin resolver, como los verá un estudiante) |

`docente/` y `_build/` **no se publican** (están en `.gitignore`): contienen la pauta de soluciones.
`_build/` es el generador de los notebooks: `python _build/build_t1.py` (y `build_t2.py`, `build_pauta.py`) los regenera tras editar el contenido.

---

## El recorrido

| Taller | Contenido del plan de trabajo | Dónde |
|---|---|---|
| **1** | Configuración del entorno y verificación de credenciales | Pasos 1–3 |
| | Agente simple: modelo + *system prompt* | Pasos 4 y 6 |
| | Una herramienta simple (calculadora de multas) | Paso 5 |
| | Pruebas con distintas consultas y lectura del razonamiento | Pasos 7–8 |
| | *Ejercicio:* escribir `dias_de_atraso` y encadenarla | Paso 9 |
| **2** | Segunda herramienta: **lectura de un documento** (reglamento) y **API externa** (Open Library) | Pasos 4–6 |
| | Memoria conversacional | Paso 7 |
| | Orquestación: **el loop del agente escrito a mano** | Paso 8 |
| | Proyecto integrador: **asistente de consultas para la biblioteca** | Paso 9 |
| | Cierre: revisión grupal de soluciones | Paso 10 |

## Decisiones de diseño

- **API actual de LangChain** (`create_agent`, 1.x), no la clásica: es la que encontrarán en la documentación hoy.
- **Proveedor con respaldo automático:** Groq `gpt-oss-120b` → Groq `gpt-oss-20b` (cupo
  independiente, misma llave) → modo simulado. Una sola llave: la de Groq. Con ~80 personas creando cuentas, nadie se queda fuera.
- **La traza muestra el razonamiento** (🧠) que expone gpt-oss, no solo las acciones.
- **Ejercicios de código con comprobación automática**: el estudiante sabe al instante si su
  herramienta cumple, y el docente circula donde hay ❌.
- **Datos reales donde existe API** (Open Library). Préstamos y reglamento son **de ejemplo**,
  y los notebooks lo dicen: no es el reglamento oficial de DUOC UC.
- **Límites en tres capas** — instrucciones, `max_pasos` y validación en el código — con la
  idea fuerza de las dos sesiones: *el agente propone, tu código dispone*.

## Verificación

Los dos notebooks y la pauta se ejecutaron **en Google Colab, de principio a fin, contra la API real de Groq** (15-oct-2026; la pauta dio 7 de 7). Antes, también
el 14-oct-2026 en entornos equivalentes, en **modo simulado** (sin llaves) y desde el zip de entrega en una
carpeta limpia. El detalle de lo observado está en `docente/notas-tecnicas.md` §5 y §6.

## Publicar

`bash publicar.sh "mensaje"` sube la carpeta al repositorio público
[Giocrisrai/taller-ia-agentes-biblioteca](https://github.com/Giocrisrai/taller-ia-agentes-biblioteca).
Reemplaza los notebooks de septiembre en `main` (quedan en el historial de git).
Los badges de Colab apuntan a esas rutas, así que **funcionan recién después de publicar**.

> Las presentaciones de septiembre (`Taller_Practico_1/2.pptx`) **no corresponden** a este
> contenido: el orden, las herramientas y la API cambiaron.

---

## Licencia

Material educativo bajo **[CC BY 4.0](LICENSE)**: puedes usarlo, adaptarlo y compartirlo,
dando crédito a *Giocrisrai Godoy — Bibliotecas DUOC UC*. Los logotipos institucionales de
DUOC UC quedan fuera de esa licencia.
