document.addEventListener("DOMContentLoaded", () => {
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

    const STORAGE_KEY = "dnd35_layout";
    const sheet = document.querySelector(".character-sheet");
    const btnEdit = document.getElementById("btn-edit-layout");
    
    function loadLayout() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const layout = JSON.parse(stored);
                
                if (layout.order) {
                    layout.order.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) sheet.appendChild(el);
                    });
                }

                if (layout.expanded) {
                    layout.expanded.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.classList.add("span-full");
                    });
                }
                
                if (layout.mini) {
                    layout.mini.forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.classList.add("span-mini");
                    });
                }
            } catch (e) {
                console.error("Error al cargar layout", e);
            }
        }
    }

    function saveLayout() {
        const panels = Array.from(sheet.querySelectorAll(".panel"));
        const order = panels.map(p => p.id).filter(id => id);
        const expanded = panels.filter(p => p.classList.contains("span-full")).map(p => p.id);
        const mini = panels.filter(p => p.classList.contains("span-mini")).map(p => p.id);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            order: order,
            expanded: expanded,
            mini: mini
        }));
    }

    if (btnEdit) {
        btnEdit.addEventListener("click", () => {
            document.body.classList.toggle("edit-mode-active");
            if (document.body.classList.contains("edit-mode-active")) {
                btnEdit.innerText = "Finalizar Edición";
                btnEdit.classList.add("btn-warning");
            } else {
                btnEdit.innerText = "Modo Edición";
                btnEdit.classList.remove("btn-warning");
                saveLayout();
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-move-up")) {
            const panel = e.target.closest(".panel");
            const prev = panel.previousElementSibling;
            if (prev) sheet.insertBefore(panel, prev);
        }
        
        if (e.target.classList.contains("btn-move-down")) {
            const panel = e.target.closest(".panel");
            const next = panel.nextElementSibling;
            if (next) sheet.insertBefore(next, panel); 
        }

        if (e.target.classList.contains("btn-toggle-width")) {
            const panel = e.target.closest(".panel");
            if (panel.classList.contains("span-full")) {
                panel.classList.remove("span-full");
                panel.classList.add("span-mini");
            } else if (panel.classList.contains("span-mini")) {
                panel.classList.remove("span-mini");
            } else {
                panel.classList.add("span-full");
            }
        }
    });

    setTimeout(loadLayout, 50);
});
