// multiplayer.js
// Manejo de conexiones P2P usando PeerJS

window.Multiplayer = {
    peer: null,
    connections: [],     // Array de conexiones si somos host
    hostConnection: null, // Conexión al host si somos cliente
    isHost: false,
    myId: null,
    playerName: "Aventurero",

    init: function() {
        // Asegurarnos de que el nombre del personaje esté actualizado
        const charNameInput = document.getElementById("wiz-char-name");
        if(charNameInput) {
            this.playerName = charNameInput.value || "Aventurero";
            charNameInput.addEventListener("change", (e) => {
                this.playerName = e.target.value || "Aventurero";
            });
        }
    },

    hostGame: function() {
        this.peer = new Peer(); 
        this.isHost = true;

        this.peer.on('open', (id) => {
            this.myId = id;
            this.updateStatus(`Hosteando Partida. ID: ${id}`);
            this.addLogMessage("Sistema", `Has creado una sala. Tu ID es: ${id}`, "system");
        });

        this.peer.on('connection', (conn) => {
            this.connections.push(conn);
            conn.on('data', (data) => {
                this.handleIncomingData(data);
                // Como host, retransmitimos a todos los demás
                this.broadcastData(data, conn.peer);
            });
            conn.on('open', () => {
                this.addLogMessage("Sistema", `Un jugador se ha conectado.`, "system");
            });
            conn.on('close', () => {
                this.connections = this.connections.filter(c => c !== conn);
                this.addLogMessage("Sistema", `Un jugador se ha desconectado.`, "system");
            });
        });

        this.peer.on('error', (err) => {
            this.updateStatus("Error de conexiA3n");
            console.error(err);
        });
    },

    joinGame: function(hostId) {
        if (!hostId) return;
        this.peer = new Peer();
        this.isHost = false;

        this.peer.on('open', (id) => {
            this.myId = id;
            this.updateStatus("Conectando al DM...");
            
            this.hostConnection = this.peer.connect(hostId);
            
            this.hostConnection.on('open', () => {
                this.updateStatus("Conectado a la partida");
                this.addLogMessage("Sistema", `Te has unido a la partida de ${hostId}`, "system");
            });

            this.hostConnection.on('data', (data) => {
                this.handleIncomingData(data);
            });

            this.hostConnection.on('close', () => {
                this.updateStatus("Desconectado del Host");
                this.addLogMessage("Sistema", `El Host ha cerrado la partida.`, "system");
                this.hostConnection = null;
            });
        });
        
        this.peer.on('error', (err) => {
            this.updateStatus("Error de conexiA3n");
            console.error(err);
            alert("No se pudo conectar. Verifica el ID.");
        });
    },

    broadcastData: function(data, excludePeerId = null) {
        if (this.isHost) {
            // Mandar a todos excepto al que lo mandó original (si aplica)
            for (let conn of this.connections) {
                if (conn.peer !== excludePeerId) {
                    conn.send(data);
                }
            }
        } else if (this.hostConnection) {
            // Mandar al host
            this.hostConnection.send(data);
        }
    },

    sendMessage: function(text) {
        if (!text.trim()) return;
        
        // Comandos de Chat (/r)
        if (text.trim().startsWith("/r ")) {
            const rollExp = text.trim().substring(3).trim();
            // Mostrar mensaje mio y lanzar local
            this.addLogMessage(this.playerName, `lanza los dados...`);
            
            // IntegraciA3n con dados:
            if(window.diceRoller) {
                window.diceRoller.roll(rollExp, "Tirada Libre").catch(e => {
                    this.addLogMessage("Sistema", "Fórmula inválida.", "system");
                });
            } else {
                this.addLogMessage(this.playerName, `Tirada evaluada pero no se pudo animar 3D.`, "roll");
            }
            return;
        }

        const payload = {
            type: "chat",
            sender: this.playerName,
            msg: text,
            msgType: "text"
        };
        this.addLogMessage(this.playerName, text, "text");
        this.broadcastData(payload);
    },
    
    sendRollResult: function(reason, formula, total) {
        const text = `Tirada de ${reason} (${formula}): **${total}**`;
        const payload = {
            type: "chat",
            sender: this.playerName,
            msg: text,
            msgType: "roll"
        };
        // Lo mostramos localmente (opcional si ya se mostró por alert, pero mejor centralizar acá)
        this.addLogMessage(this.playerName, text, "roll");
        this.broadcastData(payload);
    },

    handleIncomingData: function(data) {
        if (data.type === "chat") {
            this.addLogMessage(data.sender, data.msg, data.msgType);
            
            // Si el mensaje viene con dados a animar en remoto, podríamos añadirlo en el futuro
            // Por ahora, solo mostramos el log de texto.
        }
    },

    updateStatus: function(statusStr) {
        const el = document.getElementById("multi-status-text");
        if (el) el.innerText = statusStr;
    },

    addLogMessage: function(sender, msg, msgType = "text") {
        const list = document.getElementById("chat-log-list");
        if (!list) return;

        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.style.borderBottom = "1px solid rgba(0,0,0,0.1)";
        li.style.paddingBottom = "5px";

        let color = "#333";
        if (msgType === "system") color = "#888";
        if (msgType === "roll") color = "darkred";

        li.innerHTML = `<strong style="color:#0056b3;">${sender}:</strong> <span style="color:${color};">${this.formatMarkdown(msg)}</span>`;
        list.appendChild(li);
        
        // Auto scroll al final
        const container = document.getElementById("chat-log-container");
        if(container) {
            container.scrollTop = container.scrollHeight;
        }
        
        // Mostrar notificador si está cerrado
        const chatWin = document.getElementById("chat-window");
        if(chatWin && chatWin.style.display === "none") {
            const toggle = document.getElementById("btn-toggle-chat");
            if(toggle) toggle.style.background = "#28a745"; // highlight
        }
    },
    
    formatMarkdown: function(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.Multiplayer.init();
    
    const btnHost = document.getElementById("btn-multi-host");
    const btnJoin = document.getElementById("btn-multi-join");
    const inputId = document.getElementById("multi-join-id");
    
    if(btnHost) {
        btnHost.addEventListener("click", () => {
            window.Multiplayer.hostGame();
        });
    }
    
    if(btnJoin && inputId) {
        btnJoin.addEventListener("click", () => {
            window.Multiplayer.joinGame(inputId.value.trim());
        });
    }
    
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("btn-chat-send");
    
    if(chatSend && chatInput) {
        chatSend.addEventListener("click", () => {
            window.Multiplayer.sendMessage(chatInput.value);
            chatInput.value = "";
        });
        chatInput.addEventListener("keypress", (e) => {
            if(e.key === "Enter") {
                window.Multiplayer.sendMessage(chatInput.value);
                chatInput.value = "";
            }
        });
    }
    
    const btnToggleChat = document.getElementById("btn-toggle-chat");
    const chatWin = document.getElementById("chat-window");
    if(btnToggleChat && chatWin) {
        btnToggleChat.addEventListener("click", () => {
            if(chatWin.style.display === "none") {
                chatWin.style.display = "flex";
                btnToggleChat.style.background = "#6c757d"; // reset highlight
            } else {
                chatWin.style.display = "none";
            }
        });
    }
});
