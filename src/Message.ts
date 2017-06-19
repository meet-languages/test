export class Message {
  from: number;
  to: number;
  messages: [{
    name: string,
    when: Date,
    content: string,
    read: boolean
  }]
}
  