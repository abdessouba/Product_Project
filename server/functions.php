<?php
//GET
function get_data($sql){
    global $conn;
    $result = $conn->query($sql);
    if ($result) {
        $items = [];
        while ($row = $result->fetch_assoc()) {
            $items[] = $row;
        }
        return $items;
    }
}


//POST
function post_data($sql, $data_type, ...$data){
    global $conn;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($data_type,...$data);
    $stmt->execute();
    if ($stmt->errno) {
        http_response_code(404);
    } else {
        return $stmt->insert_id;
    }
}

function update_data($sql, $data_type, ...$params){
    global $conn;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($data_type, ...$params);
    $stmt->execute();
    if ($stmt->errno) {
        return ["status"=> 404];;
    } else {
        return ["status"=> 200];
    }
}

function delete_data($sql, $data_type, ...$params) {
    global $conn;
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($data_type, ...$params);
    $stmt->execute();
    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    return $affected_rows;
}

