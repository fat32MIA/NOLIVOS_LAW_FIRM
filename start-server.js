const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando servidor...');

// Función para ejecutar un comando
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    console.log(`Ejecutando: ${command} ${args.join(' ')}`);
    
    const process = spawn(command, args, { 
      stdio: 'inherit',
      shell: true
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`El comando ${command} falló con código ${code}`));
      }
    });
  });
}

// Función principal
async function main() {
  try {
    // Iniciar el servidor
    await runCommand('next', ['start']);
  } catch (error) {
    console.error('Error:', error.message);
    console.log('Intentando método alternativo...');
    
    try {
      // Método alternativo
      await runCommand('node', ['.next/standalone/server.js']);
    } catch (altError) {
      console.error('Error con método alternativo:', altError.message);
      process.exit(1);
    }
  }
}

// Ejecutar la función principal
main();
