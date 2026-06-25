#!/usr/bin/env python3
"""
Servidor HTTP personalizado para Avenida
Sirve index.html como página por defecto
"""

import http.server
import socketserver
import os
from urllib.parse import urlparse

# Clase para manejar múltiples conexiones simultáneas (Threading)
class ThreadingHTTPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads = True

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parsear la URL
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Si es la raíz o no tiene extensión, servir index.html
        if path == '/' or path == '' or '.' not in path.split('/')[-1]:
            self.path = '/index.html'
        
        # Llamar al método padre para servir el archivo
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def run_server(port=8000):
    """Ejecutar el servidor en el puerto especificado"""
    handler = CustomHTTPRequestHandler
    
    # Usar ThreadingHTTPServer en lugar de TCPServer simple
    with ThreadingHTTPServer(("", port), handler) as httpd:
        print(f"Servidor Avenida MEJORADO (Multi-hilo) funcionando en http://localhost:{port}")
        print(f"Directorio: {os.getcwd()}")
        print(f"Pagina principal: http://localhost:{port}/index.html")
        print("Optimizado para streaming de video y carga paralela")
        print("Presiona Ctrl+C para detener el servidor")
        print("-" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor detenido")
            httpd.shutdown()

if __name__ == "__main__":
    run_server(8000)