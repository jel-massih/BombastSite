<?php
namespace Bombast\Routes;

use Bombast\Auth\Provider as Auth;

class AccountRoutes {
    const ACCOUNT_REGISTER_SUCCESS = 0;
    const ACCOUNT_INVALID_EMAIL = 1;
    const ACCOUNT_EMAIL_TAKEN = 2;
    const ACCOUNT_INVALID_PASSWORD = 3;
    const ACCOUNT_DB_WRITE_FAIL = 4;
    const ACCOUNT_USERNAME_TAKEN = 5;
    
    public static function tryRegister($request) {
        $data = $request->getParsedBody();
        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        
        if(empty($username) || empty($password) || empty($email)) {
            echo('{"error":{"text":"Please Fill in All Fields"}}');
            return;
        }
        
        $email = trim(strtolower($email));
        
        $salt = uniqid();
        
        $errorCode = self::dbRegister($username, $email, $password, $salt);
        switch($errorCode) {
            case self::ACCOUNT_REGISTER_SUCCESS:
                echo('{"error":{"text":"Failed to register Account", "errorCode": '.self::ACCOUNT_DB_WRITE_FAIL.'}}');
                break;
            case self::ACCOUNT_INVALID_EMAIL:
                echo('{"error":{"text":"Please enter a valid email address", "errorCode": '.self::ACCOUNT_INVALID_EMAIL.'}}');
                break;
            case self::ACCOUNT_EMAIL_TAKEN:
                echo('{"error":{"text":"You already have an account, please sign in.", "errorCode": '.self::ACCOUNT_EMAIL_TAKEN.'}}');
                break;
            case self::ACCOUNT_USERNAME_TAKEN:
                echo('{"error":{"text":"You already have an account, please sign in.", "errorCode": '.self::ACCOUNT_USERNAME_TAKEN.'}}');
                break;
            case self::ACCOUNT_INVALID_PASSWORD:
                echo('{"error":{"text":"Password must be at least 7 characters", "errorCode": '.self::ACCOUNT_INVALID_PASSWORD.'}}');
                break;
            case self::ACCOUNT_DB_WRITE_FAIL:
                echo('{"error":{"text":"Failed to register Account", "errorCode": '.self::ACCOUNT_DB_WRITE_FAIL.'}}');
                break;
            default:
                echo('{"error":{"text":"Something Went Horribly Wrong! Please try again.", "errorCode": -1}}');
                break;
        }
    }
    
    private static function dbRegister($username, $email, $password, $salt) {
        if(!self::emailValid($email)) {
            return self::ACCOUNT_INVALID_EMAIL;
        }
        
        if(self::emailTaken($email)) {
            return self::ACCOUNT_EMAIL_TAKEN;
        }
        
        if(self::usernameTaken($username)) {
            return self::ACCOUNT_USERNAME_TAKEN;
        }
        
        if(strlen($password) < 7) {
            return self::ACCOUNT_INVALID_PASSWORD;
        }
        
        $hashedPassword = Auth::hashPassword($password, $salt);
        
        
        if(self::addNewUser($username, $email, $hashedPassword, $salt)) {
            //self::dbSendMessage($email, 1, "Welcome to the Bombast Community!", "We are about to party", "admin@bombasttech.com", "Bombast Technology");
            return self::ACCOUNT_REGISTER_SUCCESS;
        } else {
            return self::ACCOUNT_DB_WRITE_FAIL;
        }
    }
    
    private static function emailValid($email) {
        if (preg_match('|^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$|i', $email)) {
            return true;
        }
        return false;
    }
    
    private static function usernameTaken($username) {
        global $db_link;
        if($q = $db_link->prepare("SELECT * FROM bombast_accounts WHERE username = ?"))
        {
            $q->bind_param('s', $username);
            $q->execute();
            $q->store_result();
        }
        if ($q->errno) {
            return 1;
        }
        return $q->affected_rows;
    }
    
    private static function emailTaken($email) {
        global $db_link;
        if($q = $db_link->prepare("SELECT * FROM bombast_accounts WHERE email = ?"))
        {
            $q->bind_param('s', $email);
            $q->execute();
            $q->store_result();
        }
        if ($q->errno) {
            return 1;
        }
        return $q->affected_rows;
    }
    
    private static function addNewUser($username, $email, $password, $salt) {
        global $db_link;
        if($q = $db_link->prepare("INSERT INTO bombast_accounts (`username`, `email`, `password`, `salt`) VALUES (?, ?, ?, ?)"))
        {
            $q->bind_param('ssss', $username, $email, $password, $salt);
            if($q->execute())
            {
                $q->close();
                return true;
            }
            var_dump($db_link->error);
            $q->close();
        }
        return false;
    }
}