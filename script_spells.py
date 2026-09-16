import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_slots = '''        slotsContainer.innerHTML = "";
        slotsDef.forEach((totalSlots, level) => {
            const used = usedSlots[level] || 0;
            const div = document.createElement("div");
            div.style.border = "1px solid #007bff"; div.style.padding = "5px"; div.style.borderRadius = "4px"; div.style.textAlign = "center";
            div.innerHTML = 
                <div style="font-size:0.8em; font-weight:bold; color:#007bff;">Nv </div>
                <div>
                    <button class="btn-slot-minus" data-level="" style="cursor:pointer;">-</button>
                    <span> / </span>
                    <button class="btn-slot-plus" data-level="" style="cursor:pointer;">+</button>
                </div>
            ;
            slotsContainer.appendChild(div);
        });

        slotsContainer.querySelectorAll(".btn-slot-minus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let lvl = e.target.getAttribute("data-level");
                if (!usedSlots[lvl]) usedSlots[lvl] = 0;
                if (usedSlots[lvl] < slotsDef[lvl]) {
                    usedSlots[lvl]++;
                    localStorage.setItem('dnd35_used_slots', JSON.stringify(usedSlots));
                    renderSpells();
                }
            });
        });

        slotsContainer.querySelectorAll(".btn-slot-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let lvl = e.target.getAttribute("data-level");
                if (usedSlots[lvl] && usedSlots[lvl] > 0) {
                    usedSlots[lvl]--;
                    localStorage.setItem('dnd35_used_slots', JSON.stringify(usedSlots));
                    renderSpells();
                }
            });
        });'''

new_slots = '''        slotsContainer.innerHTML = "";
        slotsDef.forEach((totalSlots, level) => {
            if (totalSlots <= 0) return;
            const used = usedSlots[level] || 0;
            const div = document.createElement("div");
            div.style.border = "1px solid #007bff"; div.style.padding = "5px"; div.style.borderRadius = "4px"; div.style.textAlign = "center";
            
            let boxesHtml = "";
            for (let i = 0; i < totalSlots; i++) {
                let isChecked = i < used ? "checked" : "";
                boxesHtml += <input type="checkbox" class="slot-checkbox" data-level=""  style="cursor:pointer; width:16px; height:16px; margin:2px;">;
            }
            
            div.innerHTML = 
                <div style="font-size:0.8em; font-weight:bold; color:#007bff; margin-bottom:3px;">Nivel </div>
                <div style="display:flex; justify-content:center; flex-wrap:wrap; max-width:120px;">
                    
                </div>
            ;
            slotsContainer.appendChild(div);
        });

        slotsContainer.querySelectorAll(".slot-checkbox").forEach(cb => {
            cb.addEventListener("change", (e) => {
                let lvl = e.target.getAttribute("data-level");
                // Contar cuántos están marcados en este nivel
                let checkedCount = 0;
                slotsContainer.querySelectorAll(.slot-checkbox[data-level=""]).forEach(box => {
                    if (box.checked) checkedCount++;
                });
                usedSlots[lvl] = checkedCount;
                localStorage.setItem('dnd35_used_slots', JSON.stringify(usedSlots));
            });
        });'''

app = app.replace(old_slots, new_slots)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
