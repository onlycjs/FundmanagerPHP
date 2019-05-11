<?php

$id = $_POST['id'];
$pw = $_POST['password'];

require("db.php");

$sql = "SELECT * FROM users WHERE id = ? AND password = PASSWORD(?)";
$user = fetch($con, $sql, [$id, $pw]);

if($user){
    $_SESSION['user'] = $user;
    msgAndGo("로그인 성공", "/index.php");
}else {
    msgAndGo("로그인 실패", "/login.php");
}
?>