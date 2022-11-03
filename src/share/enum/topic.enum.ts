/**
 * Enum of topics for kafka system
 * @returns topics enum
 */
export enum Topic {
  USER_CONNECTED = 'KAFKA_TOPIC_USER_CONNECTED',
  USER_DISCONNECTED_ROUTED = 'KAFKA_TOPIC_USER_DISCONNECTED_ROUTED',
  MESSAGE_ACTIVITY = 'KAFKA_TOPIC_MESSAGE_ACTIVITY',
  WRITING_MESSAGE_ROUTED = 'KAFKA_TOPIC_WRITING_MESSAGE_ROUTED',
}