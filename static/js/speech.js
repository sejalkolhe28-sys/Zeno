/* ==========================================
   SPEECH
========================================== */

const Speech = {

    recognition: null,

    init() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            console.log("Speech Recognition not supported.");

            document.getElementById("mic-btn").style.display = "none";

            return;

        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-US";

        this.recognition.interimResults = false;

        this.recognition.maxAlternatives = 1;

        document
            .getElementById("mic-btn")
            .addEventListener("click", () => {

                this.recognition.start();

            });

        this.recognition.onresult = (event) => {

            document.getElementById("message").value =
                event.results[0][0].transcript;

            UI.autoResize(
                document.getElementById("message")
            );

        };

        this.recognition.onerror = (e) => {

            console.error(e);

        };

    }

};