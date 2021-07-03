<?php
  require_once('conn.php');

  if (empty($_POST['username']) ||
      empty($_POST['account']) ||
      empty($_POST['password'])) {
    header("Location: register.php?errMsg=1");
    die('資料不齊全！');
  }

  $username = $_POST['username'];
  $account = $_POST['account'];
  $password = $_POST['password'];

  $sql = sprintf(
    "INSERT INTO Yu_users(username, account, password) VALUES('%s', '%s', '%s')",
      $username, $account, $password
  );

  $result = $conn->query($sql);
  if (!$result) {
    $errCode = $conn->errno;
    if ($errCode == 1062) {
      header("Location: register.php?errMsg=2");
    }
    die($conn->error);
  }

  header("Location: index.php")

?>