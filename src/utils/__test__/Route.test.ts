import { Route } from '../Route';
import Block from '../Block';
import renderDOM from '../renderDOM';

jest.mock('../renderDOM', () => jest.fn());

describe('Route', () => {
  test('route should not invoke renderDOM if navigate path name doesnt match routes pathname', () => {
    const view = class SignInPage extends Block {};
    const route = new Route('/abc', view, {});

    route.navigate('/chats');
    expect(renderDOM).toHaveBeenCalledTimes(0);
  });
});
