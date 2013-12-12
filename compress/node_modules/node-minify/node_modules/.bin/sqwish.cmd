@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\sqwish\bin\sqwish" %*
) ELSE (
  node  "%~dp0\..\sqwish\bin\sqwish" %*
)