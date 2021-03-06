const webPush = require('web-push');
const PushRepository = require('../repositories/PushRepository');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

class PushService {
  init() {
    webPush.setVapidDetails(
      'mailto:nearlyapplication@gmail.com',
      publicVapidKey,
      privateVapidKey
    )
  }

  async notifyUsers(name, eventId, hostId) {
    try {
      const payload = JSON.stringify({title: 'New Nearly Event', body: name, data: eventId});
      const subscriptions = await PushRepository.getSubscriptionsOfInterestedUsers(eventId, hostId);

      subscriptions.forEach(async subscription => {
        try {
          await webPush.sendNotification(subscription, payload);
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error('Failed to send push notificaiton: ' + err.message)
    }
  }
}

module.exports = new PushService();