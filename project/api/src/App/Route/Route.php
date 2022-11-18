<?php

namespace App\Route;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

abstract class Route {
    protected string $method;
    protected string $path;

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
}
