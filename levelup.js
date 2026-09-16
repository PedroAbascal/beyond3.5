document.addEventListener("DOMContentLoaded", () => {
    const luOverlay = document.getElementById("levelup-overlay");
    const btnLevelup = document.getElementById("btn-levelup");
    const btnClose = document.getElementById("levelup-close");
    
    const steps = [
        document.getElementById("lu-step-1"),
        document.getElementById("lu-step-2"),
        document.getElementById("lu-step-3"),
        document.getElementById("lu-step-4"),
        document.getElementById("lu-step-5")
    ];
    
    const btnPrev = document.getElementById("levelup-prev");
    const btnNext = document.getElementById("levelup-next");
    const btnFinish = document.getElementById("levelup-finish");

    let currentStep = 0;
    
    let luData = {
        currentTotalLevel: 0,
        newTotalLevel: 0,
        chosenClass: null,
        rolledHP: 0,
        statIncrease: null,
        chosenFeat: null,
        gainedSkillPts: 0
    };

    function parseCurrentLevel() {
        let classStr = document.getElementById("char-class").value || "Desconocido 0";
        let parts = classStr.match(/\d+/g);
        let total = 0;
        if(parts) {
            parts.forEach(p => total += parseInt(p));
        }
        return { total: total > 0 ? total : 1, text: classStr };
    }

    if (btnLevelup) {
        btnLevelup.addEventListener("click", () => {
            let parsed = parseCurrentLevel();
            luData.currentTotalLevel = parsed.total;
            luData.newTotalLevel = parsed.total + 1;
            luData.chosenClass = null;
            luData.rolledHP = 0;
            luData.statIncrease = null;
            luData.chosenFeat = null;
            
            luOverlay.classList.remove("hidden");
            renderClasses();
            showStep(0);
        });
    }

    if (btnClose) {
        btnClose.addEventListener("click", () => {
            luOverlay.classList.add("hidden");
        });
    }

    function showStep(index) {
        steps.forEach((step, i) => {
            if(step) {
                step.classList.toggle("active", i === index);
                step.style.display = i === index ? "block" : "none";
            }
        });

        btnPrev.classList.toggle("hidden", index === 0);
        
        if (index === steps.length - 1) {
            btnNext.classList.add("hidden");
            btnFinish.classList.remove("hidden");
        } else {
            btnNext.classList.remove("hidden");
            btnFinish.classList.add("hidden");
        }
        
        if (index === 0) btnNext.disabled = !luData.chosenClass;
        if (index === 1) btnNext.disabled = luData.rolledHP === 0;

        currentStep = index;
    }

    if(btnPrev) btnPrev.addEventListener("click", () => {
        if (currentStep > 0) showStep(currentStep - 1);
    });

    if(btnNext) btnNext.addEventListener("click", () => {
        if (currentStep === 0) prepareStep2();
        if (currentStep === 1) prepareStep3();
        if (currentStep === 2) prepareStep4();
        if (currentStep === 3) prepareStep5();
        
        if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });

    function renderClasses() {
        const container = document.getElementById("lu-class-options");
        if(!container) return;
        container.innerHTML = "";
        for (let key in DND_DB.classes) {
            const cls = DND_DB.classes[key];
            const card = document.createElement("div");
            card.className = `card ${luData.chosenClass === key ? 'selected' : ''}`;
            card.innerText = cls.name;
            
            card.addEventListener("click", () => {
                luData.chosenClass = key;
                renderClasses();
                btnNext.disabled = false;
            });
            container.appendChild(card);
        }
    }

    function prepareStep2() {
        const cls = DND_DB.classes[luData.chosenClass];
        const ui = document.getElementById("lu-hp-ui");
        const conStr = document.getElementById("attr-con").value;
        const conMod = Math.floor((parseInt(conStr) - 10) / 2);
        
        ui.innerHTML = `
            <p>Clase Elegida: <strong>${cls.name}</strong> (Dado de Golpe: d${cls.hitDie})</p>
            <p>Mod. Constitución: <strong>${conMod >= 0 ? '+'+conMod : conMod}</strong></p>
            <button id="btn-roll-hp" class="btn-primary" style="margin: 10px 0;">Tirar HP (1d${cls.hitDie} + ${conMod})</button>
            <div id="lu-hp-result" style="font-size: 1.5em; font-weight: bold; color: #d4af37;"></div>
        `;
        
        document.getElementById("btn-roll-hp").addEventListener("click", () => {
            let roll = Math.floor(Math.random() * cls.hitDie) + 1;
            let total = roll + conMod;
            if(total < 1) total = 1;
            luData.rolledHP = total;
            document.getElementById("lu-hp-result").innerHTML = `Tiraste un ${roll}. Total sumado: +${total} HP!`;
            btnNext.disabled = false;
        });
    }

    function prepareStep3() {
        const ui = document.getElementById("lu-stat-ui");
        if (luData.newTotalLevel % 4 === 0) {
            ui.innerHTML = `
                <p style="color: blue; font-weight: bold;">¡Nivel ${luData.newTotalLevel}! Tienes un incremento de Atributo (+1).</p>
                <select id="lu-stat-select" style="padding:5px;">
                    <option value="">Selecciona atributo...</option>
                    <option value="str">Fuerza</option>
                    <option value="dex">Destreza</option>
                    <option value="con">Constitución</option>
                    <option value="int">Inteligencia</option>
                    <option value="wis">Sabiduría</option>
                    <option value="cha">Carisma</option>
                </select>
            `;
            document.getElementById("lu-stat-select").addEventListener("change", (e) => {
                luData.statIncrease = e.target.value;
            });
        } else {
            ui.innerHTML = `<p style="color: gray;">(Los incrementos de atributo ocurren en los niveles 4, 8, 12, 16 y 20). No aplica en este nivel.</p>`;
            luData.statIncrease = null;
        }
    }

    function prepareStep4() {
        const cls = DND_DB.classes[luData.chosenClass];
        const ui = document.getElementById("lu-skills-ui");
        const intStr = document.getElementById("attr-int").value;
        const intMod = Math.floor((parseInt(intStr) - 10) / 2);
        const pts = Math.max(1, cls.skillPts + intMod);
        luData.gainedSkillPts = pts;
        
        ui.innerHTML = `
            <p>Puntos de clase (${cls.skillPts}) + Mod. INT (${intMod})</p>
            <h3 style="color: #28a745;">Ganas ${pts} Puntos de Habilidad</h3>
            <p style="font-size: 0.85em; color: #555;">(Se añadirán a tu Reserva de Puntos Disponibles).</p>
        `;
    }

    function prepareStep5() {
        const ui = document.getElementById("lu-feat-ui");
        if (luData.newTotalLevel % 3 === 0) {
            ui.innerHTML = `
                <p style="color: blue; font-weight: bold;">¡Nivel ${luData.newTotalLevel}! Ganas una nueva Dote.</p>
                <input type="text" id="lu-feat-search" list="lu-feats-datalist" placeholder="Buscar Dote..." style="width: 70%; padding:5px;">
                <datalist id="lu-feats-datalist"></datalist>
                <div id="lu-feat-desc" style="margin-top: 10px; font-style: italic; color: #555; background: #eee; padding: 5px; border-radius: 4px; min-height: 20px;">Selecciona una dote para ver su descripción.</div>
            `;
            const datalist = document.getElementById("lu-feats-datalist");
            DND_DB.feats.forEach(feat => {
                const opt = document.createElement("option");
                opt.value = feat.name;
                datalist.appendChild(opt);
            });
            document.getElementById("lu-feat-search").addEventListener("input", (e) => {
                luData.chosenFeat = e.target.value;
                let featObj = DND_DB.feats.find(f => f.name === luData.chosenFeat);
                if(featObj) {
                    document.getElementById("lu-feat-desc").innerText = featObj.desc;
                } else {
                    document.getElementById("lu-feat-desc").innerText = "Selecciona una dote válida.";
                }
            });
        } else {
            ui.innerHTML = `<p style="color: gray;">(Ganas dotes en los niveles 3, 6, 9, 12, 15 y 18). No aplica en este nivel.</p>`;
            luData.chosenFeat = null;
        }
    }

    if(btnFinish) {
        btnFinish.addEventListener("click", () => {
            // HP
            let hpMax = document.getElementById("hp-total");
            let hpCur = document.getElementById("hp-current");
            if(hpMax) {
                hpMax.value = (parseInt(hpMax.value) || 0) + luData.rolledHP;
                hpCur.value = (parseInt(hpCur.value) || 0) + luData.rolledHP;
                hpMax.dispatchEvent(new Event('input'));
            }

                        // Clase (Structured JSON)
            let lsClasses = [];
            try { lsClasses = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
            
            let classIdx = lsClasses.findIndex(c => c.classKey === luData.chosenClass);
            let newClassLevel = 1;
            if (classIdx >= 0) {
                lsClasses[classIdx].level += 1;
                newClassLevel = lsClasses[classIdx].level;
            } else {
                lsClasses.push({classKey: luData.chosenClass, level: 1});
            }
            localStorage.setItem('dnd35_classes', JSON.stringify(lsClasses));
            
            let displayStr = '';
            let totalLvl = 0;
            lsClasses.forEach(c => {
                let clsObj = DND_DB.classes[c.classKey];
                if (clsObj) {
                    displayStr += `${clsObj.name} ${c.level} / `;
                    totalLvl += c.level;
                }
            });
            if (displayStr.endsWith(' / ')) displayStr = displayStr.substring(0, displayStr.length - 3);
            
            document.getElementById("char-class").value = displayStr;
            localStorage.setItem('dnd35_level', totalLvl);
            
            let cls = DND_DB.classes[luData.chosenClass];

            // Progression Automations
            let featuresGained = [];
            if (window.DND_PROGRESSION) {
                // BAB
                const prevBab = window.DND_PROGRESSION.calcBAB(newClassLevel - 1, cls.bab);
                const newBab = window.DND_PROGRESSION.calcBAB(newClassLevel, cls.bab);
                const babDelta = newBab - prevBab;
                
                if (babDelta > 0) {
                    let babInput = document.getElementById("combat-bab");
                    if (babInput) {
                        let currentBab = parseInt(babInput.value.replace('+', '')) || 0;
                        currentBab += babDelta;
                        babInput.value = (currentBab >= 0 ? "+" : "") + currentBab;
                        babInput.dispatchEvent(new Event('input'));
                    }
                }
                
                // Saves
                ['fort', 'ref', 'will'].forEach(saveKey => {
                    const prevSave = window.DND_PROGRESSION.calcSave(newClassLevel - 1, cls.saves[saveKey]);
                    const newSave = window.DND_PROGRESSION.calcSave(newClassLevel, cls.saves[saveKey]);
                    const saveDelta = newSave - prevSave;
                    
                    if (saveDelta > 0) {
                        let saveInput = document.getElementById(`save-${saveKey}-base`);
                        if (saveInput) {
                            saveInput.value = parseInt(saveInput.value) + saveDelta;
                            saveInput.dispatchEvent(new Event('input'));
                        }
                    }
                });
                
                // Features
                const rawFeatures = window.DND_PROGRESSION.classFeatures[luData.chosenClass]?.[newClassLevel];
                if (rawFeatures && rawFeatures.length > 0) {
                    let lsFeats = JSON.parse(localStorage.getItem('dnd35_feats') || "[]");
                    rawFeatures.forEach(fName => {
                        if (fName !== "-" && !lsFeats.some(f => f.name === fName)) {
                            lsFeats.push({ name: fName, type: "Rasgo de Clase", desc: `Rasgo ganado a nivel ${newClassLevel} de ${cls.name}` });
                            featuresGained.push(fName);
                        }
                    });
                    localStorage.setItem('dnd35_feats', JSON.stringify(lsFeats));
                }
            }

            // Stats
            if(luData.statIncrease) {
                let statObj = document.getElementById(`attr-${luData.statIncrease}`);
                if(statObj) {
                    statObj.value = parseInt(statObj.value) + 1;
                    statObj.dispatchEvent(new Event('input'));
                }
            }
            
            // Skill Points
            let currentSkillPts = parseInt(localStorage.getItem('dnd35_skillPts')) || 0;
            localStorage.setItem('dnd35_skillPts', currentSkillPts + luData.gainedSkillPts);

            // Feats
            if(luData.chosenFeat) {
                let featObj = DND_DB.feats.find(f => f.name === luData.chosenFeat);
                if(featObj) {
                    let lsFeats = JSON.parse(localStorage.getItem('dnd35_feats')) || [];
                    lsFeats.push(featObj);
                    localStorage.setItem('dnd35_feats', JSON.stringify(lsFeats));
                    alert("¡Dote añadida! (Recarga para verla).");
                }
            }

            let msg = `¡Has subido al Nivel ${luData.newTotalLevel}!`;
            if (featuresGained && featuresGained.length > 0) {
                msg += `\n\nNuevos Rasgos de Clase Ganados:\n- ${featuresGained.join('\\n- ')}`;
            }
            alert(msg);

            if(window.saveDataToStorage) window.saveDataToStorage();
            location.reload(); 
        });
    }
});
