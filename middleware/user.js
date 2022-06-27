const { User } = require('../models/user');
const { uid } = require('uid');

const addUser = async (req, res) => {
  try {
    // INITIAL CHECK ON req.body FOR PROPERTIES

    const user = new User({
      first_name: 'Ford',
      last_name: 'Prefect',
      email: 'vogonsandmice@gmail.com',
      id: uid(42),
    })
    user.save();
    res.send({ status: 200, message: user });
  } catch(error) {
    console.error('!!! ERROR ADDING USER !!!');
    console.error(error);
  }
}

module.exports = { addUser };