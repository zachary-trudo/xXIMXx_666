"""
Skeleton code for a flask website

"""

import flask
from flask import render_template
from flask import request
from flask import url_for

from fileops import FileOps
fo = FileOps()

import json
import logging


###
# Globals
###
app = flask.Flask(__name__)
import CONFIG


###
# Pages
###

@app.route("/")
@app.route("/index")
def index():
  app.logger.debug("Main page entry")
  return flask.render_template('login.html')

@app.route("/chatApp.html")
def chatApp():
  app.logger.debug("Main page entry")
  return flask.render_template("chatApp.html")

@app.route('/images/<path:path>')
def send_images(path):
    return flask.send_from_directory('images', path)

@app.route('/receive_message', methods=['POST'])
def receive_message():
  print(request.json)
  fo.put_messages(request.json)
  return flask.json.jsonify(result=request.json)

@app.route('/get_messages', methods=['GET'])
def get_messages():
  return flask.json.jsonify(result=fo.get_messages())

@app.errorhandler(404)
def page_not_found(error):
    app.logger.debug("Page not found")
    flask.session['linkback'] =  flask.url_for("index")
    return flask.render_template('page_not_found.html'), 404

#################
#
# Functions used within the templates
#
#################
"""
@app.template_filter( 'fmtdate' )
def format_arrow_date( date ):
    try: 
        normal = arrow.get( date )
        return normal.format("ddd MM/DD/YYYY")
    except:
        return "(bad date)"

"""
#############
#    
# Set up to run from cgi-bin script, from
# gunicorn, or stand-alone.
#
app.secret_key = CONFIG.secret_key
app.debug=CONFIG.DEBUG
app.logger.setLevel(logging.DEBUG)
if __name__ == "__main__":
    print("Opening for global access on port {}".format(CONFIG.PORT))
    app.run(port=CONFIG.PORT, host="0.0.0.0")

