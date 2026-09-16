with open('app.js', 'a', encoding='utf-8') as f:
    f.write('''
    // --- RESTING SYSTEM ---
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
    }
    
    document.querySelectorAll(".condition-cb").forEach(cb => {
        cb.addEventListener("change", () => {
            if(window.updateCalculations) window.updateCalculations();
        });
    });
''')
