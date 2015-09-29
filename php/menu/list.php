<?php

require('menuFunctions.php');

session_start();

$userName = $_SESSION['username'];
// $userName = 'loiane';

$permissions = retrievePermissions($userName);
$modules = retrieveModules($permissions);
$result = retrieveMenuOptions($modules, $permissions);

echo json_encode(array(
	'data' => $result
));