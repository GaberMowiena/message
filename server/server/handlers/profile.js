const axios = require('axios');

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

const handleMeetupGet = async (req, res) => {
  const meetup = await axios.get(
    `https://api.meetup.com/Build-with-Code-New-York/events/258368054`
  );

  const result = {};
  result.name = meetup.data.name;
  result.location = meetup.data.venue.name;
  result.status = meetup.data.status;
  result.date = meetup.data.local_data;
  result.rsvp = meetup.data.yes_rsvp_count;

  res.json(result);
};
module.exports = { handleProfileGet, handleMeetupGet };
