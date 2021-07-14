<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['content'])) {
    header("Location: update_comment.php?errMsg=1&id=" . $_POST['id']);
    die('資料不齊全！');
  }

  $account = $_SESSION['account'];
  $username = get_username_from_account($account);
  $authority = get_authority_from_account($account);

  if ($authority != 0) {
    $sql = "UPDATE Yu_comments SET content=? WHERE id=? and account=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $_POST['content'], $_POST['id'], $account);
  } else {
    $sql = "UPDATE Yu_comments SET content=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $_POST['content'], $_POST['id']);
  }

  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php")
?>