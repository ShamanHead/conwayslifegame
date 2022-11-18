<?php

namespace App\Route;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;

class DocsRoute extends Route {
    protected string $path = "/docs";
    protected string $method = "get";
    
    #[OA\Get(
        path: '/docs',
        responses: [
            new OA\Response(response: 200, description: 'Returns documentation in swagger'),
        ]
    )]

    public function run(Request $request, Response $response, $args) {
        $openapi = \OpenApi\Generator::scan([dirname(__DIR__) . "/../"]);

        file_put_contents( __DIR__ . "/../../public/openapi.yaml", $openapi->toYaml() );
 
        ob_start();

        ?>
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta
                name="description"
                content="SwaggerUI"
              />
              <title>SwaggerUI</title>
              <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
            </head>
            <body>
            <div id="swagger-ui"></div>
            <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
            <script>
              window.onload = () => {
                window.ui = SwaggerUIBundle({
                url: 'http://localhost:81/openapi.yaml',
                  dom_id: '#swagger-ui',
                });
              };
            </script>
            </body>
            </html>
        <?php

        $response->getBody()->write(ob_get_clean()); 

        return $response; 
    }
}
