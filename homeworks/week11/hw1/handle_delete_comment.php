<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) {
    header("Location: index.php?errMsg=1");
    die('資料不齊全！');
  }

  $account = $_SESSION['account'];
  $authority = get_authority_from_account($account);

  if ($authority != 0) {
    $sql = "UPDATE Yu_comments SET is_deleted=1 WHERE id=? and account=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $_GET['id'], $account);
  } else {
    $sql = "UPDATE Yu_comments SET is_deleted=1 WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $_GET['id']);
  }

  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>