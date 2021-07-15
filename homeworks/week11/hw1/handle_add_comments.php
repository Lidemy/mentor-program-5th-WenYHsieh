<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header("Location: index.php?errMsg=1");
    die('資料不齊全！');
  }

  $content = $_POST['content'];
  $account = $_SESSION['account'];

  // insert username and content into DB
  $sql = "INSERT INTO Yu_comments(account, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $account, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")

?>