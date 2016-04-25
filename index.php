<?

$loader = require 'api/vendor/autoload.php';
$loader->add('Bombast\\', dirname(__FILE__).'/api/core/');

require 'api/api.php';