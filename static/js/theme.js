const Theme = {

    THEMES: [
        "theme-midnight",
        "theme-ocean",
        "theme-emerald",
        "theme-purple",
        "theme-sakura",
        "theme-light"
    ],

    init() {
        document.querySelectorAll(".theme-item").forEach(button => {
            button.onclick = () => {
                this.set(button.dataset.theme);
            };
        });
    },

    set(theme) {
        this.THEMES.forEach(t => {
            document.body.classList.remove(t);
        });

        document.body.classList.add(theme);

        /* Change Logo */
        const logo = document.getElementById("theme-logo");

        if (logo) {
            switch (theme) {
                case "theme-midnight":
                    logo.src = "/static/assets/logos/midnight.png";
                    break;
                case "theme-ocean":
                    logo.src = "/static/assets/logos/ocean.png";
                    break;
                case "theme-emerald":
                    logo.src = "/static/assets/logos/emerald.png";
                    break;
                case "theme-purple":
                    logo.src = "/static/assets/logos/purple.png";
                    break;
                case "theme-sakura":
                    logo.src = "/static/assets/logos/sakura.png";
                    break;
                case "theme-light":
                    logo.src = "/static/assets/logos/light.png";
                    break;
                default:
                    logo.src = "/static/assets/logos/light.png";
                    break;
            }
        }

        localStorage.setItem("zeno-theme", theme);

        document.querySelectorAll(".theme-item").forEach(btn => {
            btn.classList.toggle(
                "active-theme",
                btn.dataset.theme === theme
            );
        });
    },

    load() {
        const savedTheme =
            localStorage.getItem("zeno-theme") ||
            "theme-midnight";

        this.set(savedTheme);
    }

};