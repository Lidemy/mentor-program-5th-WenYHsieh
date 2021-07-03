<?php
  session_start();
  require_once('conn.php');

  if (empty($_POST['content'])) {
    header("Location: index.php?errMsg=1");
    die('資料不齊全！');
  }

  // $username = $_POST['username'];
  $content = $_POST['content'];
  $account = $_SESSION['account'];
  $sql_get_username = sprintf(
    "SELECT username FROM Yu_users WHERE account='%s'", $account
  );

  $result_get_username = $conn->query($sql_get_username);
  $row = $result_get_username->fetch_assoc();
  $username = $row['username'];

  $sql = sprintf(
    "INSERT INTO Yu_comments(username, content)
      VALUES('%s', '%s')",
      $username, $content
  );

  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")

?>