
const initialLoginState= {
    isLoading:true,
    userName:null,
    userToken:null,
  }

  const loginReducer= (prevState,action)=>{
    switch(action.type){
      case 'RETRIEVE_TOKEN':
          return {
            ...prevState,
            userToken:action.token,
            isLoading:false
          }
      case 'LOGIN':
          return {
            ...prevState,
            userName:action.id,
            userToken:action.token,
            isLoading:false
          }
      case 'LOGOUT':
        return {
          ...prevState,
          userName:null,
          userToken:null,
          isLoading:false
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName:action.id,
          userToken:action.token,
          isLoading:false
        }
    }
  }

  const initialDataState= {
    isLoading:true,
    userData:null,
  }

  const dataReducer= (prevState,action)=>{
    switch(action.type){
      case 'RETRIEVE_DATA':
          return {
            ...prevState,
            userData:action.data,
            isLoading:false
          }
    }
  }


const initialState ={
  accData:[],
  isLoading:true
};

const  adminReducer= (state, action) =>{
  console.log(state)
  switch (action.type) {
    case 'DATA':
      return {
        isLoading:false,
        accData:[...state.accData,action.data]
      }
  }
}

  export{initialLoginState,loginReducer,initialDataState,dataReducer,initialState,adminReducer}