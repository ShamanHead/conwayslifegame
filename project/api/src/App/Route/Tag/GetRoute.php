<?php

namespace App\Route\Tag;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Response\JSON;

class GetRoute extends \App\Route\Route {
    protected string $path = "/tag/get/{id}";
    protected string $method = "get";

    #[OA\Get(
        path: '/tag/get/{id}',
        responses: [
            new OA\Response(response: 200, description: 'Return tag'),
            new OA\Response(response: 404, description: 'Tag not found')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $DBH = \App\Config\Config::get('DBH');

        $getQuery = $DBH->prepare(
            "
            SELECT t.name FROM `tags` AS t WHERE t.id = ?  
            "
        );

        $getQuery->execute([$args["id"]]);

        $body = $getQuery->fetch(\PDO::FETCH_ASSOC);

        if(is_countable($body) && count($body) > 0) {
            $response->getBody()->write(JSON::generate(200, $body));
        } else {
            $response->getBody()->write(JSON::generate(404, "Pattern not found"));
        }

        return $response; 
    }
}
