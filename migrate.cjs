const fs = require('fs');
const path = require('path');

const SOURCE_FILES = [
    '../src/constants.js',
    '../src/seed-data.js',
    '../src/components.jsx',
    '../src/scheduler.js',
    '../src/app-core.jsx',
    '../src/pages/login.jsx',
    '../src/pages/notifications.jsx',
    '../src/pages/nav.jsx',
    '../src/pages/dashboard.jsx',
    '../src/pages/orders.jsx',
    '../src/pages/workorders.jsx',
    '../src/pages/planning.jsx',
    '../src/pages/production.jsx',
    '../src/pages/qc.jsx',
    '../src/pages/coating.jsx',
    '../src/pages/shipping.jsx',
    '../src/pages/cutting.jsx',
    '../src/pages/grinding.jsx',
    '../src/pages/purchasing.jsx',
    '../src/pages/stock.jsx',
    '../src/pages/admin.jsx',
    '../src/app-render.jsx',
];

let scriptContent = `import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { io } from 'socket.io-client';

window.React = React;
window.ReactDOM = ReactDOMClient;
const { useState, useEffect, useCallback, useMemo, useRef } = React;

`;

SOURCE_FILES.forEach(file => {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    content = content.replace(/const\s+\{\s*useState[^}]*\}\s*=\s*React;/g, '');
    scriptContent += '\n// --- ' + path.basename(file) + ' ---\n' + content + '\n';
});

fs.writeFileSync(path.join(__dirname, 'src/legacy-app.jsx'), scriptContent);
console.log("✅ Kodlar Vite uyumlu `legacy-app.jsx` dosyasına aktarıldı!");
