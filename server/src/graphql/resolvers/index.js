import { messages } from './query';
import { sendMessage } from './mutation';
import { messageSent } from './subscription';

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
