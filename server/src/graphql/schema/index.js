import { gql } from 'apollo-server-express';

export const schema = gql`
type Subscription {
  messageSent: Message
}

type Query {
  users: User
  messages: Message
  chatrooms: Chatroom
}

type Mutation {
  createUser: User
  connectUsers: Chatroom
  sendMessage: Message
}

type User {
  id: String!
}

type Message {
  text: String!
}

type Chatroom {
  id: String!
  userIds: [String]!
  messages: [Message]!
}
`;
