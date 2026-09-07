const P = require("pptxgenjs");
const T = require("./tema.js");
const { C } = T;

const pres = T.construir(new P());
pres.author = "DUOC UC · Bibliotecas";
pres.title = "Taller Práctico 1 — Construye tu primer agente";

const TOTAL = 18;
let n = 0;
const slide = (etiqueta) => {
  n++;
  const s = T.base(pres);
  T.logo(s);
  T.cabecera(s, etiqueta, `AGENTES IA  ·  Taller Práctico 1  ·  ${n}/${TOTAL}`);
  return s;
};

// ── 1 · Portada ──────────────────────────────────────────────────────────────
{
  n++;
  const s = T.base(pres);
  T.portada(pres, s, {
    etiqueta: "INTELIGENCIA ARTIFICIAL BÁSICO-MEDIO   ·   SESIÓN PRÁCTICA 1",
    titulo: "Construye tu Primer\nAgente de IA",
    subtitulo: "De un modelo que solo habla a un agente que consulta y actúa",
    pie: "DUOC UC  ·  Curso de IA Aplicando Agentes",
    fecha: "Septiembre, 2026",
  });
  s.addNotes("Proyecta el agente ya funcionando antes de empezar. Reglas: no se instala nada, no hay que saber programar, si algo falla mano arriba de inmediato.");
}

// ── 2 · Objetivos ────────────────────────────────────────────────────────────
{
  const s = slide("ENCUADRE");
  const y = T.titulo(s, "Objetivos de la sesión", "Aprendizaje esperado · Construir y ejecutar un agente con una herramienta");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Configurar", texto: "Tu propia llave de Groq y el entorno de trabajo en Google Colab." },
    { titulo: "Comprobar", texto: "Por qué un modelo de lenguaje por sí solo no basta para tareas reales." },
    { titulo: "Escribir", texto: "Una herramienta en Python y conectarla a un agente con el decorador @tool." },
    { titulo: "Leer", texto: "La traza Pensamiento → Acción → Observación que el agente imprime al trabajar." },
  ], { y, cols: 2, alto: T.ALTO.dosFilas }), "Objetivos");
  s.addNotes("Lo mínimo de la hora: que todos vean su agente llamar a una herramienta.");
}

// ── 3 · Agenda ───────────────────────────────────────────────────────────────
{
  const s = slide("RUTA DE LA SESIÓN");
  const y = T.titulo(s, "Agenda", "Cuatro bloques en 60 minutos: de la llave al agente funcionando");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Puesta en marcha", texto: "Pasos 1-4 · cuenta de Groq, llave y Secrets de Colab  ·  13 min" },
    { titulo: "El modelo solo", texto: "Paso 5 · qué pasa cuando no tiene herramientas  ·  8 min" },
    { titulo: "La herramienta", texto: "Pasos 6-7 · @tool, la función y su descripción  ·  10 min" },
    { titulo: "El agente", texto: "Pasos 8-11 · armarlo, ejecutarlo y leer la traza  ·  24 min" },
  ], { y, cols: 4, alto: T.ALTO.unaFila, gap: 15.8, tamTitulo: 12 }), "Agenda");
  s.addNotes("Si vas atrasado, recorta el TU TURNO del bloque 4, nunca la lectura de la traza.");
}

// ── 4 · Divisor módulo 0 ─────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 0 · PUESTA EN MARCHA");
  T.divisor(pres, s, "Tu Llave de Groq", "Todo ocurre en el navegador: no hay nada que instalar",
    ["Crear la cuenta", "Guardar el secreto", "Verificar"]);
}

