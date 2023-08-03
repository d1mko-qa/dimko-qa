// This file was automatically added by edgio deploy.
// You should commit this file to source control.
import { nextRoutes } from '@edgio/next'
import { Router } from '@edgio/core/router'

export default new Router().get('/some-route/:someParam', ({compute}) => {
  compute((req, res) => {
    console.error("Something wong!");
    // Here you can access the following information about the request:
    // ================================================================

    // To get the request path and query string
    const url = req.url; // e.g /some/path?foo=bar

    // To get the request body as a string
    const body = req.body;

    // To get the request method:
    const method = req.method;

    // To get the headers sent from the browser:
    const headers = req.getHeaders(); // keys are always lower-case

    // To get the value of a specific request header:
    const someHeader = req.getHeader('some-header'); // the header name is case-insensitive

    // To check if https was used
    const isHttps = req.secure;

    // To access query parameters
    const {id, name} = req.query; // for example if the query string is ?id=1&name=Mark

    // To access path parameters:
    const {someParam} = req.params;

    // To specify the response:
    // ================================================================

    // To set a response header:
    res.setHeader('content-type', 'application/json');

    // To set the response body, use:
    res.body = 'some string';

    // To set the response status:
    res.statusCode = 200;
    res.statusMessage = 'OK';
  });
})
  // NextRoutes automatically adds routes for all Next.js pages and their assets
  .use(nextRoutes)
  .match('/edgio-api/:path*', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-api/:path*',
          syntax: 'path-to-regexp',
          destination: '/:path*',
        },
      ],
    },
    origin: { set_origin: 'api' },
  })
  .match('/edgio-opt', {
    caching: { max_age: '86400s', stale_while_revalidate: '31536000s', bypass_client_cache: true },
    url: {
      url_rewrite: [
        {
          source: '/edgio-opt:optionalSlash(\\/?)?:optionalQuery(\\?.*)?',
          syntax: 'path-to-regexp',
          destination: '/:optionalSlash:optionalQuery',
        },
      ],
    },
    origin: { set_origin: 'image' },
  })
