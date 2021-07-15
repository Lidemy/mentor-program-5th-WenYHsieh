<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  $is_login = false;
  if (!empty($_SESSION['username'])) {
    $is_login = true;
  } else {
    header('location: index.php');
    die();
  }

  if (empty($_GET['id'])) {
    header("Location: index.php?errMsg=1");
    die('資料不齊全！');
  }
   
  $sql = "UPDATE Yu_blog_articles SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $_GET['id']);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>