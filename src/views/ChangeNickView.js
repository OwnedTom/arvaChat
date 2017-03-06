import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import InputSurface                 from 'famous/surfaces/InputSurface.js';
import {View}                       from 'arva-js/core/View.js';
import {layout, event}              from 'arva-js/layout/decorators.js';

export class ChangeNickView extends View {
    @layout.fullSize()
    @layout.translate(0, 0, -1)
    background = new Surface({
        properties: {
            backgroundColor: '#fff',
            outline: '1px solid #2e2e2e'
        }
    })
    // Change Nickname Button
    @layout.dock.right()
    @layout.size(50,50)
    changeNickButton = new Surface({
        content: '&#xe900;',
        properties: {
           cursor: 'default',
           fontFamily: 'icons',
           fontSize: '40px',
           lineHeight: '45px',
           color: 'lightgray'
        }
    })

    // New nickname Input Box
    @layout.dock.fill()
    newNick = new InputSurface({
       placeholder: 'Enter new nickname...',
       properties: {
           border: 'none'
       }
    })
    constructor(options = {}) {
        super(options);
    }
}