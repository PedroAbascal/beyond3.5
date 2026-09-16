with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

new_css = '''
.sidebar-right {
    position: fixed;
    top: 0;
    right: -350px;
    width: 320px;
    height: 100vh;
    background-color: #2a2a2a;
    box-shadow: -2px 0 10px rgba(0,0,0,0.8);
    z-index: 1001;
    transition: right 0.3s ease;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-left: 2px solid var(--accent-color);
}
.sidebar-right.open {
    right: 0;
}
.inv-item-card {
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.inv-item-card strong {
    color: var(--accent-color);
    font-size: 1.1em;
}
.inv-item-card .desc {
    font-size: 0.85em;
    color: #555;
}
.inv-item-card .meta {
    font-size: 0.8em;
    color: #777;
    display: flex;
    justify-content: space-between;
}
.inv-item-card button {
    background: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 5px;
    cursor: pointer;
    font-weight: bold;
    align-self: flex-end;
    margin-top: 5px;
}
.inv-item-card button:hover {
    background: #218838;
}
'''

css += new_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
