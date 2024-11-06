<?php
header('Content-Type: application/json'); 

try {
    
    $db = new PDO('sqlite:C:\xampp\htdocs\Equipo\db\Proyecto.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $username = $_POST['username'];
    $password = $_POST['password'];

    
    $stmt = $db->prepare("SELECT id, password FROM usuario WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    
    if ($user && password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['id'] = $user['id']; 

        
        echo json_encode([
            'status' => 'success',
            'message' => 'Inicio de sesión exitoso',
            'id' => $user['id'] 
        ]);
    } else {
        
        echo json_encode(['status' => 'error', 'message' => 'Usuario o contraseña incorrectos']);
    }

} catch (PDOException $e) {
    
    echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>
