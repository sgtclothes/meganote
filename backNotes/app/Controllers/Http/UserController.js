'use strict'

const User = use('App/Models/User')

class UserController {

    async register({response, request}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        return response.json({"user": user})
    }

    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
        if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            return response.json({"user":user, "access_token": accessToken})
        }
    }
        catch (e) {
        return response.json({message: 'Incorrect email or password'})
        }
    }

}

module.exports = UserController
