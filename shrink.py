import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'body\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('padding: 20px;', 'padding: 10px;'), css)
css = re.sub(r'\.app-header\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('margin-bottom: 20px;', 'margin-bottom: 10px;').replace('padding-bottom: 10px;', 'padding-bottom: 5px;'), css)
css = re.sub(r'\.character-sheet\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('gap: 20px;', 'gap: 10px;'), css)
css = re.sub(r'\.panel\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('padding: 20px;', 'padding: 12px 15px;'), css)
css = re.sub(r'\.char-header\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('gap: 15px;', 'gap: 8px;'), css)

css = re.sub(r'input\[type="text"\], input\[type="number"\], textarea\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('padding: 8px;', 'padding: 4px 6px;'), css)

css = re.sub(r'\.attr-grid\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('gap: 10px;', 'gap: 5px;'), css)
css = re.sub(r'\.attr-grid input\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('font-size: 1.2em;', 'font-size: 1.1em;'), css)
css = re.sub(r'\.attr-mod\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('padding: 8px 0;', 'padding: 4px 0;').replace('font-size: 1.2em;', 'font-size: 1.1em;'), css)

css = re.sub(r'\.combat-grid\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('gap: 15px;', 'gap: 8px;'), css)
css = re.sub(r'\.combat-box\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('padding: 10px;', 'padding: 5px 8px;'), css)
css = re.sub(r'\.combat-box input\s*\{[\s\S]*?\}', lambda m: m.group(0).replace('font-size: 1.2em;', 'font-size: 1.1em;'), css)

css = css.replace('.dynamic-item { border: 1px solid #ccc; padding: 5px; margin-bottom: 5px; border-radius: 4px; }', '.dynamic-item { border: 1px solid #ccc; padding: 3px 5px; margin-bottom: 3px; border-radius: 4px; font-size: 0.9em; }')
css = css.replace('.search-add-group { display: flex; gap: 10px; margin-bottom: 15px; }', '.search-add-group { display: flex; gap: 5px; margin-bottom: 8px; }')

# In app.js dynamic lists (which override css sometimes)
with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()
app = app.replace('row.style.padding = "5px"; row.style.marginBottom = "5px";', 'row.style.padding = "3px 5px"; row.style.marginBottom = "3px"; row.style.fontSize = "0.9em";')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)
