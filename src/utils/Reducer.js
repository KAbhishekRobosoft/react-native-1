const initialLoginState = {
  isLoading: true,
  userToken: null,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
  }
};

const initialDataState = {
  isLoading: true,
  userName:null,
  userEmail:null,
  userToken:null,
  userAge:null
};

const dataReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_DATA':
      return {
        ...prevState,
        userName:action.name,
        userEmail:action.email,
        userAge:action.age,
        userToken:action.token,
        isLoading: false,
      };
  }
};


export {
  initialLoginState,
  loginReducer,
  initialDataState,
  dataReducer
};
