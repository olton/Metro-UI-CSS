<?php
$svg_file = dirname(dirname(__FILE__))."/icons/metro.svg";
$svg = file_get_contents($svg_file);
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
$file2 = fopen("metro-icons-names.js", "w");
$i = 1; $count = count($icons);
try {
    fwrite($file, "var metro_icons = [\n");
    fwrite($file2, "var metro_icons = [\n");
    foreach ($icons as $name=>$glyph) {
        $comma = ($i < $count) ? "," : "";
        fwrite($file, "\t{name: '$name', unicode: '$glyph[0]', draw: '$glyph[1]'}".$comma."\n");
        fwrite($file2, "\t'$name'".$comma."\n");
        $i++;
        echo ".";
    }
    fwrite($file, "];\n");
    fwrite($file2, "];\n");
} finally {
    fclose($file);
    fclose($file2);
}
echo "\n$count icons extracted from $svg_file\n";