# Ruta de la carpeta a la que deseas cambiar
$carpeta = "C:\Proyectos\Tecnología para Instituciones Educativas\web\front\"

# Cambiar de directorio (CD) al directorio especificado
Set-Location -Path $carpeta

# Comando npm que deseas ejecutar
npm run dev   # Por ejemplo, si quieres instalar las dependencias de tu proyecto

# Puedes agregar más comandos npm si lo deseas, simplemente añádelos después de este comentario

# Confirmación de finalización del script
Write-Host "Script ejecutado exitosamente."
