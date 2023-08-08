import { Logger } from './logger.middleware';

describe('ExampleMiddleware', () => {
  it('should be defined', () => {
    expect(new Logger()).toBeDefined();
  });
});
