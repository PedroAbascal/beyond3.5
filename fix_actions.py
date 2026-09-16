with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<section class="panel actions" id="panel-actions">'
replacement = '<section class="panel actions" id="panel-actions">\n            <div class="layout-controls"><button class="btn-move-up">?</button><button class="btn-move-down">?</button><button class="btn-toggle-width">?</button></div>'

if target in html and replacement not in html:
    html = html.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Fixed!")
else:
    print("Target not found or already replaced")
