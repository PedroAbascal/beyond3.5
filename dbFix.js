const fs = require('fs');
let db = fs.readFileSync('database.js', 'utf8');

const correctClasses =     classes: {
        "barbarian": {
            name: "B\u00E1rbaro", hitDie: 12, bab: 1, skillPts: 4,
            saves: { fort: 2, ref: 0, will: 0 },
            classSkills: ["artesania", "intimidar", "montar", "nadar", "saltar", "trepar", "escuchar", "supervivencia", "trato_con_animales"],
            features: [
                {name: "Furia", type: "free", desc: "+4 Fue, +4 Con, +2 Vol, -2 CA."},
                {name: "Movimiento R\u00E1pido", type: "passive", desc: "+10 pies velocidad."}
            ]
        },
        "bard": {
            name: "Bardo", hitDie: 6, bab: 0, skillPts: 6,
            saves: { fort: 0, ref: 2, will: 2 },
            classSkills: ["acrobacias", "artesania", "averiguar_intenciones", "concentracion", "conocimiento_de_conjuros", "descifrar_escritura", "diplomacia", "disfrazarse", "enga\u00F1ar", "equilibrio", "esconderse", "escuchar", "interpretar", "moverse_silenciosamente", "nadar", "reunir_informacion", "saltar", "tasacion", "trepar", "usar_objeto_magico"],
            spellcaster: { type: "spontaneous", attr: "cha", slotsByLevel: { 1: [2] } },
            features: [
                {name: "M\u00FAsica B\u00E1rdica", type: "standard", desc: "Inspirar valor, fascinar, etc."},
                {name: "Conocimiento de Bardo", type: "free", desc: "Tirada para recordar informaci\u00F3n."}
            ]
        },
        "cleric": {
            name: "Cl\u00E9rigo", hitDie: 8, bab: 0, skillPts: 2,
            saves: { fort: 2, ref: 0, will: 2 },
            classSkills: ["artesania", "concentracion", "conocimiento_de_conjuros", "curar", "diplomacia", "saber_arcano", "saber_historia", "saber_los_planos", "saber_religion"],
            spellcaster: { type: "prepared", attr: "wis", slotsByLevel: { 1: [3, 1] } },
            features: [
                {name: "Expulsar Muertos Vivientes", type: "standard", desc: "Canaliza energ\u00EDa divina para ahuyentar o destruir muertos vivientes."}
            ]
        },
        "druid": {
            name: "Druida", hitDie: 8, bab: 0, skillPts: 4,
            saves: { fort: 2, ref: 0, will: 2 },
            classSkills: ["artesania", "avistar", "concentracion", "conocimiento_de_conjuros", "curar", "diplomacia", "escuchar", "montar", "nadar", "saber_naturaleza", "supervivencia", "trato_con_animales"],
            spellcaster: { type: "prepared", attr: "wis", slotsByLevel: { 1: [3, 1] } },
            features: [
                {name: "Compa\u00F1ero Animal", type: "passive", desc: "Tienes un compa\u00F1ero animal leal."},
                {name: "Empat\u00EDa Salvaje", type: "standard", desc: "Mejora la actitud de un animal."}
            ]
        },
        "fighter": {
            name: "Guerrero", hitDie: 10, bab: 1, skillPts: 2,
            saves: { fort: 2, ref: 0, will: 0 },
            classSkills: ["artesania", "intimidar", "montar", "nadar", "saltar", "trepar", "trato_con_animales"],
            features: [
                {name: "Dotes Adicionales", type: "passive", desc: "Recibes dotes de combate adicionales en niveles pares y nivel 1."}
            ]
        },
        "monk": {
            name: "Monje", hitDie: 8, bab: 0, skillPts: 4,
            saves: { fort: 2, ref: 2, will: 2 },
            classSkills: ["acrobacias", "artesania", "averiguar_intenciones", "concentracion", "diplomacia", "equilibrio", "esconderse", "escuchar", "moverse_silenciosamente", "nadar", "saltar", "trepar"],
            features: [
                {name: "R\u00E1faga de Golpes", type: "full", desc: "Ataques adicionales desarmado con penalizador."},
                {name: "Ataque Desarmado", type: "passive", desc: "Da\u00F1o mejorado al pelear sin armas."}
            ]
        },
        "paladin": {
            name: "Palad\u00EDn", hitDie: 10, bab: 1, skillPts: 2,
            saves: { fort: 2, ref: 0, will: 0 },
            classSkills: ["artesania", "averiguar_intenciones", "concentracion", "curar", "diplomacia", "montar", "saber_nobleza", "saber_religion", "trato_con_animales"],
            features: [
                {name: "Castigar al Mal", type: "free", desc: "A\u00F1ade Cha al Ataque, Nivel al Da\u00F1o contra un ser maligno (x1/d\u00EDa inicial)."},
                {name: "Detectar el Mal", type: "standard", desc: "A voluntad."},
                {name: "Imposici\u00F3n de Manos", type: "standard", desc: "Cura (Nivel x Cha) PG al d\u00EDa."}
            ]
        },
        "ranger": {
            name: "Explorador", hitDie: 8, bab: 1, skillPts: 6,
            saves: { fort: 2, ref: 2, will: 0 },
            classSkills: ["artesania", "avistar", "buscar", "concentracion", "curar", "esconderse", "escuchar", "montar", "moverse_silenciosamente", "nadar", "saber_dungeons", "saber_geografia", "saber_naturaleza", "saltar", "supervivencia", "trepar", "trato_con_animales", "uso_de_cuerdas"],
            features: [
                {name: "Enemigo Predilecto", type: "passive", desc: "+2 a da\u00F1o, enga\u00F1ar, escuchar, averiguar intenciones, avistar y supervivencia contra enemigo."},
                {name: "Empat\u00EDa Salvaje", type: "standard", desc: "Mejora actitud de un animal."}
            ]
        },
        "rogue": {
            name: "P\u00EDcaro", hitDie: 6, bab: 0, skillPts: 8,
            saves: { fort: 0, ref: 2, will: 0 },
            classSkills: ["abrir_cerraduras", "acrobacias", "artesania", "averiguar_intenciones", "avistar", "buscar", "descifrar_escritura", "diplomacia", "disfrazarse", "enga\u00F1ar", "equilibrio", "esconderse", "escuchar", "falsificar", "hurto", "intimidar", "inutilizar_mecanismo", "moverse_silenciosamente", "nadar", "reunir_informacion", "saltar", "tasacion", "trepar", "usar_objeto_magico", "uso_de_cuerdas"],
            features: [
                {name: "Ataque Furtivo", type: "passive", desc: "+1d6 da\u00F1o si el objetivo pierde bono de Destreza a la CA o lo flanqueas."},
                {name: "Encontrar Trampas", type: "passive", desc: "Buscar trampas con CD mayor a 20."}
            ]
        },
        "sorcerer": {
            name: "Hechicero", hitDie: 4, bab: 0, skillPts: 2,
            saves: { fort: 0, ref: 0, will: 2 },
            classSkills: ["artesania", "concentracion", "conocimiento_de_conjuros", "enga\u00F1ar", "saber_arcano"],
            spellcaster: { type: "spontaneous", attr: "cha", slotsByLevel: { 1: [5, 3] } },
            features: [
                {name: "Invocar Familiar", type: "standard", desc: "Obtienes un familiar m\u00E1gico."}
            ]
        },
        "wizard": {
            name: "Mago", hitDie: 4, bab: 0, skillPts: 2,
            saves: { fort: 0, ref: 0, will: 2 },
            classSkills: ["artesania", "concentracion", "conocimiento_de_conjuros", "descifrar_escritura", "saber_arcano", "saber_arquitectura", "saber_dungeons", "saber_geografia", "saber_historia", "saber_local", "saber_los_planos", "saber_naturaleza", "saber_nobleza", "saber_religion"],
            spellcaster: { type: "prepared", attr: "int", slotsByLevel: { 1: [3, 1] } },
            features: [
                {name: "Invocar Familiar", type: "standard", desc: "Obtienes un familiar m\u00E1gico."},
                {name: "Inscribir Rollo", type: "passive", desc: "Dote adicional a nivel 1."}
            ]
        }
    },;

db = db.replace(/classes:\s*\{[\s\S]*?\}[\s\n]*,[\s\n]*spells:/, correctClasses + '\n\n    spells:');
fs.writeFileSync('database.js', db, 'utf8');
