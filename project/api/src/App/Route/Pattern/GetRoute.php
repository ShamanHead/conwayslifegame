<?php

namespace App\Route\Pattern;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Response\JSON;

class GetRoute extends \App\Route\Route {
    protected string $path = "/pattern/get/{id}";
    protected string $method = "get";

    #[OA\Get(
        path: '/pattern/get/{id}',
        responses: [
            new OA\Response(response: 200, description: 'Return pattern'),
            new OA\Response(response: 404, description: 'Pattern not found')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $DBH = \App\Config\Config::get('DBH');

        $getQuery = $DBH->prepare(
            "
            SELECT p.name, p.content 
            FROM `patterns` AS p    
            WHERE p.id = ?
            "
        );

        $getQuery->execute([$args["id"]]);

        $body = $getQuery->fetch(\PDO::FETCH_ASSOC);

        if(is_countable($body) && count($body) > 0) {
            $tagsQuery = $DBH->prepare(
                "
                SELECT t.name 
                FROM tags_to_patterns AS tp
                JOIN tags AS t
                ON t.id = tp.tag_id
                WHERE tp.pattern_id = ?
                "
                );

            $tagsQuery->execute([$args["id"]]);
                
            $tagsArray = $tagsQuery->fetchAll(\PDO::FETCH_ASSOC);

            if(count($tagsArray) > 0) $body["tags"] = $tagsArray;

            $response->getBody()->write(JSON::generate(200, $body));
        } else {
            $response->getBody()->write(JSON::generate(404, "Pattern not found"));
        }

        return $response; 
    }
}
