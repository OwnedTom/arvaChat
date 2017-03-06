import {combineOptions} from 'arva-js/utils/CombineOptions.js';
import Surface          from 'famous/core/Surface.js';
import {User}           from '../models/User.js';
import UserSurfaceTemplate   from '../templates/user.hbs!';

export class UserSurface extends Surface {
    constructor(options) {
        var lastOnline = new Date(options.user.lastActive);
        options.user.onlineStatus = "offline";
        options.user.online = false;
        var lastOnlineTime = lastOnline.getTime();
        var now = new Date();
        var nowTime = now.getTime();
        if(nowTime - lastOnlineTime <= 300000) {
            options.user.onlineStatus = "online";
            options.user.online = true;
        }
        options.user.lastSeen = "";
        if(options.user.onlineStatus == "offline") {
            var dateLastSeen = lastOnline.toDateString();
            var dateNow = now.toDateString();
            if(dateLastSeen == dateNow) {
                options.user.lastSeen = " at " + lastOnline.toLocaleTimeString();
            } else {
                options.user.lastSeen = " on " + lastOnline.toLocaleDateString();
            }
        }
        super(combineOptions({
            content: UserSurfaceTemplate({
                user: options.user
            }),
            size: [undefined, 50]
        }, options))
        this.options = options;
        var that = this;
        options.user.on('value', (user) => {
            that.setContent(UserSurfaceTemplate({
                user: that.options.user
            }))
        })
        setInterval(() => {
            that.setContent(UserSurfaceTemplate({
                user: that.options.user
            }))
        }, 300000);
    }
}