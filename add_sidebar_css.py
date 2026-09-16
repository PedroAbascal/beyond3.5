import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove .app-header block
css = re.sub(r'\.app-header \{[^\}]+\}', '', css)

# Replace .actions button styling, since we want them vertical inside sidebar
old_actions = '''\.actions button, \.actions label \{
    background-color: var\(--accent-color\);
    color: white;
    border: none;
    padding: 8px 16px;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-family: var\(--font-main\);
    font-weight: bold;
    display: inline-block;
\}'''

new_sidebar_css = '''.sidebar {
    position: fixed;
    top: 0;
    left: -300px;
    width: 280px;
    height: 100vh;
    background-color: #2a2a2a;
    box-shadow: 2px 0 10px rgba(0,0,0,0.8);
    z-index: 1001;
    transition: left 0.3s ease;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-right: 2px solid var(--accent-color);
}
.sidebar.open {
    left: 0;
}
.sidebar .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.sidebar .actions button, .sidebar .actions label {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--font-main);
    font-weight: bold;
    display: block;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
}
.sidebar .actions button:hover, .sidebar .actions label:hover {
    background-color: #a00000;
}
'''

css = re.sub(old_actions, new_sidebar_css, css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
