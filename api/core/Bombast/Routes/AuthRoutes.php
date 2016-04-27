<?php
namespace Bombast\Routes;

use Bombast\Auth\Provider as Auth;

class AuthRoutes {
    public static function userAuth($request, $response) {
        global $app;
        $response = $response->withHeader('Content-type', 'application/json');
        $data = $request->getParsedBody();
        
        $email = $data['email'];
        $password = $data['password'];
        
        $email = trim(strtolower($email));
        
        $result = Auth::confirmuser($email, $password);
        if($result->statusCode != 0) {
            echo('{"code":401, "message":"Bad Credentials"}');
            return $response->withStatus(401);
        }
        
        echo(json_encode(array(
                'token' => Auth::createToken(array('userId' => $result->user['userId'])),
                'user' => $result->user
        )));
        return $response;
    }
}