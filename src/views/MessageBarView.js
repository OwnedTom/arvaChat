import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import InputSurface                 from 'famous/surfaces/InputSurface.js';
import {View}                       from 'arva-js/core/View.js';
import {layout, event}              from 'arva-js/layout/decorators.js';

export class MessageBarView extends View {
    @layout.fullSize()
    background = new Surface({
        properties: {
            backgroundColor: '#fff',
            outline: '1px solid #2e2e2e'
        }
    })
    // Send Button
    @layout.dock.right()
    @layout.size(50,50)
    sendButton = new Surface({
        content: '&#xe900;',
        properties: {
           cursor: 'default',
           fontFamily: 'icons',
           fontSize: '40px',
           lineHeight: '45px',
           color: 'lightgray'
        }
    })

    // Message Input Box
    @layout.dock.fill()
    newMessage = new InputSurface({
       placeholder: 'Write a message...',
       properties: {
           border: 'none'
       }
    })
    constructor(options = {}) {
        super(options);
    }
}