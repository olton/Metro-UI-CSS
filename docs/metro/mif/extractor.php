<?php
$svg = file_get_contents(dirname(__FILE__)."/metro.svg");
$xml = simplexml_load_string($svg);
$icons = [];
foreach ($xml->defs->font->glyph as $glyph) {
    if (!isset($glyph['glyph-name'])) continue;
    $g = '&#x'.dechex(unpack('N', mb_convert_encoding($glyph['unicode'], 'UCS-4BE', 'UTF-8'))[1]);
    $n = (string)$glyph['glyph-name'];
    $d = (string)$glyph['d'];

    $icons[$n] = [$g, $d];
}

$file = fopen("metro-icons.js", "w");
if (!$file) {
    die ("Error creating file metro-icons.js");
}
try {
    fwrite($file, "var metro_icons = [\n");
    foreach ($icons as $name=>$glyph) {
        fwrite($file, "\t{name: '$name', unicode: '$glyph[0]', draw: '$glyph[1]'}\n");
    }
    fwrite($file, "];\n");
} finally {
    fclose($file);
}
