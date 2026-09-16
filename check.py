import json
import re

with open('database.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'window\.DND_DB\s*=\s*(\{.*\});', content, re.DOTALL)
if match:
    db = json.loads(match.group(1))
    for key, val in db['classes'].items():
        print(f"{key}: {val['name']}, bab={val['bab']}")
