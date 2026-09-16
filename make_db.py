import json

db = {
    "races": {
        "human": {
            "name": "Humano",
            "size": "Mediano",
            "speed": 30,
            "statMods": { "str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0 },
            "description": "+1 dote a nivel 1. +4 puntos de habilidad a nivel 1."
        },
        "elf": {
            "name": "Elfo",
            "size": "Mediano",
            "speed": 30,
            "statMods": { "str": 0, "dex": 2, "con": -2, "int": 0, "wis": 0, "cha": 0 },
            "description": "Inmunidad a dormir. Vision en la penumbra. +2 a Avistar, Buscar, Escuchar."
        },
        "dwarf": {
            "name": "Enano",
            "size": "Mediano",
            "speed": 20,
            "statMods": { "str": 0, "dex": 0, "con": 2, "int": 0, "wis": 0, "cha": -2 },
            "description": "Vision en la oscuridad. Afinidad con la piedra. +2 en salvaciones contra venenos y magia."
        },
        "halfling": {
            "name": "Mediano",
            "size": "Pequeno",
            "speed": 20,
            "statMods": { "str": -2, "dex": 2, "con": 0, "int": 0, "wis": 0, "cha": 0 },
            "description": "+1 tamano a CA y ataque. +2 a Trepar, Saltar, Moverse Silenciosamente. +1 todas las salvaciones."
        },
        "gnome": {
            "name": "Gnomo",
            "size": "Pequeno",
            "speed": 20,
            "statMods": { "str": -2, "dex": 0, "con": 2, "int": 0, "wis": 0, "cha": 0 },
            "description": "+1 tamano a CA y ataque. Vision en la penumbra. +2 salvaciones contra ilusiones."
        },
        "half-orc": {
            "name": "Semi-orco",
            "size": "Mediano",
            "speed": 30,
            "statMods": { "str": 2, "dex": 0, "con": 0, "int": -2, "wis": 0, "cha": -2 },
            "description": "Vision en la oscuridad 60 pies. Sangre orca."
        },
        "half-elf": {
            "name": "Semi-elfo",
            "size": "Mediano",
            "speed": 30,
            "statMods": { "str": 0, "dex": 0, "con": 0, "int": 0, "wis": 0, "cha": 0 },
            "description": "Inmunidad a dormir. Vision en la penumbra. +1 a Avistar, Buscar, Escuchar, Diplomacia."
        }
    },
    "classes": {
        "barbarian": {
            "name": "Barbaro", "hitDie": 12, "bab": 1, "skillPts": 4,
            "saves": { "fort": 2, "ref": 0, "will": 0 },
            "classSkills": ["artesania", "intimidar", "montar", "nadar", "saltar", "trepar", "escuchar", "supervivencia", "trato_con_animales"],
            "features": [
                {"name": "Furia", "type": "free", "desc": "+4 Fue, +4 Con, +2 Vol, -2 CA (1/dia)."},
                {"name": "Movimiento Rapido", "type": "passive", "desc": "+10 pies velocidad."},
                {"name": "Esquiva Asombrosa", "type": "passive", "desc": "Retienes bono de Destreza a CA incluso si te sorprenden."}
            ]
        },
        "bard": {
            "name": "Bardo", "hitDie": 6, "bab": 0, "skillPts": 6,
            "saves": { "fort": 0, "ref": 2, "will": 2 },
            "classSkills": ["acrobacias", "artesania", "averiguar_intenciones", "concentracion", "conocimiento_de_conjuros", "descifrar_escritura", "diplomacia", "disfrazarse", "enganar", "equilibrio", "esconderse", "escuchar", "interpretar", "moverse_silenciosamente", "nadar", "reunir_informacion", "saltar", "tasacion", "trepar", "usar_objeto_magico"],
            "spellcaster": { "type": "spontaneous", "attr": "cha", "slotsByLevel": { "1": [2], "2": [3, 0], "3": [3, 1], "4": [3, 2, 0] } },
            "features": [
                {"name": "Musica Bardica", "type": "standard", "desc": "Inspirar valor, fascinar, etc. (1/dia por nivel)."},
                {"name": "Conocimiento de Bardo", "type": "free", "desc": "Tirada para recordar informacion arcana o local."}
            ]
        },
        "cleric": {
            "name": "Clerigo", "hitDie": 8, "bab": 0, "skillPts": 2,
            "saves": { "fort": 2, "ref": 0, "will": 2 },
            "classSkills": ["artesania", "concentracion", "conocimiento_de_conjuros", "curar", "diplomacia", "saber_arcano", "saber_historia", "saber_los_planos", "saber_religion"],
            "spellcaster": { "type": "prepared", "attr": "wis", "slotsByLevel": { "1": [3, 1], "2": [4, 2], "3": [4, 2, 1], "4": [5, 3, 2] } },
            "features": [
                {"name": "Expulsar Muertos Vivientes", "type": "standard", "desc": "Canaliza energia divina para ahuyentar o destruir muertos vivientes."}
            ]
        },
        "druid": {
            "name": "Druida", "hitDie": 8, "bab": 0, "skillPts": 4,
            "saves": { "fort": 2, "ref": 0, "will": 2 },
            "classSkills": ["artesania", "avistar", "concentracion", "conocimiento_de_conjuros", "curar", "diplomacia", "escuchar", "montar", "nadar", "saber_naturaleza", "supervivencia", "trato_con_animales"],
            "spellcaster": { "type": "prepared", "attr": "wis", "slotsByLevel": { "1": [3, 1], "2": [4, 2], "3": [4, 2, 1], "4": [5, 3, 2] } },
            "features": [
                {"name": "Companero Animal", "type": "passive", "desc": "Tienes un companero animal leal que te acompana en combate."},
                {"name": "Empatia Salvaje", "type": "standard", "desc": "Mejora la actitud de un animal (1d20 + nivel + Cha)."},
                {"name": "Forma Salvaje", "type": "standard", "desc": "Te transformas en un animal Pequeno o Mediano (a partir de nivel 5)."}
            ]
        },
        "fighter": {
            "name": "Guerrero", "hitDie": 10, "bab": 1, "skillPts": 2,
            "saves": { "fort": 2, "ref": 0, "will": 0 },
            "classSkills": ["artesania", "intimidar", "montar", "nadar", "saltar", "trepar", "trato_con_animales"],
            "features": [
                {"name": "Dotes Adicionales de Combate", "type": "passive", "desc": "Recibes dotes de combate adicionales en el nivel 1 y en niveles pares."}
            ]
        },
        "monk": {
            "name": "Monje", "hitDie": 8, "bab": 0, "skillPts": 4,
            "saves": { "fort": 2, "ref": 2, "will": 2 },
            "classSkills": ["acrobacias", "artesania", "averiguar_intenciones", "concentracion", "diplomacia", "equilibrio", "esconderse", "escuchar", "moverse_silenciosamente", "nadar", "saltar", "trepar"],
            "features": [
                {"name": "Rafaga de Golpes", "type": "full", "desc": "Ataques adicionales desarmado o con armas de monje con penalizador."},
                {"name": "Ataque Desarmado", "type": "passive", "desc": "Dano mejorado (1d6 a nivel 1) al pelear sin armas."},
                {"name": "Evasion", "type": "passive", "desc": "Si pasas salvacion de Reflejos, recibes 0 dano en vez de la mitad."},
                {"name": "Punetazo Aturdidor", "type": "standard", "desc": "Tu ataque desarmado puede aturdir (Fort CD 10 + mitad nivel + Sab)."}
            ]
        },
        "paladin": {
            "name": "Paladin", "hitDie": 10, "bab": 1, "skillPts": 2,
            "saves": { "fort": 2, "ref": 0, "will": 0 },
            "classSkills": ["artesania", "averiguar_intenciones", "concentracion", "curar", "diplomacia", "montar", "saber_nobleza", "saber_religion", "trato_con_animales"],
            "features": [
                {"name": "Castigar al Mal", "type": "free", "desc": "Anade Cha al Ataque, Nivel al Dano contra un ser maligno (1/dia)."},
                {"name": "Detectar el Mal", "type": "standard", "desc": "A voluntad, como el hechizo."},
                {"name": "Imposicion de Manos", "type": "standard", "desc": "Cura (Nivel x Cha) PG al dia en total."},
                {"name": "Aura de Valor", "type": "passive", "desc": "Inmune al miedo, aliados a 10 pies ganan +4 a salvaciones contra miedo."}
            ]
        },
        "ranger": {
            "name": "Explorador", "hitDie": 8, "bab": 1, "skillPts": 6,
            "saves": { "fort": 2, "ref": 2, "will": 0 },
            "classSkills": ["artesania", "avistar", "buscar", "concentracion", "curar", "esconderse", "escuchar", "montar", "moverse_silenciosamente", "nadar", "saber_dungeons", "saber_geografia", "saber_naturaleza", "saltar", "supervivencia", "trepar", "trato_con_animales", "uso_de_cuerdas"],
            "features": [
                {"name": "Enemigo Predilecto", "type": "passive", "desc": "+2 a dano, enganar, escuchar, averiguar intenciones, avistar y supervivencia contra tu enemigo elegido."},
                {"name": "Empatia Salvaje", "type": "standard", "desc": "Mejora actitud de un animal salvaje."},
                {"name": "Estilo de Combate", "type": "passive", "desc": "A nivel 2, obtienes Tiro con Arco o Combate con Dos Armas."}
            ]
        },
        "rogue": {
            "name": "Picaro", "hitDie": 6, "bab": 0, "skillPts": 8,
            "saves": { "fort": 0, "ref": 2, "will": 0 },
            "classSkills": ["abrir_cerraduras", "acrobacias", "artesania", "averiguar_intenciones", "avistar", "buscar", "descifrar_escritura", "diplomacia", "disfrazarse", "enganar", "equilibrio", "esconderse", "escuchar", "falsificar", "hurto", "intimidar", "inutilizar_mecanismo", "moverse_silenciosamente", "nadar", "reunir_informacion", "saltar", "tasacion", "trepar", "usar_objeto_magico", "uso_de_cuerdas"],
            "features": [
                {"name": "Ataque Furtivo", "type": "passive", "desc": "+1d6 dano si el objetivo pierde bono de Destreza a la CA o lo flanqueas."},
                {"name": "Encontrar Trampas", "type": "passive", "desc": "Permite usar Buscar para encontrar trampas con CD mayor a 20."},
                {"name": "Evasion", "type": "passive", "desc": "Si pasas salvacion de Reflejos, recibes 0 dano en vez de la mitad."}
            ]
        },
        "sorcerer": {
            "name": "Hechicero", "hitDie": 4, "bab": 0, "skillPts": 2,
            "saves": { "fort": 0, "ref": 0, "will": 2 },
            "classSkills": ["artesania", "concentracion", "conocimiento_de_conjuros", "enganar", "saber_arcano"],
            "spellcaster": { "type": "spontaneous", "attr": "cha", "slotsByLevel": { "1": [5, 3], "2": [6, 4], "3": [6, 5], "4": [6, 6, 3] } },
            "features": [
                {"name": "Invocar Familiar", "type": "standard", "desc": "Obtienes un familiar magico que te otorga bonos pasivos."}
            ]
        },
        "wizard": {
            "name": "Mago", "hitDie": 4, "bab": 0, "skillPts": 2,
            "saves": { "fort": 0, "ref": 0, "will": 2 },
            "classSkills": ["artesania", "concentracion", "conocimiento_de_conjuros", "descifrar_escritura", "saber_arcano", "saber_arquitectura", "saber_dungeons", "saber_geografia", "saber_historia", "saber_local", "saber_los_planos", "saber_naturaleza", "saber_nobleza", "saber_religion"],
            "spellcaster": { "type": "prepared", "attr": "int", "slotsByLevel": { "1": [3, 1], "2": [4, 2], "3": [4, 2, 1], "4": [4, 3, 2] } },
            "features": [
                {"name": "Invocar Familiar", "type": "standard", "desc": "Obtienes un familiar magico."},
                {"name": "Inscribir Rollo de Pergamino", "type": "passive", "desc": "Dote adicional a nivel 1."}
            ]
        }
    },
    "skills": [
        { "id": "abrir_cerraduras", "name": "Abrir Cerraduras", "attr": "dex" },
        { "id": "acrobacias", "name": "Acrobacias", "attr": "dex" },
        { "id": "artesania", "name": "Artesania", "attr": "int" },
        { "id": "averiguar_intenciones", "name": "Averiguar Intenciones", "attr": "wis" },
        { "id": "avistar", "name": "Avistar", "attr": "wis" },
        { "id": "buscar", "name": "Buscar", "attr": "int" },
        { "id": "concentracion", "name": "Concentracion", "attr": "con" },
        { "id": "conocimiento_de_conjuros", "name": "Conocimiento de Conjuros", "attr": "int" },
        { "id": "curar", "name": "Curar", "attr": "wis" },
        { "id": "descifrar_escritura", "name": "Descifrar Escritura", "attr": "int" },
        { "id": "diplomacia", "name": "Diplomacia", "attr": "cha" },
        { "id": "disfrazarse", "name": "Disfrazarse", "attr": "cha" },
        { "id": "enganar", "name": "Enganar", "attr": "cha" },
        { "id": "equilibrio", "name": "Equilibrio", "attr": "dex" },
        { "id": "esconderse", "name": "Esconderse", "attr": "dex" },
        { "id": "escuchar", "name": "Escuchar", "attr": "wis" },
        { "id": "falsificar", "name": "Falsificar", "attr": "int" },
        { "id": "hurto", "name": "Hurto", "attr": "dex" },
        { "id": "interpretar", "name": "Interpretar", "attr": "cha" },
        { "id": "intimidar", "name": "Intimidar", "attr": "cha" },
        { "id": "inutilizar_mecanismo", "name": "Inutilizar Mecanismo", "attr": "int" },
        { "id": "montar", "name": "Montar", "attr": "dex" },
        { "id": "moverse_silenciosamente", "name": "Moverse Silenciosamente", "attr": "dex" },
        { "id": "nadar", "name": "Nadar", "attr": "str" },
        { "id": "reunir_informacion", "name": "Reunir Informacion", "attr": "cha" },
        { "id": "saber_arcano", "name": "Saber (Arcano)", "attr": "int" },
        { "id": "saber_arquitectura", "name": "Saber (Arquitectura)", "attr": "int" },
        { "id": "saber_dungeons", "name": "Saber (Dungeons)", "attr": "int" },
        { "id": "saber_geografia", "name": "Saber (Geografia)", "attr": "int" },
        { "id": "saber_historia", "name": "Saber (Historia)", "attr": "int" },
        { "id": "saber_local", "name": "Saber (Local)", "attr": "int" },
        { "id": "saber_los_planos", "name": "Saber (Los Planos)", "attr": "int" },
        { "id": "saber_naturaleza", "name": "Saber (Naturaleza)", "attr": "int" },
        { "id": "saber_nobleza", "name": "Saber (Nobleza)", "attr": "int" },
        { "id": "saber_religion", "name": "Saber (Religion)", "attr": "int" },
        { "id": "saltar", "name": "Saltar", "attr": "str" },
        { "id": "supervivencia", "name": "Supervivencia", "attr": "wis" },
        { "id": "tasacion", "name": "Tasacion", "attr": "int" },
        { "id": "trato_con_animales", "name": "Trato con Animales", "attr": "cha" },
        { "id": "trepar", "name": "Trepar", "attr": "str" },
        { "id": "usar_objeto_magico", "name": "Usar Objeto Magico", "attr": "cha" },
        { "id": "uso_de_cuerdas", "name": "Uso de Cuerdas", "attr": "dex" }
    ],
    "feats": [
        { "name": "Ataque Poderoso", "desc": "Cambia bonificador de ataque por dano cuerpo a cuerpo." },
        { "name": "Esquiva", "desc": "+1 a la CA por esquiva contra un oponente elegido.", "effects": { "ac": 1 } },
        { "name": "Iniciativa Mejorada", "desc": "+4 a las tiradas de iniciativa.", "effects": { "init": 4 } },
        { "name": "Soltura con un Arma", "desc": "+1 a las tiradas de ataque con el arma elegida." },
        { "name": "Dureza", "desc": "Ganas +3 puntos de golpe.", "effects": { "hp": 3 } },
        { "name": "Combate con Dos Armas", "desc": "Reduce los penalizadores por luchar con un arma en cada mano." },
        { "name": "Disparo a Bocajarro", "desc": "+1 al ataque y dano con armas a distancia a menos de 30 pies." },
        { "name": "Lanzar Conjuros en Combate", "desc": "+4 a las pruebas de Concentracion al lanzar a la defensiva.", "effects": { "skill_concentracion": 4 } },
        { "name": "Gran Fortaleza", "desc": "+2 a las tiradas de Fortaleza.", "effects": { "save_fort": 2 } },
        { "name": "Reflejos Rapidos", "desc": "+2 a las tiradas de Reflejos.", "effects": { "save_ref": 2 } },
        { "name": "Voluntad de Hierro", "desc": "+2 a las tiradas de Voluntad.", "effects": { "save_will": 2 } },
        { "name": "Sigiloso", "desc": "+2 a Esconderse y Moverse Silenciosamente.", "effects": { "skill_esconderse": 2, "skill_moverse_silenciosamente": 2 } },
        { "name": "Atletico", "desc": "+2 a Trepar y Nadar.", "effects": { "skill_trepar": 2, "skill_nadar": 2 } },
        { "name": "Afinidad con los Animales", "desc": "+2 a Trato con Animales y Montar.", "effects": { "skill_trato_con_animales": 2, "skill_montar": 2 } },
        { "name": "Hendidura", "desc": "Si reduces a un oponente a 0 PG, obtienes un ataque extra gratis." },
        { "name": "Ataque Elastico", "desc": "Puedes moverte antes y despues de atacar en cuerpo a cuerpo sin provocar AdO." }
    ],
    "spells": [
        { "name": "Misil Magico", "level": 1, "school": "Evocacion", "desc": "1d4+1 de dano por misil de fuerza. Infalible.", "formula": "1d4+1" },
        { "name": "Curar Heridas Leves", "level": 1, "school": "Conjuracion", "desc": "Cura 1d8 + 1/nivel (max +5).", "formula": "1d8+1" },
        { "name": "Rayo de Escarcha", "level": 0, "school": "Evocacion", "desc": "Ataque de toque a distancia, 1d3 dano por frio.", "formula": "1d3" },
        { "name": "Luz", "level": 0, "school": "Evocacion", "desc": "El objeto brilla como una antorcha durante 10 min/nivel." },
        { "name": "Armadura de Mago", "level": 1, "school": "Conjuracion", "desc": "Te otorga +4 de armadura a la CA por 1 hora/nivel." },
        { "name": "Escudo", "level": 1, "school": "Abjuracion", "desc": "Disco de fuerza invisible que otorga +4 CA y bloquea Misiles Magicos." },
        { "name": "Manos Ardientes", "level": 1, "school": "Evocacion", "desc": "Cono de 15 pies de fuego, 1d4 dano/nivel (max 5d4). Reflejos mitad.", "formula": "1d4" },
        { "name": "Dormir", "level": 1, "school": "Encantamiento", "desc": "Pone a dormir a 4 DG de criaturas. Voluntad niega." },
        { "name": "Causar Miedo", "level": 1, "school": "Nigromancia", "desc": "Criatura asustada huye 1d4 asaltos. Voluntad niega (DG 5 o menos)." },
        { "name": "Bendicion", "level": 1, "school": "Encantamiento", "desc": "Aliados ganan +1 ataque y salvaciones contra miedo por 1 min/nivel." },
        { "name": "Santuario", "level": 1, "school": "Abjuracion", "desc": "Los oponentes deben superar salvacion de Voluntad para atacarte." },
        { "name": "Escudo de Fe", "level": 1, "school": "Abjuracion", "desc": "Otorga +2 a la CA (desvio) por 1 min/nivel." },
        { "name": "Infligir Heridas Leves", "level": 1, "school": "Nigromancia", "desc": "Toque. Hace 1d8 + 1/nivel de dano (max +5).", "formula": "1d8+1" },
        { "name": "Curar Heridas Moderadas", "level": 2, "school": "Conjuracion", "desc": "Cura 2d8 + 1/nivel (max +10).", "formula": "2d8+1" },
        { "name": "Flecha Acida de Melf", "level": 2, "school": "Conjuracion", "desc": "Ataque de toque. 2d4 de dano por acido por 1 asalto + 1/3 niveles.", "formula": "2d4" },
        { "name": "Telarana", "level": 2, "school": "Conjuracion", "desc": "Rellena extension 20 pies con telaranas pegajosas." },
        { "name": "Invisibilidad", "level": 2, "school": "Ilusion", "desc": "Criatura u objeto se vuelve invisible por 1 min/nivel o hasta que ataque." },
        { "name": "Fuerza de Toro", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Fuerza durante 1 min/nivel." },
        { "name": "Gracia Felina", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Destreza durante 1 min/nivel." },
        { "name": "Resistencia de Oso", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Constitucion durante 1 min/nivel." },
        { "name": "Esplendor del Aguila", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Carisma durante 1 min/nivel." },
        { "name": "Astucia de Zorro", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Inteligencia durante 1 min/nivel." },
        { "name": "Sabiduria de Buho", "level": 2, "school": "Transmutacion", "desc": "El objetivo gana +4 de Sabiduria durante 1 min/nivel." },
        { "name": "Bola de Fuego", "level": 3, "school": "Evocacion", "desc": "Explosion de 20 pies. 1d6 dano de fuego/nivel (max 10d6). Reflejos mitad." },
        { "name": "Relampago", "level": 3, "school": "Evocacion", "desc": "Linea de 120 pies. 1d6 dano elec/nivel (max 10d6). Reflejos mitad." },
        { "name": "Volar", "level": 3, "school": "Transmutacion", "desc": "El objetivo gana velocidad de vuelo 60 pies por 1 min/nivel." },
        { "name": "Acelerar", "level": 3, "school": "Transmutacion", "desc": "+1 ataque, CA y Reflejos. Mueves 30 pies mas rapido. 1 asalto/nivel." },
        { "name": "Curar Heridas Graves", "level": 3, "school": "Conjuracion", "desc": "Cura 3d8 + 1/nivel (max +15).", "formula": "3d8+1" },
        { "name": "Disipar Magia", "level": 3, "school": "Abjuracion", "desc": "Cancela efectos magicos. Prueba de nivel de lanzador contra CD 11 + nivel del lanzador original." },
        { "name": "Plegaria", "level": 3, "school": "Encantamiento", "desc": "Aliados obtienen +1 Suerte al ataque, CA y salvaciones. Enemigos -1." }
    ]
}

js_output = "window.DND_DB = " + json.dumps(db, indent=4) + ";\n\nwindow.DND_DB.items = (window.DND_ITEMS) ? window.DND_ITEMS : [];\n"

with open('database.js', 'w', encoding='utf-8') as f:
    f.write(js_output)
