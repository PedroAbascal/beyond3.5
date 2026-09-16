import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix specific corrupted words manually via regex that catches the corrupted bytes
content = re.sub(r'Din.*mico', 'Din\u00E1mico', content)
content = re.sub(r'autom.*ticamente', 'autom\u00E1ticamente', content)
content = re.sub(r'Curaci.*n con', 'Curaci\u00F3n con', content)
content = re.sub(r'Autom.*tico', 'Autom\u00E1tico', content)
content = re.sub(r'Da.*o con', 'Da\u00F1o con', content)
content = re.sub(r'Da.*o:', 'Da\u00F1o:', content)
content = re.sub(r'DIN.*MICAS', 'DIN\u00C1MICAS', content)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)
