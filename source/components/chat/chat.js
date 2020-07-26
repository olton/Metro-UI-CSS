/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var defaultAvatar = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAUABQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+t+KKPxo/GgA70Yo/Gj8aADFH4VesdC1HUl3WtjcXCf344yV/PGKW+0HUtNXddWNzbp/fkjIX88YoAofhR+FH40fjQAfhR+FH40fjQAUUUUAFepeAPh5D9li1LVYhK8g3Q27j5VXszDuT6f5HA+FtOXVvEWn2rjMcko3j1UckfkDX0MBgYHAoARVCKFUBVHAA6ClZQwKkZBGCDS0UAec+Pvh3BJay6lpUQimjBeW3QYVx3Kjsfbv/PyqvpuvnvxfpqaT4l1C1QbY0lJUDsrfMB+RoAyKKKKACiiigDa8GXq6f4p02eQgIJQpJ7Bvlz+tfQP4V8yDg17P4A8cw65ZxWV5IE1KMbfmP+uA7j39R+NAHaUfhSUUAL+FeA+OL1NQ8WalNGQU83YCO+0Bf6V6b498cQ6BZyWlrIJNSkXaApz5QP8AEff0FeKk5OTyTQAUUUUAH40fjRU1naTX93DbQIXmlYIijuTQBc0Dw/eeI74W1mm49XkbhUHqTXsHhz4eaXoCpI8YvbscmaYZAP8Asr0H8/etHwv4cg8M6XHaxANIfmllxy7dz9PStigA/Gk/GlooA5bxJ8PdL19XkWMWd43PnwjGT/tL0P8AP3rx/X/D954cvjbXibT1SReVceoNfRFZHijw5B4m0uS1lAWQfNFLjlG7H6etAHz5+NH41NeWk1hdzW06FJonKMp7EGoaACvQfhBowudTudRkXK2y7I8j+Nup/Afzrz6vafhRaCDwmkgHM8zufwO3/wBloA7Kiij8KACkpaSgBaSj8KKAPJvi/owttTttRjXC3K7JMf3l6H8R/KvPq9p+K1qJ/CbyEcwTI4P1O3/2avFqAP/Z";
    var ChatDefaultConfig = {
        chatDeferred: 0,
        inputTimeFormat: "%m-%d-%y",
        timeFormat: "%d %b %l:%M %p",
        name: "John Doe",
        avatar: defaultAvatar,
        welcome: null,
        title: null,
        width: "100%",
        height: "auto",
        randomColor: false,
        messages: null,
        sendButtonTitle: "Send",
        readonly: false,

        clsChat: "",
        clsName: "",
        clsTime: "",
        clsInput: "",
        clsSendButton: "",
        clsMessageLeft: "default",
        clsMessageRight: "default",

        onMessage: Metro.noop,
        onSend: Metro.noop,
        onSendButtonClick: Metro.noop,
        onChatCreate: Metro.noop
    };

    Metro.chatSetup = function (options) {
        ChatDefaultConfig = $.extend({}, ChatDefaultConfig, options);
    };

    if (typeof window["metroChatSetup"] !== undefined) {
        Metro.chatSetup(window["metroChatSetup"]);
    }

    Metro.Component('chat', {
        init: function( options, elem ) {
            this._super(elem, options, ChatDefaultConfig, {
                input: null,
                classes: "primary secondary success alert warning yellow info dark light".split(" "),
                lastMessage: null
            });

            return this;
        },

        _create: function(){
            var element = this.element;

            this._createStructure();
            this._createEvents();

            this._fireEvent("chat-create", {
                element: element
            });
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var messages, messageInput, input;
            var customButtons = [
                {
                    html: o.sendButtonTitle,
                    cls: o.clsSendButton+" js-chat-send-button",
                    onclick: o.onSendButtonClick
                }
            ];

            element.addClass("chat").addClass(o.clsChat);

            element.css({
                width: o.width,
                height: o.height
            });

            if (Utils.isValue(o.title)) {
                $("<div>").addClass("title").html(o.title).appendTo(element);
            }

            messages = $("<div>").addClass("messages");
            messages.appendTo(element);
            messageInput = $("<div>").addClass("message-input").appendTo(element);
            input = $("<input type='text'>");
            input.appendTo(messageInput);
            input.input({
                customButtons: customButtons,
                clsInput: o.clsInput
            });

            if (o.welcome) {
                this.add({
                    text: o.welcome,
                    time: (new Date()),
                    position: "left",
                    name: "Welcome",
                    avatar: defaultAvatar
                })
            }

            if (Utils.isValue(o.messages) && typeof o.messages === "string") {
                o.messages = Utils.isObject(o.messages);
            }

            if (!Utils.isNull(o.messages) && typeof o.messages === "object" && Utils.objectLength(o.messages) > 0) {
                $.each(o.messages, function(){
                    that.add(this);
                });
            }

            element.find(".message-input")[o.readonly ? 'addClass':'removeClass']("disabled");
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var sendButton = element.find(".js-chat-send-button");
            var input = element.find("input[type=text]");

            var send = function(){
                var msg = ""+input.val(), m;
                if (msg.trim() === "") {return false;}
                m = {
                    id: Utils.elementId("chat-message"),
                    name: o.name,
                    avatar: o.avatar,
                    text: msg,
                    position: "right",
                    time: (new Date())
                };
                that.add(m);
                input.val("");
                that._fireEvent("send", {
                    msg: m
                });
            };

            sendButton.on(Metro.events.click, function () {
                send();
            });

            input.on(Metro.events.keyup, function(e){
                if (e.keyCode === Metro.keyCode.ENTER) {
                    send();
                }
            })
        },

        add: function(msg){
            var that = this, element = this.element, o = this.options;
            var index, message, sender, time, item, avatar, text;
            var messages = element.find(".messages");
            var messageDate;

            messageDate = typeof msg.time === 'string' ? msg.time.toDate(o.inputTimeFormat) : msg.time;

            message = $("<div>").addClass("message").addClass(msg.position).appendTo(messages);
            sender = $("<div>").addClass("message-sender").addClass(o.clsName).html(msg.name).appendTo(message);
            time = $("<div>").addClass("message-time").addClass(o.clsTime).html(messageDate.format(o.timeFormat)).appendTo(message);
            item = $("<div>").addClass("message-item").appendTo(message);
            avatar = $("<img>").attr("src", msg.avatar).addClass("message-avatar").appendTo(item);
            text = $("<div>").addClass("message-text").html(msg.text).appendTo(item);

            if (Utils.isValue(msg.id)) {
                message.attr("id", msg.id);
            }

            if (o.randomColor === true) {
                index = $.random(0, that.classes.length - 1);
                text.addClass(that.classes[index]);
            } else {
                if (msg.position === 'left' && Utils.isValue(o.clsMessageLeft)) {
                    text.addClass(o.clsMessageLeft);
                }
                if (msg.position === 'right' && Utils.isValue(o.clsMessageRight)) {
                    text.addClass(o.clsMessageRight);
                }
            }

            that._fireEvent("message", {
                msg: msg,
                el: {
                    message: message,
                    sender: sender,
                    time: time,
                    item: item,
                    avatar: avatar,
                    text: text
                }
            });

            messages.animate({
                draw: {
                    scrollTop: messages[0].scrollHeight
                },
                dur: 1000
            });

            this.lastMessage = msg;

            return this;
        },

        addMessages: function(messages){
            var that = this;

            if (Utils.isValue(messages) && typeof messages === "string") {
                messages = Utils.isObject(messages);
            }

            if (typeof messages === "object" && Utils.objectLength(messages) > 0) {
                $.each(messages, function(){
                    that.add(this);
                });
            }

            return this;
        },

        delMessage: function(id){
            var element = this.element;

            element.find(".messages").find("#"+id).remove();

            return this;
        },

        updMessage: function(msg){
            var element = this.element;
            var message = element.find(".messages").find("#"+msg.id);

            if (message.length === 0) return this;

            message.find(".message-text").html(msg.text);
            message.find(".message-time").html(msg.time);

            return this;
        },

        clear: function(){
            var element = this.element;
            var messages = element.find(".messages");
            messages.html("");
            this.lastMessage = null;
        },

        toggleReadonly: function(readonly){
            var element = this.element, o = this.options;
            o.readonly = typeof readonly === "undefined" ? !o.readonly : readonly;
            element.find(".message-input")[o.readonly ? 'addClass':'removeClass']("disabled");
        },

        changeAttribute: function(attributeName){
            switch (attributeName) {
                case "data-readonly": this.toggleReadonly(); break;
            }
        },

        destroy: function(){
            var element = this.element;
            var sendButton = element.find(".js-chat-send-button");
            var input = element.find("input[type=text]");

            sendButton.off(Metro.events.click);
            input.off(Metro.events.keyup);

            return element;
        }
    });
}(Metro, m4q));