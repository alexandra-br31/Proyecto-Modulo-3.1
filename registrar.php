<?php
require_once 'conexion.php';

$nombre   = $_POST['nombre_completo'] ?? '';
$usuario  = $_POST['usuario'] ?? '';
$correo   = $_POST['correo'] ?? '';
$rol      = $_POST['rol'] ?? 'Mesero';
$password = $_POST['contrasena'] ?? '';

// Insertar empleado en MySQL Workbench
$query = "INSERT INTO empleados (nombre_completo, usuario, correo, contrasena, rol) 
          VALUES ('$nombre', '$usuario', '$correo', '$password', '$rol')";

if (mysqli_query($conexion, $query)) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Cuenta creada correctamente.'
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Error: El usuario o correo ya existen.'
    ]);
}
?>