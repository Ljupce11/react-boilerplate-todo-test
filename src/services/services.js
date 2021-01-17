const wait = async (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export const mockedApiCall = async (data) => {
  await wait(500);
  return 'OK';
}