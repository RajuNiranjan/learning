.PHONY: install i dev client server 

i | install:
	cd server && npm install
	cd client && npm install

dev:
	cd server && npm run dev & \
	cd client && npm run dev

app/dev:
	cd client && npm run dev & \

api/dev:
	cd server && npm run dev

build:
	cd client && npm run build
	cd server && npm run build

start:
	cd server && npm run start
