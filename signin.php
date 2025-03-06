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
		<h1 style="text-align:center;"> Sign In </h1>
	</div>
	<?php require('db.php');
    session_start();
    // When form submitted, check and create user session.
    if (isset($_POST['username'])) {
        $username = stripslashes($_REQUEST['username']);    // removes backslashes
        $username = mysqli_real_escape_string($con, $username);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($con, $password);
        // Check user is exist in the database
        $query    = "SELECT * FROM `users` WHERE username='$username'
                     AND password='" . md5($password) . "'";
        $result = mysqli_query($con, $query) or die(mysql_error());
        $rows = mysqli_num_rows($result);
        if ($rows == 1) {
            $_SESSION['username'] = $username;
            // Redirect to user dashboard page
            header("Location: dashboard.php");
        } else {
            echo "<div class='form'>
                  <h3>Incorrect Username/password.</h3><br/>
                  <p class='link'>Click here to <a href='signin.php'>Login</a> again.</p>
                  </div>";
        }
    } else {
?>

    <form class="form" method="post" name="login">
        <h1 class="login-title">Login</h1>
        <input type="text" class="login-input" name="username" placeholder="Username" autofocus="true"/>
        <input type="password" class="login-input" name="password" placeholder="Password"/>
        <input type="submit" value="Login" name="submit" class="login-button"/>
        <p class="link"><a href="signup.php">New Registration</a></p>
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