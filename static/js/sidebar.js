/* ==========================================
   ZENO SIDEBAR
========================================== */

const Sidebar = {

    init() {

        this.sidebar = document.querySelector(".sidebar");
        this.menuBtn = document.querySelector(".menu-btn");

        this.bindEvents();
        this.renderHistory();

    },

    bindEvents() {

        if (this.menuBtn) {

            this.menuBtn.onclick = (e) => {

                e.stopPropagation();
                this.toggle();

            };

        }

        document.addEventListener("click", (e) => {

            if (

                window.innerWidth <= 992 &&

                this.sidebar.classList.contains("show") &&

                !this.sidebar.contains(e.target)

            ) {

                this.close();

            }

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                this.close();

            }

        });

    },

    toggle() {

        if (window.innerWidth <= 992) {

            this.sidebar.classList.toggle("show");

        }

    },

    open() {

        if (window.innerWidth <= 992) {

            this.sidebar.classList.add("show");

        }

    },

    close() {

        if (window.innerWidth <= 992) {

            this.sidebar.classList.remove("show");

        }

    },

     renderHistory() {

    const historyList = document.getElementById("history-list");

    if (!historyList) return;

    const chats = Storage.loadChats();

    historyList.innerHTML = "";

    const seen = new Set();

    const recent = [];

    for (let i = chats.length - 1; i >= 0; i--) {

        const chat = chats[i];

        if (chat.role !== "user") continue;

        let title = chat.content.trim();

        if (!title) continue;

        title = title.replace(/\s+/g, " ");

        if (seen.has(title)) continue;

        seen.add(title);

        recent.push(title);

        if (recent.length >= 20) break;
    }

    recent.forEach(title => {

        const item = document.createElement("div");

        item.className = "history-item";

        item.title = title;

        item.textContent =
            title.length > 35
                ? title.substring(0, 35) + "..."
                : title;

        historyList.appendChild(item);

    });

},
    loadConversation(messages) {

        const chatBox = document.getElementById("chat-box");

        chatBox.innerHTML = "";

        messages.forEach(msg => {

            if (msg.role === "user") {

                UI.addMessage("user", msg.content);

            }

            else {

                UI.addMessage("bot", msg.content);

            }

        });

    }

};