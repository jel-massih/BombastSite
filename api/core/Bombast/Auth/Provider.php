<?php

namespace Bombast\Auth;

use \Firebase\JWT\JWT;

class Provider {
    const SALT_BYTES = 24;
    const JWT_TOKEN_BYTES = 32;
    const TOKEN_EXPIRE_HOURS = 5;
    
    public static $SESSION_KEY = "auth_user";
    
    public static function generateSalt() {
        $salt = base64_encode(mcrypt_create_iv(self::SALT_BYTES, MCRYPT_DEV_URANDOM));
	    return $salt;
    }
    
    public static function generateHash($password, $salt = '') {
        $composite = $salt . $password;
        return sha1( $composite );
    }
    
    public static function getAuthInfo($email) {
        global $db_link;
	
        if($q = $db_link->prepare("SELECT password, salt, id FROM bombast_accounts WHERE email = ?"))
        {
            $q->bind_param('s', $email);
            $q->execute();
            $q->bind_result($password, $salt, $userId);
            while($q->fetch()) {
                return array('password' => $password, 'salt' => $salt, 'userId' => $userId);
            }
        }
        
        return -1;
    }
    
    public static function loggedIn() {
        if(php_sapi_name() != 'cli' && session_id() === "") {
            session_start();
        }
        
        return isset($_SESSION[self::$SESSION_KEY]) && !empty($_SESSION[self::$SESSION_KEY]);
    }
    
    public static function createToken($data) {
        $issuedAt = time();
        $tokenId = base64_encode(mcrypt_create_iv(self::JWT_TOKEN_BYTES));
        $notBefore = $issuedAt;
        $expire = $notBefore + (60*60*self::TOKEN_EXPIRE_HOURS);
        
        $token = array(
            'iss' => 'BombastSite',
            'iat' => $issuedAt,
            'nbf' => $notBefore,
            'exp' => $expire,
            'jti' => $tokenId,
            'data' => $data
        );
        
        $secretKey = base64_decode(JWT_SECRET_KEY);
        
        $jwt = JWT::encode(
            $token,
            $secretKey
        );
        
        $unencodedArray = ['jwt' => $jwt];
        return json_encode($unencodedArray);
    }
}