import axios from 'axios';
import Users from './users';

// see https://stackoverflow.com/questions/51495473/typescript-and-jest-avoiding-type-errors-on-mocked-functions
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Mocking Modules', () => {
  test('should fetch users', () => {
    const users = [{ name: 'Bob' }];
    const resp = { data: users };
    mockedAxios.get.mockResolvedValue(resp);

    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))

    return Users.all().then((data) => expect(data).toEqual(users));
  });
});
