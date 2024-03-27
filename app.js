// app.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ruta a la carpeta de archivos estáticos
app.use('/audio-files', express.static(path.join(__dirname, 'audio-files')));

// Lista de DJ sets disponibles
const djSets = [
  { name: 'si-no-duermes-sale-mejor', title: 'Si No Duermes, Sale Mejor' },
  { name: 'de-la-hardgroove-hipnotica-b2b-cinder', title: 'De la HardGroove Hipnotica b2b Cinder' }
];

// Endpoint para renderizar la página HTML con enlaces a cada DJ set
app.get('/audio', (req, res) => {
  // Construir la lista de enlaces a cada DJ set
  const djSetLinks = djSets.map(djSet => `<li><a href="/audio/${djSet.name}">${djSet.title}</a></li>`).join('');

  // Renderizar la página HTML con los enlaces a cada DJ set
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DJ Sets Disponibles</title>
    </head>
    <body>
      <h1>DJ Sets Disponibles</h1>
      <ul>
        ${djSetLinks}
      </ul>
    </body>
    </html>
  `);
});

// Endpoint para renderizar la página HTML con el reproductor de audio
app.get('/audio/:djSet', (req, res) => {
  const djSet = req.params.djSet; // Obtener el nombre del DJ set desde los parámetros de la URL
  const audioFileName = `${djSet}.mp3`; // Construir el nombre del archivo de audio
  const audioUrl = `/audio-files/${audioFileName}`; // URL relativa al archivo dentro de la carpeta 'audio-files'

  // Renderizar la página HTML con el reproductor de audio
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reproductor de audio para ${djSet}</title>
    </head>
    <body>
      <h1>Reproductor de audio para ${djSet}</h1>
      <audio controls autoplay>
        <source src="${audioUrl}" type="audio/mpeg">
        Tu navegador no soporta la reproducción de audio.
      </audio>
      <p><a href="/audio">Volver a DJ Sets Disponibles</a></p>
    </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
