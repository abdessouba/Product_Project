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

if($method == "GET" && $end_point == "get_user_products"){
    if(isset($_SESSION["user_id"])){
        $user_id = $_SESSION["user_id"];
        $products = get_data("SELECT product.id as product_id, designation, prix_ht, tva, stock, image, description, user_id, category_id, tag_id, famille FROM product, category WHERE product.category_id = category.id AND user_id = $user_id;");
        echo json_encode(["check"=>true, "data"=>$products]);
    }
}

if($method == "POST" && $end_point == "add_product"){
    if(isset($_SESSION["user_id"])){
        if(isset($data["tag"]) && isset( $data["category"])) {
            $ctg_id = post_data("INSERT INTO category(famille) values(?)", "s", $data["category"]);
            $tag_id = post_data("INSERT INTO tags(tag, category_id) values(?,?)", "si", $data["tag"],$ctg_id);
            $data["category_id"] = $ctg_id;
            $data["tag_id"] = $tag_id;
        }
        $product_query = "INSERT INTO product(designation, prix_ht, tva, stock, image, description, user_id, category_id, tag_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $rst = post_data($product_query, "ssiissiii", $data["designation"], $data["prix_ht"], $data["tva"], $data["stock"], $data["image"], $data["description"], $_SESSION["user_id"], $data["category_id"], $data["tag_id"]);
        if(is_numeric($rst)){
            echo json_encode(["check"=> true, "message"=>"new product added."]);
        }else{
            echo json_encode(["check"=> false]);
        }
        echo json_encode(["check"=>true,"data"=>$data]);
    }
}

if($method == "PUT" && $end_point == "update_product") {
    if(isset($data["tag"]) && isset( $data["category"])) {
        $ctg_id = post_data("INSERT INTO category(famille) values(?)", "s", $data["category"]);
        $tag_id = post_data("INSERT INTO tags(tag, category_id) values(?,?)", "si", $data["tag"],$ctg_id);
        $data["category_id"] = $ctg_id;
        $data["tag_id"] = $tag_id;
    }
    if(isset($_SESSION["user_id"])) {
            $product_query = "UPDATE product SET designation=?, prix_ht=?, tva=?, stock=?, image=?, description=?, category_id=?, tag_id=? WHERE id=?";
            $rst = update_data($product_query, "sdiissdii", $data["designation"], $data["prix_ht"], $data["tva"], $data["stock"], $data["image"], $data["description"], $data["category_id"], $data["tag_id"], $id);
            echo json_encode(["check" => true, "message" => "Product Updated.", "status"=> $rst["status"]]);
}}

if($method == "DELETE" && $end_point == "remove_user_product") {
    if($_SESSION["user_id"]) {
        $rst = update_data("update product set stock = 0 where id = ? and user_id = ?", "ii", $id, $_SESSION["user_id"]);
        echo json_encode(["check"=> true, "message"=> "Product Deleted"]);
    }else{
        echo json_encode(["check"=> false, "message"=>"you have to login first."]);
    }
}