// ── 5 · Pasos de la llave ────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 0 · CONFIGURACIÓN");
  const y = T.titulo(s, "Cómo obtener tu llave", "Pasos 1 y 2 del notebook · gratis y sin tarjeta de crédito");
  T.fin(T.destaqueTras(pres, s, "El 2.6 es el crítico:",
    "guardar el secreto no basta — hay que darle acceso al notebook con el interruptor.",
    T.tarjetas(pres, s, [
      { n: "1.1", titulo: "Crear cuenta", texto: "Entra a console.groq.com y regístrate con tu correo." },
      { n: "1.4", titulo: "Generar la llave", texto: "API Keys → Create API Key. Cópiala: empieza por gsk_ y no se vuelve a mostrar." },
      { n: "2.2", titulo: "Abrir Secrets", texto: "En Colab, barra lateral izquierda, en el ícono de llave." },
      { n: "2.4", titulo: "Nombrarla", texto: "En Name escribe exactamente GROQ_API_KEY. En Value pega tu llave." },
      { n: "2.6", titulo: "Dar acceso", texto: "Activa el interruptor Notebook access. Sin esto el notebook no la ve." },
      { n: "3-4", titulo: "Comprobar", texto: "Ejecuta los Pasos 3 y 4. Debe aparecer «Llave cargada correctamente»." },
    ], { y, cols: 3, alto: T.ALTO.dosFilasConDestaque, gap: 15.8 })), "Pasos de la llave");
  s.addNotes("Hazlo tú en vivo una vez, da 8 minutos y circula. Minuto 16: corta y pasa a modo simulado a quien no lo tenga.");
}

// ── 6 · Modo simulado ────────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 0 · PLAN B");
  const y = T.titulo(s, "Si no lo consigues, sigues igual", "El notebook detecta que falta la llave y activa un modo de respaldo");
  T.fin(T.destaqueTras(pres, s, "No te quedes atrás:",
    "ejecuta igual, sigue la sesión y resolvemos tu llave al final o durante el fin de semana.",
    T.tarjetas(pres, s, [
      { titulo: "Con llave", texto: "El modelo de lenguaje razona de verdad, elige la herramienta y encadena pasos. Es lo que necesitas para la tarea evaluada." },
      { titulo: "Modo simulado", texto: "Un agente de respaldo sin modelo: elige la herramienta por palabras clave. No razona, pero te deja hacer la clase completa." },
    ], { y, cols: 2, alto: T.ALTO.unaFila, numeradas: false, tamTitulo: 14 })), "Modo simulado");
}

// ── 7 · Divisor módulo 1 ─────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · EL PROBLEMA");
  T.divisor(pres, s, "El Modelo Solo No Basta", "Por qué hace falta darle herramientas",
    ["La prueba", "El motivo", "La consecuencia"]);
}

// ── 8 · LLM solo vs agente ───────────────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · LA PRUEBA");
  const y = T.titulo(s, "Le preguntamos la hora", "La misma pregunta, con y sin herramientas");
  T.fin(T.destaqueTras(pres, s, "La diferencia:", "el agente no sabe más — sabe cuándo preguntar.",
    T.tarjetas(pres, s, [
      { titulo: "Modelo de lenguaje solo", texto: "«No tengo acceso a la hora actual» — o peor: inventa una fecha.\n\nNo consulta nada. Todo lo que sabe viene de su entrenamiento, que terminó hace meses." },
      { titulo: "Agente con una herramienta", texto: "«Hoy es viernes 04-09-2026 y son las 10:15.»\n\nDecidió que necesitaba consultar, llamó a la función y respondió con el dato real." },
    ], { y, cols: 2, alto: T.ALTO.unaFila, numeradas: false, tamTitulo: 14 })), "LLM vs agente");
  s.addNotes("Pregunta a la sala qué les respondió ANTES de explicar. Que vean que no todos recibieron lo mismo: eso introduce el no-determinismo.");
}

// ── 9 · El código de la teoría cambió ────────────────────────────────────────
{
  const s = slide("MÓDULO 1 · AVISO TÉCNICO");
  const y = T.titulo(s, "El código de la teoría cambió", "LangChain 1.0 movió estas funciones a otro paquete");
  T.fin(T.destaqueTras(pres, s, "Por qué importa:",
    "en IA las librerías cambian cada pocos meses. Entiende qué hace cada pieza — el import se busca.",
    T.tabla(pres, s, ["Lo que dice la sesión teórica", "Lo que ejecuta hoy"], [
      ["from langchain.agents import initialize_agent, Tool", "from langchain_classic.agents import ..."],
      ["from langchain.memory import ConversationBufferMemory", "from langchain_classic.memory import ..."],
      ["from langchain.agents import AgentExecutor", "from langchain_classic.agents import ..."],
      ["Modelos llama-3.1  (retirados en agosto 2026)", "openai/gpt-oss-120b  y  openai/gpt-oss-20b"],
    ], [50, 50], { y })), "Código de la teoría");
  s.addNotes("Momento breve pero valioso. Los notebooks del taller ya usan la versión correcta: a ellos no les va a fallar nada.");
}

