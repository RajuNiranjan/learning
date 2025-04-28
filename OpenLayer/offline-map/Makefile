.PHONY: install app dev build api prisma build

install i:
	cd frontend && npm install
	cd server && npm install
app/dev:
	cd frontend && npm run dev

app/build:
	cd frontend && npm run build

server/dev:
	cd server && npm run dev

dev:
	cd server && npm run dev & \
	cd frontend && npm run dev & \
	wait

clean:
	rm -rf cd server/tiles/*

prisma:
	cd server && npx prisma generate
	cd server && npx prisma migrate dev

build:
	cd frontend && npm run build

	
