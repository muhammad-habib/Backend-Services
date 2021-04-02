import {ProviderInterface} from "./provider.interface";
import {NotificationDoc} from "../../models/notificationDoc";

const throttledQueue = require('throttled-queue');


export class EmailProvider implements ProviderInterface {
    messageCount = 1;  //request per time
    intervalTime = 3 * 1000;   //minute;

    send(notification: NotificationDoc): void {
        const throttle = throttledQueue(this.messageCount, this.intervalTime);
        const that = this;
        for (let receiver of notification.receivers) {
            throttle(function () {
                notification.receivers = [receiver];
                that.handelMessage(notification);
            });
        }
    }

    private handelMessage(notification: NotificationDoc) {
        /* Provider Implementation will be here
        * we just log for clarification
        */

        console.log("Email ================>", notification)
    }
}
