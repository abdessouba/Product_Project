<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: GET,POST, DELETE, PUT');
    require_once('connection.php');
    require_once('functions.php');
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['fname']) && isset($data['lname']) && isset($data['email']) && isset($data['pass2']) && isset($data['pass1']) == isset($data['pass2'])){
        $register_query = "insert into user(nom, prenom, email, password, image) values(?,?,?,?,?)";
        $check = get_data("select * from user where email = '".$data["email"]."'");
        if(count($check) == 0){
            $rst = post_data($register_query,"sssss", $data["lname"], $data["fname"], $data["email"], $data["pass1"], $data["image"]);
            echo json_encode(["account"=>true,"message"=>"Account Created"]);
        }else{
            echo json_encode(["email"=>true,"message"=>"this email already used."]);
        }
    }
?>
