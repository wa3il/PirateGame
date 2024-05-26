import { Greeter } from './greeter';
export * from './greeter';

(function () {
  // execute when load index.js

  console.log('hello world');

  // we can use Greeter , execute following in console
  const greet = new Greeter('myName');
  console.log(greet.greet());
})();

export * from './greeter';
