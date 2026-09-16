import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_cond = '''                    <div id="conditions-container" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:5px; padding:5px; background:rgba(0,0,0,0.05); border-radius:4px;">
                        <label style="cursor:pointer;"><input type="checkbox" id="cond-prone" class="condition-cb"> Derribado</label>
                        <label style="cursor:pointer;"><input type="checkbox" id="cond-blinded" class="condition-cb"> Cegado</label>
                        <label style="cursor:pointer;"><input type="checkbox" id="cond-entangled" class="condition-cb"> Enmarañado</label>
                        <label style="cursor:pointer;"><input type="checkbox" id="cond-shaken" class="condition-cb"> Estremecido</label>
                    </div>'''

new_cond = '''                    <div id="conditions-container" style="display:flex; gap:15px; flex-wrap:wrap; margin-top:5px; padding:5px; background:rgba(0,0,0,0.05); border-radius:4px; justify-content: center; align-items: center;">
                        <label title="Derribado: -4 Ataque cuerpo a cuerpo, -4 CA contra ataques cuerpo a cuerpo." class="cond-badge">
                            <input type="checkbox" id="cond-prone" class="condition-cb" style="display:none;">
                            <span class="cond-icon">??</span>
                        </label>
                        <label title="Cegado: -2 CA, pierdes bono Destreza, 50% fallo al atacar." class="cond-badge">
                            <input type="checkbox" id="cond-blinded" class="condition-cb" style="display:none;">
                            <span class="cond-icon">??</span>
                        </label>
                        <label title="Enmarañado: Mitad de movimiento, -2 Ataque, -4 Destreza." class="cond-badge">
                            <input type="checkbox" id="cond-entangled" class="condition-cb" style="display:none;">
                            <span class="cond-icon">??</span>
                        </label>
                        <label title="Estremecido: -2 a Ataque, Salvaciones y Habilidades." class="cond-badge">
                            <input type="checkbox" id="cond-shaken" class="condition-cb" style="display:none;">
                            <span class="cond-icon">??</span>
                        </label>
                    </div>'''

html = html.replace(old_cond, new_cond)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
