# node-js-blockchain

<img src="https://tm.ibxk.com.br/2020/08/27/27210957998421.jpg?ims=1120x420"/>

This project is about a Blockchain application totally in Node.js with javascript.

The project demonstrates the formation of a blockchain chain on a p2p server. Proof of work concepts and blockchain validations (Byzantine failure) were implemented.

You must have two instances of the system running on one machine.

# How to install.
Clone the project on your machine.
Copy the project into a new folder called node-js-blockchain_2
Run npm install within both projects.

On node-js-blockchain_2 in the app\p2p-server.js file, make the activation of the
P2P port for 5002.

Okay, now you will have two servers running on your system and thus a scoket tunnel will be opened for communication between them.

# Validating the project
from the command line enter the test folder.
run the command:
```npm run test```

And watch all validations take place.
