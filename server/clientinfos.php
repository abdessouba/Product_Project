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
$id = isset($_GET["id"]) ? $_GET["id"] : null;


if($method == "POST" && $end_point == "addtoshopcart") {
    if(isset($data["product_id"]) &&  isset($_SESSION["user_id"]) && isset($data["prix"])) {
        $cart_querry = "INSERT INTO shopCart(product_id, user_id, qte, prix) values(?,?,?,?)";
        $rst = post_data($cart_querry, "iiid", $data["product_id"],$_SESSION["user_id"], $data["qte"],$data["prix"]);
        echo json_encode(["check"=>true]);
    }else{
        echo json_encode(["check"=>false]);
    }
}

if($method == "GET" && $end_point == "get-shopcart") {
    if(isset($_SESSION["user_id"])){
        $rst = get_data("SELECT designation, image, product_id, prix AS ttc, qte FROM shopCart, product WHERE shopCart.product_id = product.id AND shopCart.user_id = " . $_SESSION["user_id"]);
        echo json_encode(["check"=>true, "data"=>$rst]);
    }else{
        echo json_encode(["check"=>false]);
    }
}

if($method == "DELETE" && $end_point == "remove-shopcart" && isset($id)) {
    if(isset($_SESSION["user_id"])){
        $sql = "DELETE FROM shopCart WHERE product_id = ? AND user_id = ?";
        $rst = delete_data($sql, "ii", $id, $_SESSION["user_id"]);
        if($rst == 1){
            echo json_encode(["check"=>true]);
        }else{
            echo json_encode(["check"=>false]);
        }
    }
}