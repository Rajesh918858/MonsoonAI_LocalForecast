@echo off
title Pushing MonsoonAI_LocalForecast to GitHub
cd /d "%~dp0"
echo ========================================================
echo Pushing MonsoonSathi Project to GitHub...
echo Repo: https://github.com/Rajesh918858/MonsoonAI_LocalForecast.git
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo SUCCESS! Project successfully pushed to GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo Push encountered an issue. Please check the error above.
    echo ========================================================
)
echo.
pause
