const BASE_URL = 'https://api-nodejs-todolist.herokuapp.com/';
const IMG_URL = 'https://randomuser.me/api/';

export const SignIn = data => {
  const {email, password} = data;
  return fetch(BASE_URL + 'user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.toLowerCase(),
      password: password,
    }),
  })
    .then(data => data.json())
    .then(res => {
      return res;
    })
    .catch(er => {
      console.log(er);
    });
};

export const Register = (name, email, password, age) => {
  return fetch(BASE_URL + 'user/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email.toLowerCase(),
      password: password,
      age: age,
    }),
  })
    .then(data => data.json())
    .then(res => {
      return res;
    })
    .catch(er => {
      console.log(er);
    });
};

export const getImage = () => {
  return fetch(IMG_URL)
    .then(data => data.json())
    .then(res => {
      return res;
    })
    .catch(er => {
      console.log(er);
    });
};