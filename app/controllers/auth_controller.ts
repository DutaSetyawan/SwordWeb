import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'

export default class AuthController {
  // Fungsi untuk menampilkan halaman registrasi
  async showRegister({ view }: HttpContext) {
    return view.render('pages/register')
  }

  // Fungsi untuk memproses data dari form registrasi
  async storeRegister({ request, response, auth }: HttpContext) {
    const { fullName, email, password, role } = request.all()
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    })
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  // Fungsi untuk menampilkan halaman login
  async showLogin({ view }: HttpContext) {
    return view.render('pages/login')
  }

  // Fungsi untuk memproses data dari form login
  async storeLogin({ request, response, auth, session }: HttpContext) {
    // ---> PASTIKAN CONSOLE.LOG ADA DI SINI <---
    console.log('APP_KEY terbaca:', env.get('APP_KEY'))

    const { email, password } = request.all()

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      return response.redirect('/')
    } catch (error) {
      session.flash({ error: 'Email atau password salah.' })
      return response.redirect('back')
    }
  }

  // Fungsi untuk logout
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}