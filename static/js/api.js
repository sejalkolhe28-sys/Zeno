/* ==========================================
   API MODULE
========================================== */

const API = {

    baseURL: "",

    async generateResponse(message) {

        try {

            const response = await fetch(

                `${this.baseURL}/chat`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        message: message

                    })

                }

            );

           if (!response.ok) {

    const err = await response.json();

throw new Error(
    err.error || "Unknown server error"
);

}

            const data = await response.json();

            return data.response;

        }

        catch (error) {

    console.error(error);

    throw error;

}

    }

};