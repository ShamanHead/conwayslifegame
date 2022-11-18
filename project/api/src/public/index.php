<?php
use Slim\Factory\AppFactory;
use App\Config\Config;
use App\Route\Register;

require __DIR__ . '/../../vendor/autoload.php';

$config = Config::set(
    [
        'DBH' => new \PDO("mysql:host=database;dbname=lifeproject", 'root', '3313')
    ]
);

$config['DBH']->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

$app = AppFactory::create();

$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

Register::init($app);

$app->run();
