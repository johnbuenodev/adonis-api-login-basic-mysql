'use strict'

const User = use('App/Models/User')

class UserController {
   async login({request, response, auth}){
     const { email , password } = request.only(['email','password']) 

     const uid = email;
     try {
      const token = await auth.attempt(uid, password);
      return response.json(token);
      //return response.json({message:"autenticado com sucesso!"});
     } catch (error) {
      return response.send({message: "Error" + error}); 
     }
   }
  
   async register({request, response}){
     const {first_name, last_name, email, password} = request.only([
       'first_name','last_name',
       'email','password' 
    ])

    await User.create({
      first_name,
      last_name,
      email,
      password
    })

    return response.send({message: "Usuario cadastrado!!"})    
   }

   async show({params, response}){
    const user = await User.find(params.id)
    const res = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password

    }
    return response.json(res)
   }
}

module.exports = UserController
