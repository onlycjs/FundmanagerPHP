<?php
require ("db.php");

if(!isset($_SESSION['user'])){
    sendJsonResponse('로그인한 사용자만 투자 가능합니다.', false);
    exit;
}

//여기까지온건 로그인한 유저
$fName = isset($_POST['name']) ? $_POST['name'] : "";
$fDate = isset($_POST['endDate']) ? $_POST['endDate'] : "";
$fMoney = isset($_POST['money']) ? $_POST['money'] : "";

if($fName == "" || $fDate == "" || $fMoney == ""){
    sendJsonResponse('필요한 값이 누락되었습니다.', false);
    exit;
}


$sql = "INSERT INTO 
        funds(`name`, `end_date`, `total`, `current`)
        VALUES (?, ?, ?, 0)";

$cnt = query($con, $sql, [$fName, $fDate, $fMoney]);

if($cnt == 1){
    $id = $con->lastInsertId();
    sendJsonResponse('성공적으로 등록되었습니다.', true, 
        ['id'=>$id, 'name'=>$fName, 'endDate' => $fDate, 'total'=>$fMoney]);
}else {
    sendJsonResponse('DB 등록중 오류 발생', false);
}