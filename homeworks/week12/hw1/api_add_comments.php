<?php 
  require_once('conn.php');
  // 表示回傳的 response 為 JSON 格式
  header('Content-type:application/json;charset=utf-8'); 

  /* 接收來自前端 POST 過來的資訊
      檢查是否有值，沒有，回傳警示，有寫到資料庫
  */

  if (empty($_POST['site_key']) ||
      empty($_POST['nickname']) ||
      empty($_POST['content'])
  ) {
    // 有一為空，回傳警示，die
    $json = array(
      'ok' => false,
      'message' => 'Please input missing fields !'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_POST['site_key'];
  $nickname = $_POST['nickname'];
  $content = $_POST['content'];

  // 都有填寫的話就把資料都新增到 DB
  $sql = "INSERT INTO Yu_discussions(site_key, nickname, content) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $site_key, $nickname, $content);
  $result = $stmt->execute();

  // 新增出錯
  if (!$result) {
    $json = array(
      'ok' => false,
      'message' => $conn->error()
    );
    $response = json_encode($json);
    echo $response;
    die();
  } 

  // 新增成功
  $json = array(
    'ok' => true,
    'message' => 'Success !'
  );

  $response = json_encode($json);
  echo $response;

?>