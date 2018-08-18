import React from 'react';

export default function Html(params = {}) {
  let { store } = params;

  store = store instanceof Object ? store : {};

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{params.title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>

      <body>
        <div id="root">{params.content}</div>
        <script id="store" type="text/plain" data-json={JSON.stringify(store)}></script>
        <script src="index.js"></script>
      </body>
    </html>
  );
}
