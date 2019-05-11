<!DOCTYPE html>
<html lang="en">
<?php require("bootstrap.php"); ?>
<body>
    <h1>회원가입</h1>
    <form action="register_ok.php" method="post">
        아이디 : <input type="text" name="id"> <br>
        이름 : <input type="text" name="name"> <br>
        비밀번호 : <input type="password" name="password"> <br>
        <input type="submit" value="회원가입">
    </form>
</body>
</html>