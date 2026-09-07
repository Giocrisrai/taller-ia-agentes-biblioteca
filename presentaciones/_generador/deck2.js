const P = require("pptxgenjs");
const T = require("./tema.js");
const { C } = T;

const pres = T.construir(new P());
pres.author = "DUOC UC · Bibliotecas";
pres.title = "Taller Práctico 2 — Varias herramientas, memoria y límites";

const TOTAL = 18;
let n = 0;
const slide = (etiqueta) => {
  n++;
  const s = T.base(pres);
  T.logo(s);
  T.cabecera(s, etiqueta, `AGENTES IA  ·  Taller Práctico 2  ·  ${n}/${TOTAL}`);
  return s;
};

// ── 1 · Portada ──────────────────────────────────────────────────────────────
{
  n++;
  const s = T.base(pres);
  T.portada(pres, s, {
    etiqueta: "INTELIGENCIA ARTIFICIAL BÁSICO-MEDIO   ·   SESIÓN PRÁCTICA 2",
    titulo: "Varias Herramientas,\nMemoria y Límites",
    subtitulo: "Cuando el agente tiene que elegir, recordar y contenerse",
    pie: "DUOC UC  ·  Curso de IA Aplicando Agentes",
    fecha: "Septiembre, 2026",
  });
  s.addNotes("Repaso en cuatro palabras y adelante: herramienta, modelo, AgentExecutor, ciclo ReAct.");
}

// ── 2 · Repaso relámpago ─────────────────────────────────────────────────────
{
  const s = slide("ENCUADRE · REPASO");
  const y = T.titulo(s, "Lo que construiste el viernes", "Cuatro piezas, en una mirada");
  T.fin(T.destaqueTras(pres, s, "Hoy cambia una cosa:",
    "el agente ya no tendrá una herramienta, sino varias — y tendrá que elegir.",
    T.tabla(pres, s, ["Pieza", "Qué es"], [
      ["Herramienta", "Una función de Python con @tool. El modelo la elige por su descripción."],
      ["Modelo", "El que razona y decide. Nunca ejecuta código."],
      ["AgentExecutor", "El motor que sí ejecuta la herramienta y devuelve el resultado al modelo."],
      ["Ciclo ReAct", "Pensamiento → Acción → Observación, repetido hasta responder."],
    ], [26, 74], { y })), "Repaso");
}

// ── 3 · Agenda ───────────────────────────────────────────────────────────────
{
  const s = slide("RUTA DE LA SESIÓN");
  const y = T.titulo(s, "Agenda", "Tres bloques en 60 minutos, y el cierre con la tarea");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Varias herramientas", texto: "El agente elige entre tres y encadena dos en una consulta  ·  20 min" },
    { titulo: "Memoria", texto: "Por qué olvida y cómo hacer que recuerde  ·  13 min" },
    { titulo: "Límites", texto: "Los tres tipos, y cuál es el que de verdad protege  ·  10 min" },
    { titulo: "Tu turno y tarea", texto: "Una cuarta herramienta y el encargo evaluado  ·  12 min" },
  ], { y, cols: 4, alto: T.ALTO.unaFila, gap: 15.8, tamTitulo: 12 }), "Agenda");
}

// ── 4 · Divisor módulo 1 ─────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · ORQUESTACIÓN");
  T.divisor(pres, s, "El Agente Elige", "Tres herramientas y una decisión en cada consulta",
    ["Las tres tools", "Cómo elige", "Encadenar"]);
}

