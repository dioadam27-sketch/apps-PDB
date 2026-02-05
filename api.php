<?php
/**
 * API Endpoint for Apps PDB
 * Handles data fetching and saving/publishing to MySQL.
 */

// 0. Production Error Handling (Prevent HTML output interfering with JSON)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// 1. Headers & CORS (Allow access from React App)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// --- CRITICAL FIX FOR SYNC ISSUES ---
// Force browsers to NEVER cache this API response. 
// This ensures that when Admin publishes, other devices get the new data immediately.
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
// ------------------------------------

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Database Configuration
$host = 'localhost';
$db_name = 'pkkiipendidikanu_website'; 
$username = 'pkkiipendidikanu_dioarsip';    
$password = '@Dioadam27';        

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// 3. Helper Functions for CamelCase <-> snake_case conversion
function mapToCamelCase($data) {
    $result = [];
    foreach ($data as $key => $value) {
        $camelKey = lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $key))));
        
        // Manual override untuk field spesifik
        if ($key === 'url_hash') $camelKey = 'urlHash';
        if ($key === 'external_url') $camelKey = 'externalUrl';
        if ($key === 'video_url') $camelKey = 'videoUrl';
        if ($key === 'video_url2') $camelKey = 'videoUrl2';
        if ($key === 'link_url') $camelKey = 'linkUrl';
        if ($key === 'link_text') $camelKey = 'linkText';
        if ($key === 'is_visible') $camelKey = 'isVisible';
        if ($key === 'image_url') $camelKey = 'imageUrl';
        if ($key === 'google_api_key') $camelKey = 'googleApiKey';
        
        $result[$camelKey] = $value;
    }
    return $result;
}

// 4. Handle Requests
$method = $_SERVER['REQUEST_METHOD'];

// --- GET: FETCH DATA (Load Live Site) ---
if ($method === 'GET') {
    try {
        // A. Fetch Modules
        $stmt = $pdo->query("SELECT * FROM app_modules ORDER BY id ASC");
        $rawModules = $stmt->fetchAll();
        $modules = array_map(function($m) {
            $mapped = mapToCamelCase($m);
            // Convert boolean/int visible to boolean
            $mapped['visible'] = (bool)$mapped['visible'];
            return $mapped;
        }, $rawModules);

        // B. Fetch General Config
        $stmt = $pdo->query("SELECT * FROM landing_config LIMIT 1");
        $rawConfig = $stmt->fetch();
        // Default fallback if empty DB
        if (!$rawConfig) {
             $rawConfig = [
                 'hero_title' => 'Apps PDB', 'hero_subtitle' => '', 'hero_description' => '',
                 'contact_email' => '', 'contact_address1' => '', 'contact_address2' => '', 'google_api_key' => ''
             ];
        }
        $landingContent = mapToCamelCase($rawConfig);

        // C. Fetch Slides
        $stmt = $pdo->query("SELECT * FROM landing_slides ORDER BY sort_order ASC");
        $rawSlides = $stmt->fetchAll();
        $landingContent['slides'] = array_map('mapToCamelCase', $rawSlides);

        // D. Fetch Sections
        $stmt = $pdo->query("SELECT * FROM landing_sections ORDER BY sort_order ASC");
        $rawSections = $stmt->fetchAll();
        $landingContent['sections'] = array_map(function($s) {
            $mapped = mapToCamelCase($s);
            $mapped['isVisible'] = (bool)$mapped['isVisible'];
            return $mapped;
        }, $rawSections);

        // E. Fetch Gallery
        $stmt = $pdo->query("SELECT * FROM landing_gallery ORDER BY sort_order ASC");
        $rawGallery = $stmt->fetchAll();
        $landingContent['gallery'] = array_map('mapToCamelCase', $rawGallery);

        echo json_encode([
            "modules" => $modules,
            "landingContent" => $landingContent
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

// --- POST: PUBLISH DATA (Save Draft to Live DB) ---
elseif ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON payload"]);
        exit();
    }

    $modules = $input['modules'] ?? [];
    $content = $input['landingContent'] ?? [];

    try {
        $pdo->beginTransaction();

        // 1. Save Modules
        $pdo->exec("DELETE FROM app_modules");
        $sqlMod = "INSERT INTO app_modules (id, name, description, icon, color, status, url_hash, external_url, visible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmtMod = $pdo->prepare($sqlMod);
        
        foreach ($modules as $m) {
            $stmtMod->execute([
                $m['id'], $m['name'], $m['description'], $m['icon'], $m['color'], 
                $m['status'], $m['urlHash'], $m['externalUrl'] ?? null, $m['visible'] ? 1 : 0
            ]);
        }

        // 2. Save Landing Config (Update Row 1)
        // Ensure row 1 exists
        $pdo->exec("INSERT IGNORE INTO landing_config (id, hero_title, hero_subtitle, hero_description, contact_email, contact_address1, contact_address2) VALUES (1, '', '', '', '', '', '')");
        
        $sqlConfig = "UPDATE landing_config SET 
            hero_title = ?, hero_subtitle = ?, hero_description = ?, 
            contact_email = ?, contact_address1 = ?, contact_address2 = ?,
            google_api_key = ? 
            WHERE id = 1";
        $stmtConfig = $pdo->prepare($sqlConfig);
        $stmtConfig->execute([
            $content['heroTitle'], $content['heroSubtitle'], $content['heroDescription'],
            $content['contactEmail'], $content['contactAddress1'], $content['contactAddress2'],
            $content['googleApiKey'] ?? ''
        ]);

        // 3. Save Slides
        $pdo->exec("DELETE FROM landing_slides");
        $sqlSlide = "INSERT INTO landing_slides (id, image_url, title, subtitle, sort_order) VALUES (?, ?, ?, ?, ?)";
        $stmtSlide = $pdo->prepare($sqlSlide);
        foreach (($content['slides'] ?? []) as $i => $s) {
            $stmtSlide->execute([$s['id'], $s['imageUrl'], $s['title'] ?? '', $s['subtitle'] ?? '', $i]);
        }

        // 4. Save Sections
        $pdo->exec("DELETE FROM landing_sections");
        $sqlSec = "INSERT INTO landing_sections (id, title, subtitle, content, variant, video_url, video_url2, link_url, link_text, is_visible, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmtSec = $pdo->prepare($sqlSec);
        foreach (($content['sections'] ?? []) as $i => $s) {
            $stmtSec->execute([
                $s['id'], $s['title'], $s['subtitle'] ?? null, $s['content'], 
                $s['variant'], $s['videoUrl'] ?? null, $s['videoUrl2'] ?? null, 
                $s['linkUrl'] ?? null, $s['linkText'] ?? null, 
                $s['isVisible'] ? 1 : 0, $i
            ]);
        }

        // 5. Save Gallery
        $pdo->exec("DELETE FROM landing_gallery");
        $sqlGal = "INSERT INTO landing_gallery (id, image_url, caption, sort_order) VALUES (?, ?, ?, ?)";
        $stmtGal = $pdo->prepare($sqlGal);
        foreach (($content['gallery'] ?? []) as $i => $g) {
            $stmtGal->execute([$g['id'], $g['imageUrl'], $g['caption'] ?? '', $i]);
        }

        $pdo->commit();
        echo json_encode(["success" => true, "message" => "Changes published successfully"]);

    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data: " . $e->getMessage()]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method not allowed"]);
}