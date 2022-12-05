<?php

namespace App\Route\Tag;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Response\JSON;

class GetAllRoute extends \App\Route\Route {
    protected string $path = "/tag/get";
    protected string $method = "get";

    #[OA\Get(
        path: '/tag/get',
        responses: [
            new OA\Response(response: 200, description: 'Return all tags')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $DBH = \App\Config\Config::get('DBH');

        $getQuery = $DBH->prepare(
            "
            SELECT t.id, t.name, t.hex FROM `tags` AS t  
            "
        );

        $getQuery->execute();

        $body = $getQuery->fetchAll(\PDO::FETCH_ASSOC);
        
        $response->getBody()->write(JSON::generate(200, $body));

        return $response; 
    }
}
