# Rúbrica de corrección — Tarea evaluada

**5 criterios × 20 puntos = 100 puntos.** Escala 1,0 – 7,0 con exigencia 60%.

Es la única evaluación del taller, así que su puntaje es el 100% de la nota del curso.

Diseñada para corregir volumen (~80 entregas) sin perder consistencia: cada criterio
tiene un **descriptor observable**, no una impresión general.

Los estudiantes ven estos mismos descriptores dentro de la plantilla, en el paso que
corresponde a cada criterio. No hay sorpresas al corregir.

---

## Criterio A · Herramientas propias  (20 pts)

| Pts | Descriptor |
|:--:|---|
| **20** | Tres herramientas propias y coherentes con el dominio. Las descripciones dicen **cuándo** usar cada una, no solo qué hace. Al menos una **valida** los datos que recibe. |
| **15** | Tres herramientas propias y correctas, pero alguna descripción es genérica (*"consulta datos"*) o falta la validación. |
| **10** | Tres herramientas, pero las descripciones no permitirían al modelo elegir bien, o una es copia directa del taller. |
| **5** | Menos de tres herramientas, o son copia del taller con el nombre cambiado. |
| **0** | No hay herramientas propias. |

> 🔍 **Dónde mirar:** **Paso 4** de la plantilla. Lee los docstrings, no el código.

---

## Criterio B · Encadenamiento  (20 pts)

| Pts | Descriptor |
|:--:|---|
| **20** | La consulta obliga al encadenamiento y la traza muestra **dos `Invoking:` distintos**. La respuesta final integra ambos resultados. |
| **15** | Se ven dos `Invoking:` distintos, pero la respuesta final no integra bien los dos datos. |
| **10** | La consulta está bien diseñada para encadenar, pero en la ejecución el agente usó solo una herramienta. |
| **5** | La consulta solo requería una herramienta: no había nada que encadenar. |
| **0** | No hay consulta en el Paso 4, o no está ejecutada. |

> 🔍 **Dónde mirar:** **Paso 5**. Busca literalmente dos bloques `Invoking:` con nombres distintos.
> Evalúa **el diseño de la consulta**, no la suerte de esa ejecución concreta: por eso 2 puntos
> si la consulta era correcta aunque el agente fallara.

---

## Criterio C · Memoria  (20 pts)

| Pts | Descriptor |
|:--:|---|
| **20** | Tres turnos con historial. El turno 3 **es imposible de responder sin el turno 1**, y el agente lo responde bien. |
| **15** | Tres turnos correctos, pero el turno 3 depende del turno 2, no del 1. |
| **10** | Tres turnos ejecutados, pero ninguno demuestra que la memoria se usó (todos son independientes). |
| **5** | Menos de tres turnos, o no se pasa el historial. |
| **0** | No hay conversación, o no está ejecutada. |

> 🔍 **Dónde mirar:** **Paso 6**. La segunda celda imprime el historial y avisa sola si no son 6 mensajes.

---

## Criterio D · Límites  (20 pts)

| Pts | Descriptor |
|:--:|---|
| **20** | Hay al menos un límite y **se ve actuando**: se provoca la situación y el resultado muestra que el agente no hizo lo que no debía. |
| **15** | El límite existe y se provoca, pero el resultado es ambiguo o no se comprueba el efecto (no se imprime el estado). |
| **10** | El límite está declarado (regla en el prompt, `max_pasos`) pero nunca se provoca la situación. |
| **5** | Se menciona la idea de límite sin implementarla. |
| **0** | No hay límites. |

> 🔍 **Dónde mirar:** **Paso 7**. La clave es si **se provocó** la situación o solo se declaró la regla.
> Una validación dentro de la herramienta que se ve rechazando una entrada es la mejor evidencia.

---

## Criterio E · Reflexión sobre riesgos  (20 pts)

