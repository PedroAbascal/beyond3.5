import re

with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.read().split('\n')

correctSpellSlot = '''            const div = document.createElement("div");
            div.style.border = "1px solid #007bff"; div.style.padding = "5px"; div.style.borderRadius = "4px"; div.style.textAlign = "center";
            div.innerHTML = 
                <div style="font-size:0.8em; font-weight:bold; color:#007bff;">Nv \</div>
                <div>
                    <button class="btn-slot-minus" data-level="\" style="cursor:pointer;">-</button>
                    <span>\ / \</span>
                    <button class="btn-slot-plus" data-level="\" style="cursor:pointer;">+</button>
                </div>
            ;'''

# Replace lines 483 to 502 with correctSpellSlot
lines[483:503] = [correctSpellSlot]

# Check for other duplicated atkButtonsHtml declarations
# The user complained about Uncaught SyntaxError: Identifier 'atkButtonsHtml' has already been declared
# Actually, the error is because we have it in the same scope.

with open('app.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
