const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');
appJs = appJs.replace(/Ã°Å¸â€ â€™/g, '\uD83D\uDD13');
appJs = appJs.replace(/Ã°Å¸â€ â€œ/g, '\uD83D\uDD12');
appJs = appJs.replace(/★/g, '\u2605');
appJs = appJs.replace(/ÃƒÂ³|Ã³/g, '\u00F3'); // 
appJs = appJs.replace(/ÃƒÂ¡|Ã¡/g, '\u00E1'); // 
appJs = appJs.replace(/ÃƒÂ±|Ã±/g, '\u00F1'); // 
appJs = appJs.replace(/ÃƒÂ©|Ã©/g, '\u00E9'); // 
appJs = appJs.replace(/ÃƒÂ­|Ã­/g, '\u00ED'); // 
appJs = appJs.replace(/ÃƒÂº|Ãº/g, '\u00FA'); // 
appJs = appJs.replace(/Ã‚Â¡/g, '\u00ñ'); // 

appJs = appJs.replace(/Din\u00E1mico/g, 'Dinmico');
appJs = appJs.replace(/Da\u00F1o/g, 'Dao');
fs.writeFileSync('app.js', appJs, 'utf8');

let dbJs = fs.readFileSync('database.js', 'utf8');
dbJs = dbJs.replace(/Visión/g, 'Visin');
dbJs = dbJs.replace(/Pequeño/g, 'Pequeo');
dbJs = dbJs.replace(/tamaño/g, 'tamao');
dbJs = dbJs.replace(/daño/g, 'dao');
dbJs = dbJs.replace(/Mágico/g, 'Mgico');
dbJs = dbJs.replace(/Evocación/g, 'Evocacin');
dbJs = dbJs.replace(/Conjuración/g, 'Conjuracin');
dbJs = dbJs.replace(/Concentración/g, 'Concentracin');
dbJs = dbJs.replace(/Engañar/g, 'Engaar');
dbJs = dbJs.replace(/Artesan\xADa/g, 'Artesana');
dbJs = dbJs.replace(/Rápidos/g, 'Rpidos');
dbJs = dbJs.replace(/Atlético/g, 'Atltico');

dbJs = dbJs.replace(/Rpido/g, 'Rpido');
dbJs = dbJs.replace(/Msica Brdica/g, 'Msica Brdica');
dbJs = dbJs.replace(/informacin/g, 'informacin');
dbJs = dbJs.replace(/energa/g, 'energa');
dbJs = dbJs.replace(/Compaero/g, 'Compaero');
dbJs = dbJs.replace(/Empata/g, 'Empata');
dbJs = dbJs.replace(/Rfaga/g, 'Rfaga');
dbJs = dbJs.replace(/Dao/g, 'Dao');
dbJs = dbJs.replace(/dao/g, 'dao');
dbJs = dbJs.replace(/Aade/g, 'Aade');
dbJs = dbJs.replace(/da/g, 'da');
dbJs = dbJs.replace(/Imposicin/g, 'Imposicin');
dbJs = dbJs.replace(/engaar/g, 'engaar');
dbJs = dbJs.replace(/mgico/g, 'mgico');

fs.writeFileSync('database.js', dbJs, 'utf8');
