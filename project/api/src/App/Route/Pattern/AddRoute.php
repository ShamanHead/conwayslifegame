<?php

namespace App\Route\Pattern;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use OpenApi\Attributes as OA;
use App\Request\BodyType;
use App\Response\JSON;

class AddRoute extends \App\Route\Route {
    protected string $path = "/pattern/add";
    protected string $method = "post";
    protected BodyType $bodyType = BodyType::JSON;
    protected array $args = 
        [
            'name', 'contents'
        ];

    #[OA\Get(
        path: '/pattern/add',
        responses: [
            new OA\Response(response: 200, description: 'Adds new pattern'),
            new OA\Response(response: 500, description: 'Something went wrong')
        ]
    )]

    public function run(Request $request, Response $response, $args) { 
        $body = json_decode($request->getBody()->getContents(), 1); 

        $DBH = \App\Config\Config::get('DBH');

        $addNewQuery = $DBH->prepare("INSERT INTO patterns (name, content) VALUES (?,?)");
        
        $addNewQuery->bindValue(1, $body['name']);
        $addNewQuery->bindValue(2, $body['contents']);

        $addNewQuery->execute();

        $response->getBody()->write(JSON::generate(200, "OK"));

        return $response; 
    }
}
