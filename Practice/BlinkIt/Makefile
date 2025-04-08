.PHONY: install i dev client server build clean

install || i:
	cd client && npm install
	cd server && npm install

dev:
	cd client && npm run dev & \
	cd server && npm run dev

client:
	cd client && npm run dev

server:
	cd server && npm run dev

build:
	cd client && npm run build

clean:
	rm -rf client/node_modules
	rm -rf server/node_modules
