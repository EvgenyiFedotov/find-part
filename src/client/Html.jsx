/**
 * @param {String} title
 * @param {String} content
 * @param {String} defStore
 */
export default function Html({
  content,
  defStore,
  title,
  css = '',
}) {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title || ''}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>

      <body style="padding: 0; margin: 0;">
        <div id="root">${content}</div>
        <style id="jss-server-side">${css}</style>
        <script id="defStore" type="text/plain" data-json='${JSON.stringify(defStore || null)}'></script>
        <script src="index.js"></script>
      </body>
    </html>
  `;
}
