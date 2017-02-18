"""
Configuration of server.
Edit to fit development or deployment environment.

NOTE: This is the default configuration file chosen if the 
autoconfigure doesn't recognize the host. It will require a 
secret key of its own, and may need further editing to work
as intended.

"""

PORT=8080
DEBUG = True  # Set to False for production use
secret_key = "Replace me with a random string"
