# Implementación del lector de Markdown

Esta guía explica, paso a paso, los cambios necesarios para mostrar las respuestas de Gemini con formato Markdown en la interfaz del chat.

## 1. Reemplazar el `textarea` de respuesta

Un `<textarea>` muestra texto plano: aunque su contenido incluya sintaxis Markdown, no convierte `# Título`, `**negrita**`, listas o bloques de código a elementos visuales formateados.

Por eso, se conserva el campo de texto para escribir la consulta, pero el área de respuesta se reemplaza por un contenedor HTML que puede renderizar componentes de React.

## 2. Instalar el renderizador

Se agrega [`react-markdown`](./package.json) como dependencia:

```bash
npm install react-markdown
```

La librería transforma la cadena Markdown en elementos React. No hace falta convertir la respuesta manualmente a HTML ni habilitar el procesamiento de HTML crudo.

## 3. Guardar la respuesta en el estado de React

En [`src/components/ChatApp.jsx`](./src/components/ChatApp.jsx) se incorpora el estado `responseText`. Cuando Gemini devuelve el resultado, este se guarda con `setResponseText(interaction.output_text)`.

Antes de enviar una consulta nueva, se limpia la respuesta anterior. De esta manera, no queda visible una respuesta vieja mientras se genera la siguiente.

El flujo es:

1. El usuario escribe una consulta en el input.
2. El formulario llama a `chatBot`.
3. La función solicita una respuesta a Gemini.
4. El texto devuelto se guarda en `responseText`.
5. El estado se pasa a `FormChatApp` como propiedad.

También se pasa la propiedad `loading`, que permite mostrar el estado de espera en el mismo visor.

## 4. Renderizar Markdown en el formulario

En [`src/components/FormChatApp.jsx`](./src/components/FormChatApp.jsx) se importa `ReactMarkdown` y se reemplaza el `textarea` de respuesta por un `<div>`.

El visor muestra tres estados:

- Mientras se genera una respuesta: “Pensando...”.
- Cuando hay una respuesta: `<ReactMarkdown>{responseText}</ReactMarkdown>`.
- Antes de recibir una respuesta: un texto indicativo.

El contenedor incluye `role="region"`, un nombre accesible y `aria-live="polite"` para que los lectores de pantalla puedan identificar y anunciar la actualización del área.

## 5. Estilizar el área de lectura

En [`src/index.css`](./src/index.css) la clase `.markdown-output` define el alto mínimo y máximo, el desplazamiento vertical y los colores del visor.

También se agregan estilos para los bloques `<pre>` y el contenido `<code>`, de modo que los ejemplos de código se distingan del resto de la respuesta y puedan desplazarse horizontalmente si son extensos.

## 6. Verificar los cambios

Desde la raíz del proyecto, ejecutar:

```bash
npm run build
npm run lint
```

El build verifica que la aplicación pueda compilar con la nueva dependencia. El lint revisa el código según las reglas del proyecto. Si el lint informa errores en archivos que no forman parte de esta implementación, se deben distinguir de los cambios del visor antes de corregirlos.

## Archivos involucrados

- [`package.json`](./package.json): dependencia `react-markdown`.
- [`src/components/ChatApp.jsx`](./src/components/ChatApp.jsx): estado y obtención de la respuesta.
- [`src/components/FormChatApp.jsx`](./src/components/FormChatApp.jsx): visor que interpreta Markdown y estados de carga/vacío.
- [`src/index.css`](./src/index.css): estilos del área de lectura y del código.
