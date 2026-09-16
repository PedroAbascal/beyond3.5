document.addEventListener("DOMContentLoaded", () => {
    window.updateSpellButtonsState = function() {
        const slotsContainer = document.getElementById("spell-slots-container");
        if (!slotsContainer) return;
        document.querySelectorAll(".spell-rollable").forEach(btn => {
            let lvl = btn.getAttribute("data-spell-level");
            if (lvl === null) return;
            let allBoxes = slotsContainer.querySelectorAll(`.slot-checkbox[data-level="${lvl}"]`);
            let total = allBoxes.length;
            let used = 0;
            allBoxes.forEach(cb => { if(cb.checked) used++; });
            if (total === 0 || used >= total) {
                btn.disabled = true;
                btn.style.background = "#e0e0e0";
                btn.style.color = "#999";
                btn.style.border = "1px solid #ccc";
                btn.style.cursor = "not-allowed";
                btn.title = "No tienes espacios de conjuro disponibles de este nivel.";
            } else {
                btn.disabled = false;
                btn.style.background = "#e8f5e9";
                btn.style.color = "black";
                btn.style.border = "1px solid #4caf50";
                btn.style.cursor = "pointer";
                btn.title = "";
            }
        });
    };
    const STORAGE_KEY = "dnd35_character_data";
    const inputs = document.querySelectorAll(".data-bind");
    const attacksList = document.getElementById("attacks-list");
    const btnAddWeapon = document.getElementById("btn-add-weapon");
    const btnLock = document.getElementById("btn-lock");
    
    let isSheetLocked = true;

    const attributes = {
        "attr-str": "mod-str",
        "attr-dex": "mod-dex",
        "attr-con": "mod-con",
        "attr-int": "mod-int",
        "attr-wis": "mod-wis",
        "attr-cha": "mod-cha"
    };

    const saves = {
        "save-fort": { base: "save-fort-base", total: "save-fort-total", attr: "attr-con", modDisplay: "save-mod-con" },
        "save-ref":  { base: "save-ref-base", total: "save-ref-total", attr: "attr-dex", modDisplay: "save-mod-dex" },
        "save-will": { base: "save-will-base", total: "save-will-total", attr: "attr-wis", modDisplay: "save-mod-wis" }
    };

    function calcModifier(score) {
        let num = parseInt(score);
        if (isNaN(num)) num = 10;
        return Math.floor((num - 10) / 2);
    }

    function formatMod(mod) {
        return mod >= 0 ? `+${mod}` : `${mod}`;
    }

    // --- BLOQUEO DE HOJA ---
    function toggleLock() {
        isSheetLocked = !isSheetLocked;
        if (isSheetLocked) {
            document.body.classList.add("sheet-locked");
            if(btnLock) btnLock.innerHTML = "🔓 Desbloquear Hoja";
        } else {
            document.body.classList.remove("sheet-locked");
            if(btnLock) btnLock.innerHTML = "🔒 Bloquear Hoja";
        }
        renderSkills(); 
    }

    if (btnLock) {
        btnLock.addEventListener("click", toggleLock);
        document.body.classList.add("sheet-locked");
    }

    // --- HABILIDADES ---
        window.renderSkills = function renderSkills() {
        const container = document.getElementById("skills-container");
        if(!container || !window.DND_DB.skills) return;

        let availablePts = parseInt(localStorage.getItem('dnd35_skillPts')) || 0;
        const displayPts = document.getElementById("skill-points-display");
        if(displayPts) displayPts.innerText = availablePts;

        const storedRanks = JSON.parse(localStorage.getItem("dnd35_skills") || "{}");
        const featMods = getFeatMods(); 
        
        let mods = {};
        for (let attrId in attributes) {
            mods[attrId] = calcModifier(document.getElementById(attrId).value);
        }
        
        let acp = 0;
        const inventory = JSON.parse(localStorage.getItem("dnd35_inventory") || "[]");
        inventory.forEach(item => {
            if (item.isEquipped && item.acp) acp += item.acp;
        });

        // Determinar clase y nivel
        let currentLevel = parseInt(localStorage.getItem('dnd35_level')) || 1;
        let lsClasses = [];
        try { lsClasses = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
        let baseClass = "";
        let casterLevel = 1;
        if (lsClasses.length > 0) {
            baseClass = lsClasses[0].classKey;
            casterLevel = lsClasses[0].level;
        }

        let classSkillsList = baseClass ? (window.DND_DB.classes[baseClass].classSkills || []) : [];

        container.innerHTML = "";
        
        window.DND_DB.skills.forEach(skill => {
            const row = document.createElement("div");
            row.className = "skill-row";
            
            const isClassSkill = classSkillsList.includes(skill.id);
            const maxRank = isClassSkill ? (currentLevel + 3) : Math.floor((currentLevel + 3) / 2);
            
            const rank = storedRanks[skill.id] || 0;
            const attrMod = mods[`attr-${skill.attr}`] || 0;
            const featBonus = featMods[`skill_${skill.id}`] || 0;
            let acpMod = (skill.attr === 'str' || skill.attr === 'dex') ? acp : 0;
            const totalSkill = Math.floor(rank) + attrMod + acpMod + featBonus; // En 3.5e, los rangos de cross-class dan 0.5 (se redondea hacia abajo)
            
            let skillNameDisplay = isClassSkill ? `<strong>★ ${skill.name}</strong>` : skill.name;

            row.innerHTML = `
                <div class="skill-name">${skillNameDisplay} <span class="skill-attr">[${skill.attr.toUpperCase()}]</span></div>
                <div class="skill-total rollable" data-reason="Habilidad: ${skill.name}" data-formula="1d20${formatMod(totalSkill)}" title="Total = Rango (${Math.floor(rank)}) + Attr (${formatMod(attrMod)}) + Misc (${formatMod(featBonus + acpMod)})" style="color: ${acpMod < 0 ? 'red' : 'black'};">${formatMod(totalSkill)}</div>
                <div class="skill-ranks-ctrl" style="display:flex; align-items:center;">
                    <button class="btn-skill-minus" data-skill="${skill.id}">-</button>
                    <div class="skill-ranks-val" style="min-width:30px; text-align:center;">${rank}</div>
                    <button class="btn-skill-plus" data-skill="${skill.id}">+</button>
                </div>
            `;
            container.appendChild(row);
        });

        if (!localStorage.getItem("dnd35_skills_base")) {
            localStorage.setItem("dnd35_skills_base", localStorage.getItem("dnd35_skills") || "{}");
        }

        container.querySelectorAll('.btn-skill-plus').forEach(btn => {
            let sId = btn.getAttribute("data-skill");
            let isClassSkill = classSkillsList.includes(sId);
            let ptsCost = isClassSkill ? 1 : 2;
            let currentLevel = parseInt(localStorage.getItem('dnd35_level')) || 1;
            let maxRank = isClassSkill ? (currentLevel + 3) : Math.floor((currentLevel + 3) / 2);
            let ranks = JSON.parse(localStorage.getItem("dnd35_skills") || "{}");
            let currentRank = ranks[sId] || 0;

            if (isSheetLocked && (availablePts < ptsCost || currentRank >= maxRank)) {
                btn.disabled = true;
            }

            btn.addEventListener("click", (e) => {
                let pts = parseInt(localStorage.getItem('dnd35_skillPts')) || 0;
                let curRanks = JSON.parse(localStorage.getItem("dnd35_skills") || "{}");
                
                if (pts >= ptsCost) {
                    curRanks[sId] = (curRanks[sId] || 0) + (isClassSkill ? 1 : 0.5);
                    pts -= ptsCost;
                    localStorage.setItem('dnd35_skillPts', pts);
                    localStorage.setItem('dnd35_skills', JSON.stringify(curRanks));
                    renderSkills();
                    
                    if (pts === 0) {
                        setTimeout(() => {
                            if (confirm("Ya no tienes más puntos de habilidad.\nÂ¿Confirmas la asignación actual?")) {
                                localStorage.setItem("dnd35_skills_base", JSON.stringify(curRanks));
                                alert("Puntos asignados de forma permanente.");
                                renderSkills();
                            } else {
                                curRanks[sId] -= (isClassSkill ? 1 : 0.5);
                                pts += ptsCost;
                                localStorage.setItem("dnd35_skills", JSON.stringify(curRanks));
                                localStorage.setItem("dnd35_skillPts", pts);
                                renderSkills();
                            }
                        }, 50);
                    }
                } else if (!isSheetLocked) {
                    curRanks[sId] = (curRanks[sId] || 0) + (isClassSkill ? 1 : 0.5);
                    localStorage.setItem('dnd35_skills', JSON.stringify(curRanks));
                    localStorage.setItem('dnd35_skills_base', JSON.stringify(curRanks));
                    renderSkills();
                }
            });
        });

        container.querySelectorAll('.btn-skill-minus').forEach(btn => {
            let sId = btn.getAttribute("data-skill");
            let isClassSkill = classSkillsList.includes(sId);
            let ptsCost = isClassSkill ? 1 : 2;
            let ranks = JSON.parse(localStorage.getItem("dnd35_skills") || "{}");
            let baseRanks = JSON.parse(localStorage.getItem("dnd35_skills_base") || "{}");
            
            let currentRank = ranks[sId] || 0;
            let lockedRank = baseRanks[sId] || 0;
            
            if (isSheetLocked && currentRank <= lockedRank) {
                btn.disabled = true;
            } else if (!isSheetLocked && currentRank <= 0) {
                btn.disabled = true;
            }
            
            btn.addEventListener("click", (e) => {
                let pts = parseInt(localStorage.getItem('dnd35_skillPts')) || 0;
                let currentRanks = JSON.parse(localStorage.getItem("dnd35_skills") || "{}");
                
                if (currentRanks[sId] > 0) {
                    currentRanks[sId] -= (isClassSkill ? 1 : 0.5);
                    if(isSheetLocked) localStorage.setItem('dnd35_skillPts', pts + ptsCost);
                    localStorage.setItem('dnd35_skills', JSON.stringify(currentRanks));
                    if(!isSheetLocked) localStorage.setItem('dnd35_skills_base', JSON.stringify(currentRanks));
                    renderSkills();
                }
            });
        });
        setupRollables();
    }

    // --- DOTES DINÁMICAS ---
    function getFeatMods() {
        let featMods = { ac: 0, init: 0, save_fort: 0, save_ref: 0, save_will: 0 };
        const storedFeats = JSON.parse(localStorage.getItem("dnd35_feats") || "[]");
        storedFeats.forEach(feat => {
            if (feat.effects) {
                for(let k in feat.effects) {
                    featMods[k] = (featMods[k] || 0) + feat.effects[k];
                }
            }
        });
        return featMods;
    }

    // --- CALCULOS PRINCIPALES ---
    window.updateCalculations = function updateCalculations() {
        // ACTUALIZAR NIVEL DESDE JSON
        let lsClassesCalc = [];
        try { lsClassesCalc = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
        let parsedTotalLvl = 0;
        lsClassesCalc.forEach(c => parsedTotalLvl += c.level);
        if (parsedTotalLvl > 0) localStorage.setItem('dnd35_level', parsedTotalLvl);

        let mods = {};
        const featMods = getFeatMods();

        for (let attrId in attributes) {
            const input = document.getElementById(attrId);
            const modId = attributes[attrId];
            const mod = calcModifier(input.value);
            mods[attrId] = mod;
            if(document.getElementById(modId)) {
                document.getElementById(modId).innerText = formatMod(mod);
                document.getElementById(modId).setAttribute("data-formula", `1d20${formatMod(mod)}`);
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

        let strScore = parseInt(document.getElementById('attr-str')?.value) || 10;
        let lightLoad = Math.floor(strScore * 3.3);
        if (strScore > 10) lightLoad = Math.floor(33 * Math.pow(1.15, strScore - 10));

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

        let isProne = document.getElementById('cond-prone')?.checked || false;
        let isBlinded = document.getElementById('cond-blinded')?.checked || false;
        let isEntangled = document.getElementById('cond-entangled')?.checked || false;
        let isShaken = document.getElementById('cond-shaken')?.checked || false;

        let condAcPen = 0;
        let condAtkPen = 0;
        
        if (isBlinded) { condAcPen -= 2; maxDex = -99; }
        if (isEntangled) { condAtkPen -= 2; maxDex = Math.min(maxDex, maxDex > -99 ? mods['attr-dex'] - 2 : maxDex); }
        if (isShaken) { condAtkPen -= 2; }
        if (isProne) { condAtkPen -= 4; }

        let dexMod = mods["attr-dex"] || 0;
        if (maxDex === -99) dexMod = 0;
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
            initEl.setAttribute("data-formula", `1d20${formatMod(initTotal)}`);
        }

        for (let saveId in saves) {
            const save = saves[saveId];
            const baseVal = parseInt(document.getElementById(save.base)?.value) || 0;
            const attrMod = mods[save.attr] || 0;
            let fMod = 0;
            if (saveId === "save-fort") fMod = featMods.save_fort;
            if (saveId === "save-ref") fMod = featMods.save_ref;
            if (saveId === "save-will") fMod = featMods.save_will;
            if (isShaken) fMod -= 2;
            
            const total = baseVal + attrMod + fMod;
            
            if(document.getElementById(save.modDisplay)) document.getElementById(save.modDisplay).innerText = formatMod(attrMod);
            const totalEl = document.getElementById(save.total);
            if(totalEl) {
                totalEl.value = formatMod(total);
                totalEl.setAttribute("data-formula", `1d20${formatMod(total)}`);
            }
        }

        window.combatCondAtkPen = condAtkPen;
        window.isEncumbered = isEncumbered;

        if (typeof renderWeapons === 'function') renderWeapons();
        if (typeof renderActions === 'function') renderActions();
        if (typeof updateHpStatus === 'function') updateHpStatus();
    }

    function setupRollables() {
        document.querySelectorAll(".rollable").forEach(el => {
            el.replaceWith(el.cloneNode(true));
        });
        document.querySelectorAll(".rollable").forEach(el => {
            el.addEventListener("click", (e) => {
                const formula = e.target.getAttribute("data-formula");
                const reason = e.target.getAttribute("data-reason");
                const spellLevel = e.target.getAttribute("data-spell-level");
                
                if (spellLevel !== null && parseInt(spellLevel) >= 0) {
                    let lvl = parseInt(spellLevel);
                    const slotsContainer = document.getElementById("spell-slots-container");
                    if (slotsContainer) {
                        const allBoxes = Array.from(slotsContainer.querySelectorAll(`.slot-checkbox[data-level="${lvl}"]`));
                        const availableBox = allBoxes.find(cb => !cb.checked);
                        if (availableBox) {
                            availableBox.checked = true;
                            availableBox.dispatchEvent(new Event("change"));
                        } else if (allBoxes.length > 0) {
                            if (!confirm(`No te quedan espacios de conjuro de nivel ${lvl}. ¿Lanzar de todos modos?`)) {
                                return;
                            }
                        }
                    }
                    if (window.consumeAction) {
                        window.consumeAction('standard');
                    }
                }

                if (formula && window.diceRoller) {
                    window.diceRoller.roll(formula, reason);
                }
            });
        });
    }

    // --- GUARDADO ---
    function saveData() {
        const data = {};
        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    window.saveDataToStorage = saveData;

    function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                for (let id in data) {
                    const el = document.getElementById(id);
                    if (el) el.value = data[id];
                }
            } catch (e) {
                console.error("Error al cargar los datos:", e);
            }
        }
    }

    inputs.forEach(input => {
        input.addEventListener("input", () => {
            updateCalculations();
            saveData();
        });
    });

    const btnSave = document.getElementById("btn-save");
    if(btnSave) btnSave.addEventListener("click", () => {
        saveData();
        alert("¡Guardado Manual Completo!");
    });

    const btnExport = document.getElementById("btn-export");
    if(btnExport) btnExport.addEventListener("click", () => {
        const charData = {
            main: JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
            inventory: JSON.parse(localStorage.getItem("dnd35_inventory") || "[]"),
            feats: JSON.parse(localStorage.getItem("dnd35_feats") || "[]"),
            skills: JSON.parse(localStorage.getItem("dnd35_skills") || "{}"),
            skillPts: localStorage.getItem("dnd35_skillPts") || "0",
            layout: JSON.parse(localStorage.getItem("dnd35_layout") || "{}"),
            spells: JSON.parse(localStorage.getItem("dnd35_spells") || "[]"),
            usedSlots: JSON.parse(localStorage.getItem("dnd35_used_slots") || "{}")
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(charData, null, 2));
        const anchor = document.createElement('a');
        anchor.href = dataStr;
        anchor.download = "personaje_dnd35.json";
        anchor.click();
    });

    const btnImport = document.getElementById("btn-import");
    const fileImport = document.getElementById("file-import");
    if(fileImport) fileImport.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const imported = JSON.parse(evt.target.result);
                if (imported.main) localStorage.setItem(STORAGE_KEY, JSON.stringify(imported.main));
                if (imported.inventory) localStorage.setItem("dnd35_inventory", JSON.stringify(imported.inventory));
                if (imported.feats) localStorage.setItem("dnd35_feats", JSON.stringify(imported.feats));
                if (imported.skills) localStorage.setItem("dnd35_skills", JSON.stringify(imported.skills));
                if (imported.skillPts) localStorage.setItem("dnd35_skillPts", imported.skillPts);
                if (imported.layout) localStorage.setItem("dnd35_layout", JSON.stringify(imported.layout));
                if (imported.spells) localStorage.setItem("dnd35_spells", JSON.stringify(imported.spells));
                if (imported.usedSlots) localStorage.setItem("dnd35_used_slots", JSON.stringify(imported.usedSlots));
                
                alert("¡Personaje Importado! Recargando...");
                location.reload();
            } catch (err) {
                alert("Archivo JSON inválido.");
            }
        };
        reader.readAsText(file);
    });

    // --- DOTES (PANEL) ---
    window.renderFeats = function renderFeats() {
        const featsContainer = document.getElementById("feats-list");
        if(!featsContainer) return;
        featsContainer.innerHTML = "";
        let lsFeats = JSON.parse(localStorage.getItem("dnd35_feats") || "[]");
        
        lsFeats.forEach((feat, index) => {
            const row = document.createElement("div");
            row.className = "dynamic-item";
            row.style.border = "1px solid #ccc"; row.style.padding = "3px 5px"; row.style.marginBottom = "3px"; row.style.fontSize = "0.9em"; row.style.borderRadius = "4px";
            row.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>${feat.name}</strong>
                    <button class="btn-remove-feat" data-index="${index}" style="background:red; color:white; border:none; border-radius:3px; cursor:pointer;">X</button>
                </div>
                <div style="font-size: 0.9em; color:#555;">${feat.desc}</div>
                ${feat.effects ? `<div style="font-size:0.8em; color:blue;">(Dinámico: Aplica bonos automáticamente)</div>` : ''}
            `;
            featsContainer.appendChild(row);
        });

        featsContainer.querySelectorAll(".btn-remove-feat").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let idx = e.target.getAttribute("data-index");
                lsFeats.splice(idx, 1);
                localStorage.setItem("dnd35_feats", JSON.stringify(lsFeats));
                renderFeats();
                updateCalculations();
                renderSkills();
            });
        });
    }

    const featSearch = document.getElementById("search-feat");
    const btnAddFeat = document.getElementById("btn-add-feat");
    if (featSearch && btnAddFeat && typeof window.DND_DB !== 'undefined' && window.DND_DB.feats) {
        const datalist = document.getElementById("feats-datalist");
        if (datalist) {
            window.DND_DB.feats.forEach(f => {
                const opt = document.createElement("option");
                opt.value = f.name;
                datalist.appendChild(opt);
            });
        }
        
        btnAddFeat.addEventListener("click", () => {
            let name = featSearch.value;
            let featObj = window.DND_DB.feats.find(f => f.name === name);
            if(featObj) {
                let lsFeats = JSON.parse(localStorage.getItem("dnd35_feats") || "[]");
                lsFeats.push(featObj);
                localStorage.setItem("dnd35_feats", JSON.stringify(lsFeats));
                featSearch.value = "";
                renderFeats();
                updateCalculations();
                renderSkills();
            } else {
                alert("Dote no encontrada en la base de datos.");
            }
        });
    }

        // --- HECHIZOS ---
    window.renderSpells = function renderSpells() {
        const panel = document.getElementById("panel-spells");
        const slotsContainer = document.getElementById("spell-slots-container");
        const spellsContainer = document.getElementById("spells-list-ui");
        if(!panel || !slotsContainer || !spellsContainer) return;

        let lsClasses = [];
        try { lsClasses = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
        let baseClass = "";
        let casterLevel = 1;
        if (lsClasses.length > 0) {
            baseClass = lsClasses[0].classKey;
            casterLevel = lsClasses[0].level;
        }


        const clsData = baseClass ? window.DND_DB.classes[baseClass] : null;
        if (!clsData || !clsData.spellcaster) {
            panel.classList.add("hidden");
            return;
        } else {
            panel.classList.remove("hidden");
        }

        // Render Slots
        let currentLevel = parseInt(localStorage.getItem('dnd35_level')) || 1;
        let slotsDef = clsData.spellcaster.slotsByLevel[currentLevel] || [];
        let usedSlots = JSON.parse(localStorage.getItem('dnd35_used_slots') || "{}");
        
        slotsContainer.innerHTML = "";
        slotsDef.forEach((totalSlots, level) => {
            if (totalSlots <= 0) return;
            const used = usedSlots[level] || 0;
            const div = document.createElement("div");
            div.style.border = "1px solid #007bff"; div.style.padding = "5px"; div.style.borderRadius = "4px"; div.style.textAlign = "center";
            
            let boxesHtml = "";
            for (let i = 0; i < totalSlots; i++) {
                let isChecked = i < used ? "checked" : "";
                boxesHtml += `<input type="checkbox" class="slot-checkbox" data-level="${level}" ${isChecked} style="cursor:pointer; width:16px; height:16px; margin:2px;">`;
            }
            
            div.innerHTML = `
                <div style="font-size:0.8em; font-weight:bold; color:#007bff; margin-bottom:3px;">Nivel ${level}</div>
                <div style="display:flex; justify-content:center; flex-wrap:wrap; max-width:120px;">
                    ${boxesHtml}
                </div>
            `;
            slotsContainer.appendChild(div);
        });

        slotsContainer.querySelectorAll(".slot-checkbox").forEach(cb => {
            cb.addEventListener("change", (e) => {
                let lvl = e.target.getAttribute("data-level");
                let checkedCount = 0;
                slotsContainer.querySelectorAll(`.slot-checkbox[data-level="${lvl}"]`).forEach(box => {
                    if (box.checked) checkedCount++;
                });
                usedSlots[lvl] = checkedCount;
                localStorage.setItem('dnd35_used_slots', JSON.stringify(usedSlots));
                if (window.updateSpellButtonsState) window.updateSpellButtonsState();
            });
        });

        // Render Spells
        spellsContainer.innerHTML = "";
        let knownSpells = JSON.parse(localStorage.getItem("dnd35_spells") || "[]");
        
        // Calculate Save DC
        let spellAttr = clsData.spellcaster.attr;
        let spellAttrMod = parseInt(document.getElementById(`mod-${spellAttr}`)?.innerText) || 0;

        knownSpells.forEach((spell, index) => {
            const row = document.createElement("div");
            row.className = "dynamic-item";
            row.style.border = "1px solid #9c27b0"; row.style.padding = "3px 5px"; row.style.marginBottom = "3px"; row.style.fontSize = "0.9em"; row.style.borderRadius = "4px";
            
            let parsedFormula = spell.formula;
            if (parsedFormula) {
                parsedFormula = parsedFormula.replace(/\{([^}]+)\}/g, (match, expr) => {
                    try {
                        let e = expr.replace(/CL/g, casterLevel);
                        e = e.replace(/min/g, 'Math.min').replace(/max/g, 'Math.max').replace(/floor/g, 'Math.floor');
                        return eval(e);
                    } catch(err) {
                        return match;
                    }
                });
            }
            let formulaBtn = `<button class="rollable spell-rollable" style="background:#e8f5e9; color:black; border:1px solid #4caf50; padding:2px 5px; border-radius:3px; cursor:pointer; margin-right:10px;" data-formula="${parsedFormula || ''}" data-reason="Conjuro: ${spell.name}" data-spell-level="${spell.level}">Conjurar${parsedFormula ? ': ' + parsedFormula : ''}</button>`;
            let saveDc = 10 + spell.level + spellAttrMod;

            row.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>${spell.name} (Nv ${spell.level})</strong>
                    <div>
                        ${formulaBtn}
                        <button class="btn-remove-spell" data-index="${index}" style="background:red; color:white; border:none; border-radius:3px; cursor:pointer;">X</button>
                    </div>
                </div>
                <div style="font-size: 0.9em; color:#555;">${spell.school} | CD Salvación: ${saveDc} | ${spell.desc}</div>
            `;
            spellsContainer.appendChild(row);
        });

        spellsContainer.querySelectorAll(".btn-remove-spell").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let idx = e.target.getAttribute("data-index");
                knownSpells.splice(idx, 1);
                localStorage.setItem("dnd35_spells", JSON.stringify(knownSpells));
                renderSpells();
            });
        });
        
        setupRollables();
        if (window.updateSpellButtonsState) window.updateSpellButtonsState();
    }

    const spellSearch = document.getElementById("search-spell");
    const btnAddSpell = document.getElementById("btn-add-spell");
    const filterLevel = document.getElementById("filter-spell-level");
    const filterClass = document.getElementById("filter-spell-class");
    
    if (spellSearch && btnAddSpell && typeof window.DND_DB !== 'undefined' && window.DND_DB.spells) {
        const datalist = document.getElementById("spells-datalist");
        
        function populateSpellDatalist() {
            if (!datalist) return;
            datalist.innerHTML = "";
            let lvlFilter = filterLevel ? filterLevel.value : "all";
            let clsFilter = filterClass ? filterClass.value : "all";
            
            let filtered = window.DND_DB.spells.filter(s => {
                let matchLevel = (lvlFilter === "all" || String(s.level) === lvlFilter);
                let matchClass = (clsFilter === "all" || (s.classes && s.classes.includes(clsFilter)));
                return matchLevel && matchClass;
            });
            
            filtered.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s.name;
                datalist.appendChild(opt);
            });
        }
        
        if (filterLevel) filterLevel.addEventListener("change", populateSpellDatalist);
        if (filterClass) filterClass.addEventListener("change", populateSpellDatalist);
        
        populateSpellDatalist();
        
        btnAddSpell.addEventListener("click", () => {
            let name = spellSearch.value;
            let spellObj = window.DND_DB.spells.find(s => s.name === name);
            if(spellObj) {
                let lsSpells = [];
                try { lsSpells = JSON.parse(localStorage.getItem("dnd35_spells") || "[]"); } catch(e) { }
                lsSpells.push(spellObj);
                localStorage.setItem("dnd35_spells", JSON.stringify(lsSpells));
                spellSearch.value = "";
                renderSpells();
            } else {
                alert("Hechizo no encontrado en la base de datos.");
            }
        });
    }

    // --- INVENTARIO ---
        window.renderInventory = function renderInventory() {
        const invContainer = document.getElementById("inventory-list-ui") || document.getElementById("inventory-list");
        if(!invContainer) return;
        invContainer.innerHTML = "";
        let inventory = [];
        try {
            inventory = JSON.parse(localStorage.getItem("dnd35_inventory") || "[]");
        } catch(e) {
            inventory = [];
        }

        inventory.forEach((item, index) => {
            if (!item) return; // Skip nulls
            const row = document.createElement("div");
            row.className = "dynamic-item";
            row.style.border = "1px solid #ccc"; row.style.padding = "3px 5px"; row.style.marginBottom = "3px"; row.style.fontSize = "0.9em"; row.style.borderRadius = "4px";
            
            let equipBtn = "";
            let consumeBtn = "";
            
            if (item.type === "Arma" || item.type === "Armadura" || item.type === "Escudo") {
                equipBtn = `<button class="btn-equip" data-index="${index}" style="margin-right:5px;">${item.isEquipped ? "Desequipar" : "Equipar"}</button>`;
            }
            if (item.consumable || item.type === "Poción" || item.type === "Consumible") {
                consumeBtn = `<button class="btn-consume" data-index="${index}" style="margin-right:5px; background:orange; color:white; border:none; border-radius:3px;">Consumir</button>`;
            }

            row.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong>${item.name || 'Objeto'} ${item.isEquipped ? "(Equipado)" : ""}</strong>
                    <div>
                        ${equipBtn}
                        ${consumeBtn}
                        <button class="btn-remove-inv" data-index="${index}" style="background:red; color:white; border:none; border-radius:3px; cursor:pointer;">X</button>
                    </div>
                </div>
                <div style="font-size: 0.9em; color:#555;">${item.type || 'Otro'} | Peso: ${item.weight || 0} lbs</div>
            `;
            invContainer.appendChild(row);
        });

        invContainer.querySelectorAll(".btn-equip").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let idx = e.target.getAttribute("data-index");
                inventory[idx].isEquipped = !inventory[idx].isEquipped;
                localStorage.setItem("dnd35_inventory", JSON.stringify(inventory));
                renderInventory();
    if(window.renderSpells) window.renderSpells();
                updateCalculations();
                renderSkills();
            });
        });

        invContainer.querySelectorAll(".btn-consume").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let idx = e.target.getAttribute("data-index");
                let item = inventory[idx];
                if (item.heal) {
                    let healRoll = window.diceRoller.roll(item.heal, "Curación con " + item.name);
                    let curHp = parseInt(document.getElementById("hp-current").value) || 0;
                    document.getElementById("hp-current").value = curHp + healRoll;
                    document.getElementById("hp-current").dispatchEvent(new Event('input'));
                }
                inventory.splice(idx, 1);
                localStorage.setItem("dnd35_inventory", JSON.stringify(inventory));
                renderInventory();
    if(window.renderSpells) window.renderSpells();
                updateCalculations();
            });
        });

        invContainer.querySelectorAll(".btn-remove-inv").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let idx = e.target.getAttribute("data-index");
                inventory.splice(idx, 1);
                localStorage.setItem("dnd35_inventory", JSON.stringify(inventory));
                renderInventory();
    if(window.renderSpells) window.renderSpells();
                updateCalculations();
            });
        });
    }

        // --- COMPENDIO DE INVENTARIO (D&D BEYOND STYLE) ---
    const btnOpenInv = document.getElementById("btn-open-inventory");
    const invSidebar = document.getElementById("inventory-sidebar");
    const invClose = document.getElementById("inventory-close");
    const invSearch = document.getElementById("inv-sidebar-search");
    const invFilterBtns = document.querySelectorAll(".inv-filter-btn");
    const invList = document.getElementById("inv-sidebar-list");
    let currentInvFilter = "all";

    if (btnOpenInv && invSidebar) {
        btnOpenInv.addEventListener("click", () => invSidebar.classList.add("open"));
        invClose.addEventListener("click", () => invSidebar.classList.remove("open"));

        function renderInvSidebar() {
            if (!invList || !window.DND_ITEMS) return;
            invList.innerHTML = "";
            let query = invSearch.value.toLowerCase();

            let filtered = window.DND_ITEMS.filter(item => {
                let matchType = currentInvFilter === "all" || item.type === currentInvFilter;
                let matchName = item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query));
                return matchType && matchName;
            });

            filtered.forEach(item => {
                let card = document.createElement("div");
                card.className = "inv-item-card";
                
                let weightStr = item.weight ? `${item.weight} lbs` : "-";
                let dmgStr = item.dmg ? ` | ${item.dmg}` : "";
                
                card.innerHTML = `
                    <strong>${item.name}</strong>
                    <div class="desc">${item.desc}</div>
                    <div class="meta">
                        <span>${item.type}${dmgStr}</span>
                        <span>${weightStr}</span>
                    </div>
                    <button class="btn-sidebar-add">Añadir</button>
                `;
                
                card.querySelector(".btn-sidebar-add").addEventListener("click", () => {
                    let inventory = [];
                    try { inventory = JSON.parse(localStorage.getItem("dnd35_inventory") || "[]"); } catch(e) {}
                    // Copiar objeto
                    let newItem = JSON.parse(JSON.stringify(item));
                    newItem.isEquipped = false;
                    newItem.qty = 1;
                    inventory.push(newItem);
                    localStorage.setItem("dnd35_inventory", JSON.stringify(inventory));
                    renderInventory();
                    
                    // Efecto visual de feedback
                    let btn = card.querySelector(".btn-sidebar-add");
                    let oldText = btn.innerText;
                    btn.innerText = "¡Añadido!";
                    btn.style.background = "#007bff";
                    setTimeout(() => {
                        btn.innerText = oldText;
                        btn.style.background = "#28a745";
                    }, 1000);
                });
                
                invList.appendChild(card);
            });
        }

        invSearch.addEventListener("input", renderInvSidebar);

        invFilterBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                invFilterBtns.forEach(b => {
                    b.classList.remove("active");
                    b.style.background = "#555";
                });
                e.target.classList.add("active");
                e.target.style.background = "var(--accent-color)";
                currentInvFilter = e.target.getAttribute("data-type");
                renderInvSidebar();
            });
        });

        
    // Importar JSON
    const btnImportDb = document.getElementById("btn-import-db");
    const importDbFile = document.getElementById("import-db-file");
    if(btnImportDb && importDbFile) {
        btnImportDb.addEventListener("click", () => {
            importDbFile.click();
        });
        
        importDbFile.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if(!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    let countSpells = 0;
                    let countItems = 0;
                    
                    if(data.spells && typeof data.spells === 'object') {
                        for(const [key, spell] of Object.entries(data.spells)) {
                            window.DND_DB.spells[key] = spell;
                            countSpells++;
                        }
                        let customSpells = JSON.parse(localStorage.getItem("dnd35_custom_spells") || "{}");
                        Object.assign(customSpells, data.spells);
                        localStorage.setItem("dnd35_custom_spells", JSON.stringify(customSpells));
                    }
                    
                    if(data.items && Array.isArray(data.items)) {
                        for(const item of data.items) {
                            window.DND_ITEMS.push(item);
                            countItems++;
                        }
                        let customItems = JSON.parse(localStorage.getItem("dnd35_custom_items") || "[]");
                        customItems = customItems.concat(data.items);
                        localStorage.setItem("dnd35_custom_items", JSON.stringify(customItems));
                    }
                    
                    if (countSpells > 0 || countItems > 0) {
                        alert(`¡Éxito! Se importaron ${countSpells} hechizos y ${countItems} objetos.`);
                        if(window.renderSpellsList) window.renderSpellsList();
                        if(window.renderInvSidebar) window.renderInvSidebar();
                    } else {
                        alert("El JSON debe contener un objeto 'spells' y/o un array 'items'.");
                    }
                } catch(err) {
                    alert("Error al leer el archivo JSON: " + err.message);
                }
                // Reset file input
                importDbFile.value = '';
            };
            reader.readAsText(file);
        });
    }

        // Click outside to close (optional, maybe not needed if it's a sidebar)
        document.addEventListener("click", (e) => {
            if (invSidebar.classList.contains("open") && !invSidebar.contains(e.target) && e.target !== btnOpenInv && !btnOpenInv.contains(e.target)) {
                invSidebar.classList.remove("open");
            }
        });
        
        // Initial render
        renderInvSidebar();
    }

    // --- ARMAS AUTOMÃÆÃÂTICAS ---
    if (btnAddWeapon) {
        btnAddWeapon.addEventListener("click", () => {
            const name = document.getElementById("new-wpn-name").value;
            const atk = document.getElementById("new-wpn-atk").value;
            const dmg = document.getElementById("new-wpn-dmg").value;
            
            if (name && atk && dmg) {
                let manualWpns = JSON.parse(localStorage.getItem("dnd35_manual_weapons") || "[]");
                manualWpns.push({ name: name, atk: atk, dmg: dmg });
                localStorage.setItem("dnd35_manual_weapons", JSON.stringify(manualWpns));
                
                document.getElementById("new-wpn-name").value = "";
                document.getElementById("new-wpn-atk").value = "";
                document.getElementById("new-wpn-dmg").value = "";
                
                if (window.renderActions) window.renderActions();
            } else {
                alert("Rellena todos los campos (Nombre, Ataque y Daño).");
            }
        });
    }

        window.renderWeapons = function() {}

        // --- SELECTOR DE DADOS ---
    const diceScaleSelector = document.getElementById("dice-scale-selector");
    if (diceScaleSelector) {
        diceScaleSelector.value = localStorage.getItem("dnd35_dice_scale") || "10";
        diceScaleSelector.addEventListener("change", (e) => {
            if (typeof saveData === 'function') saveData();
            localStorage.setItem("dnd35_dice_scale", e.target.value);
            location.reload();
        });
    }

    
    // Load custom spells from localStorage
    const customSpells = JSON.parse(localStorage.getItem("dnd35_custom_spells") || "{}");
    if(window.DND_DB && window.DND_DB.spells) {
        Object.assign(window.DND_DB.spells, customSpells);
    }
    
    // Load custom items from localStorage
    const customItems = JSON.parse(localStorage.getItem("dnd35_custom_items") || "[]");
    if(window.DND_ITEMS) {
        window.DND_ITEMS.push(...customItems);
    }

    window.turnState = { standard: true, move: true, swift: true };

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
            tStandard.innerHTML = window.turnState.standard ? "🟢 Acción Estándar" : "⚪ Acción Estándar";
            tStandard.style.opacity = window.turnState.standard ? "1" : "0.5";
        }
        if (tMove) {
            tMove.innerHTML = window.turnState.move ? "🟢 Acción de Movimiento" : "⚪ Acción de Movimiento";
            tMove.style.opacity = window.turnState.move ? "1" : "0.5";
        }
        if (tSwift) {
            tSwift.innerHTML = window.turnState.swift ? "🟢 Acción Rápida" : "⚪ Acción Rápida";
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
                    div.title = "Haz clic para consumir esta acción";
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
        let babStr = document.getElementById('combat-bab')?.value || '0';
        let babArray = babStr.split('/').map(b => parseInt(b.replace('+','')) || 0);

        let inventory = JSON.parse(localStorage.getItem('dnd35_inventory') || '[]');
        let hasWeapons = false;

        inventory.forEach(item => {
            if (item.type === "Arma" && item.isEquipped) {
                hasWeapons = true;
                let atkMod = item.finesse ? Math.max(strMod, dexMod) : strMod;
                if (item.ranged) atkMod = dexMod;
                let dmgMod = item.ranged ? 0 : strMod;
                let dmgStr = dmgMod >= 0 ? '+' + dmgMod : '' + dmgMod;

                let firstAtk = babArray[0] + atkMod + (window.combatCondAtkPen || 0);
                let firstAtkStr = firstAtk >= 0 ? '+' + firstAtk : '' + firstAtk;
                let stdHtml = `<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20${firstAtkStr}" data-reason="Atacar con ${item.name}">Atq: ${firstAtkStr}</span> | ` +
                              `<span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="${item.dmg}${dmgStr}" data-reason="Daño con ${item.name}">Daño: ${item.dmg}${dmgStr}</span>`;
                addAction(std, 'Atacar (' + item.name + ')', '', 'standard', stdHtml);

                if (babArray.length > 1) {
                    let fullHtml = babArray.map((bab, idx) => {
                        let totalAtk = bab + atkMod + (window.combatCondAtkPen || 0);
                        let atkStr = totalAtk >= 0 ? '+' + totalAtk : '' + totalAtk;
                        return `<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20${atkStr}" data-reason="Ataque ${idx+1} con ${item.name}">Atq ${idx+1}: ${atkStr}</span>`;
                    }).join(' ') + ` | <span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="${item.dmg}${dmgStr}" data-reason="Daño con ${item.name}">Daño: ${item.dmg}${dmgStr}</span>`;
                    
                    addAction(full, 'Ataque Completo (' + item.name + ')', '', 'full', fullHtml);
                }
            }
        });

        let manualWpns = JSON.parse(localStorage.getItem('dnd35_manual_weapons') || '[]');
        manualWpns.forEach((wpn, wpnIdx) => {
            hasWeapons = true;
            let mBabArray = wpn.atk.split('/').map(a => parseInt(a) || 0);
            
            let firstAtk = mBabArray[0] + (window.combatCondAtkPen || 0);
            let firstAtkStr = firstAtk >= 0 ? '+' + firstAtk : '' + firstAtk;
            let stdHtml = `<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20${firstAtkStr}" data-reason="Atacar con ${wpn.name}">Atq: ${firstAtkStr}</span> | ` +
                          `<span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="${wpn.dmg}" data-reason="Daño con ${wpn.name}">Daño: ${wpn.dmg}</span>`;
            addAction(std, 'Atacar (' + wpn.name + ' - Manual)', '', 'standard', stdHtml);

            if (mBabArray.length > 1) {
                let fullHtml = mBabArray.map((bab, idx) => {
                    let tBab = bab + (window.combatCondAtkPen || 0); let atkStr = tBab >= 0 ? '+' + tBab : '' + tBab;
                    return `<span class="rollable" style="cursor:pointer; background:#e8f5e9; padding:2px 5px; border-radius:3px; margin-right:2px;" data-formula="1d20${atkStr}" data-reason="Ataque ${idx+1} con ${wpn.name}">Atq ${idx+1}: ${atkStr}</span>`;
                }).join(' ') + ` | <span class="rollable" style="cursor:pointer; background:#ffebee; padding:2px 5px; border-radius:3px;" data-formula="${wpn.dmg}" data-reason="Daño con ${wpn.name}">Daño: ${wpn.dmg}</span>`;
                addAction(full, 'Ataque Completo (' + wpn.name + ' - Manual)', '', 'full', fullHtml);
            }
        });

        if (!hasWeapons) {
            addAction(std, 'Atacar (Desarmado)', 'Realiza un único ataque con un arma cuerpo a cuerpo o a distancia.', 'standard');
        }

        addAction(std, 'Defensa Total', 'No atacas, ganas +4 a tu CA durante una ronda.', 'standard');
        
        let speed = document.getElementById('combat-speed')?.value || '30 pies'; if (window.isEncumbered) { speed = speed.replace('30', '20').replace('40', '30'); }
        addAction(move, 'Moverse', 'Te desplazas hasta ' + speed + '.', 'move');
        addAction(move, 'Desenvainar Arma', 'Prepara tu arma. (Gratuita si mueves y BAB > 0).', 'move');
        
        if (babArray.length <= 1) {
            addAction(full, 'Cargar', 'Te mueves hasta el doble de tu velocidad y atacas (+2 Ataque, -2 CA).', 'full');
        }
        
        let lsClasses = [];
        try { lsClasses = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
        let baseClass = "";
        if (lsClasses.length > 0) {
            baseClass = lsClasses[0].classKey;
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
            addAction(std, 'Lanzar Hechizo', 'Puedes lanzar cualquiera de tus hechizos conocidos de acción estándar.', 'standard');
        }
    }

    const btnResetTurn = document.getElementById('btn-reset-turn');
    if (btnResetTurn) {
        btnResetTurn.addEventListener('click', () => {
            
    // Load custom spells from localStorage
    const customSpells = JSON.parse(localStorage.getItem("dnd35_custom_spells") || "{}");
    if(window.DND_DB && window.DND_DB.spells) {
        Object.assign(window.DND_DB.spells, customSpells);
    }
    
    // Load custom items from localStorage
    const customItems = JSON.parse(localStorage.getItem("dnd35_custom_items") || "[]");
    if(window.DND_ITEMS) {
        window.DND_ITEMS.push(...customItems);
    }

    window.turnState = { standard: true, move: true, swift: true };
            window.renderActions();
        });
    }

    // Iniciar
    loadData();
    renderFeats();
    renderInventory();
    if(window.renderSpells) window.renderSpells();
    renderSkills();
    updateCalculations();
});


















    // --- HEALTH & DEATH SYSTEM ---
    window.updateHpStatus = function() {
        const hpEl = document.getElementById("hp-current");
        const statusEl = document.getElementById("hp-status");
        if (!hpEl || !statusEl) return;
        
        const hp = parseInt(hpEl.value) || 0;
        
        if (hp > 0) {
            statusEl.innerText = "Saludable";
            statusEl.style.color = "green";
        } else if (hp === 0) {
            statusEl.innerText = "Incapacitado (Solo 1 acción)";
            statusEl.style.color = "orange";
        } else if (hp >= -9) {
            statusEl.innerText = "Moribundo (Inconsciente)";
            statusEl.style.color = "red";
        } else {
            statusEl.innerText = "¡MUERTO!";
            statusEl.style.color = "black";
        }
    };
    
    document.getElementById("hp-current")?.addEventListener("input", window.updateHpStatus);

    document.getElementById("btn-dmg")?.addEventListener("click", () => {
        let modVal = parseInt(document.getElementById("hp-mod-val")?.value) || 0;
        if (modVal <= 0) return;
        
        let tempHpEl = document.getElementById("hp-temp");
        let currentHpEl = document.getElementById("hp-current");
        
        let tempHp = parseInt(tempHpEl.value) || 0;
        let currentHp = parseInt(currentHpEl.value) || 0;
        
        if (tempHp > 0) {
            if (modVal <= tempHp) {
                tempHp -= modVal;
                modVal = 0;
            } else {
                modVal -= tempHp;
                tempHp = 0;
            }
        }
        
        currentHp -= modVal;
        
        tempHpEl.value = tempHp;
        currentHpEl.value = currentHp;
        
        tempHpEl.dispatchEvent(new Event('input'));
        currentHpEl.dispatchEvent(new Event('input'));
        
        document.getElementById("hp-mod-val").value = "";
    });

    document.getElementById("btn-heal")?.addEventListener("click", () => {
        let modVal = parseInt(document.getElementById("hp-mod-val")?.value) || 0;
        if (modVal <= 0) return;
        
        let currentHpEl = document.getElementById("hp-current");
        let maxHp = parseInt(document.getElementById("hp-total")?.value) || 10;
        let currentHp = parseInt(currentHpEl.value) || 0;
        
        currentHp += modVal;
        if (currentHp > maxHp) currentHp = maxHp; // No curar por encima del máximo (usar temp HP para eso)
        
        currentHpEl.value = currentHp;
        currentHpEl.dispatchEvent(new Event('input'));
        
        document.getElementById("hp-mod-val").value = "";
    });

    // --- RESTING SYSTEM ---
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

            let lsClasses = [];
        try { lsClasses = JSON.parse(localStorage.getItem('dnd35_classes') || '[]'); } catch(e) {}
        let baseClass = "";
        let casterLevel = 1;
        if (lsClasses.length > 0) {
            baseClass = lsClasses[0].classKey;
            casterLevel = lsClasses[0].level;
        }

            
            let hitDie = baseClass && window.DND_DB.classes[baseClass] ? window.DND_DB.classes[baseClass].hitDie : 8;
            
            let amountStr = prompt(`Descanso Corto: Tienes ${availableHD} dado(s) de golpe (d${hitDie}) disponibles. ¿Cuántos quieres gastar?`, "1");
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
            
            let formula = `${amount}d${hitDie}${modStr}`;
            
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
                localStorage.removeItem("dnd35_used_hd");
                if(window.renderSpells) window.renderSpells();
                alert("Descanso completado. Estás a tope.");
            }
        });
    }
    
    document.querySelectorAll(".condition-cb").forEach(cb => {
        cb.addEventListener("change", () => {
            if(window.updateCalculations) window.updateCalculations();
        });
    });
