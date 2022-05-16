import { Route } from '../Route';
import Block from '../Block';
import renderDOM from '../renderDOM';

// const mock = jest.fn();

// jest.mock('../renderDOM', () =>
//   jest.fn().mockImplementation(() => ({ renderDOM: mock }))
// );

// jest.mock('../renderDOM', () => ({
//   ...jest.requireActual('renderDOM'),
//   __esModule: true,
//   default: jest.fn(),
// }))

jest.mock('../renderDOM', () => jest.fn());

describe('Route', () => {
  test('route should not invoke renderDOM if navigate path name doesnt match routes pathname', () => {
    const view = class SignInPage extends Block {
      // hide(...args) {
      //   mockHide(...args);
      // }
    };
    const route = new Route('/abc', view, {});

    // https://jestjs.io/docs/mock-functions
    route.navigate('/chats');
    expect(renderDOM).toHaveBeenCalledTimes(0);
  });

  test('route should invoke renderDOM if navigate path name match routes pathname', () => {
    const view = class SignInPage extends Block {};
    const route = new Route('/abc', view, {});

    route.navigate('/abc');
    expect(renderDOM).toHaveBeenCalledTimes(1);
    // const arg = renderDOM.mock.calls[0][0]; // ????
    // expect(arg).toBeInstanceOf(view);
  });
});
