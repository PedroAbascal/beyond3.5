import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace header with sidebar
old_header = '''    <header class="app-header">
        <h1>D&D 3.5 Character Sheet</h1>
        <div class="actions">
            <select id="dice-scale-selector" style="padding: 8px; border-radius: 4px; cursor: pointer;">
                <option value="4">Dados Pequeños</option>
                <option value="7">Dados Medianos</option>
                <option value="10">Dados Grandes</option>
            </select>
            <button id="btn-lock" style="background-color: #dc3545; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">?? Desbloquear Hoja</button>
            <button id="btn-levelup" style="background-color: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Subir de Nivel</button>
            <button id="btn-edit-layout" style="background-color: #6c757d; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Modo Edición</button>
            <button id="btn-wizard" class="btn-primary">? Crear con Asistente</button>
            <button id="btn-save">Guardar Manual</button>
            <button id="btn-export">Exportar Personaje</button>
            <label class="btn-import">
                Importar Personaje
                <input type="file" id="file-import" accept=".json" style="display:none;">
            </label>
        </div>
    </header>'''

# Because of mojibake in the previous powershell grep, we'll use regex to match the header block
header_regex = r"<header class=\"app-header\">.*?</header>"

new_sidebar = '''    <button id="sidebar-toggle" style="position: fixed; top: 10px; left: 10px; z-index: 1000; background: #8b0000; color: white; border: 2px solid #ffcc00; padding: 8px 12px; border-radius: 4px; cursor: pointer; font-size: 1.5em; line-height: 1; box-shadow: 0 0 5px rgba(0,0,0,0.5);">? Menú</button>
    
    <div id="sidebar" class="sidebar">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: white; margin: 0; font-size: 1.2em;">D&D 3.5 Tools</h2>
            <button id="sidebar-close" style="background: none; border: none; color: white; font-size: 2em; cursor: pointer;">&times;</button>
        </div>
        
        <div class="actions">
            <button id="btn-wizard" class="btn-primary" style="background-color: #d4af37; color: black; margin-bottom: 15px;">? Creador de Personaje</button>
            <button id="btn-levelup" style="background-color: #28a745; margin-bottom: 15px;">Subir de Nivel</button>
            
            <hr style="width: 100%; border: 1px solid #555; margin: 10px 0;">
            
            <button id="btn-lock" style="background-color: #dc3545;">?? Desbloquear Hoja</button>
            <button id="btn-edit-layout" style="background-color: #6c757d;">Modo Edición</button>
            
            <hr style="width: 100%; border: 1px solid #555; margin: 10px 0;">
            
            <button id="btn-save">Guardar Personaje</button>
            <button id="btn-export">Exportar a Archivo</button>
            <label class="btn-import">
                Importar de Archivo
                <input type="file" id="file-import" accept=".json" style="display:none;">
            </label>
            
            <hr style="width: 100%; border: 1px solid #555; margin: 10px 0;">
            
            <label style="color: white; font-size: 0.8em;">Tamaño de los Dados 3D</label>
            <select id="dice-scale-selector" style="padding: 8px; border-radius: 4px; cursor: pointer; width: 100%;">
                <option value="4">Pequeños</option>
                <option value="7">Medianos</option>
                <option value="10">Grandes</option>
            </select>
        </div>
    </div>'''

html = re.sub(header_regex, new_sidebar, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
