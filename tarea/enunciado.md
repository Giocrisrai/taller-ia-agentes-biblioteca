# Tarea evaluada — Construye tu propio agente de IA

**DUOC UC · Bibliotecas** · Curso de IA Aplicando Agentes
**Modalidad:** individual · **Entrega:** enlace a Google Colab
**Fecha de entrega:** lunes 14 de septiembre de 2026, 23:00 (una semana desde la sesión del lunes)

---

## En una frase

Construye un agente de IA para **un servicio de tu propio entorno**, con tres herramientas
que tú escribas, memoria y al menos un límite que funcione.

---

## El dominio lo eliges tú

No repitas la biblioteca del taller. Elige algo que conozcas: te va a salir mejor y más rápido.

| Ejemplos | Herramientas que podría tener |
|---|---|
| Cafetería del campus | consultar precio, ver horario, registrar pedido |
| Gimnasio | ver clases del día, consultar cupos, inscribir a una clase |
| Secretaría de tu carrera | buscar requisitos de un trámite, consultar plazos, agendar una hora |
| Taller mecánico | consultar precio de servicio, ver disponibilidad, agendar |
| Tu emprendimiento | lo que tú vendas |
| Veterinaria, farmacia, hotel, arriendo de canchas... | lo que se te ocurra |

**Los datos pueden ser inventados** y con eso apruebas: unos diccionarios de Python bastan,
igual que las salas del taller.

Pero si quieres subir el nivel, **conecta una API real**. El Paso 2 de la plantilla te deja
cuatro gratuitas y sin llave —Open Library, Wikipedia, mindicador.cl y feriados de Chile—
con el código listo para copiar. No es obligatorio, pero demuestra que entendiste lo
esencial: que el agente no sabe de dónde vienen los datos, y que eso lo decides tú.

---

## Lo que se pide

Cinco requisitos. Cada uno es un criterio de la rúbrica y vale **20 puntos**.

Es la única evaluación del taller: estos 100 puntos son el 100% de la nota del curso.
Se aprueba con 60 puntos (nota 4,0).

La plantilla `03_Tarea_Plantilla.ipynb` está numerada en **10 pasos** y cada requisito
tiene el suyo, con los descriptores de la rúbrica escritos dentro del propio paso.

### 1 · Tres herramientas propias  *(20 pts · Paso 4 de la plantilla)*

Tres funciones con `@tool`, escritas por ti, coherentes con tu dominio.

- La **descripción entre comillas triples** debe decir **cuándo** usar la herramienta,
  no solo qué hace. Es lo único que lee el modelo.
- **Al menos una debe validar los datos** que recibe (un `if` que rechace entradas
  inválidas).
- Se recomienda que al menos una **cambie el estado** (registre, reserve, cancele),
  para que el requisito 4 tenga sentido.

### 2 · Una consulta que encadene dos herramientas  *(20 pts · Paso 5)*

Escribe una pregunta que **obligue** al agente a usar dos herramientas distintas, una
detrás de otra.

En la traza tienen que verse **dos `Invoking:` diferentes**. Si aparece solo uno, o el
mismo repetido, no cumple.

> 💡 Truco: pide dos cosas en la misma frase, como el *"necesito Sapiens y una sala a
> las 16:00"* del taller.

### 3 · Una conversación de tres turnos con memoria  *(20 pts · Paso 6)*

Tres turnos seguidos usando el historial. **El turno 3 tiene que depender de algo dicho
en el turno 1.**

Un turno 3 del tipo *"gracias, adiós"* no demuestra memoria y no puntúa.

> 💡 Ejemplo de estructura: (1) *"Hola, soy Camila, ¿cuánto cuesta el café?"* →
> (2) *"¿Y el sándwich?"* → (3) *"¿cómo me llamo y qué pregunté primero?"*

### 4 · Un límite que se vea actuando  *(20 pts · Paso 7)*

Elige al menos uno de los tres tipos vistos en clase:

| Tipo | Cómo |
|---|---|
| Instrucción | Una regla en el prompt del sistema |
| Tope de pasos | `max_pasos=` al armar el agente |
| Validación en el código | Un `if` dentro de la herramienta |

**No basta con escribirlo: hay que verlo funcionar.** Provoca la situación en la que el
límite tiene que saltar, y que se vea en el resultado.

### 5 · Un riesgo de tu agente  *(20 pts · Paso 8)*

En una celda de texto, **máximo 150 palabras**, responde:

1. **¿Qué puede salir mal con TU agente concreto?** No vale "puede alucinar" en general:
   di qué pasaría en tu dominio y a quién le afectaría.
2. **¿Cómo lo reducirías?** Una medida concreta.

> Si tu agente falló durante las pruebas y lo documentas honestamente aquí, **eso suma**.
> Es exactamente la lectura crítica que se busca.

---

## Cómo se entrega

1. Abre **`03_Tarea_Plantilla.ipynb`** y sigue sus **10 pasos en orden**. Trae todo el
   andamiaje puesto: solo rellenas lo tuyo.
2. El **Paso 9** es una lista de verificación con todo lo que se evalúa. Repásala.
3. El **Paso 10** te lleva de la mano por el proceso de compartir, incluida la
   comprobación en ventana de incógnito.

> ⚠️ **Un notebook sin ejecutar no se puede evaluar.** Las trazas del agente son la
> evidencia de que funciona. Sin ellas no hay nada que corregir.

---

## Sobre la llave de Groq

La tarea se hace **con tu llave real**, no en modo simulado. El modo simulado no muestra
al agente razonando, y sin esas trazas los requisitos 2, 3 y 4 no se pueden evaluar.

Si no lograste la llave, resuélvelo con `estudiantes/guia-groq-colab.md` o pide ayuda
antes de la fecha de entrega. **No dejes esto para el último día.**

---

## Preguntas frecuentes

**¿Puedo usar el mismo dominio del taller?**
Puedes, pero se evalúa que las herramientas sean tuyas. Copiar las de biblioteca no
puntúa en el criterio 1. Es más fácil elegir un dominio propio.

**¿Los datos tienen que ser reales?**
No. Invéntalos. Lo que se evalúa es el diseño del agente, no la calidad de los datos.

**¿Cuánto código tengo que escribir?**
Poco. Las tres herramientas son unas 10 líneas cada una y tienes ejemplos completos en
los notebooks del taller y en la plantilla.

**¿Y si mi agente a veces falla?**
Es normal: el modelo no es determinista. Documenta qué falló y por qué en el requisito 5.
Eso suma en vez de restar.

**¿Se puede hacer en parejas?**
No, es individual. Pueden comentar entre ustedes, pero cada entrega debe ser propia.

---

## Rúbrica

El detalle de los 100 puntos y la escala de notas está en **`tarea/rubrica.md`**.
Léela antes de entregar: cada punto de la lista de verificación de la plantilla
corresponde a una línea de la rúbrica.
