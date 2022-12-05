<?php

namespace App\Route;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Request\Validate;
use App\Request\BodyType;

class Register {

    /**
     * Searches for some namespaces recursively
     *
     * @param string $dir (optional) Dir in what would search
     * @param array $ignoreNamespaces (optional) Namespaces to ignore when searching
     *
     * @return array List of found namespaces
     */
    public static function recursiveSearch(
        string $dir = __DIR__, 
        array $ignoreNamespaces = []
    ) : array
    {
        $content = array_slice(scandir($dir), 2);
        $classes = [];
        foreach($content as $c) {
            $recursiveClasses = [];
    
            $recursiveDir = "${dir}/${c}";
    
            if(is_dir($recursiveDir) && is_readable($recursiveDir)) {
                $recursiveClasses = self::recursiveSearch($recursiveDir);
            } else {
                $regexDir = str_replace("/", "\\", 
                    preg_replace('/.+[\/\\\]Route[\/\\\]*/', '', $dir) 
                    . "\\"
                );

                if($regexDir == '\\') $regexDir = ""; 

                $regexClass = $regexDir 
                    . str_replace('.php', '', $c);

                if(!in_array($regexClass, $ignoreNamespaces)) $classes[] = $regexClass;
            }
    
            $classes = array_merge($classes, $recursiveClasses);
        }
    
        return $classes;
    }
    
    /**
     * Initiating route registering
     *
     * @param \Slim\App $app Slim app instance
     *
     * @return void
     */
    public static function init(\Slim\App $app)
    {
        $routes = self::recursiveSearch(dirname(__DIR__) . "/Route", ['Register', 'Route']);

        foreach($routes as $r) {
            $r = "App\Route\\{$r}";

            $object = new $r;

            $app->{$object->getMethod()}(
                $object->getPath(),
                function (Request $request, Response $response, $args) 
                    use ($object) {

                    $validate = Validate::params($object->getBodyType(), $object->getArgs(), $request);

                    if(gettype($validate) === "string") {
                        $response->getBody()->write($validate);

                        return $response;
                    } else {
                        return $object->run($validate, $response, $args);
                    }
                }
            );
        }
    }

}
