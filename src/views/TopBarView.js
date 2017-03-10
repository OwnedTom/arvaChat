import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import InputSurface                 from 'famous/surfaces/InputSurface.js';
import {View}                       from 'arva-js/core/View.js';
import {layout, event}              from 'arva-js/layout/decorators.js';
import {ChangeNickView}             from './ChangeNickView.js';
import {User}                       from '../models/User.js';
import {Injection}                  from 'arva-js/utils/Injection.js';
export class TopBarView extends View {
    @layout.fullSize()
    @layout.translate(0, 0, 1)
    background = new Surface({
        properties: {
            backgroundColor: 'teal'
        }
    })

    @layout.dock.fill()
    @layout.translate(0, 0, 2)
    titleBar = new Surface({
        content: 'Arva ChatApp',
        properties: {
            textAlign: 'center',
            lineHeight: '37px',
            color: 'white'
        }
    });

    @layout.dock.left()
    @layout.size(50, 32)
    @layout.translate(0, 0, 3)
    @layout.origin(0, 0.5)
    @layout.align(0, 0.5)
    usersButton = new Surface({
        content: '&#xe972;',
        properties: {
           cursor: 'pointer',
           fontFamily: 'icons',
           fontSize: '32px',
           color: 'white',
           textAlign: 'center'
        }
    })

    @layout.dock.right()
    @layout.size(true, 35)
    @layout.origin(1, 0.5)
    @layout.align(1, 0.5)
    @layout.translate(-10, 0, 2)
    @event.on('click', function() {
        if(this.renderables.changeNick._showingRenderable) {
            this.hideRenderable('changeNick');
        } else {
            this.showRenderable('changeNick').then(() => {
                this.changeNick.newNick.focus();
            });
        }
    })
    nickButton = new Surface({
        content: this.options.currentUser.username,
        classes: ['nickButton']
    })
    // Create Change Nickname area
    @layout.size(300, 50)
    @layout.origin(1, 0)
    @layout.align(1, 0)
    @layout.translate(0, 44, -10)
    @layout.animate({
        show: {
            animation: AnimationController.Animation.Slide.Down
        },
        hide: {
            animation: AnimationController.Animation.Slide.Up
        },
        showInitially: false,
        transition: {
            duration: 500
        }
    })
    changeNick = new ChangeNickView(this.options);

    constructor(options = {}) {
        options.currentUser = Injection.get(User, localStorage.arvaChat_userId)
        super(options);
    }
}