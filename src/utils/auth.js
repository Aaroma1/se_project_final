export const authorize = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeToken = "fake-jwt-token";
      localStorage.setItem("jwt", fakeToken);
      resolve({ token: fakeToken });
    }, 500);
  });
};

export const checkToken = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake-jwt-token") {
        resolve({
          email: "test@example.com",
          name: "Test User",
        });
      } else {
        reject("Invalid token");
      }
    }, 500);
  });
};

export const register = async (email, password, name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email, name });
    }, 500);
  });
};
