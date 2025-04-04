<?php
//include auth_session.php file on all user panel pages
include("auth_session.php");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Dashboard - Client area</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
	<link href="stylesheet.css" rel="stylesheet">

</head>
<body>

	<div class="row min-vh-100">
	<div class="col-9">
	<div class="rectangle">
		<br>
		<h1 style="text-align:center;"> Dashboard </h1>
	</div>
	<div class="form">
        <p>Hey, <?php echo $_SESSION['username']; ?>!</p>
        <p>Welcome to the user dashboard page </p>
        <p><a href="logout.php">Logout</a></p>
    </div>
	</div>
	<div class="col-3">
		<br>
	<h3> Generic E-Commerce Website </h3>
	<br>
	<table width="60%" align="center">
		<tr align="center">
			<td><h4><a href="signin.php"> Sign In </a></h4></td>
			<td><h4><a href="signup.php"> Sign Up </a></h4></td>
		</tr>
	</table>
	<h3><a href="index.html"> Home </a></h3>
	<h3><a href="product-listing.html"> Product Listings </a></h3>
	<h3><a href="user-profile.html"> Profile </a></h3>
	<h3><a href="cart.html"> Cart </a></h3>
	<h3><a href="dashboard.php"> Dashboard </a></h3>
	</div>
</div>

</body>
</html>