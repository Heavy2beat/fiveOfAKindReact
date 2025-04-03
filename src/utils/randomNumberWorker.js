self.onmessage = function () {
  try {
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    self.postMessage(randomNumber);
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
