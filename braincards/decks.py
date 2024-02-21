from flask import Blueprint, flash, g, render_template, current_app, request

from braincards.db import get_db
from braincards.auth import login_required
from braincards.util.common_utils import CommonUtils


bp = Blueprint("decks", __name__, url_prefix="/decks")


@bp.route("/", methods=("GET",))
@login_required
def view_all_decks():
    db = get_db()
    error = None

    # TODO: map with user
    decks = db.execute(
        "SELECT id, name FROM deck WHERE user_id = ?", (g.user[0],)
    ).fetchall()

    if decks is None:
        error = "Failed to fetch decks"
    elif len(decks) == 0:
        error = "No Decks Found, Create one"

    if error:
        flash(error)

    return render_template("/cards/all_decks.html", decks=decks)


@bp.route("/<deck_id>", methods=("GET",))
@login_required
def view_deck_by_id(deck_id):
    if request.method == "GET":
        if request.view_args == None:
            return flash("Invalid deck id")

        db = get_db()
        error = None

        with current_app.open_resource("schema/clean_db.sql") as f:
            db.executescript(f.read().decode("utf8"))

        cards = db.execute(
            "SELECT front_content, back_content FROM card WHERE deck_id = ?", (deck_id,)
        ).fetchall()

        if cards is None:
            error = "Failed to fetch cards"
        elif len(cards) == 0:
            error = "No Cards Found"

        if error:
            flash(error)

    return render_template("/cards/card.html", cards=cards)


@bp.route("/create", methods=("GET", "POST"))
@login_required
def create_deck():
    db = get_db()
    error = None

    if request.method == "POST":
        content_type = request.headers.get("Content-Type")
        if content_type == "application/json":
            # TODO:  check json validity
            deck_name = CommonUtils.sanitize_input(request.json.get('name').strip())
            db.execute(
                "INSERT INTO deck (user_id, name) VALUES (?, ?)", 
                (g.user['id'], deck_name),
            )
            db.commit()

    return render_template("/cards/create_single_deck.html")
