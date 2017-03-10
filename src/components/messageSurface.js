import {combineOptions} from 'arva-js/utils/CombineOptions.js';
import Surface          from 'famous/core/Surface.js';
import {User}           from '../models/User.js';
import MessageSurfaceTemplate   from '../templates/message.hbs!';
import {Injection}              from 'arva-js/utils/Injection';

export class MessageSurface extends Surface {
    constructor(options) {
        options.message.className = "message--other";
        options.message.sDate = "";
        options.message.sTime = "";
        if(options.user.id && options.user.id == options.message.authorId) {
            options.message.className = "message--own";
        }
        if(options.message.timestamp) {
            var date = new Date(options.message.timestamp);
            options.message.sDate = date.toLocaleDateString();
            options.message.sTime = date.toLocaleTimeString();
        }
        super(combineOptions({
            content: MessageSurfaceTemplate({
                message: options.message.message,
                oAuthor: {},
                timestamp: {
                    time: options.message.sTime,
                    date: options.message.sDate
                },
                className: options.message.className
            }),
            size: [undefined, true]
        }, options));
        this.options = options;
        this.oAuthor = Injection.get(User, options.message.authorId);
        var that = this;
        this.oAuthor.on('value', (user) => {
            this.setContent(MessageSurfaceTemplate({
                message: that.options.message.message,
                oAuthor: user,
                timestamp: {
                    time: that.options.message.sTime,
                    date: that.options.message.sDate
                },
                className:  options.message.className
            }))
        })
    }
}