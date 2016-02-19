## Pre requirements
	npm, jspm, node v4 or higher, mongodb, gulp, babel-node
	$ sudo npm install babel@5.8.3		

## Install application
	$ cd client && npm install
	$ cd src jspm install
	$ cd server/src && npm install

## Run application
	$ cd server/src
	$ NODE_ENV=development babel-node app.js
	
## Build application
	$ cd client
	$ gulp build
