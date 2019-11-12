const mongoose = require('mongoose');

const participationSchema = mongoose.Schema({
  userId: {type: String, required: true},
  eventId: {type: String, required: true}
});

module.exports = mongoose.model('Participation', participationSchema);