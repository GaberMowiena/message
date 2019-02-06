import axios from 'axios';
const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Profile not found');
      }
    })
    .catch(err => res.status(400).json('Error getting profile'));
};

const handleMeetupGet = (req, res) => {
  axios
    .get(`https://api.meetup.com/Build-with-Code-New-York/events/258368054`)
    .then(data => res.json(data));
};
module.exports = { handleProfileGet, handleMeetupGet };
