import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import InputSurface                 from 'famous/surfaces/InputSurface.js';
import {CollectionLayout}           from 'famous-flex/layouts/CollectionLayout.js';
import {DataBoundScrollView}        from 'arva-js/components/DataBoundScrollView.js';
import {View}                       from 'arva-js/core/View.js';
import {Users}                      from '../models/User.js';
import {UserSurface}                from '../components/userSurface.js';
import {layout, event}              from 'arva-js/layout/decorators.js';

export class UsersView extends View {
    @layout.fullSize()
    @layout.translate(0, 0, 10)
    @layout.animate({
        animation: AnimationController.Animation.Fade,
        showInitially: false,
        transition: {
            duration: 500
        }
    })
    background = new Surface({
        properties: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    })

    @layout.size(300, undefined)
    @layout.translate(0, 0, 11)
    @layout.animate({
        show: {
            animation: AnimationController.Animation.Slide.Right
        },
        hide: {
            animation: AnimationController.Animation.Slide.Left
        },
        showInitially: false,
        waitFor: 'background',
        transition: {
            duration: 500
        }
    })
    usersBarBackground = new Surface({
        properties: {
            backgroundColor: '#6d6c6c'
        }
    })

    @layout.dock.left()
    @layout.size(300, undefined)
    @layout.translate(0, 0, 12)
    @layout.animate({
        show: {
            animation: AnimationController.Animation.Slide.Right
        },
        hide: {
            animation: AnimationController.Animation.Slide.Left
        },
        showInitially: false,
        waitFor: 'background',
        transition: {
            duration: 500
        }
    })
    usersBar = new DataBoundScrollView({
        useContainer: true,
        layout: CollectionLayout,
        layoutOptions: {
            margins: 10
        },
        options: {
            currentUser: this.options.user
        },
        dataFilter: (user) => {
            return !(user.username == this.options.user.username)
        },
        itemTemplate: (user) => new UserSurface({
            user: user,
            currentUser: this.options.user
        }),
        dataStore: new Users()
    })
    constructor(options) {
        super(options);
    }
}