// ── 5 · Las tres herramientas ────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · LAS HERRAMIENTAS");
  const y = T.titulo(s, "Tres herramientas de biblioteca", "Fíjate en que la tercera no es como las otras dos");
  T.fin(T.destaqueTras(pres, s, "Una herramienta es una función de Python:",
    "puede leer un diccionario o llamar a una API real. Al agente le da igual: solo ve lo que devuelve.",
    T.tarjetas(pres, s, [
      { titulo: "buscar_libro", texto: "API REAL — Open Library, 40 millones de libros.\n\nSolo lee: no cambia nada." },
      { titulo: "salas_disponibles", texto: "SIMULADA — DUOC no tiene API pública de salas.\n\nSolo lee: no cambia nada." },
      { titulo: "reservar_sala", texto: "SIMULADA, y menos mal: cambia el estado del mundo. Volvemos en el módulo 3." },
    ], { y, cols: 3, alto: T.ALTO.unaFila, gap: 15.8, tamTitulo: 12.5 })), "Tres herramientas");
}

// ── 6 · Cómo elige ───────────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · LA DECISIÓN");
  const y = T.titulo(s, "¿Cómo sabe cuál usar?", "No hay reglas ni condicionales: solo lee y decide");
  T.fin(T.destaqueTras(pres, s, "De ahí que la descripción sea todo:",
    "una tool mal descrita es una tool que el agente no va a usar nunca.",
    T.tarjetas(pres, s, [
      { titulo: "Lo que el agente recibe", texto: "Tu pregunta, y la lista de herramientas disponibles con el nombre y la descripción de cada una. Nada más: no ve el código." },
      { titulo: "Lo que el agente devuelve", texto: "El nombre de la herramienta que quiere usar y los argumentos con que llamarla. No la ejecuta: solo lo pide." },
    ], { y, cols: 2, alto: T.ALTO.unaFila, numeradas: false, tamTitulo: 14 })), "Cómo elige");
}

// ── 7 · Encadenamiento ───────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · ENCADENAMIENTO");
  const y = T.titulo(s, "Dos herramientas, una consulta", "«Necesito Sapiens y además una sala a las 16:00»");
  T.fin(T.destaqueTras(pres, s, "Nadie le dijo el orden:",
    "leyó tu consulta, vio que tenía dos partes y decidió él la secuencia. Eso es orquestación.",
    T.codigo(pres, s, [
      [{ t: "> Entering new AgentExecutor chain..." }],
      [{ t: "" }],
      [{ t: "Invoking: buscar_libro" }, { t: '  con {"titulo": "Sapiens"}', c: C.gris }],
      [{ t: "  Encontre 2320 resultados: Sapiens de Yuval Noah Harari, 2011" }],
      [{ t: "" }],
      [{ t: "Invoking: salas_disponibles" }, { t: '  con {"hora": "16:00"}', c: C.gris }],
      [{ t: "  A las 16:00 estan libres: Sala 204, Sala 301." }],
      [{ t: "" }],
      [{ t: "> Finished chain." }],
    ], { y, tam: 11.5, alto: 165.6 })), "Encadenamiento");
  s.addNotes("Detén la clase aquí y señala los DOS Invoking. Es el concepto central de la sesión. Si a alguien le salió distinto, úsalo para hablar de alucinación.");
}

// ── 8 · Divisor módulo 2 ─────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · MEMORIA");
  T.divisor(pres, s, "Hacer que Recuerde", "Cada consulta empezaba de cero hasta ahora",
    ["El olvido", "La lista", "El costo"]);
}

// ── 9 · Sin memoria ──────────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · EL OLVIDO");
  const y = T.titulo(s, "Se lo acabas de decir", "Dos turnos seguidos, y el agente no sabe tu nombre");
  T.fin(T.destaqueTras(pres, s, "El motivo:",
    "cada llamada a invoke es independiente. Lo único que recibe el modelo es el mensaje de ese turno.",
    T.tarjetas(pres, s, [
      { titulo: "Turno 1", texto: "«Hola, me llamo Camila y busco el libro Sapiens.»\n\nEl agente busca el libro y responde correctamente." },
      { titulo: "Turno 2", texto: "«¿Cómo me llamo?»\n\n«No tengo esa información.»\n\nAcaba de olvidarlo todo." },
    ], { y, cols: 2, alto: T.ALTO.unaFila, numeradas: false, tamTitulo: 14 })), "Sin memoria");
  s.addNotes("Primero el fracaso, después la solución. Deja el silencio tras la pregunta «¿por qué no lo sabe?».");
}

