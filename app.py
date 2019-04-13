from flask import Flask, jsonify, render_template
from flask_mysqldb import MySQL
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:Program001@127.0.0.1:3306/StatePopulation"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)
States = Base.classes.population_new

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/names')
def names():
    # cur = mysql.connection.cursor()
    # cur.execute('''SELECT States FROM Population_new''')
    # results = cur.fetchall()

    stmt = db.session.query(States).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.States))

@app.route('/data/<entry>')
def sampleData(entry):

    sel = [
        States.States,
        States.yr_2010,
        States.yr_2011,
        States.yr_2012,
        States.yr_2013,
        States.yr_2014,
        States.yr_2015,
        States.yr_2016,
        States.yr_2017,
        States.yr_2018,
        States.yr_2019,
        States.yr_2020,
        States.yr_2021,
        States.yr_2022,
        States.yr_2023,
    ]

    results = db.session.query(*sel).filter(States.States == entry).all()

    data = {}
    for result in results:
        data["State"] = result[0]
        data["yr2010"] = result[1]
        data["yr2011"] = result[2]
        data["yr2012"] = result[3]
        data["yr2013"] = result[4]
        data["yr2014"] = result[5]
        data["yr2015"] = result[6]
        data["yr2016"] = result[7]
        data["yr2017"] = result[8]
        data["yr2018"] = result[9]
        data["yr2019"] = result[10]
        data["yr2020"] = result[11]
        data["yr2021"] = result[12]
        data["yr2022"] = result[13]
        data["yr2023"] = result[14]

    return jsonify(data)

@app.route('/map')
def map():
    return render_template("map.html")

@app.route('/dataMap')
def dataMap():

    sel = [
        States.States,
        States.yr_2010,
        States.yr_2017,
        States.yr_2023,
        States.percChange11_17,
        States.Latitude,
        States.Longitude
    ]

    results = db.session.query(*sel)

    data = []
    
    for result in results:
        state = {}
        state["State"] = result[0]
        state["yr2010"] = result[1]
        state["yr2017"] = result[2]
        state["yr2023"] = result[3]
        state["percentChange"] = float(result[4][:-1])
        state["Latitude"] = float(result[5])
        state["Longitude"] = float(result[6])
        data.append(state)

    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug = True)
