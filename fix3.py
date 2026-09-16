import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'★', '\u2605', content)
content = re.sub(r'Ã‚�', '\u00A1', content)
content = re.sub(r'AUTOMÃƒÂ� TICAS', 'AUTOM\u00C1TICAS', content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
