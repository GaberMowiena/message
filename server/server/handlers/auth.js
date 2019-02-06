const createUser = async (profile, db) => {
  try {
    const { name, email, id, location } = profile;

    db.transaction(trx => {
      trx
        .insert({
          name,
          email,
          id,
          city: location
        })
        .into('github-users')
        .returning('*')
        .then(user => {
          return user[0];
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser
};
