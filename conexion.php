<?php
$host     = "localhost";
$usuario  = "root";
$password = "2531";
$db       = "orderfast";

$conexion = mysqli_connect($host, $usuario, $password, $db);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

mysqli_set_charset($conexion, "utf8mb4");
?>