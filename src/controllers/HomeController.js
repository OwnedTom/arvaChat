import {Controller}                 from 'arva-js/core/Controller.js';
import {HomeView}                   from '../views/HomeView.js';
import {Messages, Message}          from '../models/Message.js';
import {UserSurface}                from '../components/userSurface.js';
import {Users, User}                from '../models/User.js';
import {Injection}                  from 'arva-js/utils/Injection.js';

export class HomeController extends Controller {
    Index(){
        let messages = Injection.get(Messages, {});
        this.users = Injection.get(Users, {});
        if(localStorage.arvaChat_userId) {
            this.user = Injection.get(User, localStorage.arvaChat_userId);

        }
        else {
            this.user = Injection.get(User, {
                username: "Guest"
            });
        }
        let that = this;
        var sendMessage = function(message) {
            messages.add({
                message: message,
                author: that.homeView.options.user.username,
                authorId: that.homeView.options.user.id,
                timestamp: new Date().toUTCString()
            });
            that.homeView.messageBar.newMessage.setValue('');
            that.homeView.messageBar.sendButton.setProperties({
                cursor: 'default', 
                color: 'lightgray'
            });
        }
        var changeNickname = function(nickname) {
            that.user.username = nickname;
            that.homeView.topBar.hideRenderable('changeNick');
            //that.homeView = new HomeView({user: that.user});
        }
        if(!this.homeView) {
            this.homeView = new HomeView({user: this.user});
            this.user.on('value', function(user) {
                if(user.username === undefined) {
                    user.username = "Guest";
                    localStorage.setItem('arvaChat_userId', user.id);
                } else {
                    localStorage.setItem('arvaChat_userId', user.id);
                    that.homeView.topBar.nickButton.setContent(user.username);
                }
                if(user.lastActive === undefined || new Date().getTime() - new Date(user.lastActive).getTime() > 300000) {
                    user.lastActive = new Date().toUTCString();
                }
            });
            setInterval(() => {
                that.user.lastActive = new Date().toUTCString();
            }, 300000);
            this.users.on('child_changed', function(user) {
                console.debug(that.users);
            })
            // Scroll to new message
            messages.on('child_added', (message) => {
                this.homeView.chat.dbScrollView.goToLastPage();
            });

            var messageBar = this.homeView.messageBar

            // Submit message on enter
            messageBar.newMessage.on('keyup', (e) => {
                if(messageBar.newMessage.getValue().length > 0) {
                    messageBar.sendButton.setProperties({
                        cursor: 'pointer', 
                        color: 'teal'
                    });
                    if(e && e.keyCode == 13) {
                       sendMessage(messageBar.newMessage.getValue());
                    }
                } else {
                    messageBar.sendButton.setProperties({
                        cursor: 'default', 
                        color: 'lightgray'
                    })
                }
            })

            // Submit message on click
           messageBar.sendButton.on('click', (e) => {
                if(messageBar.newMessage.getValue().length > 0) {
                    sendMessage(messageBar.newMessage.getValue());
                }
            })

            var changeNick = this.homeView.topBar.changeNick;

            // Change nickname on enter
            changeNick.newNick.on('keyup', (e) => {
                if(changeNick.newNick.getValue().length > 0) {
                    changeNick.changeNickButton.setProperties({
                        cursor: 'pointer',
                        color: 'teal'
                    });
                    if(e.keyCode == 13) {
                        changeNickname(changeNick.newNick.getValue());
                    }
                } else {
                    changeNick.changeNickButton.setProperties({
                        cursor: 'default',
                        color: 'lightgray'
                    });
                }
            })

            // Change nickname on click
            changeNick.changeNickButton.on('click', (e) => {
                if(changeNick.newNick.getValue().length > 0) {
                    changeNickname(changeNick.newNick.getValue());
                }
            })

            var usersButton = this.homeView.topBar.usersButton;
            var usersArea = this.homeView.users;

            usersButton.on('click', (e) => {
                usersArea.showRenderable('background');
                usersArea.showRenderable('usersBar');
                usersArea.showRenderable('usersBarBackground');
            });

            usersArea.background.on('click', () => {
                usersArea.hideRenderable('background');
                usersArea.hideRenderable('usersBar');
                usersArea.hideRenderable('usersBarBackground');
            })
        }


        return this.homeView;
    }
}