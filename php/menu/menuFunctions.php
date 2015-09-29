<?php

function retrievePermissions($userName) {
	require('../db/db.php');

	$sqlQuery = "SELECT p.menu_id menuId 
		FROM user u, permissions p, menu m 
		WHERE u.group_id = p.groups_id 
		AND p.menu_id = m.id 
		AND u.username = '$userName'";

	$permissions = [];

	if ($resultDb = $mysqli->query($sqlQuery)) {
		while ($user = $resultDb->fetch_assoc()) {
			$permissions[] = $user['menuId'];
		}
	}

	$resultDb->free();
	$mysqli->close();

	return $permissions;
}

function retrieveModules($permissions) {
	require('../db/db.php');

	$inClause = '(' . join(',', $permissions) . ')';

	$sqlQuery = "SELECT id, text, iconCls FROM menu WHERE menu_id IS NULL AND id in $inClause";

	$modules = [];

	if ($resultDb = $mysqli->query($sqlQuery)) {
		while ($module = $resultDb->fetch_assoc()) {
			$modules[] = $module;
		}
	}

	$resultDb->free();
	$mysqli->close();

	return $modules;
}

function retrieveMenuOptions($modules, $permissions) {
	require('../db/db.php');

	$inClause = '(' . join(',', $permissions) . ')';

	$result = [];

	foreach ($modules as $module) {
		$sqlQuery = "SELECT * FROM menu WHERE menu_id = '";
		$sqlQuery .= $module['id'] . "' AND id in $inClause";

		if ($resultDb = $mysqli->query($sqlQuery)) {
			$count = $resultDb->num_rows;
			if ($count > 0) {
				$module['items'] = array();
				while ($item = $resultDb->fetch_assoc()) {
					$module['items'][] = $item;
				}
			}
			$result[] = $module;
		}
	}

	$resultDb->free();
	$mysqli->close();

	return $modules;
}