@ECHO = OFF
cls
echo "Commiting changes..."
IF %1=="" GOTO stop

echo "Copy js and css to root scope..."
cp docs/js/metro/*.* js
cp docs/css/metro-*.css css

echo "Compress js adn css files..."
cd compress
node compress.js

echo "Copy compressed files..."
cd ..
cp min/metro.min.js docs/js

echo "Adding files to git"
git add .
echo "Commit changes"
git commit -am %1

exit 0

:stop
