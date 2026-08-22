/* ==========================================
   UI MODULE
========================================== */

const UI = {

    autoResize(textarea) {

        textarea.style.height = "24px";
        textarea.style.height = textarea.scrollHeight + "px";

    },

    scrollToBottom() {

        const chatBox = document.getElementById("chat-box");

        chatBox.scrollTop = chatBox.scrollHeight;

    },

    clearChat() {

        document.getElementById("chat-box").innerHTML = "";

    },

    createUserMessage(message) {

        return `
        <div class="message user">
            <div class="bubble">${this.escape(message)}</div>
        </div>
        `;

    },

    createBotMessage(message) {

        return `
        <div class="message bot">

            <div class="avatar">

                <img
                    src="/static/assets/logo.png"
                    alt="Zeno">

            </div>

            <div class="bubble markdown-body">
               ${marked.parse(message)}
            </div>

        </div>
        `;

    },

    addMessage(type, message) {

        const chatBox = document.getElementById("chat-box");

        document.querySelector(".welcome")?.remove();

        const html =

            type === "user"
                ? this.createUserMessage(message)
                : this.createBotMessage(message);

        chatBox.insertAdjacentHTML(
            "beforeend",
            html
        );

        this.scrollToBottom();

    },

    renderConversation(messages) {

        this.clearChat();

        messages.forEach(msg => {

            if (msg.role === "user") {

                this.addMessage(
                    "user",
                    msg.content
                );

            }

            else {

                this.addMessage(
                    "bot",
                    msg.content
                );

            }

        });

    },

    showTyping() {

        const chatBox = document.getElementById("chat-box");

        chatBox.insertAdjacentHTML(

            "beforeend",

            `
            <div
                class="message bot"
                id="typing-message">

                <div class="avatar">

                    <img
                        src="/static/assets/logo.png"
                        alt="Zeno">

                </div>

                <div class="bubble typing">

                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </div>
            `

        );

        this.scrollToBottom();

    },

    removeTyping() {

        document
            .getElementById("typing-message")
            ?.remove();

    },

    escape(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }

};