import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import InputSurface                 from 'famous/surfaces/InputSurface.js';
import {DataBoundScrollView}        from 'arva-js/components/DataBoundScrollView.js';
import {CollectionLayout}           from 'famous-flex/layouts/CollectionLayout.js';
import {Message, Messages}          from '../models/Message.js';
import {MessageSurface}             from '../components/messageSurface.js';
import {View}                       from 'arva-js/core/View.js';
import {layout, event}              from 'arva-js/layout/decorators.js';

export class ChatView extends View {
    @layout.size(undefined, undefined)
    dbScrollView = new DataBoundScrollView({
        useContainer: true,
        chatScrolling: true,
        layout: CollectionLayout,
        properties: {
            paddingBottom: 5
        },
        layoutOptions: {
            spacing: 10
        },
        itemTemplate: (message) => new MessageSurface({
            message: message,
            user: this.options.user
        }),
        dataStore: new Messages()
    })

    @layout.fullSize()
    @event.pipe('dbScrollView')
    scrollSurface = new Surface()
    constructor(options = {}) {
        super(options);
        this.dbScrollView.goToLastPage();
    }
}