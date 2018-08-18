import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from '../../client/templates/html.jsx';

export function main(req, res) {
  return res.send(renderToString(<Html />));
}

export default { main };
