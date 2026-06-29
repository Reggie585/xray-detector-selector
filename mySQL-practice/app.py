from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re

from flask import Flask, jsonify, render_template, render_template_string, request

from recommender import (
    CHOICE_GROUPS,
    get_recommendations,
    get_review_summary,
    get_selection_conflict,
)


app = Flask(__name__)
SUBMISSIONS_FILE = Path(
    os.getenv("SUBMISSIONS_FILE", "/tmp/xray_detector_engineer_submissions.json")
)
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def load_engineer_submissions():
    if not SUBMISSIONS_FILE.exists():
        return []
    try:
        return json.loads(SUBMISSIONS_FILE.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return []


def save_engineer_submission(submission):
    submissions = load_engineer_submissions()
    submissions.append(submission)
    SUBMISSIONS_FILE.parent.mkdir(parents=True, exist_ok=True)
    SUBMISSIONS_FILE.write_text(
        json.dumps(submissions, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return len(submissions)


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


@app.post("/api/engineer-request")
def engineer_request():
    payload = request.get_json(silent=True) or {}
    contact = payload.get("contact") or {}
    email = (contact.get("email") or "").strip()
    info = (contact.get("info") or "").strip()

    if not email and not info:
        return jsonify({"ok": False, "message": "missing contact information"}), 400
    if email and not EMAIL_RE.match(email):
        return jsonify({"ok": False, "message": "invalid email address"}), 400

    submission = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "contact": {
            "name": (contact.get("name") or "").strip(),
            "email": email,
            "info": info,
        },
        "answers": payload.get("answers") or {},
        "recommendations": payload.get("recommendations") or [],
        "conflict": payload.get("conflict"),
        "source": "xray_detector_selector",
    }
    count = save_engineer_submission(submission)
    return jsonify(
        {
            "ok": True,
            "stored_count": count,
            "email_enabled": False,
            "admin_url": "/admin/submissions",
        }
    )


@app.get("/api/admin/status")
def admin_status():
    return jsonify(
        {
            "ok": True,
            "submissions_url": "/admin/submissions",
            "email_enabled": False,
            "product_rules_admin_enabled": False,
            "message": "Prototype admin is currently limited to viewing engineer-request submissions.",
        }
    )


@app.get("/admin/submissions")
def admin_submissions():
    submissions = list(reversed(load_engineer_submissions()))
    return render_template_string(
        """
        <!doctype html>
        <html lang="zh-CN">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>工程师复核留言</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 32px; background: #071124; color: #eaf2ff; }
                h1 { margin-bottom: 8px; }
                .note { color: #9fb0cc; margin-bottom: 24px; }
                article { border: 1px solid #28456f; border-radius: 14px; padding: 18px; margin-bottom: 16px; background: #0d1c34; }
                pre { white-space: pre-wrap; word-break: break-word; background: #071124; border-radius: 10px; padding: 12px; }
                b { color: #67d7ff; }
            </style>
        </head>
        <body>
            <h1>工程师复核留言</h1>
            <p class="note">这是演示版后台查看页；邮件发送和产品库 / 算法配置后台尚未接入。</p>
            {% if submissions %}
                {% for item in submissions %}
                    <article>
                        <p><b>时间：</b>{{ item.created_at }}</p>
                        <p><b>姓名：</b>{{ item.contact.name or "未填写" }}</p>
                        <p><b>邮箱：</b>{{ item.contact.email or "未填写" }}</p>
                        <p><b>备注：</b>{{ item.contact.info or "未填写" }}</p>
                        <p><b>推荐产品：</b></p>
                        <pre>{{ item.recommendations | tojson(indent=2) }}</pre>
                        <p><b>选型答案：</b></p>
                        <pre>{{ item.answers | tojson(indent=2) }}</pre>
                    </article>
                {% endfor %}
            {% else %}
                <p>还没有收到留言。</p>
            {% endif %}
        </body>
        </html>
        """,
        submissions=submissions,
    )


if __name__ == "__main__":
    app.run(debug=True, port=5001, use_reloader=False)
