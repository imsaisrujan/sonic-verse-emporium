
const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backend = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
});

// Start Vite dev server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

// Handle process exit
process.on('SIGINT', () => {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
});

console.log('🚀 Development servers started');
console.log('📱 Frontend: http://localhost:5173');
console.log('🔌 Backend: http://localhost:5000');
