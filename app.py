from flask import Flask, request, jsonify, render_template

from gemini import generate_response

app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(force=True)

        message = data.get("message", "").strip()

        if not message:

            return jsonify({

                "error": "Empty message"

            }), 400

        reply = generate_response(message)

        return jsonify({

            "response": reply

        })

    except Exception as e:

        import traceback

        traceback.print_exc()

        return jsonify({

            "error": str(e)

        }), 500


if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )