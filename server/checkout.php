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

//post to bonlivraison
if($method == "POST" && $end_point == "add_bl") {
    if(isset($_SESSION["user_id"])) {
        $user_id = $_SESSION["user_id"];
        $shopping_cart = get_data("SELECT * FROM shopCart WHERE user_id = '$user_id'");
        // create BonLivraison
        $bl_query = "INSERT INTO BonLivraison(reglé, user_id) values(?,?)";
        if(count($shopping_cart) > 0) {
            $bl_id = post_data($bl_query, "si", true, $user_id);
        // create detail_bl
        foreach($shopping_cart as $obj) {
            $product_id = $obj["product_id"];
            $qte = $obj["qte"];
            $detail_query = "INSERT INTO detail_bl(product_id, bl_id, qte) values(?,?,?)";
            $detail_id = post_data($detail_query, "iii", $product_id, $bl_id, $qte);
            delete_data("DELETE FROM shopCart WHERE user_id = ? AND product_id = ?", "ii", $user_id, $product_id);
        }
        echo json_encode(["check"=>true]);
        }else{
            echo json_encode(["check"=>false]);
        }
    }
}


//get bonlivraison
if($method == "GET" && $end_point == "get_bl_details") {
    if(isset($_SESSION["user_id"])) {
        $user_id = $_SESSION["user_id"];
        $bl = get_data("SELECT bonlivraison.id, bonlivraison.date, user.adresse, user.ville, user.email, CONCAT(user.nom, ' ', user.prenom) AS user, designation, product.image, qte, famille, calc_ttc(prix_ht, tva) as ttc
        FROM bonlivraison 
        JOIN detail_bl ON detail_bl.bl_id = bonlivraison.id 
        JOIN product on detail_bl.product_id = product.id
        JOIN category on category.id = product.category_id
        JOIN user ON user.id = bonlivraison.user_id 
        WHERE user.id = '$user_id' order by id");
        echo json_encode(["check"=>true, "data"=> $bl]);
    }
}