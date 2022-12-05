<?php

namespace App\Route\Pattern;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Response\JSON;

class GetAllRoute extends \App\Route\Route {
    protected string $path = "/pattern/search";
    protected string $method = "get";

    #[OA\Get(
        path: '/pattern/search',
        responses: [
            new OA\Response(response: 200, description: 'Return all patterns'),
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $DBH = \App\Config\Config::get('DBH'); 

        $getByNameQuery = $DBH->prepare("SELECT p.id, p.name, p.content FROM patterns AS p");

        $getByNameQuery->execute();

        $patterns = $getByNameQuery->fetchAll(\PDO::FETCH_ASSOC);

        if(is_countable($patterns) && count($patterns) > 0) {
            for($i = 0;$i < count($patterns);$i++) {
                $p = $patterns[$i];

                $tagsQuery = $DBH->prepare(
                    "
                    SELECT t.id, t.name, t.hex 
                    FROM tags_to_patterns AS tp
                    JOIN tags AS t
                    ON t.id = tp.tag_id
                    WHERE tp.pattern_id = ?
                    "
                    );

                $tagsQuery->execute([$p["id"]]);
                    
                $tagsArray = $tagsQuery->fetchAll(\PDO::FETCH_ASSOC);

                if(count($tagsArray) > 0) {
                    $patterns[$i]['tags'] = $tagsArray;
                } else {
                    $patterns[$i]['tags'] = [];
                }
            }
        }

        $response->getBody()->write(JSON::generate(200, $patterns));

        return $response;    
    }
}
