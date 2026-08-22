/* ==========================================
   THEMES
========================================== */

const Customize = {

    setTheme(theme) {

        Theme.THEMES.forEach(t => document.body.classList.remove(t));

        document.body.classList.add(

            `theme-${theme}`

        );

        localStorage.setItem("zeno-theme",theme);

    },

    loadTheme() {

        const theme =

            localStorage.getItem("zeno-theme")

            ||

            "midnight";

        this.setTheme(theme);

    }

};

/* Theme loading is handled by theme.js */