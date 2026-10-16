# Pre-trabajo: tu llave de Groq (10 minutos)

**Curso de IA Aplicando Agentes · Sistema de Bibliotecas DUOC UC**

Los talleres se hacen en **Google Colab**, dentro del navegador: no instalas nada. Lo único
que necesitas traer listo es una **llave de API** gratuita que le permite a tu notebook usar
el modelo de lenguaje. **No pide tarjeta de crédito.**

Necesitas: una cuenta de Google (la misma de Colab) y un computador. En el celular no se puede trabajar.

---

## 1 · Crea la llave de Groq (5 min) — obligatorio

1. Entra a **[console.groq.com](https://console.groq.com/)** y crea tu cuenta (puedes entrar con Google).
2. Menú izquierdo → **API Keys** → **Create API Key**. Ponle cualquier nombre, por ejemplo `taller-agentes`.
3. **Cópiala en ese momento**: empieza por `gsk_` y no se vuelve a mostrar. Si la pierdes, creas otra.

> 🔒 **Es tuya y no se comparte.** El cupo gratuito es por cuenta: si dos personas usan la
> misma llave, se quedan las dos sin cupo.

## 2 · (Opcional) Crea la llave de respaldo de Gemini (3 min)

Si Groq falla o se te acaba el cupo, el notebook pasa solo a Gemini. Es gratis y sin tarjeta.

1. Entra a **[aistudio.google.com/apikey](https://aistudio.google.com/apikey)** con tu cuenta de Google.
2. **Create API key** y cópiala.

## 3 · Guárdalas en Colab (3 min)

1. Abre el notebook del Taller 1 (el enlace llega por correo / AVA).
2. Barra lateral izquierda → ícono de **llave 🔑** (*Secrets*) → **Add new secret**.
3. **Name:** `GROQ_API_KEY` (exacto, mayúsculas y guion bajo) · **Value:** tu llave `gsk_...`
4. ⚠️ **Activa el interruptor *Notebook access*.** Es el paso que más se olvida: sin él, el notebook no ve la llave.
5. Si creaste la de Gemini, repite con **Name:** `GOOGLE_API_KEY`.

## 4 · Comprueba

En el notebook del Taller 1 ejecuta los **Pasos 1, 2 y 3** (`Shift + Enter` en cada celda).
Estás listo si ves:

```
GROQ_API_KEY  : ✅ encontrada
✅ Conectado a groq · openai/gpt-oss-120b
```

---

## Si algo falla

| Lo que ves | Qué pasó | Solución |
|---|---|---|
| `GROQ_API_KEY : ❌ no encontrada` | El interruptor *Notebook access* está apagado | Actívalo y re-ejecuta el Paso 2 |
| Lo mismo, con el interruptor encendido | El nombre está mal escrito | Exactamente `GROQ_API_KEY` |
| `no respondió (AuthenticationError)` | La llave se copió mal | Cópiala de nuevo, sin espacios |
| `🟡 MODO SIMULADO` | Ningún proveedor respondió | Revisa lo anterior; si no se arregla, ven igual |
| Aviso *«This notebook was not authored by Google»* | El notebook viene de GitHub | Normal: **Run anyway** |

**Si no lo logras, ven igual.** El notebook tiene un modo simulado para que sigas la clase, y lo resolvemos al inicio.

## Preguntas frecuentes

**¿Qué nivel de Python necesito?** Básico-intermedio: funciones, diccionarios, `if`, `try/except`, f-strings. En los talleres escribirás funciones cortas.

**¿Tiene costo?** No. Los planes gratuitos de Groq y Gemini cubren de sobra los dos talleres.

**¿Se guarda mi llave en el notebook?** No. Vive en los Secrets de tu cuenta de Colab; puedes compartir el notebook sin exponerla.
