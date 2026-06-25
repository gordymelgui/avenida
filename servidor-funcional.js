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
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg'
};

const server = http.createServer((req, res) => {
    // Parsear la URL para separar la ruta de los parámetros
    const url = require('url');
    const parsedUrl = url.parse(req.url, true);
    let filePath = parsedUrl.pathname;
    
    // Si es la raíz, servir index.html
    if (filePath === '/') {
        filePath = '/index.html';
    }
    
    // Obtener la extensión del archivo
    const extname = path.extname(filePath).toLowerCase();
    let contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Construir la ruta completa del archivo
    // Decodificar la URL para manejar espacios y caracteres especiales
    const decodedPath = decodeURIComponent(filePath);
    const fullPath = path.join(__dirname, decodedPath);
    
    // Leer y servir el archivo
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Archivo no encontrado
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>404 - Página no encontrada</title>
                        <style>
                            body { 
                                font-family: Arial, sans-serif; 
                                text-align: center; 
                                padding: 50px; 
                                background: #f8f9fa;
                            }
                            .error-container {
                                max-width: 600px;
                                margin: 0 auto;
                                background: white;
                                padding: 40px;
                                border-radius: 12px;
                                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                            }
                            h1 { color: #8357C5; font-size: 48px; margin: 0; }
                            h2 { color: #333; margin: 20px 0; }
                            p { color: #666; margin: 20px 0; }
                            a { 
                                color: #8357C5; 
                                text-decoration: none; 
                                font-weight: bold;
                                padding: 12px 24px;
                                background: #8357C5;
                                color: white;
                                border-radius: 8px;
                                display: inline-block;
                                margin-top: 20px;
                            }
                            a:hover { background: #6e48a9; }
                        </style>
                    </head>
                    <body>
                        <div class="error-container">
                            <h1>404</h1>
                            <h2>Página no encontrada</h2>
                            <p>La página que buscas no existe o ha sido movida.</p>
                            <p><strong>Archivo solicitado:</strong> ${filePath}</p>
                            <a href="/">← Volver al inicio</a>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                // Error del servidor
                res.writeHead(500);
                res.end('Error interno del servidor');
            }
        } else {
            // Archivo encontrado, servirlo
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🚀 Servidor AVENIDA funcionando correctamente');
    console.log('📁 Directorio: ' + __dirname);
    console.log('🌐 URL: http://localhost:' + PORT);
    console.log('📄 Páginas disponibles:');
    console.log('   • Página principal: http://localhost:' + PORT);
    console.log('   • Productos: http://localhost:' + PORT + '/product.html');
    console.log('   • Carrito: http://localhost:' + PORT + '/cart.html');
    console.log('   • Checkout: http://localhost:' + PORT + '/checkout.html');
    console.log('   • Admin: http://localhost:' + PORT + '/admin.html');
    console.log('⏹️  Presiona Ctrl+C para detener el servidor');
    console.log('-'.repeat(60));
});

// Manejar errores del servidor
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('❌ Error: El puerto ' + PORT + ' ya está en uso');
        console.log('💡 Intenta con otro puerto o cierra la aplicación que lo está usando');
    } else {
        console.log('❌ Error del servidor:', err.message);
    }
});

// Manejar cierre del servidor
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
    });
});
