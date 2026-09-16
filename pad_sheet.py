with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.character-sheet {\n    display: grid;', '.character-sheet {\n    padding-top: 50px;\n    display: grid;')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
