const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
sayHello(name) {
console.log('Before emitting event...');
this.emit('greet', name);
}
}

const myEmitter = new MyEmitter();
myEmitter.on('greet', (name) => {
console.log(`Hi, ${name}!`);
});

myEmitter.sayHello('Bob');