| Pts | Descriptor |
|:--:|---|
| **20** | Identifica un riesgo **específico de su agente**, nombra el daño concreto y a quién afecta, y propone una mitigación implementable. Dentro de las 150 palabras. |
| **15** | Riesgo específico y mitigación correcta, pero la mitigación es vaga (*"supervisar más"*). |
| **10** | Riesgo genérico aplicado superficialmente a su dominio. Mitigación débil. |
| **5** | Riesgo genérico (*"puede alucinar"*) sin conexión con su agente. |
| **0** | No hay reflexión. |

> 🔍 **Dónde mirar:** **Paso 8**. Pregunta clave: **¿esto se podría copiar-pegar en cualquier otra
> entrega?** Si sí, es genérico: máximo 10.
> **Bonificación implícita:** si documenta un fallo real de su agente y lo analiza, es un 20.

---

## Escala de notas

Exigencia 60%: **60 puntos = 4,0**.

| Pts | Nota | | Pts | Nota |
|:--:|:--:|---|:--:|:--:|
| 0 | 1,0 | | 55 | 3,8 |
| 5 | 1,3 | | **60** | **4,0** |
| 10 | 1,5 | | 65 | 4,4 |
| 15 | 1,8 | | 70 | 4,8 |
| 20 | 2,0 | | 75 | 5,1 |
| 25 | 2,3 | | 80 | 5,5 |
| 30 | 2,5 | | 85 | 5,9 |
| 35 | 2,8 | | 90 | 6,3 |
| 40 | 3,0 | | 95 | 6,6 |
| 45 | 3,3 | | 100 | 7,0 |
| 50 | 3,5 | | | |

*Fórmula: hasta 60 pts → `1 + 0,05 × P`. Sobre 60 pts → `4 + 0,075 × (P − 60)`.*

## Condiciones de entrega

### Notebook sin ejecutar

Sin salidas visibles no hay evidencia de nada: los criterios B, C y D quedan en 0
automáticamente (máximo 40 puntos, nota 3,0).

**Recomendación:** en vez de calificar así, devuélvelo con una fecha corta para
reejecutar. Es un error de procedimiento, no de aprendizaje, y con 80 entregas te
ahorra reclamos.

### Entrega en modo simulado

El modo simulado no muestra al agente razonando, así que B, C y D no son verificables.

**Política sugerida: máximo 60/100 (nota 4,0)**, con esta excepción — si el estudiante
documenta que pidió ayuda antes de la entrega y aun así no consiguió la llave, evalúa
A y E normalmente y prorratea sobre esos dos criterios.

> ⚖️ Esta política es una recomendación, no una regla del material. Ajústala a tu criterio
> y **anúnciala el lunes**, no al momento de corregir.

### Entregas idénticas entre estudiantes

La plantilla es común, así que el andamiaje **va a ser idéntico**. Lo que debe ser propio
es: el dominio, las tres herramientas, las consultas y el párrafo del Paso 7.

Dos entregas con el mismo dominio *y* las mismas herramientas *y* las mismas consultas
son copia. El párrafo del Paso 7 es el mejor discriminador.

---

## Ruta rápida de corrección

Con ~80 entregas, este orden ahorra horas:

**Primer pase (30 seg por entrega) — clasificar:**

1. ¿Está ejecutado? → si no, a la pila de "devolver".
2. ¿Hay 3 `@tool` propias en el Paso 4? → si no, es zona de reprobación, corrige completo.
3. ¿Hay dos `Invoking:` distintos en el Paso 5? → es el criterio que más se falla.

Con esos tres datos ya sabes en qué tercio cae cada entrega.

**Segundo pase — solo las dudosas:** afina A, D y E, que son los que exigen leer.

**C se corrige de un vistazo:** la celda del historial imprime el número de mensajes y
avisa sola si no son 6. Si dice 6, hubo tres turnos.

---

## Planilla de puntajes

Para copiar a Excel o Sheets:

```
Estudiante | A(20) | B(20) | C(20) | D(20) | E(20) | Total(100) | Nota | Observaciones
```

Fórmula de nota en la celda correspondiente (asumiendo el total en `G2`):

```
=SI(G2<=60; REDONDEAR(1+0,05*G2; 1); REDONDEAR(4+0,075*(G2-60); 1))
```
