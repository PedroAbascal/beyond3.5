import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_rest = '''    // --- RESTING SYSTEM ---
    const btnShortRest = document.getElementById("btn-short-rest");
    if (btnShortRest) {
        btnShortRest.addEventListener("click", () => {
            alert("En un Descanso Corto puedes tirar Dados de Golpe (Futuro).");
        });
    }
    
    const btnLongRest = document.getElementById("btn-long-rest");
    if (btnLongRest) {
        btnLongRest.addEventListener("click", () => {
            if(confirm("Seguro que quieres tomar un Descanso Largo? Esto restaurara tus HP y Espacios de Conjuro.")) {
                let maxHp = document.getElementById("hp-total").value;
                let currentHpEl = document.getElementById("hp-current");
                if (currentHpEl) {
                    currentHpEl.value = maxHp;
                    currentHpEl.dispatchEvent(new Event('input'));
                }
                localStorage.removeItem("dnd35_used_slots");
                if(window.renderSpells) window.renderSpells();
                alert("Descanso completado. Estas a tope.");
            }
        });
    }'''

new_rest = '''    // --- RESTING SYSTEM ---
    const btnShortRest = document.getElementById("btn-short-rest");
    if (btnShortRest) {
        btnShortRest.addEventListener("click", async () => {
            let currentLevel = parseInt(localStorage.getItem('dnd35_level')) || 1;
            let usedHD = parseInt(localStorage.getItem('dnd35_used_hd')) || 0;
            let availableHD = currentLevel - usedHD;
            
            if (availableHD <= 0) {
                alert("No te quedan Dados de Golpe disponibles para gastar. Necesitas un Descanso Largo.");
                return;
            }

            let charClassInput = document.getElementById("char-class").value || "";
            let baseClass = "";
            for (let key in window.DND_DB.classes) {
                if (charClassInput.toLowerCase().includes(window.DND_DB.classes[key].name.toLowerCase())) {
                    baseClass = key; break;
                }
            }
            
            let hitDie = baseClass && window.DND_DB.classes[baseClass] ? window.DND_DB.classes[baseClass].hitDie : 8;
            
            let amountStr = prompt(Descanso Corto: Tienes  dado(s) de golpe (d) disponibles. ¿Cuántos quieres gastar?, "1");
            if (amountStr === null) return;
            
            let amount = parseInt(amountStr);
            if (isNaN(amount) || amount <= 0 || amount > availableHD) {
                alert("Cantidad inválida.");
                return;
            }
            
            let conScore = parseInt(document.getElementById("attr-con").value) || 10;
            let conMod = Math.floor((conScore - 10) / 2);
            let totalMod = conMod * amount;
            let modStr = totalMod >= 0 ? "+" + totalMod : "" + totalMod;
            
            let formula = ${amount}d;
            
            // Register usage
            localStorage.setItem('dnd35_used_hd', usedHD + amount);
            
            if (window.diceRoller) {
                let healed = await window.diceRoller.roll(formula, "Descanso Corto");
                
                let currentHpEl = document.getElementById("hp-current");
                let maxHp = parseInt(document.getElementById("hp-total").value) || 10;
                if (currentHpEl && healed) {
                    let newHp = parseInt(currentHpEl.value) + healed;
                    if (newHp > maxHp) newHp = maxHp;
                    currentHpEl.value = newHp;
                    currentHpEl.dispatchEvent(new Event('input'));
                }
            }
        });
    }
    
    const btnLongRest = document.getElementById("btn-long-rest");
    if (btnLongRest) {
        btnLongRest.addEventListener("click", () => {
            if(confirm("¿Seguro que quieres tomar un Descanso Largo? Esto restaurará tus HP, Dados de Golpe y Espacios de Conjuro.")) {
                let maxHp = document.getElementById("hp-total").value;
                let currentHpEl = document.getElementById("hp-current");
                if (currentHpEl) {
                    currentHpEl.value = maxHp;
                    currentHpEl.dispatchEvent(new Event('input'));
                }
                localStorage.removeItem("dnd35_used_slots");
                localStorage.removeItem("dnd35_used_hd"); // Resetea dados de golpe
                if(window.renderSpells) window.renderSpells();
                alert("Descanso completado. Estás a tope.");
            }
        });
    }'''

app = app.replace(old_rest, new_rest)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
