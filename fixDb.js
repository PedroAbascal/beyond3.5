const fs = require('fs');
let content = fs.readFileSync('database.js', 'utf8');

const featuresBarbarian = 'features: [{name: "Furia", type: "free", desc: "+4 Fue, +4 Con, +2 Vol, -2 CA."}, {name: "Movimiento Rpido", type: "passive", desc: "+10 pies velocidad."}],';
const featuresBard = 'features: [{name: "Msica Brdica", type: "standard", desc: "Inspirar valor, fascinar, etc."}, {name: "Conocimiento de Bardo", type: "free", desc: "Tirada para recordar informacin."}],';
const featuresCleric = 'features: [{name: "Expulsar Muertos Vivientes", type: "standard", desc: "Canaliza energa divina para ahuyentar o destruir muertos vivientes."}],';
const featuresDruid = 'features: [{name: "Compaero Animal", type: "passive", desc: "Tienes un compaero animal leal."}, {name: "Empata Salvaje", type: "standard", desc: "Mejora la actitud de un animal."}],';
const featuresFighter = 'features: [{name: "Dotes Adicionales", type: "passive", desc: "Recibes dotes de combate adicionales en niveles pares y nivel 1."}],';
const featuresMonk = 'features: [{name: "Rfaga de Golpes", type: "full", desc: "Ataques adicionales desarmado con penalizador."}, {name: "Ataque Desarmado", type: "passive", desc: "Dao mejorado al pelear sin armas."}],';
const featuresPaladin = 'features: [{name: "Castigar al Mal", type: "free", desc: "Aade Cha al Ataque, Nivel al Dao contra un ser maligno (x1/da inicial)."}, {name: "Detectar el Mal", type: "standard", desc: "A voluntad."}, {name: "Imposicin de Manos", type: "standard", desc: "Cura (Nivel x Cha) PG al da."}],';
const featuresRanger = 'features: [{name: "Enemigo Predilecto", type: "passive", desc: "+2 a dao, engaar, escuchar, averiguar intenciones, avistar y supervivencia contra enemigo."}, {name: "Empata Salvaje", type: "standard", desc: "Mejora actitud de un animal."}],';
const featuresRogue = 'features: [{name: "Ataque Furtivo", type: "passive", desc: "+1d6 dao si el objetivo pierde bono de Destreza a la CA o lo flanqueas."}, {name: "Encontrar Trampas", type: "passive", desc: "Buscar trampas con CD mayor a 20."}],';
const featuresSorcerer = 'features: [{name: "Invocar Familiar", type: "standard", desc: "Obtienes un familiar mgico."}],';
const featuresWizard = 'features: [{name: "Invocar Familiar", type: "standard", desc: "Obtienes un familiar mgico."}, {name: "Inscribir Rollo", type: "passive", desc: "Dote adicional a nivel 1."}],';

content = content.replace(/("barbarian":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresBarbarian + '\n');
content = content.replace(/("bard":\s*\{[\s\S]*?classSkills:\s*\[.*?\]),\n(\s*spellcaster:\s*\{.*?\}[\s\n]*)/, '1,\n2,\n            ' + featuresBard + '\n');
content = content.replace(/("cleric":\s*\{[\s\S]*?classSkills:\s*\[.*?\]),\n(\s*spellcaster:\s*\{.*?\}[\s\n]*)/, '1,\n2,\n            ' + featuresCleric + '\n');
content = content.replace(/("druid":\s*\{[\s\S]*?classSkills:\s*\[.*?\]),\n(\s*spellcaster:\s*\{.*?\}[\s\n]*)/, '1,\n2,\n            ' + featuresDruid + '\n');
content = content.replace(/("fighter":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresFighter + '\n');
content = content.replace(/("monk":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresMonk + '\n');
content = content.replace(/("paladin":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresPaladin + '\n');
content = content.replace(/("ranger":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresRanger + '\n');
content = content.replace(/("rogue":\s*\{[\s\S]*?classSkills:\s*\[.*?\])\n/, '1,\n            ' + featuresRogue + '\n');
content = content.replace(/("sorcerer":\s*\{[\s\S]*?classSkills:\s*\[.*?\]),\n(\s*spellcaster:\s*\{.*?\}[\s\n]*)/, '1,\n2,\n            ' + featuresSorcerer + '\n');
content = content.replace(/("wizard":\s*\{[\s\S]*?classSkills:\s*\[.*?\]),\n(\s*spellcaster:\s*\{.*?\}[\s\n]*)/, '1,\n2,\n            ' + featuresWizard + '\n');

fs.writeFileSync('database.js', content, 'utf8');
