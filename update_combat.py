import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update HP Current to add status
old_hp_current = '''<div class="combat-box">
                    <label>HP Actual</label>
                    <input type="number" id="hp-current" class="data-bind always-editable" value="10">
                    <div style="display:flex; gap:5px; margin-top:5px;">'''

new_hp_current = '''<div class="combat-box">
                    <label>HP Actual</label>
                    <input type="number" id="hp-current" class="data-bind always-editable" value="10">
                    <div id="hp-status" style="font-size: 0.75em; font-weight: bold; margin-top: 2px; color: green;">Saludable</div>
                    <div style="display:flex; gap:5px; margin-top:5px;">'''

html = html.replace(old_hp_current, new_hp_current)

# Add Temp HP and Dmg/Heal next to BAB
old_bab = '''<div class="combat-box">
                    <label>Ataque Base (BAB)</label>
                    <input type="text" id="combat-bab" class="data-bind save-base" value="+1">
                </div>
                <div class="combat-box" style="grid-column: span 3;">'''

new_bab = '''<div class="combat-box">
                    <label>Ataque Base (BAB)</label>
                    <input type="text" id="combat-bab" class="data-bind save-base" value="+1">
                </div>
                <div class="combat-box">
                    <label title="Puntos de Golpe Temporales">HP Temp</label>
                    <input type="number" id="hp-temp" class="data-bind always-editable" value="0" style="border-color: #007bff; color: #007bff;">
                </div>
                <div class="combat-box">
                    <label>Modificar HP</label>
                    <div style="display:flex; align-items:center; gap:2px; justify-content:center; width:100%;">
                        <input type="number" id="hp-mod-val" value="0" style="width: 40px; text-align:center;">
                        <button id="btn-heal" style="background:#28a745; color:white; border:none; border-radius:3px; padding:2px 6px; font-weight:bold; cursor:pointer;" title="Curar">+</button>
                        <button id="btn-dmg" style="background:#dc3545; color:white; border:none; border-radius:3px; padding:2px 6px; font-weight:bold; cursor:pointer;" title="Recibir Daño">-</button>
                    </div>
                </div>
                <div class="combat-box" style="grid-column: span 3;">'''

html = html.replace(old_bab, new_bab)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
