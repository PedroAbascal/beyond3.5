const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const newRenderActions = \window.turnState = { standard: true, move: true, swift: true };

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
        
        std.innerHTML = ''; move.innerHTML = ''; full.innerHTML = ''; free.innerHTML = ''; passive.innerHTML = '';

        const tStandard = document.getElementById('tracker-standard');
        const tMove = document.getElementById('tracker-move');
        const tSwift = document.getElementById('tracker-swift');
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

        const addAction = (container, name, desc, costType, htmlContent) => {
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

            if (costType && costType !== 'passive' && costType !== 'free') {
                div.style.cursor = canUse ? 'pointer' : 'not-allowed';
                div.style.opacity = canUse ? '1' : '0.4';
                div.style.background = canUse ? 'rgba(0,0,0,0.03)' : 'transparent';
                if (canUse) {
                    div.addEventListener('click', (e) => {
                        if (!e.target.classList.contains('rollable')) {
                            window.consumeAction(costType);
                        }
                    });
                    div.title = "Haz clic para consumir esta accin";
                }
            } else if (costType === 'free') {
                div.style.cursor = 'pointer';
                div.style.background = 'rgba(0,0,0,0.03)';
            }
            
            if (htmlContent) {
                div.innerHTML = '<strong>' + name + '</strong>: <br><span style="color:#555;">' + htmlContent + '</span>';
            } else {
                div.innerHTML = '<strong>' + name + '</strong>: <span style="color:#555;">' + desc + '</span>';
            }
            container.appendChild(div);
        };

        let strMod = parseInt(document.getElementById('attr-mod-str')?.value) || 0;
        let dexMod = parseInt(document.getElementById('attr-mod-dex')?.value) || 0;
        let babStr = document.getElementById('combat-bab')?.value || "0";
        let babArray = babStr.split('/').map(b => parseInt(b.replace('+','')) || 0);

        // Armas del inventario
        let inventory = JSON.parse(localStorage.getItem('dnd35_inventory') || '[]');
        let hasWeapons = false;

        inventory.forEach(item => {
            if (item.type === "Arma" && item.isEquipped) {
                hasWeapons = true;
                let atkMod = item.finesse ? Math.max(strMod, dexMod) : strMod;
                if (item.ranged) atkMod = dexMod;
                let dmgMod = item.ranged ? 0 : strMod;
                let dmgStr = dmgMod >= 0 ? '+' + dmgMod : '' + dmgMod;

                // Estndar (solo el primer ataque)
                let firstAtk = babArray[0] + atkMod;
                let firstAtkStr = firstAtk >= 0 ? '+' + firstAtk : '' + firstAtk;
                let stdHtml = \\\<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20\" data-reason="Atacar con \">Atq: \</span> | \\\ +
                              \\\<span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="\\" data-reason="Dao con \">Dao: \\</span>\\\;
                addAction(std, 'Atacar (' + item.name + ')', '', 'standard', stdHtml);

                // Completo (si hay mltiples ataques)
                if (babArray.length > 1) {
                    let fullHtml = babArray.map((bab, idx) => {
                        let totalAtk = bab + atkMod;
                        let atkStr = totalAtk >= 0 ? '+' + totalAtk : '' + totalAtk;
                        return \\\<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20\" data-reason="Ataque \ con \">Atq \: \</span>\\\;
                    }).join(' ') + \\\ | <span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="\\" data-reason="Dao con \">Dao: \\</span>\\\;
                    
                    addAction(full, 'Ataque Completo (' + item.name + ')', '', 'full', fullHtml);
                }
            }
        });

        // Armas manuales
        let manualWpns = JSON.parse(localStorage.getItem('dnd35_manual_weapons') || '[]');
        manualWpns.forEach((wpn, wpnIdx) => {
            hasWeapons = true;
            let mBabArray = wpn.atk.split('/').map(a => parseInt(a) || 0);
            
            // Estndar
            let firstAtk = mBabArray[0];
            let firstAtkStr = firstAtk >= 0 ? '+' + firstAtk : '' + firstAtk;
            let stdHtml = \\\<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20\" data-reason="Atacar con \">Atq: \</span> | \\\ +
                          \\\<span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="\" data-reason="Dao con \">Dao: \</span>\\\;
            addAction(std, 'Atacar (' + wpn.name + ' - Manual)', '', 'standard', stdHtml);

            // Completo
            if (mBabArray.length > 1) {
                let fullHtml = mBabArray.map((bab, idx) => {
                    let atkStr = bab >= 0 ? '+' + bab : '' + bab;
                    return \\\<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20\" data-reason="Ataque \ con \">Atq \: \</span>\\\;
                }).join(' ') + \\\ | <span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="\" data-reason="Dao con \">Dao: \</span>\\\;
                addAction(full, 'Ataque Completo (' + wpn.name + ' - Manual)', '', 'full', fullHtml);
            }
        });

        if (!hasWeapons) {
            addAction(std, 'Atacar (Desarmado)', 'Realiza un nico ataque.', 'standard');
        }

        addAction(std, 'Defensa Total', 'No atacas, ganas +4 a tu CA durante una ronda.', 'standard');
        
        let speed = document.getElementById('combat-speed')?.value || '30 pies';
        addAction(move, 'Moverse', 'Te desplazas hasta ' + speed + '.', 'move');
        addAction(move, 'Desenvainar Arma', 'Prepara tu arma. (Gratuita si mueves y BAB > 0).', 'move');
        
        if (babArray.length <= 1) {
            addAction(full, 'Cargar', 'Te mueves hasta el doble de tu velocidad y atacas (+2 Ataque, -2 CA).', 'full');
        }
        
        let charClassInput = document.getElementById('char-class')?.value || '';
        let baseClass = '';
        for (let key in window.DND_DB.classes) {
            if (charClassInput.toLowerCase().includes(window.DND_DB.classes[key].name.toLowerCase())) {
                baseClass = key; break;
            }
        }
        
        if (baseClass && window.DND_DB.classes[baseClass].features) {
            window.DND_DB.classes[baseClass].features.forEach(feat => {
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
        
        if (typeof window.setupRollables === 'function') {
            window.setupRollables();
        }
    }\;

app = app.replace(/window\.turnState\s*=\s*\{[\s\S]*?window\.renderActions\s*=\s*function\(\)\s*\{[\s\S]*?\n    \}/, newRenderActions);
app = app.replace(/window\.renderWeapons\s*=\s*function\(\)\s*\{[\s\S]*?\n    \}/, 'window.renderWeapons = function() { /* Movido a renderActions */ }');

fs.writeFileSync('app.js', app, 'utf8');
