<?php 
  require_once('conn.php');
  // 表示回傳的 response 為 JSON 格式
  header('Content-type:application/json;charset=utf-8'); 
  // 預設回傳五筆，如果有設定 limit，就拿 limit 去取

  if (empty($_GET['site_key']) ||
      empty($_GET['limit'])) {
    $json = array(
      'ok' => false,
      'message' => 'Please input missing fields !'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $limit = $_GET['limit'];
  $site_key = $_GET['site_key'];
  $sql = "SELECT * FROM Yu_discussions WHERE site_key=? ORDER BY created_at DESC limit ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $site_key, $limit);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      'ok' => false,
      'message' => $conn->error()
    );
    $response = json_encode($json);
    echo $response;
    die();
  } 

  $result = $stmt->get_result();
  $discussions = array();
  // 一筆一筆 push 到 array 裡面
  while ($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      'id' => $row['id'],
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'created_at' => $row['created_at']
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );

  $response = json_encode($json);
  echo $response;
?>