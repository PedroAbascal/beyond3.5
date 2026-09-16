import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add width 100% to save-grid input
css = css.replace('.save-grid input {\\n    text-align: center;\\n}', '.save-grid input {\\n    text-align: center;\\n    width: 100%;\\n    box-sizing: border-box;\\n}')

# Ensure attr-grid input has width 100%
css = css.replace('.attr-grid input {\\n    text-align: center;', '.attr-grid input {\\n    width: 100%;\\n    box-sizing: border-box;\\n    text-align: center;')

# Fix mini rules for save-grid
old_mini_input = '.span-mini .combat-box input, \\n.span-mini .attr-grid input,\\n.span-mini .attr-mod {'
new_mini_input = '.span-mini .combat-box input, \\n.span-mini .attr-grid input,\\n.span-mini .save-grid input,\\n.span-mini .save-mod,\\n.span-mini .attr-mod {'
css = css.replace(old_mini_input, new_mini_input)

# Also shrink font in save-grid
old_save_header = '.span-mini .save-header {\\n    font-size: 0.75em;\\n}'
new_save_header = '.span-mini .save-header {\\n    font-size: 0.75em;\\n}\\n.span-mini .save-name {\\n    font-size: 0.75em;\\n}'
css = css.replace(old_save_header, new_save_header)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
