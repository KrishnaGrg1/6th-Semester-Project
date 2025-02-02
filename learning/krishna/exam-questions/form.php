<!DOCTYPE html>
<html>
<head>
  <title>Form Validation and Database Insertion</title>
</head>
<body>
  <h2>Registration Form</h2>
  <form action="form.php" method="post">
    Email: <input type="email" name="email"><br><br>
    Password: <input type="password" name="password"><br><br>
    Retype Password: <input type="password" name="retype_password"><br><br>
    <input type="submit" name="submit" value="Submit">
  </form>

  <?php
  // Check if the form has been submitted
  if (isset($_POST['submit'])) {
    // Database connection
    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "myDB";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];
    $retype_password = $_POST['retype_password'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      echo "Invalid email format!<br>";
    } else {
      // Check if passwords match
      if ($password !== $retype_password) {
        echo "Passwords do not match!<br>";
      } else {
        // Hash the password for security
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Use prepared statements to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $hashed_password);

        // Execute the query
        if ($stmt->execute()) {
          echo "New record created successfully<br>";
        } else {
          echo "Error: " . $stmt->error . "<br>";
        }

        // Close the statement
        $stmt->close();
      }
    }

    // Close the database connection
    $conn->close();
  }
  ?>
</body>
</html>