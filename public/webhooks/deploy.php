<?php
// CONFIG
$webhookDeploySecret = getenv('DEPLOY_SECRET');
$pathRepo = getenv('PATH_REPO');
$pathDeploy = getenv('PATH_DEPLOY');
$pathLogFile = getenv('PATH_LOG');

// UTILS
function log_message(string $message) {
	global $pathLogFile;
	file_put_contents($pathLogFile, date('Y-m-d H:i:s') . "\t" . $message . "\n", FILE_APPEND);
}

function stop_early(int $httpCode, string $type, string $message) {
	log_message($type . $message);
	http_response_code($httpCode);
	exit($message);
}

// CHECK ENVARS
if (empty($webhookDeploySecret)) stop_early(500, "FATAL ERROR", "DEPLOY_SECRET envar not set.");
if (empty($pathRepo)) stop_early(500, "FATAL ERROR", "PATH_REPO not set.");
if (empty($pathDeploy)) stop_early(500, "FATAL ERROR", "PATH_DEPLOY envar not set.");
if (empty($pathLogFile)) stop_early(500, "FATAL ERROR", "PATH_LOG envar not set.");

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

// RUN COMMANDS
$commands = [
	"cd {$pathRepo}",
	"git pull origin main",
	"npm install",
	"npm run build",
	"rsync -av --delete --exclude '.htaccess' {$pathRepo}dist/ {$pathDeploy}"
];

$output = '';
foreach ($commands as $command) $output .= shell_exec($command . ' 2>&1');

log_message("DEPLOYMENT OUTPUT:\n" . $output);
http_response_code(200);
echo "Deployment successful.";

?>
