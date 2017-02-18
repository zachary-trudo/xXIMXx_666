# xXIMXx_666

Our chat application!

Adam Carlton
Alex Dibb
Elizabeth Woodruff
Wilson Chen
Xuesong Luo
Zachary Trudo

# Starting the server

You will need an environment capable of executing bash 
scripts and GNU make to run the server. 

1. Navigate to the SERVER folder in the command line.
2. Execute the command 'bash ./configure'. This will run
the autoconfigure scripts in targets.d, setting up some
of the globals based on the execution environment. It will
also build the virtual environment for developers (which can 
be activated with the command 'source /env/bin/activate')
2a. You may need to set the execution privileges on 'configure'
and 'targets.d/choose_config.sh' before they can run.
2b. If your host type isn't recognized (it will say so in the 
console if it isn't), then you'll need to add your own secret key
to the generated CONFIG.py. You might also need to edit other portions
of CONFIG.py or Makefile.local to be certain they run as intended.
3. Execute the command 'make run'. This will start the server, and
output the port it's running on to console.

Other make commands are available - 'make veryclean' in particular
will delete the files created by the autoconfigure scripts if there
was a problem.