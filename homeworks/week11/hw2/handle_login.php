<?php
  session_start();
  require_once('conn.php');

  if (empty($_POST['username']) ||
      empty($_POST['password'])) {
    header('Location: login.php?errMsg=1');
    die('資料不齊全！');
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT username, password FROM Yu_blog_users WHERE username=? AND password=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $stmt->execute(); 
  $result = $stmt->get_result();

  if (!$result) {
    die($conn->error);
  }

  $row = $result->fetch_assoc();

  if (!empty($row)) {
    $_SESSION['username'] = $username;
    header("Location: index.php");
  }else {
    header('Location: login.php?errMsg=2');
  }

?>