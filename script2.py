import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Update Calculations
new_update = '''    window.updateCalculations = function updateCalculations() {
        let mods = {};
        const featMods = getFeatMods();

        for (let attrId in attributes) {
            const input = document.getElementById(attrId);
            const modId = attributes[attrId];
            const mod = calcModifier(input.value);
            mods[attrId] = mod;
            if(document.getElementById(modId)) {
                document.getElementById(modId).innerText = formatMod(mod);
                document.getElementById(modId).setAttribute("data-formula", 1d20);
            }
        }

        const inventory = JSON.parse(localStorage.getItem("dnd35_inventory") || "[]");
        let armorAc = 0;
        let shieldAc = 0;
        let totalAcp = 0;
        let maxDex = 99;
        let totalWeight = 0;

        inventory.forEach(item => {
            let itemWeight = parseFloat(item.weight) || 0;
            totalWeight += itemWeight;
            if (item.isEquipped) {
                if (item.type === "Armadura") {
                    armorAc += item.acBonus || 0;
                    if (item.maxDex !== undefined && item.maxDex < maxDex) maxDex = item.maxDex;
                    totalAcp += item.acp || 0;
                }
                if (item.type === "Escudo") {
                    shieldAc += item.acBonus || 0;
                    totalAcp += item.acp || 0;
                }
            }
        });

        // Calculadora de Carga (Encumbrance)
        let strScore = parseInt(document.getElementById('attr-str')?.value) || 10;
        // Formula simplificada 3.5e: Carga ligera <= 33 lbs a FUE 10. (FUE * 3.3 approx, pero usemos regla cruda: 10=33, 15=66, 18=100)
        // Regla oficial aproximada carga ligera max = (STR^2) * 0.33 si es <= 10. Un hack rapido: strScore * 3.3
        let lightLoad = Math.floor(strScore * 3.3);
        if (strScore > 10) lightLoad = Math.floor(33 * Math.pow(1.15, strScore - 10)); // pseudo curva

        let encStatus = "Ligera (Sin Penalizador)";
        let encColor = "green";
        let isEncumbered = false;

        if (totalWeight > lightLoad * 2) {
            encStatus = "Pesada (-6 DES, Vel -10)";
            encColor = "red";
            isEncumbered = true;
            maxDex = Math.min(maxDex, 1);
            totalAcp -= 6;
        } else if (totalWeight > lightLoad) {
            encStatus = "Media (-3 DES, Vel -10)";
            encColor = "orange";
            isEncumbered = true;
            maxDex = Math.min(maxDex, 3);
            totalAcp -= 3;
        }

        if(document.getElementById('weight-current')) document.getElementById('weight-current').innerText = totalWeight.toFixed(1);
        if(document.getElementById('weight-max')) document.getElementById('weight-max').innerText = lightLoad;
        if(document.getElementById('encumbrance-status')) {
            document.getElementById('encumbrance-status').innerText = encStatus;
            document.getElementById('encumbrance-status').style.color = encColor;
        }

        // Leer Condiciones
        let isProne = document.getElementById('cond-prone')?.checked || false;
        let isBlinded = document.getElementById('cond-blinded')?.checked || false;
        let isEntangled = document.getElementById('cond-entangled')?.checked || false;
        let isShaken = document.getElementById('cond-shaken')?.checked || false;

        let condAcPen = 0;
        let condAtkPen = 0;
        
        if (isBlinded) { condAcPen -= 2; maxDex = -99; } // Pierde bono DES a CA
        if (isEntangled) { condAtkPen -= 2; maxDex = Math.min(maxDex, maxDex > -99 ? mods['attr-dex'] - 2 : maxDex); }
        if (isShaken) { condAtkPen -= 2; }
        // Prone penalizes melee by 4, ranged by 0. We'll do generic -4 for simplicity in basic sheet
        if (isProne) { condAtkPen -= 4; }

        let dexMod = mods["attr-dex"] || 0;
        if (maxDex === -99) dexMod = 0; // Pierde bono
        else if (dexMod > maxDex) dexMod = maxDex;

        const finalDexAc = dexMod;
        
        if(document.getElementById("ac-armor")) document.getElementById("ac-armor").value = armorAc;
        if(document.getElementById("ac-shield")) document.getElementById("ac-shield").value = shieldAc;
        if(document.getElementById("ac-dex")) document.getElementById("ac-dex").value = finalDexAc;
        
        const miscAc = (parseInt(document.getElementById("ac-misc")?.value) || 0) + featMods.ac + condAcPen;
        const totalAc = 10 + armorAc + shieldAc + finalDexAc + miscAc;
        if(document.getElementById("ac-total")) document.getElementById("ac-total").value = totalAc;

        const initTotal = dexMod + featMods.init;
        const initEl = document.getElementById("combat-init");
        if(initEl) {
            initEl.value = formatMod(initTotal);
            initEl.setAttribute("data-formula", 1d20);
        }

        for (let saveId in saves) {
            const save = saves[saveId];
            const baseVal = parseInt(document.getElementById(save.base)?.value) || 0;
            const attrMod = mods[save.attr] || 0;
            let fMod = 0;
            if (saveId === "save-fort") fMod = featMods.save_fort;
            if (saveId === "save-ref") fMod = featMods.save_ref;
            if (saveId === "save-will") fMod = featMods.save_will;
            if (isShaken) fMod -= 2; // Penalizador
            
            const total = baseVal + attrMod + fMod;
            
            if(document.getElementById(save.modDisplay)) document.getElementById(save.modDisplay).innerText = formatMod(attrMod);
            const totalEl = document.getElementById(save.total);
            if(totalEl) {
                totalEl.value = formatMod(total);
                totalEl.setAttribute("data-formula", 1d20);
            }
        }

        // Guardar variables globales para usar en renderActions
        window.combatCondAtkPen = condAtkPen;
        window.isEncumbered = isEncumbered;

        if (typeof renderWeapons === 'function') renderWeapons();
        if (typeof renderActions === 'function') renderActions();
    }'''

