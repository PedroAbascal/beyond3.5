// Sistema de Tirada de Dados 2D y 3D

class DiceRoller {
    constructor() {
        this.logContainer = document.getElementById('dice-log');
        this.diceBox = null;
        this.clearTimeoutId = null;
        this.init3DDice();
    }

    async init3DDice() {
        try {
            // ImportaciÃ³n dinÃ¡mica para saltarse el require de type="module" en el HTML
            const module = await import("https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/dice-box.es.min.js");
            const DiceBox = module.default;
            
            this.diceBox = new DiceBox("#dice-box-container", {
                assetPath: "/assets/",
                theme: "default",
                themeColor: "#b22222",
                scale: parseFloat(localStorage.getItem("dnd35_dice_scale")) || 10
            });
            await this.diceBox.init();
            window.addEventListener('resize', () => { if(this.diceBox.resize) this.diceBox.resize(); });
            console.log("3D Dice inicializado correctamente.");
        } catch (e) {
            console.warn("No se pudieron cargar los dados 3D (Â¿CORS o sin internet?). Usando dados 2D clÃ¡sicos.", e);
        }
    }

    async roll(formula, reason) {
        formula = formula.toLowerCase().replace(/\s+/g, '');
        
        let match = formula.match(/^(\d*)d(\d+)([+\-]\d+)?$/);
        if (!match) {
            console.error("FÃ³rmula de dados no vÃ¡lida:", formula);
            return;
        }

        let numDice = parseInt(match[1]) || 1;
        let sides = parseInt(match[2]);
        let modifier = parseInt(match[3]) || 0;

        let rolls = [];
        let total = modifier;

        if (this.clearTimeoutId) clearTimeout(this.clearTimeoutId);

        if (this.diceBox) {
            // Tirada 3D
            const result = await this.diceBox.roll(`${numDice}d${sides}`);
            let rollTotal = 0;
            result.forEach(r => {
                rollTotal += r.value;
                rolls.push(r.value);
            });
            total = rollTotal + modifier;
            
            this.clearTimeoutId = setTimeout(() => {
                if (this.diceBox) this.diceBox.clear();
            }, 4500);
        } else {
            // Tirada 2D ClÃ¡sica Fallback
            for (let i = 0; i < numDice; i++) {
                let roll = Math.floor(Math.random() * sides) + 1;
                rolls.push(roll);
                total += roll;
            }
        }

        this.displayLog(reason, rolls, modifier, total, sides);
        if(window.Multiplayer && window.Multiplayer.sendRollResult) { window.Multiplayer.sendRollResult(reason, formula, total); }
        return total;
    }

    logMessage(message, subtext = "") {
        const entry = document.createElement('div');
        entry.className = 'dice-entry';
        
        setTimeout(() => {
            entry.classList.add('fade-out');
            setTimeout(() => {
                if(this.logContainer.contains(entry)) entry.remove();
            }, 1000);
        }, 4500);

        entry.innerHTML = `
            <div class="dice-reason">${message}</div>
            ${subtext ? `<div class="dice-formula" style="font-size:0.9em; margin-top:3px;">${subtext}</div>` : ''}
        `;
        this.logContainer.prepend(entry);
    }

    displayLog(reason, rolls, modifier, total, sides) {
        const entry = document.createElement('div');
        entry.className = 'dice-entry';
        
        setTimeout(() => {
            entry.classList.add('fade-out');
            setTimeout(() => {
                if(this.logContainer.contains(entry)) entry.remove();
            }, 1000);
        }, 4500);

        let rollsText = rolls.join(' + ');
        let modText = modifier > 0 ? ` + ${modifier}` : (modifier < 0 ? ` - ${Math.abs(modifier)}` : '');
        let dText = `d${sides}`;

        let isCrit = sides === 20 && rolls.includes(20);
        let isFumble = sides === 20 && rolls.includes(1);
        let statusHtml = '';
        
        if (isCrit) statusHtml = '<div style="color: #28a745; font-weight: bold; font-size: 0.9em;">Â¡CRÃTICO!</div>';
        if (isFumble) statusHtml = '<div style="color: #dc3545; font-weight: bold; font-size: 0.9em;">Â¡PIFIA!</div>';

        entry.innerHTML = `
            <div class="dice-reason">${reason}</div>
            <div class="dice-formula">[${rollsText}]${modText}</div>
            <div class="dice-total">${total}</div>
            ${statusHtml}
        `;

        this.logContainer.prepend(entry);
    }
}

// Inicializar globalmente
window.diceRoller = new DiceRoller();



