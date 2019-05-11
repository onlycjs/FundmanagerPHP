<?php

require("db.php");

if(!isset($_SESSION['user'])) {
    sendJsonResponse("로그인한 사용자만 투자가 가능합니다.", false);
    exit;   
}

$user = $_SESSION['user'];

$fid    = isset( $_POST['id'] ) ? $_POST['id'] : "";
$money  = isset( $_POST['money'] ) ? $_POST['money'] : "";
$sign   = isset( $_POST['sign'] ) ? $_POST['sign'] : "";

if($fid == "" || $money == "" || $sign == ""){
    sendJsonResponse("필수값이 누락되어 있습니다.", false);
    exit;
}

$sql = "SELECT * FROM funds WHERE id = ?";
$fund = fetch($con, $sql, [$fid]);

if(!$fund){
    sendJsonResponse("존재하지 않는 펀드입니다.", false);
    exit;
}

if ($fund->current + $money > $fund->total) {
    sendJsonResponse("투자 금액이 총 금액을 초과합니다", false);
    exit;
}

$sql = "UPDATE funds SET `current` = ? WHERE id = ?";
$cnt = query($con, $sql, [$fund->current + $money, $fund->id]);

$sql = "INSERT INTO investors(`uid`, `fid`, `money`, `sign`) VALUES (?, ?, ?, ?)";
$cnt = query($con, $sql, [$user->id, $fund->id, $money, $sign]);

if($cnt == 1){
    $sql = "SELECT * FROM investors WHERE id = ?";
    $idx = $con->lastInsertId();

    $investor = fetch($con, $sql, [$idx]);
    sendJsonResponse("투자되었습니다.", true, $investor);
    exit;
} else {
    sendJsonResponse("데이터베이스 오류",false);
}
