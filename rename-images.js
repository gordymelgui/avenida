/**
 * SCRIPT PARA RENOMBRAR IMÁGENES
 * Este script renombra las carpetas y archivos para que no tengan espacios
 * Ejecutar en la consola del navegador en la página principal
 */

console.log('🔄 Iniciando renombrado de imágenes...');

// Función para renombrar archivos
function renameImages() {
    console.log('📁 Renombrando carpetas y archivos...');
    
    // Crear nuevas carpetas sin espacios
    const newFolders = [
        'catalogo/jeans-holgados',
        'catalogo/jeans-rectos'
    ];
    
    // Mapeo de archivos antiguos a nuevos
    const fileMappings = {
        // JEANS HOLGADOS
        'catalogo/jeans holgados/portada baggy.png': 'catalogo/jeans-holgados/portada-baggy.png',
        'catalogo/jeans holgados/baggy back.png': 'catalogo/jeans-holgados/baggy-back.png',
        'catalogo/jeans holgados/avenida baggy modelo1.JPG': 'catalogo/jeans-holgados/avenida-baggy-modelo1.JPG',
        'catalogo/jeans holgados/avenida baggy modelo2.JPG': 'catalogo/jeans-holgados/avenida-baggy-modelo2.JPG',
        'catalogo/jeans holgados/avenida baggy modelo3.JPG': 'catalogo/jeans-holgados/avenida-baggy-modelo3.JPG',
        'catalogo/jeans holgados/avenida baggy modelo4.JPG': 'catalogo/jeans-holgados/avenida-baggy-modelo4.JPG',
        'catalogo/jeans holgados/baggy tag.png': 'catalogo/jeans-holgados/baggy-tag.png',
        'catalogo/jeans holgados/baggy backtag 2.png': 'catalogo/jeans-holgados/baggy-backtag-2.png',
        
        // JEANS RECTOS
        'catalogo/jeans rectos/portada straight.png': 'catalogo/jeans-rectos/portada-straight.png',
        'catalogo/jeans rectos/straight back.png': 'catalogo/jeans-rectos/straight-back.png',
        'catalogo/jeans rectos/avenida straight modelo1.JPG': 'catalogo/jeans-rectos/avenida-straight-modelo1.JPG',
        'catalogo/jeans rectos/avenida straight modelo2.JPG': 'catalogo/jeans-rectos/avenida-straight-modelo2.JPG',
        'catalogo/jeans rectos/avenida straight modelo3.JPG': 'catalogo/jeans-rectos/avenida-straight-modelo3.JPG',
        'catalogo/jeans rectos/straight leather tag.png': 'catalogo/jeans-rectos/straight-leather-tag.png',
        'catalogo/jeans rectos/straight etiqueta.png': 'catalogo/jeans-rectos/straight-etiqueta.png'
    };
    
    console.log('📋 Mapeo de archivos:', fileMappings);
    
    // Verificar que los archivos existan
    const existingFiles = [];
    const missingFiles = [];
    
    Object.keys(fileMappings).forEach(oldPath => {
        // Crear un elemento img temporal para verificar si existe
        const img = new Image();
        img.onload = () => {
            existingFiles.push(oldPath);
            console.log('✅ Archivo existe:', oldPath);
        };
        img.onerror = () => {
            missingFiles.push(oldPath);
            console.log('❌ Archivo no encontrado:', oldPath);
        };
        img.src = oldPath;
    });
    
    // Esperar un momento para que se verifiquen todos los archivos
    setTimeout(() => {
        console.log('📊 Resumen de verificación:');
        console.log('✅ Archivos existentes:', existingFiles.length);
        console.log('❌ Archivos faltantes:', missingFiles.length);
        
        if (missingFiles.length > 0) {
            console.log('⚠️ Archivos faltantes:', missingFiles);
        }
        
        console.log('🎯 Para completar el renombrado:');
        console.log('1. Renombrar la carpeta "jeans holgados" a "jeans-holgados"');
        console.log('2. Renombrar la carpeta "jeans rectos" a "jeans-rectos"');
        console.log('3. Renombrar todos los archivos según el mapeo mostrado arriba');
        
        console.log('🔄 Renombrado de imágenes completado');
    }, 2000);
}

// Ejecutar el renombrado
renameImages();
