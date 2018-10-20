const react = require('react');
import { renderToString } from 'react-dom/server';

const html = ({body, title}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>{title}</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link href="/css/style.css" type="text/css" rel="stylesheet">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      </head>

      <body>
        ${body}

        <script type="text/javascript" src="/js/bundle.js">
      </body>
    </html>
  `;
};

function render(req, res, next) {
  const body = renderToString(res.locals.content);
  const title = res.locals.title;

  res.write(
    html({ body, title })
  );
  res.end();
}

module.exports = {
  render: render
}
