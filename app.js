// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ruta a la carpeta de archivos estáticos
app.use('/audio-files', express.static(path.join(__dirname, 'audio-files')));

// Endpoint para renderizar la página HTML con el reproductor de audio
app.get('/audio/:audioFile', (req, res) => {
  const audioFileName = req.params.audioFile; // Obtener el nombre del archivo de audio desde los parámetros de la URL
  const audioUrl = `/audio-files/${audioFileName}`; // URL relativa al archivo dentro de la carpeta 'audio-files'

  // Renderizar la etiqueta de audio
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reproductor de audio para ${audioFileName}</title>
    </head>
    <body>
      <audio controls autoplay>
        <source src="${audioUrl}" type="audio/mpeg">
        Tu navegador no soporta la reproducción de audio.
      </audio>
    </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});