// ── 10 · Divisor módulo 2 ────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · HERRAMIENTAS");
  T.divisor(pres, s, "Qué Es una Herramienta", "Una función normal de Python con una etiqueta",
    ["El decorador", "La descripción", "La prueba"]);
}

// ── 11 · Anatomía de una herramienta ─────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · ANATOMÍA");
  const y = T.titulo(s, "Anatomía de una herramienta", "Tres partes, y la tercera es la que decide todo");
  T.fin(T.destaqueTras(pres, s, "Regla clave:",
    "el modelo nunca lee el código de la función — solo lee la descripción del punto (3).",
    T.codigo(pres, s, [
      [{ t: "from langchain_core.tools import tool" }, { t: "        # el decorador que la convierte en herramienta", c: C.gris }],
      [{ t: "" }],
      [{ t: "@tool" }, { t: "                                            # (1) la etiqueta", c: C.rojo }],
      [{ t: "def hora_actual() -> str:" }, { t: "                        # (2) el nombre que usa el agente", c: C.rojo }],
      [{ t: '    """Devuelve la fecha y la hora actual en Chile.' }],
      [{ t: '    Usala siempre que te pregunten que dia es o que hora es."""' }, { t: "   # (3)", c: C.rojo }],
      [{ t: "    ahora = datetime.now(ZoneInfo('America/Santiago'))" }],
      [{ t: "    return f'Hoy es {ahora:%A %d-%m-%Y} y son las {ahora:%H:%M}.'" }],
    ], { y, tam: 11.5, alto: 165.6 })), "Anatomía");
}

// ── 12 · El docstring es la interfaz ─────────────────────────────────────────
{
  const s = slide("MÓDULO 2 · LA DESCRIPCIÓN");
  const y = T.titulo(s, "La descripción es la interfaz", "Es lo único que el modelo ve de tu herramienta");
  T.fin(T.destaqueTras(pres, s, "Dicho de otro modo:",
    "esa frase es el contrato entre el lenguaje humano y tu código.",
    T.tarjetas(pres, s, [
      { titulo: "Descripción pobre", texto: "\"\"\"Devuelve datos.\"\"\"\n\nEl agente no tiene forma de saber cuándo usarla. La ignorará, o la usará donde no corresponde." },
      { titulo: "Descripción útil", texto: "\"\"\"Devuelve la hora actual en Chile. Úsala cuando pregunten qué hora es o si algo ya cerró.\"\"\"\n\nDice cuándo, no solo qué." },
    ], { y, cols: 2, alto: T.ALTO.unaFila, numeradas: false, tamTitulo: 14 })), "Docstring");
}

// ── 13 · Divisor módulo 3 ────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · EL AGENTE");
  T.divisor(pres, s, "Armar y Ejecutar", "Modelo + herramientas + instrucciones",
    ["Las cuatro piezas", "La traza", "Tu turno"]);
}

// ── 14 · Las cuatro piezas ───────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · CONSTRUCCIÓN");
  const y = T.titulo(s, "Las cuatro piezas del agente", "Es literalmente lo que dice el nombre de cada función");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "ChatPromptTemplate", texto: "Las instrucciones fijas del agente y los huecos que se rellenan en cada consulta." },
    { titulo: "ChatGroq", texto: "El modelo que razona. temperature=0 para que sea lo más predecible posible." },
    { titulo: "create_openai_tools_agent", texto: "El cerebro: sabe qué herramienta hace falta, pero no puede ejecutarla." },
    { titulo: "AgentExecutor", texto: "El motor: ejecuta el ciclo hasta terminar. verbose=True imprime la traza." },
  ], { y, cols: 4, alto: 208.8, gap: 15.8, tamTitulo: 11.5 }), "Cuatro piezas");
  s.addNotes("Señala los cuatro números en pantalla. No entres en el detalle del prompt.");
}

