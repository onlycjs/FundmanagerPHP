<!DOCTYPE html>
<html lang="en">
<?php require("bootstrap.php"); ?>

    <title>로그인</title>
<body>
    <h2 style="text-align: center; margin-top: 100px;">로그인</h2>
    <form action="login_ok.php" method="post" style="width: 500px; margin: 0 auto; margin-top: 200px;">
        <div class="form-group">
            <label for="exampleInputEmail1">아이디</label>
            <input type="text" class="form-control" name="id" placeholder="아이디를 입력하세요.">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">비밀번호</label>
            <input type="password" class="form-control" name="password" placeholder="비밀번호를 입력하세요.">
        </div>
        <button type="submit" class="btn btn-primary" style="float: right;">로그인</button>
    </form>
</body>

</html>