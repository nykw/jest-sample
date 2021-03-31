import { forEach } from './main';
import foo from './foo';

// see https://jestjs.io/ja/docs/jest-object#jestmockmodulename-factory-options
jest.mock('./foo', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 42),
  };
});

test('Using a mock function', () => {
  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test('Mock Return Values', () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

  console.log(myMock(), myMock(), myMock(), myMock());
  // > 10, 'x', true, true

  const filterTestFn = jest.fn();

  // Make the mock return `true` for the first call,
  // and `false` for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter((num) => filterTestFn(num));

  console.log(result);
  // > [11]
  console.log(filterTestFn.mock.calls);
  // > [ [11], [12] ]
});

test('Mock Implementations', () => {
  foo();
  // > 42
  console.log(foo());

  const myMockFn = jest
    .fn()
    .mockImplementationOnce((cb) => cb(null, true))
    .mockImplementationOnce((cb) => cb(null, false));

  myMockFn((err: Error, val: any) => console.log(val));
  // > true

  myMockFn((err: Error, val: any) => console.log(val));
  // > false

  const myMockFn2 = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');

  console.log(myMockFn2(), myMockFn2(), myMockFn2(), myMockFn2());
  // > 'first call', 'second call', 'default', 'default'
});

test('Mock Names', () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation((scalar) => 42 + scalar)
    .mockName('add42');
  // expect(myMockFn(1)).toBe(42);
});

test('Custom Matchers', () => {
  const mockFunc = jest.fn((...xs: unknown[]) => {});

  const [arg1, arg2] = [1, 2];
  mockFunc();
  mockFunc(arg1, arg2);

  // The mock function was called at least once
  expect(mockFunc).toHaveBeenCalled();

  // The mock function was called at least once with the specified args
  expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);

  // The last call to the mock function was called with the specified args
  expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2);

  // All calls and the name of the mock is written as a snapshot
  expect(mockFunc).toMatchSnapshot();
});
