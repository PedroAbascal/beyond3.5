const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const actionsPanel = \
        <!-- Action Economy Panel -->
        <section class="panel actions" id="panel-actions">
            <h2>Econom\u00EDa de Turno (Combate)</h2>
            <div id="actions-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <!-- Standard -->
                <div style="border: 1px solid #17a2b8; border-radius: 4px; padding: 5px;">
                    <h3 style="margin-top:0; color: #17a2b8; font-size:1em;">Acci\u00F3n Est\u00E1ndar</h3>
                    <div id="actions-standard" class="dynamic-list" style="font-size:0.9em;"></div>
                </div>
                <!-- Move -->
                <div style="border: 1px solid #ffc107; border-radius: 4px; padding: 5px;">
                    <h3 style="margin-top:0; color: #ffc107; font-size:1em;">Acci\u00F3n de Movimiento</h3>
                    <div id="actions-move" class="dynamic-list" style="font-size:0.9em;"></div>
                </div>
                <!-- Full Round -->
                <div style="border: 1px solid #dc3545; border-radius: 4px; padding: 5px;">
                    <h3 style="margin-top:0; color: #dc3545; font-size:1em;">Asalto Completo</h3>
                    <div id="actions-full" class="dynamic-list" style="font-size:0.9em;"></div>
                </div>
                <!-- Free / Swift / Passive -->
                <div style="border: 1px solid #28a745; border-radius: 4px; padding: 5px;">
                    <h3 style="margin-top:0; color: #28a745; font-size:1em;">Gratuitas y Pasivas</h3>
                    <div id="actions-free" class="dynamic-list" style="font-size:0.9em;"></div>
                </div>
            </div>
        </section>
\;

content = content.replace(/(<!-- Spells -->)/, actionsPanel + '\n\n        \');
fs.writeFileSync('index.html', content, 'utf8');
