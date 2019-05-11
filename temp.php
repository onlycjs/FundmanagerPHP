<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
<table>
<tr>
	<th>아이디</th>
	<th>이름</th>
	<th>돈</th>
</tr>
<?php
		require("db.php");
		$sql = "SELECT * FROM users";
		$q = $con->prepare($sql);
		$q->execute();

		$list = $q->fetchAll(PDO::FETCH_OBJ);

		foreach($list as $user){
			echo "<tr>";
			echo "<td> $user->id </td>";
			echo "<td> $user->name </td>";
			echo "<td> $user->money </td>";
			echo "</tr>";
		}
	?>
</table>


</body>
</html>