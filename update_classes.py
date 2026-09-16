import json
import re

with open('database.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'window\.DND_DB\s*=\s*(\{.*\});', content, re.DOTALL)
if match:
    db = json.loads(match.group(1))
    
    corrections = {
        'barbarian': {'name': 'Bárbaro', 'bab': 'good', 'saves': {'fort': 'good', 'ref': 'poor', 'will': 'poor'}},
        'bard': {'name': 'Bardo', 'bab': 'average', 'saves': {'fort': 'poor', 'ref': 'good', 'will': 'good'}},
        'cleric': {'name': 'Clérigo', 'bab': 'average', 'saves': {'fort': 'good', 'ref': 'poor', 'will': 'good'}},
        'druid': {'name': 'Druida', 'bab': 'average', 'saves': {'fort': 'good', 'ref': 'poor', 'will': 'good'}},
        'fighter': {'name': 'Guerrero', 'bab': 'good', 'saves': {'fort': 'good', 'ref': 'poor', 'will': 'poor'}},
        'monk': {'name': 'Monje', 'bab': 'average', 'saves': {'fort': 'good', 'ref': 'good', 'will': 'good'}},
        'paladin': {'name': 'Paladín', 'bab': 'good', 'saves': {'fort': 'good', 'ref': 'poor', 'will': 'poor'}},
        'ranger': {'name': 'Explorador', 'bab': 'good', 'saves': {'fort': 'good', 'ref': 'good', 'will': 'poor'}},
        'rogue': {'name': 'Pícaro', 'bab': 'average', 'saves': {'fort': 'poor', 'ref': 'good', 'will': 'poor'}},
        'sorcerer': {'name': 'Hechicero', 'bab': 'poor', 'saves': {'fort': 'poor', 'ref': 'poor', 'will': 'good'}},
        'wizard': {'name': 'Mago', 'bab': 'poor', 'saves': {'fort': 'poor', 'ref': 'poor', 'will': 'good'}}
    }
    
    for key, c_data in corrections.items():
        if key in db['classes']:
            db['classes'][key]['name'] = c_data['name']
            db['classes'][key]['bab'] = c_data['bab']
            db['classes'][key]['saves'] = c_data['saves']

    new_json = json.dumps(db, ensure_ascii=False, indent=4)
    new_content = content[:match.start()] + 'window.DND_DB = ' + new_json + ';\n'
    
    with open('database.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Classes updated successfully!")
