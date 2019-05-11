<?php
require("db.php");

$sql = "SELECT i.*, f.name AS fname, u.name AS uname FROM investors AS i, funds AS f, users AS u WHERE i.fid = f.id AND i.uid = u.id";

$list = fetchAll($con, $sql);

sendJsonResponse("성공적으로 로딩", true, $list);