app = re.sub(r'window\.updateCalculations = function updateCalculations\(\) \{[\s\S]*?typeof renderActions === \'function\'\) renderActions\(\);\n    \}', new_update, app)

# 2. Update renderActions to use condAtkPen and encumbered speed
app = app.replace('let firstAtk = babArray[0] + atkMod;', 'let firstAtk = babArray[0] + atkMod + (window.combatCondAtkPen || 0);')
app = app.replace('let totalAtk = bab + atkMod;', 'let totalAtk = bab + atkMod + (window.combatCondAtkPen || 0);')
app = app.replace('let firstAtk = mBabArray[0];', 'let firstAtk = mBabArray[0] + (window.combatCondAtkPen || 0);')
app = app.replace('let atkStr = bab >= 0 ?', 'let tBab = bab + (window.combatCondAtkPen || 0); let atkStr = tBab >= 0 ? "+" + tBab : "" + tBab; //')
app = app.replace('let speed = document.getElementById(\'combat-speed\')?.value || \'30 pies\';', '''let speed = document.getElementById('combat-speed')?.value || '30 pies';
        if (window.isEncumbered) speed = speed.replace('30', '20').replace('40', '30');''')

# 3. Rest Buttons Handlers (Append to end of app.js)
rest_listeners = '''

    // --- RESTING SYSTEM ---
    document.getElementById("btn-short-rest")?.addEventListener("click", () => {
        alert("En un Descanso Corto puedes tirar Dados de Golpe (Futuro).");
    });
    
    document.getElementById("btn-long-rest")?.addEventListener("click", () => {
        if(confirm("¿Seguro que quieres tomar un Descanso Largo? Esto restaurará tus HP y Espacios de Conjuro.")) {
            let maxHp = document.getElementById("hp-total").value;
            let currentHpEl = document.getElementById("hp-current");
            if (currentHpEl) {
                currentHpEl.value = maxHp;
                currentHpEl.dispatchEvent(new Event('input'));
            }
            localStorage.removeItem("dnd35_used_slots"); // Clear spells
            if(window.renderSpells) window.renderSpells();
            alert("Descanso completado. Estás a tope.");
        }
    });
    
    document.querySelectorAll(".condition-cb").forEach(cb => {
        cb.addEventListener("change", () => {
            updateCalculations();
        });
    });
'''

app += rest_listeners

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
