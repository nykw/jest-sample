import { fetchData, fetchDataPromise, fetchDataRejectPromise } from './main';

test('the data is peanut butter', (done) => {
  function callback(data: unknown) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

test('the data is peanut butter', () => {
  return fetchDataPromise().then((data) => {
    expect(data).toBe('peanut butter');
  });
});

test('the data is peanut butter', () => {
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchDataRejectPromise().catch((e) => expect(e.message).toMatch('error'));
});

test('the data is peanut butter', () => {
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

// test('the fetch fails with an error', () => {
//   return expect(fetchDataRejectPromise()).rejects.toMatch('error');
// });

test('the data is peanut butter', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchDataRejectPromise();
  } catch (e) {
    expect(e.message).toMatch('error');
  }
});
