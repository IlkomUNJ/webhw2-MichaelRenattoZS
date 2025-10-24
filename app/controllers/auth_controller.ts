// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async register({ request, response, auth }: HttpContext) {
    const data = request.only(['username', 'email', 'password', 'role'])
    const user = await User.create(data)

    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // 🔹 AdonisJS v6 — pakai verifyCredentials()
      const user = await User.verifyCredentials(email, password)

      // 🔹 Lalu login manual
      await auth.use('web').login(user)

      return response.redirect('/')
    } catch {
      session.flash('error', 'Invalid credentials')
      return response.redirect('/login')
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}