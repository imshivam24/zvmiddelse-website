<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:1313');

$accepted_handles = [
  'programma',
  'uitslagen'
];

$handle = $_GET['handle'];

if (!isset($handle) ||
   (!in_array($handle, $accepted_handles))) {
  exit;
}

require "vendor/autoload.php";

$uri = 'https://www.knzb.nl/vereniging__wedstrijdsport/wedstrijdsport/waterpolo/uitslagen_waterpolo/verenigingen/vereniging/DQH632Z/';

$filecontents = file_get_contents($uri);

$purifier = new HTMLPurifier();
$clean_html = $purifier->purify($filecontents);

use PHPHtmlParser\Dom;

$dom = new Dom;
$dom->load($clean_html);
$results = $dom->find('.programma');
switch ($handle) {
  case 'programma':
    $result = $results[0];
    break;

  case 'uitslagen':
    $result = $results[1];
    break;

}

if (isset($result)) {
  $anchors = $result->find('a');
  foreach ($anchors as $anchor) {
    $href = $anchor->getAttribute('href');
    $anchor->setAttribute('href', 'https://www.knzb.nl/' . $href);
    $anchor->setAttribute('target', '_blank');
  }

  echo $result;
} else {
  echo 'Er zijn op dit moment geen resultaten beschikbaar.';
}
