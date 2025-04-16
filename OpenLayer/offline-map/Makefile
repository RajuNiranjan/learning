.PHONY: install i app api clean

install i: 
	cd app && npm install
	cd api && npm install

app/dev:
	cd app && npm run dev

api/dev:
	cd api && npm run dev

clean:
	rm -rf app/node_modules
	rm -rf api/node_modules
	cd app && npm install
	cd server && npm install

dev:
	cd app && npm run dev
	cd server && npm run dev
