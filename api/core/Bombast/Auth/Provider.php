<?php

namespace Bombast\Auth;

class Provider {
    public static function hashPassword($password, $salt = '') {
        $composite = $salt . $password;
        return sha1( $composite );
    }
}