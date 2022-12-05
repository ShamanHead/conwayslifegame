<?php

namespace App\Route\Tag;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Request\BodyType;
use App\Response\JSON;

class AddRoute extends \App\Route\Route {
    protected string $path = "/tag/add";
    protected string $method = "post";
    protected BodyType $bodyType = BodyType::JSON;
    protected array $args = 
        [
            'name'
        ];

    #[OA\Get(
        path: '/tag/add',
        responses: [
            new OA\Response(response: 200, description: 'Adds new pattern'),
            new OA\Response(response: 500, description: 'Something went wrong')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $body = json_decode($request->getBody()->getContents(), 1); 

        $DBH = \App\Config\Config::get('DBH');

        $addNewQuery = $DBH->prepare("INSERT INTO tags (name, hex) VALUES (?,?)");

        $hex = str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);

        $addNewQuery->execute([$body['name'], $hex]);

        $response->getBody()->write(JSON::generate(200, "OK"));

        return $response;    
    }
}
