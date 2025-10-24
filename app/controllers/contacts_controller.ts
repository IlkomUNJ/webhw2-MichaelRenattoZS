// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  public async show({ view }: HttpContext) {
    return view.render('contact')
  }

  public async send({ request, response }: HttpContext) {
    const name = request.input('name')
    const message = request.input('message')

    console.log(`Pesan baru dari ${name}: ${message}`)

    return response.redirect('/contact')
  }
}
