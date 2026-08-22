/* ==========================================
   STORAGE
========================================== */

const Storage = {

    KEY: "zeno-history",

    /* Current chat messages */

    saveChats(chats) {

        localStorage.setItem(
            this.KEY,
            JSON.stringify(chats)
        );

    },

    loadChats() {

        const data =
            localStorage.getItem(
                this.KEY
            );

        return data
            ? JSON.parse(data)
            : [];

    },

    /* Multiple conversations */

    saveConversations(conversations) {

        localStorage.setItem(
            "zeno-conversations",
            JSON.stringify(conversations)
        );

    },

    loadConversations() {

        const data =
            localStorage.getItem(
                "zeno-conversations"
            );

        return data
            ? JSON.parse(data)
            : [];

    }

};