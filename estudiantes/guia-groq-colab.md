# Antes del taller: tu llave de Groq (10 minutos)

No necesitas instalar nada en tu computador. Todo el taller ocurre en **Google Colab**,
que funciona dentro del navegador.

Lo único que sí necesitas es una **llave de API** (una contraseña larga) que le permite a
tu notebook hablar con el modelo de lenguaje. Es **gratis** y **no pide tarjeta de crédito**.

Si haces esto en tu casa, el viernes llegas listo y aprovechas la hora completa.

---

## Paso 1 · Crear la cuenta y la llave (5 min)

*Es el **Paso 1** del notebook `01_Taller_Practico_1.ipynb`, por si prefieres seguirlo allí.*

1. Entra a **[console.groq.com](https://console.groq.com/)**
2. Crea tu cuenta (puedes usar tu correo de Google).
3. En el menú de la izquierda, entra a **API Keys**.
4. Botón **Create API Key**. Ponle cualquier nombre, por ejemplo `taller-biblioteca`.
5. **Cópiala en ese momento.** Empieza por `gsk_`. No se vuelve a mostrar: si la
   pierdes, simplemente creas otra.

Pégala mientras tanto en un bloc de notas.

> **Es tuya y no se comparte.** El límite de uso gratuito va por cuenta. Si dos personas
> usan la misma llave, se quedan las dos sin cupo el mismo día.

---

## Paso 2 · Guardarla en Google Colab (5 min)

*Es el **Paso 2** del notebook.*

Aquí es donde se equivoca casi todo el mundo. Son dos acciones, no una.

1. Abre el notebook del taller en Colab.
2. En la **barra lateral izquierda**, busca el ícono de **llave 🔑** (`Secrets`).
3. Clic en **Add new secret** (o *Añadir secreto nuevo*).
4. En **Name** escribe exactamente esto, en mayúsculas y con guiones bajos:

   ```
   GROQ_API_KEY
   ```

5. En **Value** pega tu llave (la que empieza por `gsk_`).
6. ⚠️ **Activa el interruptor de la izquierda, el de "Notebook access".**

**Ese último paso es el crítico.** Guardar el secreto no basta: si el interruptor está
apagado, el notebook no puede leerlo y verás el error `Falta GROQ_API_KEY`. Es el problema
número uno de la primera sesión.

---

## Paso 3 · Comprobar que funciona

*Son los **Pasos 3 y 4** del notebook.*

Abre el notebook `01_Taller_Practico_1.ipynb` y ejecuta las celdas de los **Pasos 3 y 4**
(con el botón ▶ de la izquierda, o `Shift + Enter`). Las celdas llevan `▶ PASO N` escrito
en su primera línea, así que son fáciles de encontrar.

Si ves esto, estás listo:

```
✅ Llave cargada correctamente. Modelo: openai/gpt-oss-120b
```

---

## Si algo falla

| Lo que ves | Qué pasó | Solución |
|---|---|---|
| `Falta GROQ_API_KEY` | El interruptor de acceso está apagado | Vuelve al Paso 2.6 |
| `Falta GROQ_API_KEY` y el interruptor está encendido | El nombre está mal escrito | Debe ser exactamente `GROQ_API_KEY`, sin espacios |
| `AuthenticationError` | La llave se copió mal | Cópiala de nuevo, sin espacios ni comillas |
| `429` o `rate limit` | Se acabó tu cupo del día | Espera, o avísale al docente |
| No encuentro el ícono de llave | Estás en la vista de móvil | Ábrelo en un computador |

**Si no lo logras, ven igual.** El notebook trae un **modo simulado**: lo activa solo el
Paso 4 si no encuentra la llave, y puedes seguir la sesión completa. Lo resolvemos en clase.

---

## Preguntas frecuentes

**¿Tengo que saber programar?**
No. Vas a leer código y cambiar palabras dentro de él. Todo lo que hay que ejecutar ya
está escrito, y el notebook va numerado paso a paso: solo tienes que seguir el orden.

**¿Esto tiene algún costo?**
No. La capa gratuita de Groq no pide tarjeta y el cupo diario es muy superior a lo que
usa el taller.

**¿Se guarda lo que escribo?**
Colab guarda tu copia del notebook en tu Google Drive. Tu llave vive en los Secrets de
tu cuenta y no queda escrita dentro del notebook, así que puedes compartirlo sin riesgo.

**¿Puedo usar mi celular?**
Para seguir la clase sí, para trabajar no. Necesitas un computador.
