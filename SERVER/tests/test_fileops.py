import os
import sys
sys.path.append(os.path.abspath(".."))
#cwd = os.getcwd()
#os.chdir("..")
#print(os.getcwd())
from fileops import FileOps
#os.chdir(cwd)

message = [{"message": "Yeahp"}, {"message": "Yeahp2"}]
contact = [{"person": "hey hey"}, {"person": "Whatever"}]

fo = FileOps()
fo.add_contact(contact)
print(fo.open_contacts())
fo.put_messages(message)
print(fo.get_messages())
