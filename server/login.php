<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET,POST, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');
require_once('connection.php');
require_once('functions.php');
$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER["REQUEST_METHOD"];
$end_point = isset($_GET["q"]) ? $_GET["q"] : "";

// if ($method == "GET") {
//     if(isset($_SESSION["user_email"]) && isset($_SESSION["user_id"])){
//         echo json_encode(["check"=>true]);
//     }
// }

if($method == "POST" && $end_point == "login") {
    if (isset($data['email']) && isset($data['password'])){
        $email = mysqli_real_escape_string($conn, $data['email']);
        $password = mysqli_real_escape_string($conn, $data['password']);
        $user = get_data("SELECT * FROM user WHERE email = '" . strtolower($email) . "' AND password = '" . $password . "'");
        if ($user){
            echo json_encode(["data"=>$user, "check"=>true]);
            $_SESSION["user_id"] = $user[0]["id"];
            $_SESSION["user_email"] = $user[0]["email"];
        }else{
            echo json_encode(["message"=>"no such user found!","check"=>false]);
        }
    }
}

if($method == "GET" && $end_point == "client"){
    if(isset($_SESSION['user_id']) && isset($_SESSION['user_email'])){
        $user_infos = get_data("SELECT * FROM user WHERE id = '" . $_SESSION['user_id'] . "' AND email = '" . $_SESSION['user_email'] . "'");
        echo json_encode(["data"=> $user_infos, "check"=>"true"]);
    }else{
        echo json_encode(["check"=>false]);
    }
}
if($method == "GET" && $end_point == "logout"){
    unset($_SESSION["user_id"]);
    unset($_SESSION["user_email"]);
    session_destroy();
    echo json_encode(["check"=>true]);
}