// ── 15 · Leer la traza ───────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · LA TRAZA");
  const y = T.titulo(s, "Cómo leer lo que aparece", "El agente pensando en voz alta: eso es el ciclo ReAct");
  T.fin(T.tabla(pres, s, ["Lo que dice la pantalla", "Lo que está pasando"], [
    ["> Entering new AgentExecutor chain...", "Arranca el ciclo"],
    ["Invoking: hora_actual", "ACCIÓN — el modelo decidió que necesita esa herramienta"],
    ["Hoy es viernes 04-09-2026 y son las 10:15.", "OBSERVACIÓN — el resultado real de ejecutar tu función"],
    ["En este momento son las 10:15 del viernes.", "RESPUESTA — ya tiene el dato y responde"],
    ["> Finished chain.", "Terminó"],
  ], [46, 54], { y }), "Leer la traza");
  s.addNotes("Léela en voz alta con ellos señalando en el proyector. Es el momento central de la sesión.");
}

// ── 16 · La idea clave ───────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · LA IDEA CLAVE");
  const y = T.titulo(s, "El modelo nunca ejecutó tu código", "Solo dijo qué función hacía falta");
  T.fin(T.tarjetas(pres, s, [
    { titulo: "Lo que hizo el modelo", texto: "Leyó la pregunta, leyó las descripciones de las herramientas disponibles y dijo: «necesito llamar a hora_actual»." },
    { titulo: "Lo que hizo tu programa", texto: "El AgentExecutor recibió esa decisión, ejecutó la función de verdad y le devolvió el resultado al modelo." },
    { titulo: "Por qué importa", texto: "Tú decides qué herramientas existen y qué puede hacer cada una. Esa separación es lo que hace que un agente se pueda controlar." },
  ], { y, cols: 3, alto: 208.8, numeradas: false, tamTitulo: 13.5 }), "Idea clave");
}

// ── 17 · Tu turno ────────────────────────────────────────────────────────────
{
  const s = slide("MÓDULO 3 · ACTIVACIÓN");
  const y = T.titulo(s, "Tu turno", "Paso 10 · una herramienta que consulta un catálogo real de 40 millones de libros");
  T.fin(T.tarjetas(pres, s, [
    { n: "10.1", titulo: "Catálogo real", texto: "buscar_libro consulta Open Library de verdad: autor, año y ediciones. Sin llave." },
    { n: "10.2", titulo: "Cámbiala", texto: "Otro título, otro número de resultados. Los datos que vuelven son reales." },
    { n: "10.2", titulo: "Rompe la descripción", texto: "Déjala vaga a propósito y observa si el agente sigue eligiéndola." },
    { n: "10.3", titulo: "Otra API", texto: "Wikipedia, mindicador.cl, feriados de Chile. Todas gratis y sin llave." },
  ], { y, cols: 4, alto: 208.8, gap: 15.8, tamTitulo: 12 }), "Tu turno");
  s.addNotes("Circula. Pregunta: ¿qué otra cosa le preguntarías tú a la biblioteca?");
}

// ── 18 · Cierre ──────────────────────────────────────────────────────────────
{
  n++;
  const s = T.base(pres);
  T.cierre(pres, s, {
    titulo: "Hasta el lunes",
    subtitulo: "Paso 11 · Archivo → Guardar una copia en Drive. Sin eso, pierdes todo lo de hoy.",
    bloques: [
      { titulo: "Lo que construiste hoy", texto: "Dos herramientas con @tool —el reloj real y un catálogo de 40 millones de libros— y la traza ReAct funcionando." },
      { titulo: "Lo que viene el lunes", texto: "Varias herramientas a la vez, encadenamiento de pasos, memoria conversacional y límites de seguridad." },
      { titulo: "Antes del lunes", texto: "Si trabajaste en modo simulado, resuelve tu llave de Groq. El lunes la vas a necesitar sí o sí." },
    ],
  });
}

pres.writeFile({ fileName: "../Taller_Practico_1.pptx" }).then((f) => console.log("✅ Generado:", f, "·", n, "diapositivas"));
