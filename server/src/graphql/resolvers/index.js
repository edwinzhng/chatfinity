import { PubSub } from 'graphql-subscriptions';

import { messages } from './query';
import { sendMessage } from './mutation';
import { messageSent } from './subscription';

export const pubsub = new PubSub();

export const resolvers = {
  Query: {
    messages
  },
  Mutation: {
    sendMessage
  },
  Subscription: {
    messageSent
  }
};
