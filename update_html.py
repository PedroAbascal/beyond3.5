import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the search group in panel-inventory
old_search = '''            <div class="search-add-group">
                <input type="text" id="search-item" list="items-datalist" placeholder="Buscar Objeto..." style="width: 70%;">
                <datalist id="items-datalist"></datalist>
                <button id="btn-add-item" class="btn-primary">Añadir</button>
            </div>'''
new_btn = '''            <button id="btn-open-inventory" class="btn-primary" style="width:100%; margin-bottom: 10px; background-color: #4a6fa5;">?? Administrar Inventario</button>'''

html = html.replace(old_search, new_btn)

# Add the sidebar to the bottom of the body
sidebar_html = '''
    <!-- INVENTORY SIDEBAR -->
    <div id="inventory-sidebar" class="sidebar-right">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #555; padding-bottom: 10px;">
            <h2 style="color: white; margin: 0; font-size: 1.4em;">Compendio de Objetos</h2>
            <button id="inventory-close" style="background: none; border: none; color: white; font-size: 2em; cursor: pointer; line-height: 1;">&times;</button>
        </div>
        
        <input type="text" id="inv-sidebar-search" placeholder="Buscar objeto..." style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border-radius: 4px; border: 1px solid #ccc;">
        
        <div style="display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 15px;" id="inv-filters">
            <button class="inv-filter-btn active" data-type="all" style="background:var(--accent-color); color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Todos</button>
            <button class="inv-filter-btn" data-type="Arma" style="background:#555; color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Armas</button>
            <button class="inv-filter-btn" data-type="Armadura" style="background:#555; color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Armaduras</button>
            <button class="inv-filter-btn" data-type="Poción" style="background:#555; color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Pociones</button>
            <button class="inv-filter-btn" data-type="Equipo" style="background:#555; color:white; border:none; padding:5px 8px; border-radius:3px; cursor:pointer;">Equipo</button>
        </div>

        <div id="inv-sidebar-list" style="display: flex; flex-direction: column; gap: 10px; overflow-y: auto; flex-grow: 1; padding-right: 5px;">
            <!-- Rendered by JS -->
        </div>
    </div>
'''

html = html.replace('</body>', sidebar_html + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
