<?php

namespace Bombast\Db\TableGateway;

use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Sql;
use Zend\Db\Adapter\Adapter;
use Zend\Db\TableGateway\TableGateway;


class BombastAccountsTableGateway extends TableGateway {
    public static $_tableName = "bombast_accounts";
    
}