// ── 10 · La memoria es una lista ─────────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · LA SOLUCIÓN");
  const y = T.titulo(s, "La memoria es una lista", "No hay magia: son los mensajes anteriores, reenviados");
  T.fin(T.destaqueTras(pres, s, "Eso es todo:",
    "una lista de Python que se vuelve a mandar entera en cada turno.",
    T.codigo(pres, s, [
      [{ t: "historial = []" }, { t: "                       # aqui vive la memoria", c: C.gris }],
      [{ t: "" }],
      [{ t: "def conversar(agente, mensaje, historial):" }],
      [{ t: "    respuesta = preguntar(agente, mensaje, historial)" }, { t: "   # le pasamos lo anterior", c: C.gris }],
      [{ t: "    historial.append(HumanMessage(content=mensaje))" }, { t: "     # lo que dijo la persona", c: C.gris }],
      [{ t: "    historial.append(AIMessage(content=respuesta))" }, { t: "      # lo que respondio el agente", c: C.gris }],
      [{ t: "    return respuesta" }],
    ], { y, tam: 11.5, alto: 140 })), "Memoria lista");
}

// ── 11 · La consecuencia ─────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · LA CONSECUENCIA");
  const y = T.titulo(s, "Si se reenvía entera, cuesta", "La memoria no es gratis, y ahí está el problema real");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Cuesta más", texto: "Cada turno manda toda la conversación previa. Más texto enviado son más tokens, y más tokens es más dinero." },
    { titulo: "Se llena", texto: "El modelo tiene un límite de cuánto texto puede recibir. En algún momento la conversación ya no cabe." },
    { titulo: "Por eso se resume", texto: "Los sistemas reales no guardan todo: resumen lo viejo o guardan solo lo relevante. Ese es el problema que resuelven las memorias avanzadas." },
  ], { y, cols: 3, alto: 208.8, numeradas: false, tamTitulo: 13.5 }), "Consecuencia");
}

// ── 12 · Divisor módulo 3 ────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · RESPONSABILIDAD");
  T.divisor(pres, s, "Ponerle Límites", "Que no haga lo que no debe hacer",
    ["Los tres tipos", "Cuál protege", "La idea"]);
}

// ── 13 · Los tres límites ────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · LOS TRES LÍMITES");
  const y = T.titulo(s, "Tres límites, no uno", "Ninguno basta solo, por eso van los tres a la vez");
  T.fin(T.destaqueTras(pres, s, "El tercero es el que importa:",
    "la instrucción del prompt es una sugerencia y el modelo puede ignorarla. Un if no se ignora.",
    T.tabla(pres, s, ["Límite", "Dónde vive", "Qué evita"], [
      ["Instrucción de confirmar", "En el system prompt", "Que actúe sin permiso de la persona"],
      ["max_iterations", "En el AgentExecutor", "Que entre en bucle infinito y gaste tu cupo"],
      ["Validación en la función", "Dentro de la herramienta", "Que un dato inventado cause daño real"],
    ], [28, 26, 46], { y })), "Tres límites");
}

// ── 14 · La idea de las dos sesiones ─────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · LA IDEA CLAVE");
  const y = T.titulo(s, "El agente propone, tu código dispone", "La frase que resume las dos sesiones");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "El modelo decidió qué hacer", texto: "Leyó la consulta, eligió la herramienta y propuso los argumentos con que llamarla." },
    { titulo: "Tú decidiste qué es posible", texto: "Cuando escribiste las herramientas y sus validaciones definiste el universo completo de lo que el agente puede hacer." },
    { titulo: "De ahí se sigue todo", texto: "Un agente nunca es más peligroso que las herramientas que le diste. Si no le das una tool para borrar, no puede borrar." },
  ], { y, cols: 3, alto: 208.8, numeradas: false, tamTitulo: 13.5 }), "Idea clave");
}

