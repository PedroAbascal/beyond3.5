import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I want to replace the save-grid content.
# I will use regex because of potential mojibake.

regex_saves = r"<div class=\"save-grid\">.*?</div>\s*</section>"

new_saves = '''<div class="save-grid" style="grid-template-columns: 1fr 1fr;">
                <div class="save-name" style="font-weight: bold; font-size: 1.1em; color: #8b0000;">Fortaleza (CON)</div>
                <input type="hidden" id="save-fort-base" class="data-bind save-base" value="0">
                <div class="save-mod" id="save-mod-con" style="display: none;">+0</div>
                <input type="text" id="save-fort-total" class="save-total rollable" data-reason="Salvación: Fortaleza" value="+0" readonly style="cursor:pointer; background:#fff0f0; font-weight:bold; font-size: 1.2em; text-align: center; border: 2px solid #8b0000; border-radius: 4px; padding: 5px; color: #8b0000; transition: background 0.2s;">

                <div class="save-name" style="font-weight: bold; font-size: 1.1em; color: #8b0000;">Reflejos (DES)</div>
                <input type="hidden" id="save-ref-base" class="data-bind save-base" value="0">
                <div class="save-mod" id="save-mod-dex" style="display: none;">+0</div>
                <input type="text" id="save-ref-total" class="save-total rollable" data-reason="Salvación: Reflejos" value="+0" readonly style="cursor:pointer; background:#fff0f0; font-weight:bold; font-size: 1.2em; text-align: center; border: 2px solid #8b0000; border-radius: 4px; padding: 5px; color: #8b0000; transition: background 0.2s;">

                <div class="save-name" style="font-weight: bold; font-size: 1.1em; color: #8b0000;">Voluntad (SAB)</div>
                <input type="hidden" id="save-will-base" class="data-bind save-base" value="0">
                <div class="save-mod" id="save-mod-wis" style="display: none;">+0</div>
                <input type="text" id="save-will-total" class="save-total rollable" data-reason="Salvación: Voluntad" value="+0" readonly style="cursor:pointer; background:#fff0f0; font-weight:bold; font-size: 1.2em; text-align: center; border: 2px solid #8b0000; border-radius: 4px; padding: 5px; color: #8b0000; transition: background 0.2s;">
            </div>
        </section>'''

html = re.sub(regex_saves, new_saves, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
