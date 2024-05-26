import { Greeter } from '../src';

describe('First test suite', () => {
  const greeter = new Greeter('friend');
  it('Should greet with message', () => {
    expect(greeter.greet()).toBe('Bonjour, friend!');
  });
});
