const react = require('react');
import { renderToString } from 'react-dom/server';

const html = ({body, title}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <link href="/css/style.css" type="text/css" rel="stylesheet">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      </head>

      <body>
        <div class="app">${body}</div>

        <script type="text/javascript" src="/js/bundle.js"></script>
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
