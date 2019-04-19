const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/sigin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('user no')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      console.log('contrasenha incorrecta')
      return res.redirect('/')
    }

    req.session.user = user
    return res.redirect('app/dashboard')
  }
}

module.exports = new SessionController()
