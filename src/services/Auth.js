const BASE_URL= 'https://api-nodejs-todolist.herokuapp.com/'

export const SignIn= (data)=>{
    const {email,password}= data
    return fetch(BASE_URL +'user/login',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'email':email.toLowerCase(),
            'password':password
        })
    })
    .then(data=>data.json())
    .then(res =>{
            const token= res.token.toString()
            const name= res.user.name.toString()
            return {'name':name,'token':token}
    } )
    .catch(er=>{console.log(er)
        alert('User Does\'t exist')
    })
}

export const Register= (name,email,password,age)=>{
    return fetch(BASE_URL +'user/register',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'name':name,
            'email':email,
            'password':password,
            'age':age
        })
    })
    .then(data=>data.json())
    .then(res =>{
            return res.token
    } )
    .catch(er=>console.log(er))
}
