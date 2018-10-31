import { pubsub } from './index'

export const MESSAGE_SENT = 'MESSAGE_SENT';

export const messageSent = {
  subscribe: () => pubsub.asyncIterator([MESSAGE_SENT])
};
