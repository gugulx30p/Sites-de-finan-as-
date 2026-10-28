@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "PORT=5050"
set "PY="

 echo ========================================
 echo  SOBRA - iniciando servidor local
 echo ========================================
 echo.

REM Corrige o nome duplicado que o navegador pode criar ao baixar o arquivo.
if not exist "SOBRA.html" (
    if exist "SOBRA (2).html" (
        echo Encontrei "SOBRA (2).html". Criando a copia com o nome esperado...
        copy /Y "SOBRA (2).html" "SOBRA.html" >nul
    )
)

REM Se recebeu outro sufixo, usa o primeiro SOBRA*.html disponivel.
if not exist "SOBRA.html" (
    for %%F in (SOBRA*.html) do (
        if exist "%%~fF" if not exist "SOBRA.html" (
            echo Usando o arquivo "%%~nxF" e criando "SOBRA.html"...
            copy /Y "%%~fF" "SOBRA.html" >nul
        )
    )
)

if not exist "SOBRA.html" (
    echo ERRO: nao encontrei o arquivo SOBRA.html nesta pasta.
    echo Coloque o arquivo HTML do SOBRA junto deste .bat.
    echo.
    echo Arquivos HTML encontrados:
    dir /b "*.html" 2>nul
    pause
    exit /b 1
)

REM Evita abrir um servidor antigo na mesma porta e mostrar erro 404.
netstat -ano | findstr /R /C:":5050 .*LISTENING" >nul
if not errorlevel 1 (
    echo A porta 5050 ja esta ocupada por outro servidor.
    echo.
    echo Feche a janela preta do servidor antigo (app.py ou outro SOBRA)
    echo e execute este arquivo novamente.
    echo O endereco localhost:5050 foi mantido para preservar os dados salvos.
    echo.
    pause
    exit /b 2
)

where py >nul 2>&1
if not errorlevel 1 set "PY=py"
if not defined PY (
    where python >nul 2>&1
    if not errorlevel 1 set "PY=python"
)

if not defined PY (
    echo Python nao foi encontrado neste computador.
    echo Instale o Python ou use o app.py que voce ja utiliza.
    pause
    exit /b 1
)

start "SOBRA - servidor local" /D "%~dp0" cmd /k %PY% -m http.server %PORT% --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" "http://localhost:5050/SOBRA.html"

echo.
echo O SOBRA foi aberto em http://localhost:5050/SOBRA.html
 echo Deixe a janela do servidor aberta enquanto usa o site.
echo Para encerrar, feche a janela preta do servidor.
endlocal
