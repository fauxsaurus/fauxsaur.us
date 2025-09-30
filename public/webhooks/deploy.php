<?php
// UTILS
function log_message(string $message) {
	global $pathLogFile;
	$timestamp = date('Y-m-d H:i:s');
	file_put_contents($pathLogFile, "{$timestamp}\t{$message}\n", FILE_APPEND);
}

function stop_early(int $httpCode, string $type, string $message) {
	log_message("{$type}: {$message}");
	http_response_code($httpCode);
	exit($message);
}

// ENVARS
[$webhookDeploySecret, $pathRepo, $pathDeploy, $pathNvm, $pathLogFile] = array_map(function($envar) {
	$value = getenv($envar);
	if (empty($value)) stop_early(500, "FATAL ERROR", "Environment variable {$envar} not set.");
	return $value;
}, explode(',', 'DEPLOY_SECRET,PATH_REPO,PATH_DEPLOY,PATH_NVM,PATH_LOG'));

// VERIFY/SECRET
$githubSignature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');
$hash = 'sha256=' . hash_hmac('sha256', $payload, $webhookDeploySecret, false);
if (!hash_equals($hash, $githubSignature)) stop_early(403, "ERROR", "Invalid signature.");

// VERIFY/EVENT
$event = $_SERVER['HTTP_X_GITHUB_EVENT'] ?? 'ping';
if ($event !== 'push') stop_early(200, "INFO", "Received non-push event '{$event}'.");

// VERIFY/BRANCH
$data = json_decode($payload, true);
$ref = $data['ref'] ?? '';
if ($ref !== 'refs/heads/main') stop_early(200, "INFO", "Push to non-main branch '{$ref}'.");

log_message("SUCCESS: Webhook signature verified. Deploying 'main' branch.");

// DEPLOY
$args = escapeshellarg($pathDeploy) . " " . escapeshellarg($pathNvm);
echo shell_exec("cd {$pathRepo}; ./scripts/deploy.sh {$args} 2>&1");

log_message("DEPLOYMENT OUTPUT:\n" . $output);
http_response_code(200);
echo "Deployment successful.";

?>
