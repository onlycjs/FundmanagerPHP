<?php
session_start();

$connStr = "mysql:host=gondr.asuscomm.com;dbname=yy_30218;charset=utf8mb4";
$user = "yy_30218";
$pass = "1234";

$con = new PDO($connStr, $user, $pass);

function fetchAll($con, $sql, $data = []){
    $q = $con->prepare($sql);
    $q->execute($data);
    return $q->fetchAll(PDO::FETCH_OBJ);
}

function fetch($con, $sql, $data = []){
    $q = $con->prepare($sql);
    $q->execute($data);
    return $q->fetch(PDO::FETCH_OBJ);
}

function query ($con, $sql, $data = []){
    $q = $con->prepare($sql);
    $q->execute($data);
    return $q->rowCount();
}

function msgAndGo($msg, $target){
    echo "<script>
        alert('$msg');
        location.href = '$target'; 
        </script>";
}

function sendJsonResponse($msg, $succes, $data = []){
    header('Content-type:application/json');
    echo json_encode(['success'=>$succes, 'msg'=>$msg, 'data'=> $data], 
            JSON_UNESCAPED_UNICODE);
}

