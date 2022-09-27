const BASE_URL= 'https://api-nodejs-todolist.herokuapp.com/'

export const signIn= (data)=>{
    const {email,password}= data
    return fetch(BASE_URL +'user/login',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'email':email,
            'password':password
        })
    })
    .then(data=>data.json())
    .then(res =>{
        console.log(res)
        return res
    } )
    .catch(er=>console.log(er))
}