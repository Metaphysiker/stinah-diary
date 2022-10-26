const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSubscriptionSchema = new Schema({
  endpoint: {
    type: String,
    required: true
  },
  auth: {
      type: String,
      required: true
    },
  p256dh: {
      type: String,
      required: true
    }
},
{
  timestamps: true
}
);

const NotificationSubscriptionModel = mongoose.model('notification_subscription', NotificationSubscriptionSchema);

module.exports = NotificationSubscriptionModel;
