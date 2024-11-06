<?php
error_reporting(E_ALL);  
ini_set('display_errors', 1);  

header('Content-Type: application/json'); 

try {
    $db = new PDO('sqlite:C:\xampp\htdocs\Equipo\db\Proyecto.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->beginTransaction(); 

    $username = $_POST['username'];
    $stmt = $db->prepare("SELECT COUNT(*) FROM usuario WHERE username = ?");
    $stmt->execute([$username]);
    $count = $stmt->fetchColumn();

    if ($count > 0) {
        echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario ya está en uso.']);
        exit;
    }

    $nombre = $_POST['nombre'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $rol = 'usuario';

    $stmt = $db->prepare("INSERT INTO usuario (nombre, username, password, rol) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $username, $password, $rol]);

    $db->commit(); 
    echo json_encode(['status' => 'success', 'message' => 'Usuario registrado con éxito.']);

} catch (PDOException $e) {
    $db->rollBack(); 
    echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
