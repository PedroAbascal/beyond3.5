const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

const newRenderActions = \    window.turnState = { standard: true, move: true, swift: true };

    window.consumeAction = function(type) {
        if (type === 'standard' && window.turnState.standard) {
            window.turnState.standard = false;
        } else if (type === 'move' && window.turnState.move) {
            window.turnState.move = false;
        } else if (type === 'full' && window.turnState.standard && window.turnState.move) {
            window.turnState.standard = false;
            window.turnState.move = false;
        } else if (type === 'swift' && window.turnState.swift) {
            window.turnState.swift = false;
        }
        window.renderActions();
    };

    window.renderActions = function() {
        const std = document.getElementById('actions-standard');
        const move = document.getElementById('actions-move');
        const full = document.getElementById('actions-full');
        const free = document.getElementById('actions-free');
        const passive = document.getElementById('actions-passive');
        if (!std || !move || !full || !free || !passive) return;
        
        std.innerHTML = '';
        move.innerHTML = '';
        full.innerHTML = '';
        free.innerHTML = '';
        passive.innerHTML = '';

        const tStandard = document.getElementById("tracker-standard");
        const tMove = document.getElementById("tracker-move");
        const tSwift = document.getElementById("tracker-swift");
        
        if (tStandard) {
            tStandard.innerHTML = window.turnState.standard ? "?? Accin Estndar" : "? Accin Estndar";
            tStandard.style.opacity = window.turnState.standard ? "1" : "0.5";
        }
        if (tMove) {
            tMove.innerHTML = window.turnState.move ? "?? Accin de Movimiento" : "? Accin de Movimiento";
            tMove.style.opacity = window.turnState.move ? "1" : "0.5";
        }
        if (tSwift) {
            tSwift.innerHTML = window.turnState.swift ? "?? Accin Rpida" : "? Accin Rpida";
            tSwift.style.opacity = window.turnState.swift ? "1" : "0.5";
        }

        const addAction = (container, name, desc, costType) => {
            const div = document.createElement('div');
            div.style.padding = '5px';
            div.style.borderBottom = '1px solid #ccc';
            div.style.borderRadius = '3px';
            div.style.marginBottom = '2px';
            
            let canUse = true;
            if (costType === 'standard' && !window.turnState.standard) canUse = false;
            if (costType === 'move' && !window.turnState.move) canUse = false;
            if (costType === 'full' && (!window.turnState.standard || !window.turnState.move)) canUse = false;
            if (costType === 'swift' && !window.turnState.swift) canUse = false;

            if (costType && costType !== 'passive') {
                div.style.cursor = canUse ? 'pointer' : 'not-allowed';
                div.style.opacity = canUse ? '1' : '0.4';
                div.style.background = canUse ? 'rgba(0,0,0,0.03)' : 'transparent';
                
                if (canUse) {
                    div.addEventListener('click', () => window.consumeAction(costType));
                    div.title = "Haz clic para consumir esta accin";
                }
            }
            
            div.innerHTML = '<strong>' + name + '</strong>: <span style="color:#555;">' + desc + '</span>';
            container.appendChild(div);
        };

        addAction(std, 'Atacar', 'Realiza un nico ataque con un arma cuerpo a cuerpo o a distancia.', 'standard');
        addAction(std, 'Defensa Total', 'No atacas, ganas +4 a tu CA durante una ronda.', 'standard');
        
        let speed = document.getElementById('combat-speed')?.value || '30 pies';
        addAction(move, 'Moverse', 'Te desplazas hasta ' + speed + '.', 'move');
        addAction(move, 'Desenvainar Arma', 'Prepara tu arma. (Gratuita si mueves y BAB > 0).', 'move');
        
        let babStr = document.getElementById('combat-bab')?.value || '0';
        let babArray = babStr.split('/').map(b => parseInt(b.replace('+','')) || 0);
        
        if (babArray.length > 1) {
            addAction(full, 'Ataque Completo', 'Realizas ataques mltiples por tener BAB alto: ' + babStr + '.', 'full');
        } else {
            addAction(full, 'Cargar', 'Te mueves hasta el doble de tu velocidad y atacas (+2 Ataque, -2 CA).', 'full');
        }
        
        let charClassInput = document.getElementById('char-class')?.value || '';
        let baseClass = '';
        for (let key in DND_DB.classes) {
            if (charClassInput.toLowerCase().includes(DND_DB.classes[key].name.toLowerCase())) {
                baseClass = key; break;
            }
        }
        
        if (baseClass && DND_DB.classes[baseClass].features) {
            DND_DB.classes[baseClass].features.forEach(feat => {
                let target = free;
                if (feat.type === 'standard') target = std;
                if (feat.type === 'move') target = move;
                if (feat.type === 'full') target = full;
                if (feat.type === 'passive') target = passive;
                
                addAction(target, feat.name, feat.desc, feat.type);
            });
        }
        
        let spells = JSON.parse(localStorage.getItem('dnd35_spells') || '[]');
        if (spells.length > 0) {
            addAction(std, 'Lanzar Hechizo', 'Puedes lanzar cualquiera de tus hechizos conocidos de accin estndar.', 'standard');
        }
    }\;

let newContent = content.replace(/window\.renderActions\s*=\s*function\(\)\s*\{[\s\S]*?\}\s*(?=\/\/ Iniciar)/, newRenderActions + '\n\n    ');

// Add reset turn listener inside the main scope
if(!newContent.includes('btn-reset-turn')) {
    newContent = newContent.replace('// Iniciar', \    const btnResetTurn = document.getElementById('btn-reset-turn');
    if (btnResetTurn) {
        btnResetTurn.addEventListener('click', () => {
            window.turnState = { standard: true, move: true, swift: true };
            window.renderActions();
        });
    }

    // Iniciar\);
}

fs.writeFileSync('app.js', newContent, 'utf8');
