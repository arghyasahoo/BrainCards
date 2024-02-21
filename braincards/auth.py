import functools

from flask import (Blueprint, flash, g, redirect, render_template, request, session, url_for)
from werkzeug.security import check_password_hash, generate_password_hash

from braincards.db import get_db

from braincards.util.common_utils import CommonUtils

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('POST',))
def register():
    if request.method == 'POST':
        email = CommonUtils.sanitize_input(request.form['email'])
        password = CommonUtils.sanitize_input(request.form['password'])
        first_name = CommonUtils.sanitize_input(request.form['first_name'])
        last_name = CommonUtils.sanitize_input(request.form['last_name'])
        
        db = get_db()
        error = None

        if (not email) or (not password) or (not first_name) or (not last_name):
            error = 'Please fill up all fields'

        if error is None:
            try:
                db.execute(
                    "INSERT INTO USER (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
                    (email, generate_password_hash(password), first_name, last_name),
                )
                db.commit()
                
                flash("User registered successfully")
            except db.IntegrityError:
                error = f"User {email} is already registered."
            else:
                return redirect(url_for("auth.login"))

        if error: flash(error)

    return redirect(url_for("decks.view_all_decks"))

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        email = CommonUtils.sanitize_input(request.form['email'])
        password = CommonUtils.sanitize_input(request.form['password'])
        
        db = get_db()
        error = None
        
        user = db.execute(
            'SELECT id, email, password FROM user WHERE email = ?', (email,)
        ).fetchone()
        
        if user is None:
            error = 'Incorrect credentials' 
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('decks.view_all_decks'))

        flash(error)

    return render_template('auth/login.html')

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT id, email, first_name, last_name FROM user WHERE id = ?', (user_id,)
        ).fetchone()
        
@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view