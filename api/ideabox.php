<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $length = $_GET['length'] ?? null;
        $soundtable = $_GET['soundtable'] ?? null;
        $blacklist = $_GET['blacklist'] ?? '';

        // Validation des paramètres obligatoires
        if ($soundtable === null || $length === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Paramètres manquants']);
            exit;
        }

        // Validation de la valeur de length
        $validLengths = ['tres-court', 'court', 'moyen', 'long', 'tres-long'];
        if (!in_array($length, $validLengths)) {
            http_response_code(400);
            echo json_encode(['error' => 'Valeur de longueur invalide']);
            exit;
        }

        try {
            // Préparer la blacklist pour la requête
            $blacklistArray = array_filter(explode(',', $blacklist), 'is_numeric');
            $blacklistPlaceholders = $blacklistArray ? ' AND id NOT IN (' . implode(',', array_fill(0, count($blacklistArray), '?')) . ')' : '';

            // Requête pour sélectionner une idée aléatoire
            $query = "SELECT id, text, author FROM idea WHERE soundtable = ? AND length = ?" . $blacklistPlaceholders . " ORDER BY RAND() LIMIT 1";
            $stmt = $pdo->prepare($query);
            $params = [$soundtable, $length, ...$blacklistArray];
            $stmt->execute($params);
            $idea = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$idea) {
                http_response_code(404);
                echo json_encode(['error' => 'Aucune idée trouvée']);
                exit;
            }

            echo json_encode(['idea' => $idea]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de la récupération: ' . $e->getMessage()]);
            exit;
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        // --- Signalement d'idée ---
        if (isset($data['ideaId']) && $data['status'] === 'signaled') {
            $ideaId = intval($data['ideaId']);
            try {
                $stmt = $pdo->prepare("UPDATE idea SET status = :status WHERE id = :id");
                $stmt->execute(['status' => 'signaled', 'id' => $ideaId]);
                echo json_encode(['success' => 'Idée signalée']);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => 'Erreur lors du signalement : ' . $e->getMessage()]);
            }
            exit;
        }
    
        // --- Ajout d'idée ---
        $text = trim($data['text'] ?? '');
        $author = trim($data['author'] ?? '');
        $soundtable = trim($data['soundtable'] ?? '');
    
        if ($text === '' || $soundtable === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Champs obligatoires manquants']);
            exit;
        }
    
        // Calcul automatique de la longueur
        $wordCount = str_word_count(strip_tags($text));
    
        if ($wordCount <= 15) {
            $length = 'tres-court';
        } elseif ($wordCount <= 30) {
            $length = 'court';
        } elseif ($wordCount <= 100) {
            $length = 'moyen';
        } elseif ($wordCount <= 300) {
            $length = 'long';
        } else {
            $length = 'tres-long';
        }
    
        try {
            $stmt = $pdo->prepare("INSERT INTO idea (text, author, length, soundtable) VALUES (:text, :author, :length, :soundtable)");
            $stmt->execute([
                'text' => $text,
                'author' => $author,
                'length' => $length,
                'soundtable' => $soundtable
            ]);
            echo json_encode(['success' => 'Idée ajoutée', 'length' => $length]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Erreur lors de l\'ajout : ' . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
}