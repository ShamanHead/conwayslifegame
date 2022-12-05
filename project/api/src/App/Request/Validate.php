<?php

namespace App\Request;

use Psr\Http\Message\ServerRequestInterface as Request;
use App\Response\JSON;

class Validate {

    /**
     * Validates body and params entry
     *
     * @param array $params Params that would be validates
     *
     * @return array|bool Returns Request if all good or error array if something went wrong 
     */
    public static function params(BodyType $bodyType, array $params, Request $request) : Request|string
    {
        $bodyCheck = true;

        $contentType = $request->getHeaderLine('Content-Type');

        if($bodyType !== BodyType::default) {
            switch($bodyType) {
                case BodyType::JSON:
                    if (strstr($contentType, 'application/json')) {
                        $contents = json_decode(file_get_contents('php://input'), true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $request = $request->withParsedBody($contents);
                        } else {
                            $bodyCheck = false;
                        }
                    } 
                    break;
            }
        }

        if(!$bodyCheck) return JSON::generate(500, "Body incorrect"); 

        if(!empty($params)) {
            switch($bodyType) {
                case BodyType::JSON:
                    $body = json_decode($request->getBody()->getContents(), 1);
                    foreach($params as $p) {
                        if(!isset($body[$p])) {
                            return JSON::generate(500, "Required {$p} parameter is missing"); 
                            break;
                        }
                    }
                    break;
            }
        } 

        return $request; 
    }
}
