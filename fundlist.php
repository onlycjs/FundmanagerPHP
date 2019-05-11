<?php
require ("db.php");

$sql = "SELECT * FROM funds";

$list = fetchAll($con, $sql);

sendJsonResponse("성공적으로 로드됨", true, $list);