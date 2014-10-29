cp docs/js/metro/*.* js
cp docs/css/metro-*.css css

cd compress
node compressor.js

cd ..
cp min/metro.min.js docs/js

git add .
git commit -am %1

