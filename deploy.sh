set IMAGE_NAME=%1
set IP=%2
set USER=%3
set DOCKER_PORT=%4

REM Displaying arguments
echo %USER% %IP% %IMAGE_NAME% %DOCKER_PORT%

docker build -t %IMAGE_NAME%:latest .

docker save back:latest -o %IMAGE_NAME%.tar

gzip %IMAGE_NAME%.tar

scp %IMAGE_NAME%.tar.gz %USER%@%IP%:/root/

ssh %USER%@%IP% "docker compose down && docker compose build && docker compose up"
