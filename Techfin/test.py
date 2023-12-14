from flask import Flask, request, render_template, redirect, session, flash
from flask_sqlalchemy import SQLAlchemy
import bcrypt


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
app.secret_key = 'secret_key'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))

    def __init__(self, email, password, username):
        self.username = username
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

with app.app_context():
    db.create_all()

@app.route("/", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # handle request
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        flash('Registration successful. You can now log in.', 'success')
        return redirect('/login')

    return render_template("registration.html")


@app.route('/home')
def home():
    if session['email']:
        user = User.query.filter_by(email=session['email']).first()
        return render_template('home.html', user=user)

    return redirect('/login')

@app.route('/dashboard')
def dashboard():
    if session['username']:
        user = User.query.filter_by(username=session['username']).first()

    finance_data = [
        {'category': 'Income', 'amount': 5000},
        {'category': 'Expenses', 'amount': 2500},
        {'category': 'Savings', 'amount': 2500},
    ]

    labels = [item['category'] for item in finance_data]
    amounts = [item['amount'] for item in finance_data]

    total_income = sum(amount for amount in amounts if amount > 0)
    total_expenses = sum(amount for amount in amounts if amount < 0)
    savings = total_income - total_expenses



    return render_template('dashboard.html',user=user, labels=labels, amounts=amounts, total_income=total_income, total_expenses=total_expenses, savings=savings, finance_data=finance_data)





@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            session['email'] = user.email
            session['username']=user.username
            return redirect('/home')
        else:
            return render_template("login.html")

    return render_template('login.html')

@app.route('/fdcal')
def fdcal():
    return render_template('fd_calculator.html')


@app.route('/about')
def about():
    if session['username']:
        user = User.query.filter_by(username=session['username']).first()
        return render_template('about.html', user=user)


@app.route('/logout')
def logout():
    session.pop('email',None)
    return redirect('/login')


if __name__ == '__main__':
    app.run(debug=True)
