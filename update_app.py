import re

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_block = '''    const spellSearch = document.getElementById("search-spell");
    const btnAddSpell = document.getElementById("btn-add-spell");
    if (spellSearch && btnAddSpell && typeof window.DND_DB !== 'undefined' && window.DND_DB.spells) {
        const datalist = document.getElementById("spells-datalist");
        if (datalist) {
            window.DND_DB.spells.forEach(s => {
                const opt = document.createElement("option");
                opt.value = s.name;
                datalist.appendChild(opt);
            });
        }
        
        btnAddSpell.addEventListener("click", () => {'''

new_block = '''    const spellSearch = document.getElementById("search-spell");
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
        
        btnAddSpell.addEventListener("click", () => {'''

js = js.replace(old_block, new_block)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)
