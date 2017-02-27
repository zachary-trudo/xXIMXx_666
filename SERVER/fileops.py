""" Simple module for file operations """
import os
import sys
import json

class FileOps(object):
  def _get_json(self, fileName):
    """ Gets the contents of a json file.

    Args:
      fileName (str): String containing the path of the file.

    Returns:
      list: list of dictionaries - woot.
    """
    contents = [] 
    try:
      with open(fileName, "r") as cf:
        contents = json.load(cf)
    except:
      pass
    return contents

  def _put_json(self, fileName, item):
    """ Appends item to json file.

    Args:
      fileName (str): String containing the path of the file.
      item (dict): Item we need to append.
    """
    contents = self._get_json(fileName)
    try:
      contents.append(item)
      with open(fileName, "w") as cf:
        json.dump(contents, cf)
    except:
      pass

  def open_contacts(self):
    return self._get_json("contacts") 

  def add_contact(self, contact):
    self._put_json("contacts", contact)

  def get_messages(self):
    return self._get_json("messages")

  def put_messages(self, message):
    self._put_json("messages", message)


