const BASE_URL = 'https://api-nodejs-todolist.herokuapp.com/';
const IMG_URL = 'https://randomuser.me/api/';

export const  checkCredentials= data => {
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
      return res.token;
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
      return res.token
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

export const editAge = (age,token) => {
 
  return fetch(BASE_URL + 'user/me', {
      method: 'PUT',
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({
        age:age
      })
  })
  .then(res=> res.json())
  .then(data => {
      return data
  })
  .catch(er => {
    console.log(er)
  })
};

export const getUser = (token) => {
 
  return fetch(BASE_URL + 'user/me', {
      method: 'GET',
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`, 
      }
})
  .then(res=> res.json())
  .then(data => {
      return data
  })
  .catch(er => {
    console.log(er)
  })
};