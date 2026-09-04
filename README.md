# Taller de IA aplicando agentes — Bibliotecas DUOC UC

Material completo de las **dos sesiones prácticas** y la **tarea evaluada** que siguen a la
sesión teórica *Introducción a la IA Aplicando Agentes*.

Todo corre en **Google Colab**: los estudiantes no instalan nada. El modelo se consume
desde **Groq**, que es gratuito y no pide tarjeta de crédito.

---

## 🚀 Abrir los notebooks

| Notebook | Cuándo | |
|---|---|---|
| **Taller Práctico 1** | Viernes | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Giocrisrai/taller-ia-agentes-biblioteca/blob/main/notebooks/01_Taller_Practico_1.ipynb) |
| **Taller Práctico 2** | Lunes | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Giocrisrai/taller-ia-agentes-biblioteca/blob/main/notebooks/02_Taller_Practico_2.ipynb) |
| **Plantilla de la tarea** | Entrega | [![Abrir en Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Giocrisrai/taller-ia-agentes-biblioteca/blob/main/notebooks/03_Tarea_Plantilla.ipynb) |

> 🆓 **Uso libre.** Este material está bajo [CC BY 4.0](LICENSE): cualquiera puede usarlo,
> adaptarlo y compartirlo, dando crédito. No hace falta pedir permiso ni tener cuenta de
> GitHub para abrir los notebooks.

> 📌 **Alumnos:** abran el notebook con el botón, y lo primero que hagan dentro sea
> `Archivo → Guardar una copia en Drive`. Así trabajan sobre su propia copia.
>
> Antes del viernes, saquen su llave de Groq siguiendo la
> [guía de 10 minutos](estudiantes/guia-groq-colab.md).

---

## 🔴 Léelo antes del viernes

**El código de las diapositivas teóricas ya no ejecuta.** LangChain 1.0 movió esas
funciones al paquete `langchain-classic`, y Groq retiró los modelos Llama en agosto 2026.
Verificado línea por línea.

Los notebooks de este taller **ya usan la versión correcta**, así que a los estudiantes no
les va a fallar nada. Pero conviene que lo sepas antes de proyectar el PPT.

👉 El detalle y la corrección están en `docente/notas-tecnicas.md` §1, en la copia local del docente.

---

## Qué hay aquí

### Para el docente — no se publica aquí

Estos cuatro archivos **no están en este repositorio**: viven solo en la copia local del
docente. El solucionario es la pauta de la tarea evaluada, y publicarlo en abierto la
dejaría al alcance de los estudiantes.

| Archivo | Para qué |
|---|---|
| `docente/notas-tecnicas.md` | Lo que ya no ejecuta del PPT, cuotas de Groq, errores previstos, riesgos |
| `docente/guion-sesion-1.md` | Viernes, minuto a minuto, con frases de clase y plan B |
| `docente/guion-sesion-2.md` | Lunes, minuto a minuto |
| `docente/solucionario-tarea.ipynb` | Entrega de referencia 100/100 + notas de corrección |

Sí está publicado, porque los estudiantes deben verlo:
[presentaciones/LEEME.md](presentaciones/LEEME.md) — cómo instalar Montserrat y regenerar las PPT.

### Para repartir

| Archivo | Cuándo |
|---|---|
| [presentaciones/Taller_Practico_1.pptx](presentaciones/Taller_Practico_1.pptx) | Viernes, para proyectar (18 diapositivas, con notas del orador) |
| [presentaciones/Taller_Practico_2.pptx](presentaciones/Taller_Practico_2.pptx) | Lunes, para proyectar (18 diapositivas, con notas del orador) |
| [estudiantes/guia-groq-colab.md](estudiantes/guia-groq-colab.md) | **Antes** del viernes: cómo sacar la llave |
| [notebooks/01_Taller_Practico_1.ipynb](notebooks/01_Taller_Practico_1.ipynb) | Viernes |
| [notebooks/02_Taller_Practico_2.ipynb](notebooks/02_Taller_Practico_2.ipynb) | Lunes |
| [notebooks/03_Tarea_Plantilla.ipynb](notebooks/03_Tarea_Plantilla.ipynb) | Lunes, al cierre |
| [tarea/enunciado.md](tarea/enunciado.md) | Lunes, al cierre |
| [tarea/rubrica.md](tarea/rubrica.md) | Lunes, junto al enunciado |

---

## El recorrido

| # | Sesión | Duración | Qué construyen |
|---|---|---|---|
| 1 | Teórica *(ya dictada)* | — | Qué es un agente, ReAct, tipos y patrones |
| 2 | **Práctica 1 — viernes** | 60 min | Un agente con **una herramienta**. Ven la traza ReAct funcionando. |
| 3 | **Práctica 2 — lunes** | 60 min | **Varias herramientas**, encadenamiento, **memoria** y **límites**. |
| 4 | **Tarea evaluada** | autónomo | Su propio agente, en el dominio que elijan. 100 pts (el 100% de la nota del curso), escala 1,0–7,0. |

---

## Los notebooks van numerados paso a paso

Los tres siguen la misma estructura: cada acción es un **paso numerado**, y cada celda de
código empieza con `▶ PASO N` en su primera línea. Así puedes decir *"vamos por el Paso 6"*
y las 80 personas saben exactamente dónde están.

| Notebook | Pasos | Estructura |
|---|---|---|
| `01_Taller_Practico_1` | **11** | 1-4 la llave · 5 el modelo solo falla · 6-7 la herramienta · 8-9 el agente y la traza · 10 tu turno · 11 guardar |
| `02_Taller_Practico_2` | **10** | 1 entorno · 2-4 varias herramientas y encadenamiento · 5-7 memoria · 8 límites · 9 tu turno · 10 la tarea |
| `03_Tarea_Plantilla` | **10** | 1-3 preparación · 4-8 los cinco requisitos (20 pts cada uno) · 9 lista de verificación · 10 compartir |

En la plantilla, **cada paso evaluado lleva dentro los descriptores de la rúbrica**: el
estudiante ve de antemano qué separa un 4 de un 2. No hay sorpresas al corregir.

Los pasos 1 y 2 del viernes están desglosados clic a clic (`1.1`, `1.2`, ... `2.6`) porque
ahí es donde se atasca la gente. La diapositiva 5 de la PPT usa esa misma numeración, y la
guía del alumno también.

## Decisiones de diseño

**Modo simulado.** Los tres notebooks detectan si falta la llave de Groq y siguen
funcionando con un agente de respaldo sin modelo de lenguaje. Nadie se queda mirando
la pantalla mientras la clase avanza. Con ~80 personas creando cuentas a la vez, esto
es lo que evita perder la hora.

**Nivel introductorio real.** Todo el código está escrito y comentado. El trabajo del
estudiante es ejecutarlo y cambiar palabras dentro. Cada bloque "tu turno" arranca con
un ejemplo que **ya funciona**, para que modifiquen en vez de partir de cero.

**Cada paso dice qué esperar.** Antes de ejecutar, el notebook adelanta qué debería
aparecer en pantalla; si sale otra cosa, hay una tabla de "qué pasó / qué hacer" en el
propio paso. Es lo que evita que alguien se quede atascado en silencio.

**Dominio de biblioteca.** Coherente con quien organiza el taller y con los ejemplos del
PPT teórico (`buscar_libro`, `reservar_sala`). La tarea, en cambio, es de dominio libre.

**No se solapa con el ramo de Ingeniería de Soluciones con IA.** Comparte la base técnica
(Groq, LangChain, mismos modelos) pero ningún ejercicio. La comparativa está en `docente/notas-tecnicas.md` §5.

---

## Verificación

Los cuatro notebooks se ejecutaron **de principio a fin contra la API real de Groq**
(LangChain 1.4.0, langchain-classic 1.0.8, langchain-groq 1.1.3, groq 0.37.1). Cero
errores, y lo que se enseña ocurre de verdad:

| Qué se enseña | Qué hizo el agente en la prueba |
|---|---|
| El modelo solo no sabe la hora | *"No dispongo de acceso en tiempo real..."* |
| Con herramienta sí responde | `Invoking: hora_actual` → *"Son las 00:04 del viernes 04-09-2026"* |
| Elige entre varias herramientas | `Invoking: buscar_libro` con `{'titulo': 'Sapiens'}` |
| **Encadena dos en una consulta** | `Invoking: buscar_libro` → `Invoking: salas_disponibles` |
| Sin memoria olvida | *"Lo siento, pero no tengo acceso a tu nombre."* |
| Con memoria recuerda | *"Te llamas Camila."* |
| Memoria de 3 turnos | *"Te llamas Camila y el primer producto que preguntaste fue el café."* |
| El límite del prompt frena | Pide reservar sin elegir sala → pregunta cuál, `RESERVAS` vacía |
| La validación del código frena | `registrar_pedido(50)` → *"máximo 10 unidades"*, stock intacto |

Las dos presentaciones (36 diapositivas) se abrieron **en Microsoft PowerPoint** y se
exportaron a PDF desde ahí: ninguna página en blanco y Montserrat se incrusta bien, así
que se ven igual que la sesión teórica sin instalar nada. Además pasan el renderizador
propio, que busca desbordes de texto, elementos que pisen el logo y glifos ausentes.

### Lo que queda sin comprobar

- **Los notebooks no se ejecutaron dentro de Colab**, sino en un entorno equivalente. El
  código que difiere es el de `google.colab.userdata` para leer el Secret; el resto es
  idéntico. Se comprueba en dos minutos abriendo el primero desde el badge.

## Lo que tienes que decidir tú

- [ ] **Fecha de entrega** de la tarea *(el guion del lunes tiene el hueco marcado)*
- [ ] **Dónde se entrega** el enlace de Colab (AVA, formulario, correo)
- [ ] **Política de modo simulado** en la evaluación — hay una sugerida en la rúbrica;
      anúnciala el lunes, no al corregir
- [ ] Si corriges o no las 4 diapositivas del PPT teórico con código desactualizado
- [ ] Si presentas desde **otro computador**, exporta las PPT a PDF antes o instala
      Montserrat (`presentaciones/_generador/fuentes/`). En el tuyo no hace falta:
      PowerPoint la resuelve solo (ver [presentaciones/LEEME.md](presentaciones/LEEME.md))

---

## Licencia

Material educativo bajo **[Creative Commons Atribución 4.0 Internacional](LICENSE)**
(CC BY 4.0). Puedes usarlo, adaptarlo y compartirlo libremente, incluso con fines
comerciales, dando crédito a *Giocrisrai Godoy — Bibliotecas DUOC UC*.

Quedan fuera de esa licencia los logotipos institucionales de DUOC UC y la fuente
Montserrat, que tiene la suya propia (SIL OFL 1.1).
