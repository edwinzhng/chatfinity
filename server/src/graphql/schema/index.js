import { gql } from 'apollo-server-express';

export const schema = gql`
type Subscription {
  messageSent: Message
}

type Query {
  messages: Message
}

type Mutation {
  sendMessage: Message
}

type Message {
  text: String!
}
`;
