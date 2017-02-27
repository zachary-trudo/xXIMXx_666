""" Simple module for file operations """
import os
import sys
import yaml

class FileOps(object):
  def _get_yaml(self, fileName):
    """ Gets the contents of a yaml file.

    Args:
      fileName (str): String containing the path of the file.

    Returns:
      list: list of dictionaries - woot.
    """
    contents = [] 
    try:
      with open(fileName, "r") as cf:
        contents = yaml.load(cf)
    except:
      pass
    return contents

  def _put_yaml(self, fileName, item):
    """ Appends item to yaml file.

    Args:
      fileName (str): String containing the path of the file.
      item (dict): Item we need to append.
    """
    contents = self._get_yaml(fileName)
    try:
      contents.extend(item)
      with open(fileName, "w") as cf:
        cf.write(yaml.dump(contents))
    except:
      pass

  def open_contacts(self):
    return self._get_yaml("contacts") 

  def add_contact(self, contact):
    self._put_yaml("contacts", contact)

  def get_messages(self):
    return self._get_yaml("messages")

  def put_messages(self, message):
    self._put_yaml("messages", message)


