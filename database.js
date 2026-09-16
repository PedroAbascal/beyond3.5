window.DND_DB = {
    "races": {
        "human": {
            "name": "Humano",
            "size": "Medíano",
            "speed": 30,
            "statMods": {
                "str": 0,
                "dex": 0,
                "con": 0,
                "int": 0,
                "wis": 0,
                "cha": 0
            },
            "description": "+1 dote a nivel 1. +4 puntos de habilidad a nivel 1."
        },
        "elf": {
            "name": "Elfo",
            "size": "Medíano",
            "speed": 30,
            "statMods": {
                "str": 0,
                "dex": 2,
                "con": -2,
                "int": 0,
                "wis": 0,
                "cha": 0
            },
            "description": "Inmunidad a dormir. Vision en la penumbra. +2 a Avistar, Buscar, Escuchar."
        },
        "dwarf": {
            "name": "Enano",
            "size": "Medíano",
            "speed": 20,
            "statMods": {
                "str": 0,
                "dex": 0,
                "con": 2,
                "int": 0,
                "wis": 0,
                "cha": -2
            },
            "description": "Vision en la oscuridad. Afinidad con la piedra. +2 en salvaciónes contra venenos y magia."
        },
        "halfling": {
            "name": "Medíano",
            "size": "Pequeño",
            "speed": 20,
            "statMods": {
                "str": -2,
                "dex": 2,
                "con": 0,
                "int": 0,
                "wis": 0,
                "cha": 0
            },
            "description": "+1 tamaño a CA y ataque. +2 a Trepar, Saltar, Moverse Silenciosamente. +1 todas las salvaciónes."
        },
        "gnome": {
            "name": "Gnomo",
            "size": "Pequeño",
            "speed": 20,
            "statMods": {
                "str": -2,
                "dex": 0,
                "con": 2,
                "int": 0,
                "wis": 0,
                "cha": 0
            },
            "description": "+1 tamaño a CA y ataque. Vision en la penumbra. +2 salvaciónes contra ilusiones."
        },
        "half-orc": {
            "name": "Semi-orco",
            "size": "Medíano",
            "speed": 30,
            "statMods": {
                "str": 2,
                "dex": 0,
                "con": 0,
                "int": -2,
                "wis": 0,
                "cha": -2
            },
            "description": "Vision en la oscuridad 60 pies. Sangre orca."
        },
        "half-elf": {
            "name": "Semi-elfo",
            "size": "Medíano",
            "speed": 30,
            "statMods": {
                "str": 0,
                "dex": 0,
                "con": 0,
                "int": 0,
                "wis": 0,
                "cha": 0
            },
            "description": "Inmunidad a dormir. Vision en la penumbra. +1 a Avistar, Buscar, Escuchar, Diplomacia."
        }
    },
    "classes": {
        "barbarian": {
            "name": "Bárbaro",
            "hitDie": 12,
            "bab": "good",
            "skillPts": 4,
            "saves": {
                "fort": "good",
                "ref": "poor",
                "will": "poor"
            },
            "classSkills": [
                "artesania",
                "intimidar",
                "montar",
                "nadar",
                "saltar",
                "trepar",
                "escuchar",
                "supervivencia",
                "trato_con_animales"
            ],
            "features": [
                {
                    "name": "Furia",
                    "type": "free",
                    "desc": "+4 Fue, +4 Con, +2 Vol, -2 CA (1/día)."
                },
                {
                    "name": "Movimiento Rápido",
                    "type": "passive",
                    "desc": "+10 pies velocidad."
                },
                {
                    "name": "Esquiva Asombrosa",
                    "type": "passive",
                    "desc": "Retienes bono de Destreza a CA incluso si te sorprenden."
                }
            ],
            "primaryStats": [
                "str",
                "con"
            ],
            "dumpStats": [
                "int",
                "cha"
            ]
        },
        "bard": {
            "name": "Bardo",
            "hitDie": 6,
            "bab": "average",
            "skillPts": 6,
            "saves": {
                "fort": "poor",
                "ref": "good",
                "will": "good"
            },
            "classSkills": [
                "acrobacias",
                "artesania",
                "averiguar_intenciones",
                "concentracion",
                "conocimiento_de_conjuros",
                "descifrar_escritura",
                "diplomacia",
                "disfrazarse",
                "engañar",
                "equilibrio",
                "esconderse",
                "escuchar",
                "interpretar",
                "moverse_silenciosamente",
                "nadar",
                "reunir_información",
                "saltar",
                "tasacion",
                "trepar",
                "usar_objeto_mágico"
            ],
            "spellcaster": {
                "type": "spontaneous",
                "attr": "cha",
                "slotsByLevel": {
                    "1": [
                        2
                    ],
                    "2": [
                        3,
                        0
                    ],
                    "3": [
                        3,
                        1
                    ],
                    "4": [
                        3,
                        2,
                        0
                    ],
                    "5": [
                        3,
                        3,
                        1
                    ],
                    "6": [
                        3,
                        3,
                        2
                    ],
                    "7": [
                        3,
                        3,
                        2,
                        0
                    ],
                    "8": [
                        3,
                        3,
                        3,
                        1
                    ],
                    "9": [
                        3,
                        3,
                        3,
                        2
                    ],
                    "10": [
                        3,
                        3,
                        3,
                        2,
                        0
                    ],
                    "11": [
                        3,
                        3,
                        3,
                        3,
                        1
                    ],
                    "12": [
                        3,
                        3,
                        3,
                        3,
                        2
                    ],
                    "13": [
                        3,
                        3,
                        3,
                        3,
                        2,
                        0
                    ],
                    "14": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        1
                    ],
                    "15": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        2
                    ],
                    "16": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        2,
                        0
                    ],
                    "17": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        1
                    ],
                    "18": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        2
                    ],
                    "19": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        3
                    ],
                    "20": [
                        3,
                        3,
                        3,
                        3,
                        3,
                        3,
                        4
                    ]
                }
            },
            "features": [
                {
                    "name": "Música Bárdica",
                    "type": "standard",
                    "desc": "Inspirar valor, fascinar, etc. (1/día por nivel)."
                },
                {
                    "name": "Conocimiento de Bardo",
                    "type": "free",
                    "desc": "Tirada para recordar información arcana o local."
                }
            ],
            "primaryStats": [
                "cha",
                "dex"
            ],
            "dumpStats": [
                "str"
            ]
        },
        "cleric": {
            "name": "Clérigo",
            "hitDie": 8,
            "bab": "average",
            "skillPts": 2,
            "saves": {
                "fort": "good",
                "ref": "poor",
                "will": "good"
            },
            "classSkills": [
                "artesania",
                "concentracion",
                "conocimiento_de_conjuros",
                "curar",
                "diplomacia",
                "saber_arcano",
                "saber_historia",
                "saber_los_planos",
                "saber_religion"
            ],
            "spellcaster": {
                "type": "prepared",
                "attr": "wis",
                "slotsByLevel": {
                    "1": [
                        3,
                        2
                    ],
                    "2": [
                        4,
                        3
                    ],
                    "3": [
                        4,
                        3,
                        2
                    ],
                    "4": [
                        4,
                        4,
                        3
                    ],
                    "5": [
                        4,
                        4,
                        3,
                        2
                    ],
                    "6": [
                        4,
                        4,
                        4,
                        3
                    ],
                    "7": [
                        4,
                        5,
                        4,
                        3,
                        2
                    ],
                    "8": [
                        4,
                        5,
                        4,
                        4,
                        3
                    ],
                    "9": [
                        4,
                        5,
                        5,
                        4,
                        3,
                        2
                    ],
                    "10": [
                        4,
                        5,
                        5,
                        4,
                        4,
                        3
                    ],
                    "11": [
                        4,
                        5,
                        5,
                        5,
                        4,
                        3,
                        2
                    ],
                    "12": [
                        4,
                        5,
                        5,
                        5,
                        4,
                        4,
                        3
                    ],
                    "13": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        4,
                        3,
                        2
                    ],
                    "14": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        4,
                        4,
                        3
                    ],
                    "15": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        4,
                        3,
                        2
                    ],
                    "16": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        4,
                        4,
                        3
                    ],
                    "17": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        4,
                        3,
                        2
                    ],
                    "18": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        4,
                        4,
                        3
                    ],
                    "19": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        4,
                        4
                    ],
                    "20": [
                        4,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5
                    ]
                }
            },
            "features": [
                {
                    "name": "Expulsar Muertos Vivientes",
                    "type": "standard",
                    "desc": "Canaliza energía divina para ahuyentar o destruir muertos vivientes."
                }
            ],
            "primaryStats": [
                "wis",
                "con"
            ],
            "dumpStats": [
                "dex"
            ]
        },
        "druid": {
            "name": "Druida",
            "hitDie": 8,
            "bab": "average",
            "skillPts": 4,
            "saves": {
                "fort": "good",
                "ref": "poor",
                "will": "good"
            },
            "classSkills": [
                "artesania",
                "avistar",
                "concentracion",
                "conocimiento_de_conjuros",
                "curar",
                "diplomacia",
                "escuchar",
                "montar",
                "nadar",
                "saber_naturaleza",
                "supervivencia",
                "trato_con_animales"
            ],
            "spellcaster": {
                "type": "prepared",
                "attr": "wis",
                "slotsByLevel": {
                    "1": [
                        3,
                        1
                    ],
                    "2": [
                        4,
                        2
                    ],
                    "3": [
                        4,
                        2,
                        1
                    ],
                    "4": [
                        4,
                        3,
                        2
                    ],
                    "5": [
                        4,
                        3,
                        2,
                        1
                    ],
                    "6": [
                        4,
                        3,
                        3,
                        2
                    ],
                    "7": [
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "8": [
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "9": [
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "10": [
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "11": [
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "12": [
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "13": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "14": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "15": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "16": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "17": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "18": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "19": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3
                    ],
                    "20": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4
                    ]
                }
            },
            "features": [
                {
                    "name": "Compañero Animal",
                    "type": "passive",
                    "desc": "Tienes un companero animal leal que te acompaña en combate."
                },
                {
                    "name": "Empatía Salvaje",
                    "type": "standard",
                    "desc": "Mejora la actitud de un animal (1d20 + nivel + Cha)."
                },
                {
                    "name": "Forma Salvaje",
                    "type": "standard",
                    "desc": "Te transformas en un animal Pequeño o Medíano (a partir de nivel 5)."
                }
            ],
            "primaryStats": [
                "wis",
                "con"
            ],
            "dumpStats": [
                "cha"
            ]
        },
        "fighter": {
            "name": "Guerrero",
            "hitDie": 10,
            "bab": "good",
            "skillPts": 2,
            "saves": {
                "fort": "good",
                "ref": "poor",
                "will": "poor"
            },
            "classSkills": [
                "artesania",
                "intimidar",
                "montar",
                "nadar",
                "saltar",
                "trepar",
                "trato_con_animales"
            ],
            "features": [
                {
                    "name": "Dotes Adicionales de Combate",
                    "type": "passive",
                    "desc": "Recibes dotes de combate adicionales en el nivel 1 y en niveles pares."
                }
            ],
            "primaryStats": [
                "str",
                "con"
            ],
            "dumpStats": [
                "cha"
            ]
        },
        "monk": {
            "name": "Monje",
            "hitDie": 8,
            "bab": "average",
            "skillPts": 4,
            "saves": {
                "fort": "good",
                "ref": "good",
                "will": "good"
            },
            "classSkills": [
                "acrobacias",
                "artesania",
                "averiguar_intenciones",
                "concentracion",
                "diplomacia",
                "equilibrio",
                "esconderse",
                "escuchar",
                "moverse_silenciosamente",
                "nadar",
                "saltar",
                "trepar"
            ],
            "features": [
                {
                    "name": "Ráfaga de Golpes",
                    "type": "full",
                    "desc": "Ataques adicionales desarmado o con armas de monje con penalizador."
                },
                {
                    "name": "Ataque Desarmado",
                    "type": "passive",
                    "desc": "Dano mejorado (1d6 a nivel 1) al pelear sin armas."
                },
                {
                    "name": "Evasión",
                    "type": "passive",
                    "desc": "Si pasas salvación de Reflejos, recibes 0 daño en vez de la mitad."
                },
                {
                    "name": "Puñetazo Aturdidor",
                    "type": "standard",
                    "desc": "Tu ataque desarmado puede aturdir (Fort CD 10 + mitad nivel + Sab)."
                }
            ],
            "primaryStats": [
                "wis",
                "dex",
                "str"
            ],
            "dumpStats": [
                "cha"
            ]
        },
        "paladin": {
            "name": "Paladín",
            "hitDie": 10,
            "bab": "good",
            "skillPts": 2,
            "saves": {
                "fort": "good",
                "ref": "poor",
                "will": "poor"
            },
            "classSkills": [
                "artesania",
                "averiguar_intenciones",
                "concentracion",
                "curar",
                "diplomacia",
                "montar",
                "saber_nobleza",
                "saber_religion",
                "trato_con_animales"
            ],
            "features": [
                {
                    "name": "Castigar al Mal",
                    "type": "free",
                    "desc": "Añade Cha al Ataque, Nivel al Dano contra un ser maligno (1/día)."
                },
                {
                    "name": "Detectar el Mal",
                    "type": "standard",
                    "desc": "A voluntad, como el hechizo."
                },
                {
                    "name": "Imposición de Manos",
                    "type": "standard",
                    "desc": "Cura (Nivel x Cha) PG al día en total."
                },
                {
                    "name": "Aura de Valor",
                    "type": "passive",
                    "desc": "Inmune al miedo, aliados a 10 pies ganan +4 a salvaciónes contra miedo."
                }
            ],
            "primaryStats": [
                "str",
                "cha",
                "con"
            ],
            "dumpStats": [
                "int"
            ],
            "spellcaster": {
                "type": "divine",
                "stat": "wis",
                "slotsByLevel": {
                    "1": [
                        0
                    ],
                    "2": [
                        0
                    ],
                    "3": [
                        0
                    ],
                    "4": [
                        0,
                        0
                    ],
                    "5": [
                        0,
                        0
                    ],
                    "6": [
                        0,
                        1
                    ],
                    "7": [
                        0,
                        1
                    ],
                    "8": [
                        0,
                        1,
                        0
                    ],
                    "9": [
                        0,
                        1,
                        0
                    ],
                    "10": [
                        0,
                        1,
                        1
                    ],
                    "11": [
                        0,
                        1,
                        1,
                        0
                    ],
                    "12": [
                        0,
                        1,
                        1,
                        1
                    ],
                    "13": [
                        0,
                        1,
                        1,
                        1
                    ],
                    "14": [
                        0,
                        2,
                        1,
                        1,
                        0
                    ],
                    "15": [
                        0,
                        2,
                        1,
                        1,
                        1
                    ],
                    "16": [
                        0,
                        2,
                        2,
                        1,
                        1
                    ],
                    "17": [
                        0,
                        2,
                        2,
                        2,
                        1
                    ],
                    "18": [
                        0,
                        3,
                        2,
                        2,
                        1
                    ],
                    "19": [
                        0,
                        3,
                        3,
                        3,
                        2
                    ],
                    "20": [
                        0,
                        3,
                        3,
                        3,
                        3
                    ]
                }
            }
        },
        "ranger": {
            "name": "Explorador",
            "hitDie": 8,
            "bab": "good",
            "skillPts": 6,
            "saves": {
                "fort": "good",
                "ref": "good",
                "will": "poor"
            },
            "classSkills": [
                "artesania",
                "avistar",
                "buscar",
                "concentracion",
                "curar",
                "esconderse",
                "escuchar",
                "montar",
                "moverse_silenciosamente",
                "nadar",
                "saber_dungeons",
                "saber_geografia",
                "saber_naturaleza",
                "saltar",
                "supervivencia",
                "trepar",
                "trato_con_animales",
                "uso_de_cuerdas"
            ],
            "features": [
                {
                    "name": "Enemigo Predilecto",
                    "type": "passive",
                    "desc": "+2 a daño, engañar, escuchar, averiguar intenciones, avistar y supervivencia contra tu enemigo elegido."
                },
                {
                    "name": "Empatía Salvaje",
                    "type": "standard",
                    "desc": "Mejora actitud de un animal salvaje."
                },
                {
                    "name": "Estilo de Combate",
                    "type": "passive",
                    "desc": "A nivel 2, obtienes Tiro con Arco o Combate con Dos Armas."
                }
            ],
            "primaryStats": [
                "dex",
                "str",
                "wis"
            ],
            "dumpStats": [
                "cha"
            ],
            "spellcaster": {
                "type": "divine",
                "stat": "wis",
                "slotsByLevel": {
                    "1": [
                        0
                    ],
                    "2": [
                        0
                    ],
                    "3": [
                        0
                    ],
                    "4": [
                        0,
                        0
                    ],
                    "5": [
                        0,
                        0
                    ],
                    "6": [
                        0,
                        1
                    ],
                    "7": [
                        0,
                        1
                    ],
                    "8": [
                        0,
                        1,
                        0
                    ],
                    "9": [
                        0,
                        1,
                        0
                    ],
                    "10": [
                        0,
                        1,
                        1
                    ],
                    "11": [
                        0,
                        1,
                        1,
                        0
                    ],
                    "12": [
                        0,
                        1,
                        1,
                        1
                    ],
                    "13": [
                        0,
                        1,
                        1,
                        1
                    ],
                    "14": [
                        0,
                        2,
                        1,
                        1,
                        0
                    ],
                    "15": [
                        0,
                        2,
                        1,
                        1,
                        1
                    ],
                    "16": [
                        0,
                        2,
                        2,
                        1,
                        1
                    ],
                    "17": [
                        0,
                        2,
                        2,
                        2,
                        1
                    ],
                    "18": [
                        0,
                        3,
                        2,
                        2,
                        1
                    ],
                    "19": [
                        0,
                        3,
                        3,
                        3,
                        2
                    ],
                    "20": [
                        0,
                        3,
                        3,
                        3,
                        3
                    ]
                }
            }
        },
        "rogue": {
            "name": "Pícaro",
            "hitDie": 6,
            "bab": "average",
            "skillPts": 8,
            "saves": {
                "fort": "poor",
                "ref": "good",
                "will": "poor"
            },
            "classSkills": [
                "abrir_cerraduras",
                "acrobacias",
                "artesania",
                "averiguar_intenciones",
                "avistar",
                "buscar",
                "descifrar_escritura",
                "diplomacia",
                "disfrazarse",
                "engañar",
                "equilibrio",
                "esconderse",
                "escuchar",
                "falsificar",
                "hurto",
                "intimidar",
                "inutilizar_mecanismo",
                "moverse_silenciosamente",
                "nadar",
                "reunir_información",
                "saltar",
                "tasacion",
                "trepar",
                "usar_objeto_mágico",
                "uso_de_cuerdas"
            ],
            "features": [
                {
                    "name": "Ataque Furtivo",
                    "type": "passive",
                    "desc": "+1d6 daño si el objetivo pierde bono de Destreza a la CA o lo flanqueas."
                },
                {
                    "name": "Encontrar Trampas",
                    "type": "passive",
                    "desc": "Permite usar Buscar para encontrar trampas con CD mayor a 20."
                },
                {
                    "name": "Evasión",
                    "type": "passive",
                    "desc": "Si pasas salvación de Reflejos, recibes 0 daño en vez de la mitad."
                }
            ],
            "primaryStats": [
                "dex",
                "int"
            ],
            "dumpStats": [
                "str"
            ]
        },
        "sorcerer": {
            "name": "Hechicero",
            "hitDie": 4,
            "bab": "poor",
            "skillPts": 2,
            "saves": {
                "fort": "poor",
                "ref": "poor",
                "will": "good"
            },
            "classSkills": [
                "artesania",
                "concentracion",
                "conocimiento_de_conjuros",
                "engañar",
                "saber_arcano"
            ],
            "spellcaster": {
                "type": "spontaneous",
                "attr": "cha",
                "slotsByLevel": {
                    "1": [
                        5,
                        3
                    ],
                    "2": [
                        6,
                        4
                    ],
                    "3": [
                        6,
                        5
                    ],
                    "4": [
                        6,
                        6,
                        3
                    ],
                    "5": [
                        6,
                        6,
                        4
                    ],
                    "6": [
                        6,
                        6,
                        5,
                        3
                    ],
                    "7": [
                        6,
                        6,
                        6,
                        4
                    ],
                    "8": [
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "9": [
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "10": [
                        6,
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "11": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "12": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "13": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "14": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "15": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "16": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "17": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "18": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        5,
                        3
                    ],
                    "19": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        4
                    ],
                    "20": [
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6
                    ]
                }
            },
            "features": [
                {
                    "name": "Invocar Familiar",
                    "type": "standard",
                    "desc": "Obtienes un familiar mágico que te otorga bonos pasivos."
                }
            ],
            "primaryStats": [
                "cha",
                "dex",
                "con"
            ],
            "dumpStats": [
                "str"
            ]
        },
        "wizard": {
            "name": "Mago",
            "hitDie": 4,
            "bab": "poor",
            "skillPts": 2,
            "saves": {
                "fort": "poor",
                "ref": "poor",
                "will": "good"
            },
            "classSkills": [
                "artesania",
                "concentracion",
                "conocimiento_de_conjuros",
                "descifrar_escritura",
                "saber_arcano",
                "saber_arquitectura",
                "saber_dungeons",
                "saber_geografia",
                "saber_historia",
                "saber_local",
                "saber_los_planos",
                "saber_naturaleza",
                "saber_nobleza",
                "saber_religion"
            ],
            "spellcaster": {
                "type": "prepared",
                "attr": "int",
                "slotsByLevel": {
                    "1": [
                        3,
                        1
                    ],
                    "2": [
                        4,
                        2
                    ],
                    "3": [
                        4,
                        2,
                        1
                    ],
                    "4": [
                        4,
                        3,
                        2
                    ],
                    "5": [
                        4,
                        3,
                        2,
                        1
                    ],
                    "6": [
                        4,
                        3,
                        3,
                        2
                    ],
                    "7": [
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "8": [
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "9": [
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "10": [
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "11": [
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "12": [
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "13": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "14": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "15": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "16": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "17": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        2,
                        1
                    ],
                    "18": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3,
                        2
                    ],
                    "19": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        3,
                        3
                    ],
                    "20": [
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4,
                        4
                    ]
                }
            },
            "features": [
                {
                    "name": "Invocar Familiar",
                    "type": "standard",
                    "desc": "Obtienes un familiar mágico."
                },
                {
                    "name": "Inscribir Rollo de Pergamino",
                    "type": "passive",
                    "desc": "Dote adicional a nivel 1."
                }
            ],
            "primaryStats": [
                "int",
                "dex",
                "con"
            ],
            "dumpStats": [
                "str"
            ]
        }
    },
    "skills": [
        {
            "id": "abrir_cerraduras",
            "name": "Abrir Cerraduras",
            "attr": "dex"
        },
        {
            "id": "acrobacias",
            "name": "Acrobacias",
            "attr": "dex"
        },
        {
            "id": "artesania",
            "name": "Artesanía",
            "attr": "int"
        },
        {
            "id": "averiguar_intenciones",
            "name": "Averiguar Intenciones",
            "attr": "wis"
        },
        {
            "id": "avistar",
            "name": "Avistar",
            "attr": "wis"
        },
        {
            "id": "buscar",
            "name": "Buscar",
            "attr": "int"
        },
        {
            "id": "concentracion",
            "name": "Concentración",
            "attr": "con"
        },
        {
            "id": "conocimiento_de_conjuros",
            "name": "Conocimiento de Conjuros",
            "attr": "int"
        },
        {
            "id": "curar",
            "name": "Curar",
            "attr": "wis"
        },
        {
            "id": "descifrar_escritura",
            "name": "Descifrar Escritura",
            "attr": "int"
        },
        {
            "id": "diplomacia",
            "name": "Diplomacia",
            "attr": "cha"
        },
        {
            "id": "disfrazarse",
            "name": "Disfrazarse",
            "attr": "cha"
        },
        {
            "id": "engañar",
            "name": "Enganar",
            "attr": "cha"
        },
        {
            "id": "equilibrio",
            "name": "Equilibrio",
            "attr": "dex"
        },
        {
            "id": "esconderse",
            "name": "Esconderse",
            "attr": "dex"
        },
        {
            "id": "escuchar",
            "name": "Escuchar",
            "attr": "wis"
        },
        {
            "id": "falsificar",
            "name": "Falsificar",
            "attr": "int"
        },
        {
            "id": "hurto",
            "name": "Hurto",
            "attr": "dex"
        },
        {
            "id": "interpretar",
            "name": "Interpretar",
            "attr": "cha"
        },
        {
            "id": "intimidar",
            "name": "Intimidar",
            "attr": "cha"
        },
        {
            "id": "inutilizar_mecanismo",
            "name": "Inutilizar Mecanismo",
            "attr": "int"
        },
        {
            "id": "montar",
            "name": "Montar",
            "attr": "dex"
        },
        {
            "id": "moverse_silenciosamente",
            "name": "Moverse Silenciosamente",
            "attr": "dex"
        },
        {
            "id": "nadar",
            "name": "Nadar",
            "attr": "str"
        },
        {
            "id": "reunir_información",
            "name": "Reunir Información",
            "attr": "cha"
        },
        {
            "id": "saber_arcano",
            "name": "Saber (Arcano)",
            "attr": "int"
        },
        {
            "id": "saber_arquitectura",
            "name": "Saber (Arquitectura)",
            "attr": "int"
        },
        {
            "id": "saber_dungeons",
            "name": "Saber (Dungeons)",
            "attr": "int"
        },
        {
            "id": "saber_geografia",
            "name": "Saber (Geografía)",
            "attr": "int"
        },
        {
            "id": "saber_historia",
            "name": "Saber (Historia)",
            "attr": "int"
        },
        {
            "id": "saber_local",
            "name": "Saber (Local)",
            "attr": "int"
        },
        {
            "id": "saber_los_planos",
            "name": "Saber (Los Planos)",
            "attr": "int"
        },
        {
            "id": "saber_naturaleza",
            "name": "Saber (Naturaleza)",
            "attr": "int"
        },
        {
            "id": "saber_nobleza",
            "name": "Saber (Nobleza)",
            "attr": "int"
        },
        {
            "id": "saber_religion",
            "name": "Saber (Religión)",
            "attr": "int"
        },
        {
            "id": "saltar",
            "name": "Saltar",
            "attr": "str"
        },
        {
            "id": "supervivencia",
            "name": "Supervivencia",
            "attr": "wis"
        },
        {
            "id": "tasacion",
            "name": "Tasación",
            "attr": "int"
        },
        {
            "id": "trato_con_animales",
            "name": "Trato con Animales",
            "attr": "cha"
        },
        {
            "id": "trepar",
            "name": "Trepar",
            "attr": "str"
        },
        {
            "id": "usar_objeto_mágico",
            "name": "Usar Objeto Mágico",
            "attr": "cha"
        },
        {
            "id": "uso_de_cuerdas",
            "name": "Uso de Cuerdas",
            "attr": "dex"
        }
    ],
    "feats": [
        {
            "name": "Ataque Poderoso",
            "desc": "Cambia bonificador de ataque por daño cuerpo a cuerpo."
        },
        {
            "name": "Esquiva",
            "desc": "+1 a la CA por esquiva contra un oponente elegido.",
            "effects": {
                "ac": 1
            }
        },
        {
            "name": "Iniciativa Mejorada",
            "desc": "+4 a las tiradas de iniciativa.",
            "effects": {
                "init": 4
            }
        },
        {
            "name": "Soltura con un Arma",
            "desc": "+1 a las tiradas de ataque con el arma elegida."
        },
        {
            "name": "Dureza",
            "desc": "Ganas +3 puntos de golpe.",
            "effects": {
                "hp": 3
            }
        },
        {
            "name": "Combate con Dos Armas",
            "desc": "Reduce los penalizadores por luchar con un arma en cada mano."
        },
        {
            "name": "Disparo a Bocajarro",
            "desc": "+1 al ataque y daño con armas a distancia a menos de 30 pies."
        },
        {
            "name": "Lanzar Conjuros en Combate",
            "desc": "+4 a las pruebas de Concentración al lanzar a la defensiva.",
            "effects": {
                "skill_concentracion": 4
            }
        },
        {
            "name": "Gran Fortaleza",
            "desc": "+2 a las tiradas de Fortaleza.",
            "effects": {
                "save_fort": 2
            }
        },
        {
            "name": "Reflejos Rápidos",
            "desc": "+2 a las tiradas de Reflejos.",
            "effects": {
                "save_ref": 2
            }
        },
        {
            "name": "Voluntad de Hierro",
            "desc": "+2 a las tiradas de Voluntad.",
            "effects": {
                "save_will": 2
            }
        },
        {
            "name": "Sigiloso",
            "desc": "+2 a Esconderse y Moverse Silenciosamente.",
            "effects": {
                "skill_esconderse": 2,
                "skill_moverse_silenciosamente": 2
            }
        },
        {
            "name": "Atlético",
            "desc": "+2 a Trepar y Nadar.",
            "effects": {
                "skill_trepar": 2,
                "skill_nadar": 2
            }
        },
        {
            "name": "Afinidad con los Animales",
            "desc": "+2 a Trato con Animales y Montar.",
            "effects": {
                "skill_trato_con_animales": 2,
                "skill_montar": 2
            }
        },
        {
            "name": "Hendidura",
            "desc": "Si reduces a un oponente a 0 PG, obtienes un ataque extra gratis."
        },
        {
            "name": "Ataque Elástico",
            "desc": "Puedes moverte antes y después de atacar en cuerpo a cuerpo sin provocar AdO."
        }
    ],
    "spells": [
        {
            "name": "Crear Agua",
            "level": 0,
            "school": "Conjuración",
            "desc": "Crea 2 galones/nivel de agua pura.",
            "classes": [
                "Clérigo",
                "Druida",
                "Paladín"
            ]
        },
        {
            "name": "Detectar Magia",
            "level": 0,
            "school": "Adivinación",
            "desc": "Detecta conjuros y objetos mágicos en 60 pies.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Bardo"
            ]
        },
        {
            "name": "Leer Magia",
            "level": 0,
            "school": "Adivinación",
            "desc": "Permite leer pergaminos y libros de conjuros.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín",
                "Explorador"
            ]
        },
        {
            "name": "Luz",
            "level": 0,
            "school": "Evocación",
            "desc": "El objeto brilla como una antorcha durante 10 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Bardo",
                "Druida"
            ]
        },
        {
            "name": "Orientación Divina",
            "level": 0,
            "school": "Adivinación",
            "desc": "+1 de competencia en una tirada de ataque, salvación o habilidad.",
            "classes": [
                "Clérigo",
                "Druida"
            ]
        },
        {
            "name": "Prestidigitación",
            "level": 0,
            "school": "Universal",
            "desc": "Realiza trucos mágicos menores.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Rayo de Escarcha",
            "level": 0,
            "school": "Evocación",
            "desc": "Ataque de toque a distancia, 1d3 daño por frío.",
            "formula": "1d3",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Resistencia",
            "level": 0,
            "school": "Abjuración",
            "desc": "Sujeto gana +1 a las tiradas de salvación.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín"
            ]
        },
        {
            "name": "Armadura de Mago",
            "level": 1,
            "school": "Conjuración",
            "desc": "Te otorga +4 de armadura a la CA por 1 hora/nivel.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Bendición",
            "level": 1,
            "school": "Encantamiento",
            "desc": "Aliados ganan +1 ataque y salvaciónes contra miedo por 1 min/nivel.",
            "classes": [
                "Clérigo",
                "Paladín"
            ]
        },
        {
            "name": "Causar Miedo",
            "level": 1,
            "school": "Nigromancia",
            "desc": "Criatura asustada huye 1d4 asaltos. Voluntad niega (DG 5 o menos).",
            "classes": [
                "Clérigo",
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Caída de Pluma",
            "level": 1,
            "school": "Transmutación",
            "desc": "Objetos o criaturas caen lentamente.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Curar Heridas Leves",
            "level": 1,
            "school": "Conjuración",
            "desc": "Cura 1d8 + 1/nivel (máx +5).",
            "formula": "1d8+{min(25, CL)}",
            "classes": [
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín",
                "Explorador"
            ]
        },
        {
            "name": "Disfrazarse",
            "level": 1,
            "school": "Ilusión",
            "desc": "Cambia tu apariencia.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Dormir",
            "level": 1,
            "school": "Encantamiento",
            "desc": "Pone a dormir a 4 DG de criaturas. Voluntad niega.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Escudo",
            "level": 1,
            "school": "Abjuración",
            "desc": "Disco de fuerza invisible que otorga +4 CA y bloquea Misiles Mágicos.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Escudo Entrópico",
            "level": 1,
            "school": "Abjuración",
            "desc": "Ataques a distancia tienen 20% de probabilidad de fallo contra ti.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Escudo de Fe",
            "level": 1,
            "school": "Abjuración",
            "desc": "Otorga +2 a la CA (desvío) por 1 min/nivel.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Favor Divino",
            "level": 1,
            "school": "Evocación",
            "desc": "Ganas +1 por cada 3 niveles en tiradas de ataque y daño.",
            "classes": [
                "Clérigo",
                "Paladín"
            ]
        },
        {
            "name": "Grasa",
            "level": 1,
            "school": "Conjuración",
            "desc": "Hace resbaladiza un área de 10 pies cuadrados u objeto.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Identificar",
            "level": 1,
            "school": "Adivinación",
            "desc": "Determina las propiedades de un objeto mágico.",
            "classes": [
                "Mago/Hechicero",
                "Bardo",
                "Clérigo"
            ]
        },
        {
            "name": "Imagen Silenciosa",
            "level": 1,
            "school": "Ilusión",
            "desc": "Crea una ilusión menor de tu diseño.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Infligir Heridas Leves",
            "level": 1,
            "school": "Nigromancia",
            "desc": "Toque. Hace 1d8 + 1/nivel de daño (máx +5).",
            "formula": "1d8+{min(5, CL)}",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Manos Ardientes",
            "level": 1,
            "school": "Evocación",
            "desc": "Cono de 15 pies de fuego, 1d4 daño/nivel (máx 5d4). Reflejos mitad.",
            "formula": "{min(5, CL)}d4",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Misil Mágico",
            "level": 1,
            "school": "Evocación",
            "desc": "1d4+1 de daño por misil de fuerza. Infalible.",
            "formula": "{floor((min(9, CL)+1)/2)}d4+{floor((min(9, CL)+1)/2)}",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Santuario",
            "level": 1,
            "school": "Abjuración",
            "desc": "Los oponentes deben superar salvación de Voluntad para atacarte.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Arma Espiritual",
            "level": 2,
            "school": "Evocación",
            "desc": "Un arma mágica ataca por ti.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Astucia de Zorro",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Inteligencia durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Astucia del Zorro",
            "level": 2,
            "school": "Transmutación",
            "desc": "Sujeto gana +4 a Inteligencia por 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Calentar Metal",
            "level": 2,
            "school": "Transmutación",
            "desc": "Hace que el metal queme al tocarlo.",
            "classes": [
                "Druida"
            ]
        },
        {
            "name": "Contorno Borroso",
            "level": 2,
            "school": "Ilusión",
            "desc": "Los ataques fallan el 20% de las veces.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Curar Heridas Moderadas",
            "level": 2,
            "school": "Conjuración",
            "desc": "Cura 2d8 + 1/nivel (máx +10).",
            "formula": "1d8+{min(25, CL)}",
            "classes": [
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín",
                "Explorador"
            ]
        },
        {
            "name": "Esplendor del Águila",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Carisma durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Bardo",
                "Paladín"
            ]
        },
        {
            "name": "Flecha Ácida de Melf",
            "level": 2,
            "school": "Conjuración",
            "desc": "Ataque de toque. 2d4 de daño por ácido por 1 asalto + 1/3 niveles.",
            "formula": "2d4",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Fuerza de Toro",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Fuerza durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Paladín"
            ]
        },
        {
            "name": "Gracia Felina",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Destreza durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Imagen Múltiple",
            "level": 2,
            "school": "Ilusión",
            "desc": "Crea 1d4+1 duplicados ilusorios de ti mismo.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Invisibilidad",
            "level": 2,
            "school": "Ilusión",
            "desc": "Criatura u objeto se vuelve invisible por 1 min/nivel o hasta que ataque.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Resistencia de Oso",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Constitución durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Resistencia del Oso",
            "level": 2,
            "school": "Transmutación",
            "desc": "Sujeto gana +4 a Constitución por 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Explorador"
            ]
        },
        {
            "name": "Sabiduría de Búho",
            "level": 2,
            "school": "Transmutación",
            "desc": "El objetivo gana +4 de Sabiduría durante 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Sabiduría del Búho",
            "level": 2,
            "school": "Transmutación",
            "desc": "Sujeto gana +4 a Sabiduría por 1 min/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Paladín",
                "Explorador"
            ]
        },
        {
            "name": "Silencio",
            "level": 2,
            "school": "Ilusión",
            "desc": "Niega todo el sonido en 20 pies de radio.",
            "classes": [
                "Clérigo",
                "Bardo"
            ]
        },
        {
            "name": "Telaraña",
            "level": 2,
            "school": "Conjuración",
            "desc": "Rellena extension 20 pies con telarañas pegajosas.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Acelerar",
            "level": 3,
            "school": "Transmutación",
            "desc": "+1 ataque, CA y Reflejos. Mueves 30 pies mas rápido. 1 asalto/nivel.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Bola de Fuego",
            "level": 3,
            "school": "Evocación",
            "desc": "Explosión de 20 pies. 1d6 daño de fuego/nivel (máx 10d6). Reflejos mitad.",
            "classes": [
                "Mago/Hechicero"
            ],
            "formula": "{min(10, CL)}d6"
        },
        {
            "name": "Curar Heridas Graves",
            "level": 3,
            "school": "Conjuración",
            "desc": "Cura 3d8 + 1/nivel (máx +15).",
            "formula": "1d8+{min(25, CL)}",
            "classes": [
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín",
                "Explorador"
            ]
        },
        {
            "name": "Disipar Magia",
            "level": 3,
            "school": "Abjuración",
            "desc": "Cancela efectos mágicos. Prueba de nivel de lanzador contra CD 11 + nivel del lanzador original.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida",
                "Bardo",
                "Paladín"
            ]
        },
        {
            "name": "Forma Gaseosa",
            "level": 3,
            "school": "Transmutación",
            "desc": "El sujeto se vuelve insustancial y puede volar lentamente.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Llamar al Relámpago",
            "level": 3,
            "school": "Evocación",
            "desc": "Llama relámpagos que causan 3d6 de daño por asalto.",
            "classes": [
                "Druida"
            ],
            "formula": "3d6"
        },
        {
            "name": "Luz Divina",
            "level": 3,
            "school": "Evocación",
            "desc": "Ciega y causa 1d8 de daño por cada 2 niveles a los muertos vivientes.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Plegaria",
            "level": 3,
            "school": "Encantamiento",
            "desc": "Aliados obtienen +1 Suerte al ataque, CA y salvaciónes. Enemigos -1.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Ralentizar",
            "level": 3,
            "school": "Transmutación",
            "desc": "Una criatura/nivel realiza solo una acción por turno, -1 CA, -1 Reflejos.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Relámpago",
            "level": 3,
            "school": "Evocación",
            "desc": "Línea de 120 pies. 1d6 daño eléc/nivel (máx 10d6). Reflejos mitad.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo"
            ]
        },
        {
            "name": "Respirar Agua",
            "level": 3,
            "school": "Transmutación",
            "desc": "Sujetos pueden respirar bajo el agua.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida"
            ]
        },
        {
            "name": "Volar",
            "level": 3,
            "school": "Transmutación",
            "desc": "El objetivo gana velocidad de vuelo 60 pies por 1 min/nivel.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Asesino Fantasmal",
            "level": 4,
            "school": "Ilusión",
            "desc": "Una ilusión terrorífica que puede matar al objetivo o causar 3d6 de daño.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Golpe Flamígero",
            "level": 4,
            "school": "Evocación",
            "desc": "Columna de fuego causa 1d6 daño/nivel (mitad fuego, mitad divino).",
            "classes": [
                "Druida"
            ],
            "formula": "{min(15, CL)}d6"
        },
        {
            "name": "Invisibilidad Mayor",
            "level": 4,
            "school": "Ilusión",
            "desc": "Como Invisibilidad, pero no se rompe al atacar.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Poder Divino",
            "level": 4,
            "school": "Evocación",
            "desc": "Ganas BAB de guerrero, +6 Fue, y 1 hp temporal/nivel.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Puerta Dimensional",
            "level": 4,
            "school": "Conjuración",
            "desc": "Te teletransporta a corta distancia (400 pies + 40 pies/nivel).",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Tentáculos Negros de Evard",
            "level": 4,
            "school": "Conjuración",
            "desc": "Tentáculos apresan a todos en un área de 20 pies.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Tormenta de Hielo",
            "level": 4,
            "school": "Evocación",
            "desc": "Causa 3d6 de contusión y 2d6 de frío en cilindro de 40 pies.",
            "classes": [
                "Mago/Hechicero",
                "Druida"
            ],
            "formula": "3d6+2d6"
        },
        {
            "name": "Dominar Persona",
            "level": 5,
            "school": "Encantamiento",
            "desc": "Controlas telepáticamente a un humanoide.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Golpe Flamígero (Clérigo)",
            "level": 5,
            "school": "Evocación",
            "desc": "Columna de fuego causa 1d6 daño/nivel (mitad fuego, mitad divino).",
            "classes": [
                "Clérigo"
            ],
            "formula": "{min(15, CL)}d6"
        },
        {
            "name": "Muro de Fuerza",
            "level": 5,
            "school": "Evocación",
            "desc": "Crea un muro invisible inmune al daño.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Muro de Piedra",
            "level": 5,
            "school": "Conjuración",
            "desc": "Crea un muro de piedra sólido.",
            "classes": [
                "Mago/Hechicero",
                "Clérigo",
                "Druida"
            ]
        },
        {
            "name": "Nube Aniquiladora",
            "level": 5,
            "school": "Conjuración",
            "desc": "Nube venenosa mata criaturas con 3 DG o menos; otras reciben daño de Con.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Restablecimiento Mayor",
            "level": 5,
            "school": "Conjuración",
            "desc": "Restaura dreno de niveles y todas las penalizaciones de habilidad.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Cadena de Relámpagos",
            "level": 6,
            "school": "Evocación",
            "desc": "Causa 1d6 daño/nivel a objetivo principal, luego salta a secundarios.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Dañar",
            "level": 6,
            "school": "Nigromancia",
            "desc": "Inflige 10 daño/nivel (deja al menos a 1 pg).",
            "classes": [
                "Clérigo"
            ],
            "formula": "{min(150, CL*10)}"
        },
        {
            "name": "Desintegrar",
            "level": 6,
            "school": "Transmutación",
            "desc": "Rayo convierte criatura u objeto en polvo. 2d6 de daño/nivel.",
            "classes": [
                "Mago/Hechicero"
            ],
            "formula": "{min(40, CL*2)}d6"
        },
        {
            "name": "Festín de los Héroes",
            "level": 6,
            "school": "Conjuración",
            "desc": "Comida mágica otorga bonos de combate y cura enfermedades.",
            "classes": [
                "Clérigo",
                "Bardo"
            ]
        },
        {
            "name": "Sanar",
            "level": 6,
            "school": "Conjuración",
            "desc": "Cura 10 pg/nivel, todas las enfermedades y condiciones mentales.",
            "classes": [
                "Clérigo",
                "Druida"
            ],
            "formula": "{min(150, CL*10)}"
        },
        {
            "name": "Transformación de Tenser",
            "level": 6,
            "school": "Transmutación",
            "desc": "Ganas bonos masivos de combate pero pierdes capacidad de lanzar conjuros.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Bola de Fuego de Explosión Retardada",
            "level": 7,
            "school": "Evocación",
            "desc": "Causa 1d6 daño/nivel de fuego y puedes retrasar su explosión.",
            "classes": [
                "Mago/Hechicero"
            ],
            "formula": "{min(10, CL)}d6"
        },
        {
            "name": "Dedo de la Muerte",
            "level": 7,
            "school": "Nigromancia",
            "desc": "Mata a un sujeto viviente al instante (Fortaleza parcial: 3d6+1/nivel daño).",
            "classes": [
                "Mago/Hechicero",
                "Druida"
            ],
            "formula": "3d6+{CL}"
        },
        {
            "name": "Deseo Limitado",
            "level": 7,
            "school": "Universal",
            "desc": "Altera la realidad dentro de ciertos límites.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Invertir Gravedad",
            "level": 7,
            "school": "Transmutación",
            "desc": "Los objetos y criaturas caen hacia arriba.",
            "classes": [
                "Mago/Hechicero",
                "Druida"
            ]
        },
        {
            "name": "Palabra Sagrada",
            "level": 7,
            "school": "Evocación",
            "desc": "Mata, paraliza, ciega o ensordece criaturas malignas.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Resurrección",
            "level": 7,
            "school": "Conjuración",
            "desc": "Restaura la vida a una criatura completamente muerta, con toda su salud.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Aura Sagrada",
            "level": 8,
            "school": "Abjuración",
            "desc": "+4 CA, +4 salvaciones, y RC 25 contra conjuros malignos.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Danza Irresistible de Otto",
            "level": 8,
            "school": "Encantamiento",
            "desc": "Fuerza al objetivo a bailar, dándole grandes penalizaciones.",
            "classes": [
                "Mago/Hechicero",
                "Bardo"
            ]
        },
        {
            "name": "Explosión Solar",
            "level": 8,
            "school": "Evocación",
            "desc": "Ciega a todos en 80 pies y causa 6d6 daño. Destruye vampiros.",
            "classes": [
                "Mago/Hechicero",
                "Druida"
            ],
            "formula": "6d6"
        },
        {
            "name": "Laberinto",
            "level": 8,
            "school": "Conjuración",
            "desc": "Atrapa al sujeto en un laberinto extradimensional.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Mente en Blanco",
            "level": 8,
            "school": "Abjuración",
            "desc": "Sujeto es inmune a magias e influencias mentales y adivinación.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Deseo",
            "level": 9,
            "school": "Universal",
            "desc": "Altera drásticamente la realidad (cuesta experiencia).",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Detener el Tiempo",
            "level": 9,
            "school": "Transmutación",
            "desc": "Actúas libremente durante 1d4+1 asaltos aparentes.",
            "classes": [
                "Mago/Hechicero"
            ]
        },
        {
            "name": "Implosión",
            "level": 9,
            "school": "Evocación",
            "desc": "Destruye a una criatura por asalto si falla salvación de Fortaleza.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Milagro",
            "level": 9,
            "school": "Evocación",
            "desc": "Solicitas una intervención divina masiva.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Resurrección Verdadera",
            "level": 9,
            "school": "Conjuración",
            "desc": "Como Resurrección, pero no requiere restos.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Tromba de Meteoritos",
            "level": 9,
            "school": "Evocación",
            "desc": "Cuatro meteoros causan 2d6 contusión y 6d6 fuego cada uno.",
            "classes": [
                "Mago/Hechicero"
            ],
            "formula": "32d6"
        },
        {
            "name": "Ceguera/Sordera",
            "level": 3,
            "school": "Nigromancia",
            "desc": "Deja al objetivo cegado o sordo.",
            "classes": [
                "Clérigo",
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Vestidura Mágica",
            "level": 3,
            "school": "Transmutación",
            "desc": "La armadura o escudo obtiene un bonificador de mejora de +1 por cada 4 niveles.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Caminar por el Aire",
            "level": 4,
            "school": "Transmutación",
            "desc": "El objetivo pisa el aire como si fuera suelo sólido.",
            "classes": [
                "Clérigo",
                "Druida"
            ]
        },
        {
            "name": "Justo Poder",
            "level": 5,
            "school": "Transmutación",
            "desc": "Aumentas tu tamaño e incrementas tu Fuerza y Constitución.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Muro de Cuchillas",
            "level": 6,
            "school": "Evocación",
            "formula": "{min(15, CL)}d6",
            "desc": "Crea un muro de hojas giratorias que infligen {min(15, CL)}d6 de daño.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Blasfemia",
            "level": 7,
            "school": "Evocación",
            "desc": "Mata, paraliza, ciega o ensordece criaturas no malignas.",
            "classes": [
                "Clérigo"
            ]
        },
        {
            "name": "Rayo Abrasador",
            "level": 2,
            "school": "Evocación",
            "formula": "4d6",
            "desc": "Disparas rayos de fuego (1 rayo/4 niveles, máx 3) que infligen 4d6 de fuego cada uno.",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Telequinesis",
            "level": 5,
            "school": "Transmutación",
            "desc": "Mueve objetos, criaturas o ataca a distancia con la mente.",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Círculo de Muerte",
            "level": 6,
            "school": "Nigromancia",
            "desc": "Mata criaturas de pocos dados de golpe (máx 1d4/nivel DG en total).",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Contingencia",
            "level": 6,
            "school": "Evocación",
            "desc": "Un conjuro preparado se activa si se cumple una condición.",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Teletransportar Mayor",
            "level": 7,
            "school": "Conjuración",
            "desc": "Teletransporte sin margen de error.",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Palabra de Poder Matar",
            "level": 9,
            "school": "Encantamiento",
            "desc": "Mata al instante a una criatura con 100 HP o menos.",
            "classes": [
                "Mago",
                "Hechicero"
            ]
        },
        {
            "name": "Piel de Corteza",
            "level": 2,
            "school": "Transmutación",
            "desc": "Otorga un bonificador +2 (hasta +5) de armadura natural.",
            "classes": [
                "Druida",
                "Ranger"
            ]
        },
        {
            "name": "Convocar Aliado Natural IV",
            "level": 4,
            "school": "Conjuración",
            "desc": "Llama a un aliado natural de la lista de nivel 4.",
            "classes": [
                "Druida",
                "Ranger"
            ]
        },
        {
            "name": "Muro de Espinas",
            "level": 5,
            "school": "Conjuración",
            "desc": "Crea una pared de espinas que daña e impide el movimiento.",
            "classes": [
                "Druida"
            ]
        },
        {
            "name": "Semillas de Fuego",
            "level": 6,
            "school": "Conjuración",
            "desc": "Crea bellotas explosivas o bayas bomba.",
            "classes": [
                "Druida"
            ]
        },
        {
            "name": "Tormenta de Fuego",
            "level": 7,
            "school": "Evocación",
            "formula": "{min(20, CL)}d6",
            "desc": "Inflige daño de fuego en un área extensa.",
            "classes": [
                "Druida",
                "Clérigo"
            ]
        },
        {
            "name": "Terremoto",
            "level": 8,
            "school": "Evocación",
            "desc": "Crea un sismo masivo en un radio de 80 pies.",
            "classes": [
                "Druida",
                "Clérigo"
            ]
        },
        {
            "name": "Enjambre Elemental",
            "level": 9,
            "school": "Conjuración",
            "desc": "Llama múltiples elementales durante varios asaltos.",
            "classes": [
                "Druida"
            ]
        }
    ]
};
