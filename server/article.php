<?php
session_start();
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET,POST, DELETE, PUT');
header('Access-Control-Allow-Credentials: true');

global $conn;
require_once('connection.php');
require_once('functions.php');


$method = $_SERVER["REQUEST_METHOD"];
$end_point = isset($_GET["q"]) ? $_GET["q"] : "";
$s = isset($_GET["s"]) ? $_GET["s"] : "";
$data = json_decode(file_get_contents('php://input'), true);

if($method == "GET" and $end_point=="get-products"){
    $article_query = "SELECT id, designation, calc_ttc(prix_ht, tva) as ttc, stock, image, description FROM product ";
    if($s){
        $article_query .= " WHERE designation like %$s%";
    }
    $rst = get_data($article_query);
    echo json_encode($rst);
}

