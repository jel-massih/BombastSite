<?php

namespace Bombast\Auth;

class Provider {
    const SALT_BYTES = 24;
    
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
	
        if($q = $db_link->prepare("SELECT password, salt FROM bombast_accounts WHERE email = ?"))
        {
            $q->bind_param('s', $email);
            $q->execute();
            $q->bind_result($password, $salt);
            while($q->fetch()) {
                return array('password' => $password, 'salt' => $salt);
            }
        }
        
        return -1;
    }
}