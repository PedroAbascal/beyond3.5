with open('layout.js', 'r', encoding='utf-8') as f:
    js = f.read()

sidebar_logic = '''
    // Sidebar Logic
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebarClose = document.getElementById("sidebar-close");
    
    if (sidebarToggle && sidebar && sidebarClose) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.add("open");
        });
        sidebarClose.addEventListener("click", () => {
            sidebar.classList.remove("open");
        });
        // Click outside to close
        document.addEventListener("click", (e) => {
            if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
                sidebar.classList.remove("open");
            }
        });
    }
'''

js = js.replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", () => {' + sidebar_logic)

with open('layout.js', 'w', encoding='utf-8') as f:
    f.write(js)
