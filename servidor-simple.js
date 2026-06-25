const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.ttf': 'font/ttf',
    '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
    // Strip query parameters
    let rawUrl = req.url.split('?')[0];
    let filePath = decodeURIComponent(rawUrl);
    
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    const fullPath = path.join(__dirname, filePath);
    
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Archivo no encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Servidor Avenida funcionando en http://localhost:' + PORT);
    console.log('🌐 Abre http://localhost:' + PORT + '/index.html en tu navegador');
});
