import re

with open('levelup.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the specific block in levelup.js
old_block = '''            // Clase
            let classStrObj = document.getElementById("char-class");
            let cls = DND_DB.classes[luData.chosenClass];
            if(classStrObj.value.includes(cls.name)) {
                let regex = new RegExp(()\\\\s*(\\\\d+));
                classStrObj.value = classStrObj.value.replace(regex, (match, p1, p2) => {
                    return ${p1} ;
                });
            } else {
                classStrObj.value +=  /  1;
            }
            classStrObj.dispatchEvent(new Event('input'));'''

new_block = '''            // Clase
            let newClassLevel = 1;
            let classStrObj = document.getElementById("char-class");
            let cls = DND_DB.classes[luData.chosenClass];
            
            // Clean out generic placeholder
            if (classStrObj.value.includes("Desconocido")) {
                classStrObj.value = "";
            }
            
            if(classStrObj.value.includes(cls.name)) {
                let regex = new RegExp(()\\\\s*(\\\\d+));
                classStrObj.value = classStrObj.value.replace(regex, (match, p1, p2) => {
                    newClassLevel = parseInt(p2) + 1;
                    return ${p1} ;
                });
            } else {
                if (classStrObj.value.trim() === "") {
                    classStrObj.value = ${cls.name} 1;
                } else {
                    classStrObj.value +=  /  1;
                }
            }
            classStrObj.dispatchEvent(new Event('input'));

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
                        let saveInput = document.getElementById(save--base);
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
                            lsFeats.push({ name: fName, type: "Rasgo de Clase", desc: Rasgo ganado a nivel  de  });
                            featuresGained.push(fName);
                        }
                    });
                    localStorage.setItem('dnd35_feats', JSON.stringify(lsFeats));
                }
            }
'''
if old_block in js:
    js = js.replace(old_block, new_block)
else:
    print("Block not found!")
    
# Fix the alert
old_alert = 'alert(¡Has subido al Nivel !\\nRecuerda ajustar manualmente tu BAB y Tiradas de Salvación según la tabla de tu clase, ya que la progresión no es lineal.);'
new_alert = '''let msg = ¡Has subido al Nivel !;
            if (featuresGained && featuresGained.length > 0) {
                msg += \\n\\nNuevos Rasgos de Clase Ganados:\\n- ;
            }
            alert(msg);'''

js = js.replace(old_alert, new_alert)
js = js.replace('alert(Has subido', 'alert(¡Has subido') # fallback for mojibake

with open('levelup.js', 'w', encoding='utf-8') as f:
    f.write(js)
