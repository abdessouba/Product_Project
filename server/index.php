<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET,POST, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');

global $conn;
require_once('connection.php');
require_once('functions.php');


$method = $_SERVER["REQUEST_METHOD"];
$end_point = isset($_GET["q"]) ? $_GET["q"] : "";
$id = isset($_GET["id"]) ? $_GET["id"] : "";
$data = json_decode(file_get_contents('php://input'), true);

// Get Products
if ($method == "GET" && $end_point == "get_products") {
    $sql = "SELECT id, designation, calc_ttc(prix_ht, tva) as prix_ttc, stock, description, category_id, image, user_id, tag_id FROM product WHERE stock > 0";
    if (!empty($_GET["c"])) {// category
        $category_id = intval($_GET["c"]);
        $sql .= " AND category_id = $category_id";
    }

    if (!empty($_GET["t"])) {//tags
        $tag_id = intval($_GET["t"]);
        $sql .= " AND tag_id = $tag_id";
    }

    if (isset($_GET["id"])) {
        $id = intval($_GET["id"]);
        $sql .= " And id = $id";
    }

    // Now $sql contains the complete query based on the provided parameters
    $result = get_data($sql);
    echo json_encode($result);
}

// Get categories
if ($method == "GET" && $end_point == "get_categories") {
    $sql = "SELECT * from category";
    $result = get_data($sql);
    echo json_encode($result);
}

// Get tags
if ($method == "GET" && $end_point == "get_tags") {
    $count = get_data("select count(*) as nb from category");
    $num = $count[0]["nb"];
    for( $i = $num; $i > 0; $i-- ){
        $sql = "SELECT * from tags where tags.category_id =".$i;
        $result[] = ["category_id" => $i, "tags" => get_data($sql)];
    }
    echo json_encode($result);
}

// PUT
if ($method == "PUT" && $end_point == "update-client") {
    $update_query = "UPDATE user set nom = ?, prenom = ?, email = ?, ville = ?, adresse = ?, image = ? WHERE id = ?";
    $rst = update_data($update_query, "ssssssi", $data["lname"], $data['fname'],$data['email'],$data['ville'],$data['adress'],$data['image'], $data['id']);
    if($rst["status"] == 200 ){
        echo json_encode(["check"=> true]);
    }else{
        echo json_encode(["check"=> false]);
    }
}
