<!DOCTYPE html>
<html>

<head>
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
		<h1 style="text-align:center;"> Sign Up </h1>
	</div>
<?php
    require('db.php');
    // When form submitted, insert values into the database.
    if (isset($_REQUEST['username'])) {
        // removes backslashes
        $username = stripslashes($_REQUEST['username']);
        //escapes special characters in a string
        $username = mysqli_real_escape_string($con, $username);
        $email    = stripslashes($_REQUEST['email']);
        $email    = mysqli_real_escape_string($con, $email);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($con, $password);
        $create_datetime = date("Y-m-d H:i:s");
        $query    = "INSERT into `users` (username, password, email, create_datetime)
                     VALUES ('$username', '" . md5($password) . "', '$email', '$create_datetime')";
        $result   = mysqli_query($con, $query);
        if ($result) {
            echo "<div class='form'>
                  <h3>You are registered successfully.</h3><br/>
                  <p class='link'>Click here to <a href='signin.php'>Login</a></p>
                  </div>";
        } else {
            echo "<div class='form'>
                  <h3>Required fields are missing.</h3><br/>
                  <p class='link'>Click here to <a href='registration.php'>registration</a> again.</p>
                  </div>";
        }
    } else {
?>
    <form class="form" action="" method="post">
        <h1 class="login-title">Registration</h1>
        <input type="text" class="login-input" name="username" placeholder="Username" required />
        <input type="text" class="login-input" name="email" placeholder="Email Adress">
        <input type="password" class="login-input" name="password" placeholder="Password">
        <input type="submit" name="submit" value="Register" class="login-button">
        
    </form>
<?php
    }
?>
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
	<br>
	<h4 style="text-align: center;"><a href="logout.php"> Log Out </a></h4>
</div>
</body>
</html>