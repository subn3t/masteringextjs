<?php

require '../db/db.php';
require 'PassHash.php';

session_start();

// $userName = 'loiane';
// $pass = 'Packt123@';

$userName = $_POST['user'];
$pass = $_POST['password'];

$userName = stripslashes($userName);
$pass = stripslashes($pass);

$userName = $mysqli->real_escape_string($userName);
$sql = "SELECT * FROM USER WHERE userName='$userName'";

$result = array();

if ($resultDb = $mysqli->query($sql)) {
	$count = $resultDb->num_rows;
	if ($count == 1) {
		$record = $resultDb->fetch_assoc();
		if (PassHash:: check_password($record['password'], $pass)) {
			$_SESSION['authenticated'] = 'yes';
			$_SESSION['username'] = $userName;

			$result['success'] = true;
			$result['msg'] = 'User authenticated!';
		}
		else {
			$result['success'] = false;
			$result['msg'] = 'Incorrect password.';
		}
	}
	else {
		$result['success'] = false;
		$result['msg'] = 'Incorrect user or password.';
	}
	$resultDb->close();
}

$mysqli->close();

header('Content-type: text/json');
echo json_encode($result);