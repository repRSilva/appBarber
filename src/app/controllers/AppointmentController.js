const { User, Appointment } = require('../models');

class AppointmentController {

  async create(req, res) {

    const provider = await User.findByPK(req.params.provider);

    return res.render('appointments/create', { provider });
  }

  async store(req, res) {
    const { id } = req.session.user;
    const { provider } = req.params;
    const { date } = req.body;

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date: date,
    })

    return res.redirect('/app/dashboard');

  }

}

module.exports = new AppointmentController();
