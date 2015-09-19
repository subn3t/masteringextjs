<?php

session_start();

$_SESSION = array();

session_destroy();

$result = array(
	'success' => true,
	'msg' => 'logout'
);

echo json_encode($result);