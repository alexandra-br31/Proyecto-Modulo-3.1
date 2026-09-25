<?php
require_once 'conexion.php';

$usuario  = $_POST['usuario'] ?? '';
$password = $_POST['contrasena'] ?? '';

// Consultar usuario en la base de datos
$query  = "SELECT * FROM empleados WHERE usuario = '$usuario' AND contrasena = '$password'";
$resultado = mysqli_query($conexion, $query);

if (mysqli_num_rows($resultado) > 0) {
    $empleado = mysqli_fetch_assoc($resultado);
    
    echo json_encode([
        'status'  => 'success',
        'message' => '¡Bienvenido ' . $empleado['nombre_completo'] . '!',
        'rol'     => $empleado['rol']
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Usuario o contraseña incorrectos.'
    ]);
}
?>