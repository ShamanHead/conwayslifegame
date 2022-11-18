<?php

namespace App\Config;

class Config {
    static $configuration = [];

    public static function get(?string $key = null) : mixed 
    {
        if($key ?? false) {
            return self::$configuration[$key];
        }

        return self::$configuration;
    }

    public static function add(string $key, mixed $value) : void
    {
        self::$configuration[$key] = $value;
    }

    public static function set($configuration) : array 
    {
        self::$configuration = $configuration;

        return self::$configuration;
    }
}
