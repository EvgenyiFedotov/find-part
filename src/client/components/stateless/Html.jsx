/**
 * @param {String} content
 * @param {String} store
 */
export default function Html(content, store) {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{params.title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>

      <body>
        <div id="root">${content}</div>
        <script id="store" type="text/plain" data-json='${store}'></script>
        <script src="index.js"></script>
      </body>
    </html>
  `;
}