// ── 15 · Tu turno ────────────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · ACTIVACIÓN");
  const y = T.titulo(s, "Tu turno", "Una cuarta herramienta para el mismo agente");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Prueba B-045", texto: "renovar_prestamo funciona: el préstamo se renueva y ves el resultado." },
    { titulo: "Prueba B-112", texto: "Ese ya se renovó dos veces. La herramienta lo rechaza." },
    { titulo: "Fíjate quién dijo que no", texto: "No fue el modelo. Fue el if que escribiste tú dentro de la función." },
    { titulo: "Ahora la tuya", texto: "buscar_por_autor, multa_pendiente, computadores_libres... lo que se te ocurra." },
  ], { y, cols: 4, alto: 208.8, gap: 15.8, tamTitulo: 12 }), "Tu turno");
}

// ── 16 · Resumen de las dos sesiones ─────────────────────────────────────────
{
  const s = slide("CIERRE · SÍNTESIS");
  const y = T.titulo(s, "Tabla resumen del taller", "Todo lo que construiste en las dos sesiones");
  T.fin(T.tabla(pres, s, ["Concepto", "Qué es", "Dónde lo viste"], [
    ["Herramienta", "Función de Python: un dict o una API real", "buscar_libro → Open Library"],
    ["Encadenamiento", "Varias tools seguidas en una sola consulta", "Libro + sala a las 16:00"],
    ["Memoria", "Lista de mensajes que se reenvía cada turno", "historial con HumanMessage"],
    ["Límite", "Instrucción, tope de pasos o validación en el código", "reservar_sala, renovar_prestamo"],
    ["Ciclo ReAct", "Pensamiento → Acción → Observación", "La traza con verbose=True"],
  ], [22, 44, 34], { y }), "Resumen");
}

// ── 17 · La tarea ────────────────────────────────────────────────────────────
{
  const s = slide("CIERRE · TAREA EVALUADA");
  const y = T.titulo(s, "Tu propio agente", "Dominio libre · 100 puntos = 100% de la nota · Entrega: lunes 14 de septiembre, 23:00");
  T.fin(T.destaqueTras(pres, s, "Y el quinto, otros 20:",
    "un párrafo de máx. 150 palabras con un riesgo de TU agente y cómo lo mitigarías. Se aprueba con 60.",
    T.tabla(pres, s, ["#", "Requisito", "Puntos"], [
      ["1", "Tres herramientas propias con @tool y buena descripción", "20"],
      ["2", "Una consulta que encadene al menos dos de ellas", "20"],
      ["3", "Tres turnos con memoria, donde el turno 3 dependa del 1", "20"],
      ["4", "Un límite explícito que se vea actuando", "20"],
    ], [7, 79, 14], { y })), "Tarea");
  s.addNotes("Di en voz alta: dominio libre, hay plantilla (03_Tarea_Plantilla), y hay que entregarlo EJECUTADO. Fecha de entrega: lunes 14 de septiembre de 2026, 23:00. Ya está puesta en el campus.");
}

// ── 18 · Cierre ──────────────────────────────────────────────────────────────
{
  n++;
  const s = T.base(pres);
  T.cierre(pres, s, {
    titulo: "Hasta aquí el taller",
    subtitulo: "Guarda tu copia en Drive: Archivo → Guardar una copia en Drive",
    bloques: [
      { titulo: "Lo que te llevas", texto: "Sabes construir un agente con varias herramientas, darle memoria y ponerle límites que de verdad se cumplen." },
      { titulo: "La entrega", texto: "Notebook de Colab ejecutado, con los resultados visibles, compartido como «cualquier persona con el enlace»." },
      { titulo: "Si te atascas", texto: "Entrega igual lo que alcanzaste y documenta qué falló. Esa lectura crítica también puntúa en la rúbrica." },
    ],
  });
}

pres.writeFile({ fileName: "../Taller_Practico_2.pptx" }).then((f) => console.log("✅ Generado:", f, "·", n, "diapositivas"));
