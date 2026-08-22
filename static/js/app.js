/* ==========================================
   ZENO AI
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    Zeno.init();

});

const Zeno = {

    init() {

        this.cache();

        this.bind();

        this.start();

    },

    cache() {

        this.chatBox = document.getElementById("chat-box");

        this.textarea = document.getElementById("message");

        this.sendBtn = document.getElementById("send-btn");

        this.attachBtn = document.getElementById("attach-btn");

        this.micBtn = document.getElementById("mic-btn");

        this.newChatBtn = document.getElementById("new-chat-btn");

    },

    bind() {

        /* Send Button */

        this.sendBtn.addEventListener("click", () => {

            Chat.sendMessage();

        });

        /* Enter Key */

        this.textarea.addEventListener("keydown", (e) => {

            if (e.key === "Enter" && !e.shiftKey) {

                e.preventDefault();

                Chat.sendMessage();

            }

        });

        /* Auto Resize */

        this.textarea.addEventListener("input", () => {

            UI.autoResize(this.textarea);

        });

        /* New Chat */

        this.newChatBtn.addEventListener("click", () => {

            Chat.newChat();

        });

    },

    start() {

        /* Core */

        UI.autoResize(this.textarea);

        Storage.loadChats();

        /* Modules */

        Sidebar.init();

        Theme.init();

        Theme.load();

        Chat.init();

        Speech.init();

    }

};