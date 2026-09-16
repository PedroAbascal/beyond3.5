const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split('\n');

const correctSpellSlot = \            const div = document.createElement("div");
            div.style.border = "1px solid #007bff"; div.style.padding = "5px"; div.style.borderRadius = "4px"; div.style.textAlign = "center";
            div.innerHTML = \\\
                <div style="font-size:0.8em; font-weight:bold; color:#007bff;">Nv \\\</div>
                <div>
                    <button class="btn-slot-minus" data-level="\\\" style="cursor:pointer;">-</button>
                    <span>\\\ / \\\</span>
                    <button class="btn-slot-plus" data-level="\\\" style="cursor:pointer;">+</button>
                </div>
            \\\;\;

lines.splice(483, 20, correctSpellSlot);

fs.writeFileSync('app.js', lines.join('\n'), 'utf8');
