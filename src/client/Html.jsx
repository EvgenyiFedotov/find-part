/**
 * @param {String} title
 * @param {String} content
 * @param {String} store
 */
export default function Html({ content, stateStore, title }) {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title || ''}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>

      <body>
        <div id="root">${content}</div>
        <script id="stateStore" type="text/plain" data-json='${JSON.stringify(stateStore || null)}'></script>
        <script src="index.js"></script>
      </body>
    </html>
  `;
}
