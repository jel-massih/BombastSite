<?php
include_once('db.php');

$loader = require 'vendor/autoload.php';
$loader->add('Bombast\\', __DIR__.'/core/');

require dirname(__FILE__) . '/config.php';

$app = new \Slim\App();

$c = $app->getContainer();
$c['errorHandler'] = function ($c) {
    return function ($request, $response, $e) {
        throw $e;
    };
};

$app->post('/tryRegister', '\\Bombast\\Routes\\AccountRoutes:tryRegister');
$app->post('/sessions/create', '\\Bombast\\Routes\\AccountRoutes:tryLogin');

$app->run();