import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Fix character sheet grid
css = css.replace('grid-template-columns: repeat(6, 1fr);', 'grid-template-columns: repeat(6, minmax(0, 1fr));')

# Fix literal \n in panel
css = css.replace('.panel {\\n    grid-column: span 3;', '.panel {\n    grid-column: span 3;')

# Fix literal \n in span-full and span-mini
old_span_full = '.span-full {\\n    grid-column: span 6 !important;\\n}\\n.span-mini {\\n    grid-column: span 2 !important;\n    grid-column: 1 / -1 !important;\n}'

new_span_full = '''.span-full {
    grid-column: span 6 !important;
}
.span-mini {
    grid-column: span 2 !important;
}'''

css = css.replace(old_span_full, new_span_full)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
