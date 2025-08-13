<?php
header('Content-Type: application/json');

require_once 'config.php';

// Récupérer les données envoyées
$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$email = $input['email'] ?? '';

if ($action === 'subscribe' && !empty($email)) {
    // Validation côté serveur
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'error' => 'Adresse email invalide']);
        exit;
    }

    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM newsletter WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'error' => 'Cet email est déjà inscrit']);
        exit;
    }

    // Insérer l'email dans la base de données
    try {
        $stmt = $pdo->prepare('INSERT INTO newsletter (email, created_at) VALUES (?, NOW())');
        $stmt->execute([$email]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'inscription']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Requête invalide']);
}
?>