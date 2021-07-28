<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8'); 
  $method = $_SERVER['REQUEST_METHOD'];

  switch ($method) {
    case 'GET':
      handle_get();
      break;
    case 'POST':
      handle_post();
      break;
  }

  function handle_get(){
    global $conn;
    if (empty($_GET['user_key'])) {
      $json = array(
        'ok' => false,
        'message' => 'Please input missing fields !'
      );
      $response = json_encode($json);
      echo $response;
      die();
    }

    $user_key = $_GET['user_key'];
    $sql = "SELECT * FROM Yu_todos WHERE user_key=? ORDER BY created_at ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $user_key);
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

    while ($row = $result->fetch_assoc()) {
      array_push($discussions, array(
        'content' => $row['content'],
        'checked' => $row['checked']
      ));
    }

    $json = array(
      "ok" => true,
      "discussions" => $discussions
    );

    $response = json_encode($json);
    echo $response;
  }

  function handle_post() {
    global $conn;
    if (empty($_POST['user_key'])) {
      $json = array(
        'ok' => false,
        'message' => 'Please input missing fields !'
      );
      $response = json_encode($json);
      echo $response;
      die();
    }
    $user_key = $_POST['user_key'];

    if ($_POST['content']==0){
      $sql = "DELETE FROM Yu_todos WHERE user_key=?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $user_key);
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
    } else {
      if (empty($_POST['content']) ||
          empty($_POST['checked'])) {
        $json = array(
          'ok' => false,
          'message' => 'Please input missing fields !'
        );
        $response = json_encode($json);
        echo $response;
        die();
      }
      $content = $_POST['content'];
      $checked = $_POST['checked'];
      $sql = "INSERT INTO Yu_todos(user_key, content, checked) VALUES(?, ?, ?)";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('sss', $user_key, $content, $checked);
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
    }

    $json = array(
      'ok' => true,
      'message' => 'Success !'
    );

    $response = json_encode($json);
    echo $response;
  }

?>