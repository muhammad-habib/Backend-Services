import amqp from "amqplib/callback_api";
import {getNotification} from "./message";

export class Consumer {
    that = this;
    connect() {
        // const that = this;
        amqp.connect('amqp://rabbitmq', function (error, connection) {
            if (error) {
                throw error;
            }
            connection.createChannel(function (error, channel) {
                if (error) {
                    throw error;
                }
                const queue = 'notifications_queue';

                channel.assertQueue(queue, {
                    durable: false
                });

                console.log("Waiting for messages in %s", queue);
                channel.consume(queue, function (msg) {
                    if (msg) {
                        const message = JSON.parse(msg.content.toString());
                        getNotification(message);
                    }
                }, {
                    noAck: true
                });

            });
        });
    }
}

