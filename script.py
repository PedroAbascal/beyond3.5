import re

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

old_regex = r'btnAddWeapon\.addEventListener\(\"click\", \(\) => \{[\s\S]*?\} \/\/\s*Armas manuales'
new_listener = '''btnAddWeapon.addEventListener("click", () => {
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
                alert("Rellena todos los campos (Nombre, Ataque y Dano).");
            }
        }); // Armas manuales'''

app = re.sub(r'btnAddWeapon\.addEventListener\(\"click\", \(\) => \{[\s\S]*?\}\);(\s*if\s*\(window\.renderSpells)', new_listener + r'\n\1', app)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
