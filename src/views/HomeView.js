import Surface                      from 'famous/core/Surface.js';
import AnimationController          from 'famous-flex/AnimationController.js';
import LayoutController             from 'famous-flex/LayoutController.js';
import {View}                       from 'arva-js/core/View.js';
import {layout, event}              from 'arva-js/layout/decorators.js';
import {TopBarView}                 from './TopBarView.js'; 
import {MessageBarView}             from './MessageBarView.js';
import {ChatView}                   from './ChatView.js';
import {UsersView}                  from './UsersView.js';

export class HomeView extends View {
    // Create Title Bar
    @layout.dock.top(44)
    @layout.animate({
        animation: AnimationController.Animation.Slide.Down,
        transition: {
            duration: 500
        }
    })
    topBar = new TopBarView(this.options);

    // Create Users area
    @layout.fullSize()
    users =  new UsersView(this.options);

    // Message area
    @layout.dock.fill()
    @layout.translate(0, 0, -1)
    chat = new ChatView(this.options);
   
    // Create Background
    @layout.translate(0, 0, -10)
    @layout.fullSize()
    background = new Surface({
        properties: {
            backgroundColor: '#fff'
        }
    })

   // Message Input Box
   @layout.dock.bottom(50)
   @layout.animate({
        animation: AnimationController.Animation.Slide.Up,
        transition: {
            duration: 500
        }
    })
   messageBar = new MessageBarView(this.options);

    constructor(options) {
        super(options);
    }
}