<?php

namespace App\Response;

class JSON {
    
    /**
     * Generates json response
     *
     * @param int $code Response Code
     * @param array $data Data that would be contained in response
     *
     * @return string Response encoded in JSON
     */
    public static function generate(int $code, array|string $data) : string 
    {
        return json_encode(
            [
                'code' => $code,
                'data' => $data
            ]
        );
    }

}
