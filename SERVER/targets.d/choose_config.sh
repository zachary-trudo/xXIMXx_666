#! /bin/bash
# 
# generate a configuration file:  
#    We install the CONFIG.py file as ../CONFIG.py based on the system, 
#    selecting by known host names (e.g., ix), architecture names
#    (e.g., armv7 or armv8 for pi), operating system (darwin for MacOSX). 
#    The default is chosen if none of the known architectures matches. 
#    Similarly one Makefile.local is chosen from either standard or 
#    Ubuntu configurations and passed out as ../Makefile.local 
# 

# What machine is this?  Use uname to find hardware
# 
architecture=`uname -m`
node=`uname -n`
processor=`uname -p`
opsys=`uname -v`
port="8080"   # But see how this is altered for shared server ix

# Generate configuration file text with a couple of choices
#
function gen_config {
    secret="$(date | shasum | head -c32)"
    gendate="$(date)"
    cat <<EOF
"""
Configuration of server.
Generated $( date )
Edit to fit development or deployment environment.

"""

PORT=${port}
DEBUG = True  # Set to False for production use
secret_key="${secret}"

EOF
}

if [[ $architecture =~ "arm" ]]; then
   echo "Configuring for Raspberry Pi versions 2 or 3"
   gen_config > ../CONFIG.py
   cp Makefile.standard ../Makefile.local

elif [[ $opsys =~ "Darwin" ]]; then 
   echo "Configuring for Mac OS X"
   gen_config > ../CONFIG.py
   cp Makefile.standard ../Makefile.local

elif [[ $node =~ "ix" ]]; then 
   echo "Configuring for shared CIS host ix-trusty or ix-dev"
   (( port = 1000 + ($RANDOM % 8000) ))
   gen_config > ../CONFIG.py
   cp Makefile.ubuntu ../Makefile.local
   echo "CONFIG.py uses random port ${port}; you may edit for another value"

else
   echo "Unknown host type; using default configuration files"
   echo "Edit CONFIG.py to set appropriate port"
   echo "Edit Makefile.local as needed"
   cp CONFIG.skel.py ../CONFIG.py
   cp Makefile.standard ../Makefile.local

fi;
