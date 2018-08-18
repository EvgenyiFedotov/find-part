import React from 'react';

export default function (params = {}) {
  let { data } = params;

  data = data instanceof Object ? data : {};

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{params.title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
      </head>

      <body>
        TEST
        <div id="root">{params.content}</div>
        <script id="initial-data" type="text/plain" data-json={JSON.stringify(data)}></script>
        {/* <script src="index.js"></script> */}
      </body>
    </html>
  );
}
