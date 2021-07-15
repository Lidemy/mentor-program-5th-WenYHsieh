<?php
  require_once('conn.php');

  if (empty($_POST['username']) ||
      empty($_POST['account']) ||
      empty($_POST['password'])) {
    header("Location: register.php?errMsg=1");
    die('資料不齊全！');
  }
  // insert register info into DB
  $username = $_POST['username'];
  $account = $_POST['account'];
  $password = $_POST['password'];

  $sql = "INSERT INTO Yu_users(username, account, password) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $account, password_hash($password, PASSWORD_DEFAULT));
  $result = $stmt->execute();

  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode == 1062) {
      header("Location: register.php?errMsg=2");
    }
    die($conn->error);
  }

  header("Location: index.php")

?>