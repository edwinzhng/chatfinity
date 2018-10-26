import { pubsub } from './pubsub'
import { MESSAGE_SENT } from './subscription';

export const sendMessage = (root, args, ctx) => {
  pubsub.publish(MESSAGE_SENT, { messageSent: args });
  return {
    text: 'Message sent!',
  };
};