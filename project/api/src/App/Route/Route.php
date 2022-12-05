<?php

namespace App\Route;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Request\BodyType;

abstract class Route {
    protected string $method;
    protected string $path;
    protected array $args = [];
    protected BodyType $bodyType = BodyType::default; 

    public function run(Request $request, Response $response, $args) {
        $response->getBody()->write("This response is test one, please rewrite this method");

        return $response;
    }

    public function getMethod () : string
    {
        return $this->method;
    }

    public function getPath () : string 
    {
        return $this->path;
    }

    public function getBodyType() : BodyType
    {
        return $this->bodyType;
    }

    public function getArgs() : array 
    {
        return $this->args;
    }
}
