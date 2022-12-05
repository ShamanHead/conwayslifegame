<?php

namespace App\Route\Pattern;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Response\JSON;

class SearchRoute extends \App\Route\Route {
    protected string $path = "/pattern/search/{s}";
    protected string $method = "get";

    #[OA\Get(
        path: '/pattern/search/{s}',
        responses: [
            new OA\Response(response: 200, description: 'Some patterns that would be found'),
            new OA\Response(response: 404, description: 'There is no such patterns for search prompt')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $DBH = \App\Config\Config::get('DBH'); 

        $requestString = str_replace(" ", "|", $args['s']);

        $getByNameQuery = $DBH->prepare("SELECT p.id, p.name FROM patterns AS p WHERE p.name REGEXP (?)");

        $getByNameQuery->execute([$requestString]);

        $patterns = $getByNameQuery->fetchAll(\PDO::FETCH_ASSOC);

        $response->getBody()->write(JSON::generate(200, $patterns));

        return $response;    
    }
}
