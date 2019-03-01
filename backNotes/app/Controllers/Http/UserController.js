'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {

    async register({response, request}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        await user.save()
        await Database.table('profiles').insert({user_id:user.id})
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
        return response.json({message: 'Unable to login'})
        }
    }

    async showProfile({response, params}) {
    
        const user = await User.find(params.id)
        const profile = await user.profile().fetch()
        return response.json({"user":user,"profile":profile})
        
    }

    async updateProfile({response, params, request}) {
        const email = request.input("email")
        const phone = request.input("phone")
        const twitter = request.input("twitter")
        const facebook = request.input("facebook")

        const user = await User.find(params.id)
		if (!user) {
			return response.status(404).json({data: 'Resource not found'})
		}
        const profile = await user.profile().fetch()
        user.email = email
        profile.phone = phone
        profile.twitter = twitter
        profile.facebook = facebook

        await profile.save()

		return response.json({'user':user,'profile':profile})
    }
}
    
module.exports = UserController
