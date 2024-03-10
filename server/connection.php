<?php

$conn = new mysqli("localhost", "root", "", "ez_shop_v2");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}