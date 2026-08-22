/* ==========================================
   CHAT MODULE
========================================== */

const Chat = {

    history: [],

    currentConversation: null,

   init() {

    this.history = Storage.loadChats() || [];

    this.currentConversation = null;

},


    async sendMessage() {

        const textarea = document.getElementById("message");

        const message = textarea.value.trim();

        if (!message) return;

        const welcome = document.querySelector(".welcome");

        if (welcome) welcome.remove();

        UI.addMessage("user", message);

        this.history.push({

            role: "user",
            content: message

        });

        textarea.value = "";

        UI.autoResize(textarea);

        UI.showTyping();

        try {

            const reply = await API.generateResponse(message);
            const cleanReply = reply
                .replace(/\*\*/g, "")
                .replace(/__(.*?)__/g, "$1");

            UI.removeTyping();

            UI.addMessage("bot", cleanReply);

            this.history.push({

                role: "assistant",
                content: cleanReply

            });

            this.saveConversation(message);

            Sidebar.renderHistory();

        }

        catch (error) {

            UI.removeTyping();

            console.error(error);

            UI.addMessage(
                "bot",
                "⚠ " + error.message
            );

        }

    },

   saveConversation(firstMessage) {

    let conversations = Storage.loadConversations();

    if (!this.currentConversation) {

        const conversation = {

            id: Date.now().toString(),

            title: firstMessage.length > 35
                ? firstMessage.substring(0,35) + "..."
                : firstMessage,

            messages: [...this.history],

            updated: Date.now()

        };

        conversations.unshift(conversation);

        this.currentConversation = conversation.id;

    } else {

        conversations = conversations.map(c => {

            if (c.id === this.currentConversation) {

                c.messages = [...this.history];

                c.updated = Date.now();

            }

            return c;

        });

    }

    Storage.saveConversations(conversations);

    Storage.saveChats(this.history);

},

   newChat() {

    this.history = [];

    this.currentConversation = null;

    Storage.saveChats([]);

    document.getElementById("chat-box").innerHTML = `

        <div class="welcome">

            <img
                class="welcome-logo"
                src="/static/assets/logo.png"
                alt="Zeno">

            <h1>Hello, I'm Zeno</h1>

            <p>Ask me anything to get started.</p>

        </div>

    `;

    Sidebar.renderHistory();

}

};