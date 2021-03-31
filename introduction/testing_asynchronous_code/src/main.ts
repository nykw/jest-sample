const fetchData = (callback: (...x: unknown[]) => void) => {
  setTimeout(() => {
    callback('peanut butter');
  }, 100);
};

const fetchDataPromise = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('peanut butter');
    }, 100);
  });

const fetchDataRejectPromise = async () => {
  throw new Error('error');
};

export { fetchData, fetchDataPromise, fetchDataRejectPromise };
