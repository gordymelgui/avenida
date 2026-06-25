const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// MIME types para diferentes tipos de archivo
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Strip query parameters
    let rawUrl = req.url.split('?')[0];
    
    // Decode URL to handle spaces
    let filePath = decodeURIComponent(rawUrl);
    
    // Si es la raíz, servir index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Obtener la extensión del archivo
    const extname = path.extname(filePath);
    let contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Construir la ruta completa del archivo
    const fullPath = path.join(__dirname, filePath);
    
    // Leer y servir el archivo
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end('Error del servidor');
            }
        } else {
            // Archivo encontrado, servirlo
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Servidor Avenida funcionando en http://localhost:' + PORT);
    console.log('📁 Directorio: ' + __dirname);
    console.log('🌐 Página principal: http://localhost:' + PORT + '/index.html');
    console.log('⏹️  Presiona Ctrl+C para detener el servidor');
    console.log('-'.repeat(50));
});

// Manejar la detención del servidor
process.on('SIGINT', () => {
    console.log('\n🛑 Servidor detenido');
    process.exit();
});

