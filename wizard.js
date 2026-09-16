document.addEventListener("DOMContentLoaded", () => {
    const wizardOverlay = document.getElementById("wizard-overlay");
    const btnWizard = document.getElementById("btn-wizard");
    const btnClose = document.getElementById("wizard-close");
    
    const steps = [
        document.getElementById("wizard-step-1"),
        document.getElementById("wizard-step-2"),
        document.getElementById("wizard-step-3")
    ];
    
    const btnPrev = document.getElementById("wizard-prev");
    const btnNext = document.getElementById("wizard-next");
    const btnFinish = document.getElementById("wizard-finish");

    let currentStep = 0;
    
    // Estado del Wizard
    let wizardData = {
        race: null,
        charClass: null,
        statMethod: 'manual',
        stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        pointBuyTotal: 25,
        rolledStats: [],
        assignedStats: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 }
    };

    const statLabels = { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };

    // Point Buy Costes
    const pbCost = { 8:0, 9:1, 10:2, 11:3, 12:4, 13:5, 14:6, 15:8, 16:10, 17:13, 18:16 };

    // Inicializar Wizard
    if (btnWizard) {
        btnWizard.addEventListener("click", () => {
            wizardOverlay.classList.remove("hidden");
            renderRaces();
            renderClasses();
            showStep(0);
        });
    }

    if (btnClose) {
        btnClose.addEventListener("click", () => {
            wizardOverlay.classList.add("hidden");
        });
    }

    function showStep(index) {
        steps.forEach((step, i) => {
            if (step) {
                if (i === index) step.classList.add("active");
                else step.classList.remove("active");
                step.style.display = i === index ? "block" : "none";
            }
        });

        const title = document.getElementById("wizard-title");
        if (index === 0) title.innerText = "CreaciÃ³n de Personaje - Paso 1: Raza";
        if (index === 1) title.innerText = "CreaciÃ³n de Personaje - Paso 2: Clase";
        if (index === 2) title.innerText = "CreaciÃ³n de Personaje - Paso 3: Atributos";

        btnPrev.classList.toggle("hidden", index === 0);
        
        if (index === steps.length - 1) {
            btnNext.classList.add("hidden");
            btnFinish.classList.remove("hidden");
            renderStatUI(); // Renderizar UI de stats al llegar al paso 3
        } else {
            btnNext.classList.remove("hidden");
            btnFinish.classList.add("hidden");
            
            if (index === 0) btnNext.disabled = !wizardData.race;
            if (index === 1) btnNext.disabled = !wizardData.charClass;
        }
        currentStep = index;
    }

    if(btnPrev) btnPrev.addEventListener("click", () => {
        if (currentStep > 0) showStep(currentStep - 1);
    });

    if(btnNext) btnNext.addEventListener("click", () => {
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });

    // Renderizar Razas
    function renderRaces() {
        const container = document.getElementById("race-options");
        if(!container) return;
        container.innerHTML = "";
        for (let key in DND_DB.races) {
            const race = DND_DB.races[key];
            const card = document.createElement("div");
            card.className = `card ${wizardData.race === key ? 'selected' : ''}`;
            card.innerText = race.name;
            
            card.addEventListener("click", () => {
                wizardData.race = key;
                document.getElementById("race-desc").innerHTML = `
                    <strong>${race.name}</strong><br>
                    TamaÃ±o: ${race.size} | Vel: ${race.speed} pies<br>
                    ${race.description}
                `;
                renderRaces();
                btnNext.disabled = false;
            });
            container.appendChild(card);
        }
    }

    // Renderizar Clases
    function renderClasses() {
        const container = document.getElementById("class-options");
        if(!container) return;
        container.innerHTML = "";
        for (let key in DND_DB.classes) {
            const cls = DND_DB.classes[key];
            const card = document.createElement("div");
            card.className = `card ${wizardData.charClass === key ? 'selected' : ''}`;
            card.innerText = cls.name;
            
            card.addEventListener("click", () => {
                wizardData.charClass = key;
                document.getElementById("class-desc").innerHTML = `
                    <strong>${cls.name}</strong><br>
                    Dado de Golpe: d${cls.hitDie} | BAB: +${cls.bab}<br>
                    ${cls.description}
                `;
                renderClasses();
                btnNext.disabled = false;
            });
            container.appendChild(card);
        }
    }

    // --- LOGICA DE ATRIBUTOS (PASO 3) ---
    const statMethodSelect = document.getElementById("stat-gen-method");
    if(statMethodSelect) {
        statMethodSelect.addEventListener("change", (e) => {
            wizardData.statMethod = e.target.value;
            // Reiniciar stats si cambiamos de mÃ©todo
            wizardData.stats = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
            if(wizardData.statMethod === 'pointbuy') {
                wizardData.stats = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
            }
            renderStatUI();
        });
    }

    function getStatColor(stat) {
        if(!wizardData.charClass) return "black";
        const cls = DND_DB.classes[wizardData.charClass];
        if(cls.primaryStats && cls.primaryStats.includes(stat)) return "blue";
        if(cls.dumpStats && cls.dumpStats.includes(stat)) return "red";
        return "black";
    }

    function renderStatUI() {
        const uiContainer = document.getElementById("stat-gen-ui");
        const statsContainer = document.getElementById("wizard-stats-container");
        if(!uiContainer || !statsContainer) return;

        uiContainer.innerHTML = "";
        statsContainer.innerHTML = "";
        
        statsContainer.style.display = "grid";
        statsContainer.style.gridTemplateColumns = "1fr 1fr";
        statsContainer.style.gap = "15px";

        const method = wizardData.statMethod;

        if (method === 'pointbuy') {
            // Calcular puntos gastados
            let spent = 0;
            for(let s in wizardData.stats) {
                spent += pbCost[wizardData.stats[s]] || 0;
            }
            let remaining = wizardData.pointBuyTotal - spent;
            
            uiContainer.innerHTML = `<strong>Puntos Restantes: ${remaining}</strong> / ${wizardData.pointBuyTotal}`;
            
            for(let s in wizardData.stats) {
                let div = document.createElement("div");
                div.style.display = "flex"; div.style.alignItems = "center"; div.style.justifyContent = "space-between";
                div.innerHTML = `
                    <label style="color: ${getStatColor(s)}; font-weight: bold; width: 40px;">${statLabels[s]}</label>
                    <button class="btn-pb-minus" data-stat="${s}" style="padding: 2px 8px;">-</button>
                    <span style="width: 30px; text-align: center; font-weight: bold;">${wizardData.stats[s]}</span>
                    <button class="btn-pb-plus" data-stat="${s}" style="padding: 2px 8px;">+</button>
                `;
                
                div.querySelector(".btn-pb-minus").addEventListener("click", (e) => {
                    let st = e.target.getAttribute("data-stat");
                    if(wizardData.stats[st] > 8) { wizardData.stats[st]--; renderStatUI(); }
                });
                div.querySelector(".btn-pb-plus").addEventListener("click", (e) => {
                    let st = e.target.getAttribute("data-stat");
                    let current = wizardData.stats[st];
                    if(current < 18) {
                        let costDiff = pbCost[current + 1] - pbCost[current];
                        if (remaining >= costDiff) { wizardData.stats[st]++; renderStatUI(); }
                    }
                });
                statsContainer.appendChild(div);
            }
            
        } else if (method === 'roll') {
            if(wizardData.rolledStats.length === 0) {
                uiContainer.innerHTML = `<button id="btn-roll-stats" class="btn-primary">Tirar 4d6 (Descartar Menor)</button>`;
                document.getElementById("btn-roll-stats").addEventListener("click", () => {
                    wizardData.rolledStats = [];
                    for(let i=0; i<6; i++) {
                        let rolls = [Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1, Math.floor(Math.random()*6)+1];
                        rolls.sort((a,b) => a-b);
                        let sum = rolls[1] + rolls[2] + rolls[3];
                        wizardData.rolledStats.push(sum);
                    }
                    wizardData.rolledStats.sort((a,b) => b-a);
                    renderStatUI();
                });
            } else {
                uiContainer.innerHTML = `<strong>Tiradas: </strong> ${wizardData.rolledStats.join(", ")} <button id="btn-roll-stats-reset" style="margin-left:10px;">Re-Tirar</button>`;
                document.getElementById("btn-roll-stats-reset").addEventListener("click", () => { wizardData.rolledStats = []; renderStatUI(); });
            }

            for(let s in statLabels) {
                let available = [...wizardData.rolledStats];
                for (let otherS in wizardData.stats) {
                    if (otherS !== s && wizardData.stats[otherS] > 0) {
                        let idx = available.indexOf(wizardData.stats[otherS]);
                        if (idx > -1) available.splice(idx, 1);
                    }
                }
                let uniqueAvailable = [...new Set(available)];
                uniqueAvailable.sort((a,b) => b-a);
                
                let div = document.createElement("div");
                div.innerHTML = `<label style="color: ${getStatColor(s)}; font-weight: bold; width: 40px; display:inline-block;">${statLabels[s]}</label>
                                 <select class="roll-assign" data-stat="${s}" style="width:60px;">
                                    <option value="0">-</option>
                                    ${uniqueAvailable.map(val => `<option value="${val}" ${wizardData.stats[s] == val ? 'selected' : ''}>${val}</option>`).join('')}
                                 </select>`;
                div.querySelector("select").addEventListener("change", (e) => {
                    wizardData.stats[e.target.getAttribute("data-stat")] = parseInt(e.target.value) || 0;
                    renderStatUI();
                });
                statsContainer.appendChild(div);
            }

        } else if (method === 'standard') {
            const arr = [15, 14, 13, 12, 10, 8];
            uiContainer.innerHTML = `<strong>Valores disponibles: 15, 14, 13, 12, 10, 8</strong>`;
            
            for(let s in statLabels) {
                let available = [...arr];
                for (let otherS in wizardData.stats) {
                    if (otherS !== s && wizardData.stats[otherS] > 0) {
                        let idx = available.indexOf(wizardData.stats[otherS]);
                        if (idx > -1) available.splice(idx, 1);
                    }
                }
                let uniqueAvailable = [...new Set(available)];
                uniqueAvailable.sort((a,b) => b-a);
                
                let div = document.createElement("div");
                div.innerHTML = `<label style="color: ${getStatColor(s)}; font-weight: bold; width: 40px; display:inline-block;">${statLabels[s]}</label>
                                 <select class="std-assign" data-stat="${s}" style="width:60px;">
                                    <option value="0">-</option>
                                    ${uniqueAvailable.map(val => `<option value="${val}" ${wizardData.stats[s] == val ? 'selected' : ''}>${val}</option>`).join('')}
                                 </select>`;
                div.querySelector("select").addEventListener("change", (e) => {
                    wizardData.stats[e.target.getAttribute("data-stat")] = parseInt(e.target.value) || 0;
                    renderStatUI();
                });
                statsContainer.appendChild(div);
            }
            
        } else {
            // Manual
            uiContainer.innerHTML = `Introduce los valores manualmente.`;
            for(let s in statLabels) {
                let div = document.createElement("div");
                div.innerHTML = `<label style="color: ${getStatColor(s)}; font-weight: bold; width: 40px; display:inline-block;">${statLabels[s]}</label>
                                 <input type="number" class="manual-stat" data-stat="${s}" value="${wizardData.stats[s]}" style="width: 60px;">`;
                div.querySelector("input").addEventListener("change", (e) => {
                    wizardData.stats[e.target.getAttribute("data-stat")] = parseInt(e.target.value) || 10;
                });
                statsContainer.appendChild(div);
            }
        }
    }

    // Finalizar y Llenar Hoja
    if(btnFinish) {
        btnFinish.addEventListener("click", () => {
            const race = DND_DB.races[wizardData.race];
            const cls = DND_DB.classes[wizardData.charClass];

            // Rellenar cabecera
            const charName = document.getElementById("wiz-char-name").value.trim() || "Aventurero Sin Nombre";
            document.getElementById("char-name").value = charName;
            document.getElementById("char-race").value = race.name;
            document.getElementById("char-class").value = `${cls.name} 1`;
            localStorage.setItem("dnd35_classes", JSON.stringify([{classKey: wizardData.charClass, level: 1}]));
            localStorage.setItem("dnd35_level", 1);
            document.getElementById("char-size").value = race.size;
            document.getElementById("combat-speed").value = `${race.speed} pies`;

                        // --- LIMPIEZA DE PERSONAJE ANTERIOR ---
            localStorage.removeItem("dnd35_inventory");
            localStorage.removeItem("dnd35_feats");
            localStorage.removeItem("dnd35_skills");
            localStorage.removeItem("dnd35_skills_base");
                        localStorage.removeItem("dnd35_skillPts");
            localStorage.removeItem("dnd35_spells");
            localStorage.removeItem("dnd35_used_slots");
            localStorage.setItem("dnd35_level", 1);
            
            if (window.renderInventory) window.renderInventory();
            if (window.renderFeats) window.renderFeats();
            if (window.renderSpells) window.renderSpells();
            
            // --- ACTUALIZACION DE NUEVO PERSONAJE ---

            // Calcular stats (Base + Racial)
            for(let s in wizardData.stats) {
                const baseVal = wizardData.stats[s] || 10;
                const racialBonus = race.statMods[s] || 0;
                const finalVal = baseVal + racialBonus;
                document.getElementById(`attr-${s}`).value = finalVal;
                // Desencadenar el evento change para que app.js actualice los modificadores
                document.getElementById(`attr-${s}`).dispatchEvent(new Event('input')); 
            }

            // Rellenar combate y salvaciones para Nivel 1
            const conMod = Math.floor((parseInt(document.getElementById("attr-con").value) - 10) / 2);
            document.getElementById("hp-total").value = cls.hitDie + conMod;
            document.getElementById("hp-current").value = cls.hitDie + conMod;
            
            document.getElementById("combat-bab").value = `+${cls.bab}`;

                        // Actualizar salvaciones base
            document.getElementById("save-fort-base").value = cls.saves.fort;
            document.getElementById("save-ref-base").value = cls.saves.ref;
            document.getElementById("save-will-base").value = cls.saves.will;
            
            ["fort", "ref", "will"].forEach(s => {
                document.getElementById(`save-${s}-base`).dispatchEvent(new Event('input'));
            });

            // Calcular puntos de habilidad iniciales (Nivel 1)
            let intMod = Math.floor((parseInt(document.getElementById("attr-int").value) - 10) / 2);
            let classSkillPts = cls.skillPts || 2;
            let totalInitialSkillPts = (classSkillPts + intMod) * 4;
            if (race.name === "Humano") totalInitialSkillPts += 4; // Bonus humano
            if (totalInitialSkillPts < 4) totalInitialSkillPts = 4; // Mínimo
            
            localStorage.setItem("dnd35_skillPts", totalInitialSkillPts);
            
            if (window.renderSkills) window.renderSkills();
            if (window.updateCalculations) window.updateCalculations();

            // Cerrar Wizard
            wizardOverlay.classList.add("hidden");
        });
    }
});



