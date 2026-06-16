from flask import Flask, jsonify, render_template, request

from recommender import (
    CHOICE_GROUPS,
    get_recommendations,
    get_review_summary,
    get_selection_conflict,
)


app = Flask(__name__)


@app.get("/")
def index():
    visible_groups = {
        key: value
        for key, value in CHOICE_GROUPS.items()
        if key != "chips"
    }
    return render_template("index.html", choice_groups=visible_groups)


@app.post("/api/recommend")
def recommend():
    answers = request.get_json(silent=True) or {}
    conflict = get_selection_conflict(answers)
    recommendations = get_recommendations(answers)
    return jsonify(
        {
            "conflict": conflict,
            "review": get_review_summary(answers),
            "recommendations": recommendations,
        }
    )


if __name__ == "__main__":
    app.run(debug=True, port=5001, use_reloader=False)
