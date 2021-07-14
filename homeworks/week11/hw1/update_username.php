<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['new_username'])) {
    header("Location: index.php?errMsg=1");
    die('資料不齊全！');
  }

  $new_username = $_POST['new_username'];
  $account = $_SESSION['account'];

  $username = get_username_from_account($account);

  // insert username and content into DB
  $sql = "UPDATE Yu_users SET username=? WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $new_username, $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>