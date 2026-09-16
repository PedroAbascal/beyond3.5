with open('style.css', 'a', encoding='utf-8') as f:
    f.write('''

/* --- SPAN-MINI CONTENT SCALING --- */
.span-mini {
    font-size: 0.85em;
}
.span-mini h2 {
    font-size: 1.1em;
    margin-bottom: 5px;
}
.span-mini input[type="text"], 
.span-mini input[type="number"], 
.span-mini textarea {
    padding: 2px 4px;
    font-size: 0.9em;
}
.span-mini .input-group label {
    font-size: 0.75em;
    margin-bottom: 2px;
}
.span-mini .attr-grid, 
.span-mini .combat-grid, 
.span-mini .save-grid {
    gap: 3px;
}
.span-mini .combat-box {
    padding: 3px 4px;
}
.span-mini .combat-box label {
    font-size: 0.7em;
}
.span-mini .combat-box input, 
.span-mini .attr-grid input,
.span-mini .attr-mod {
    font-size: 1em;
    padding: 2px 0;
}
.span-mini .save-header {
    font-size: 0.75em;
}
.span-mini button {
    padding: 3px 6px;
    font-size: 0.8em;
}
.span-mini .btn-skill-minus, 
.span-mini .btn-skill-plus {
    width: 16px; 
    height: 16px; 
    font-size: 0.75em;
    padding: 0;
}
.span-mini .skill-row, 
.span-mini .dynamic-item {
    padding: 2px 4px;
    font-size: 0.85em;
}
.span-mini .search-add-group {
    flex-direction: column;
    gap: 3px;
}
.span-mini .search-add-group input, 
.span-mini .search-add-group button {
    width: 100%;
}
''')
