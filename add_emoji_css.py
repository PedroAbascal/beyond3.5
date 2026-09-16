with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = '''
.cond-badge input:checked + .cond-icon {
    filter: grayscale(0%) opacity(100%) !important;
    transform: scale(1.3);
    text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
'''

css += new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
