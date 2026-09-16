const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/Puntuaci.*?n/g, 'Puntuaci\u00F3n');
content = content.replace(/Caracter.*?sticas/g, 'Caracter\u00EDsticas');
content = content.replace(/Constituci.*?n/g, 'Constituci\u00F3n');
content = content.replace(/Sabidur.*?a/g, 'Sabidur\u00EDa');
content = content.replace(/Edici.*?n/g, 'Edici\u00F3n');
content = content.replace(/A\A\adir/g, 'A\u00F1adir');
content = content.replace(/Da\A\o/g, 'Da\u00F1o');
content = content.replace(/Salvaci.*?n/g, 'Salvaci\u00F3n');
content = content.replace(/Funci.*?n/g, 'Funci\u00F3n');

content = content.replace(/<button class="btn-move-up">.*?<\/button>/g, '<button class="btn-move-up">\u2191<\/button>');
content = content.replace(/<button class="btn-move-down">.*?<\/button>/g, '<button class="btn-move-down">\u2193<\/button>');
content = content.replace(/<button class="btn-toggle-width">.*?<\/button>/g, '<button class="btn-toggle-width">\u2194<\/button>');

fs.writeFileSync('index.html', content, 'utf8');
