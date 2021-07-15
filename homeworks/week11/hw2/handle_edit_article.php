<?php
  require_once('conn.php');

  if (empty($_POST['title']) ||
      empty($_POST['content'])
  ){
    header('location: edit_article.php?errMsg=1&id=' . $_POST["id"]);
    die('資料不齊全');
  }

  $title = $_POST['title'];
  $content = $_POST['content'];
  // edit article by id
  $sql = "UPDATE Yu_blog_articles SET title=?, content=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $_POST['id']);
  $result = $stmt->execute();
  
  if (!$result) {
    die($conn->error);
  } else {
    header('location: index.php');
  }
?>