var Chat = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.input = null;
        this.classes = "primary secondary success alert warning yellow info dark light".split(" ");
        this.lastMessage = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        title: null,
        width: "100%",
        height: "auto",
        randomColor: false,
        clsMessageLeft: "default",
        clsMessageRight: "default",
        messages: null,
        sendButtonTitle: "Send",
        clsSendButton: "",
        onMessage: Metro.noop,
        onSendButtonClick: Metro.noop,
        onChatCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onChatCreate, [element]);
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

        element.addClass("chat");

        element.css({
            width: o.width,
            height: o.height
        });

        if (Utils.isValue(o.title)) {
            $("<div>").addClass("title").html(o.title).appendTo(element);
        }

        messages = $("<div>").addClass("messages").appendTo(element);
        messageInput = $("<div>").addClass("message-input").appendTo(element);
        input = $("<input type='text'>");
        input.appendTo(messageInput);
        input.input({
            customButtons: customButtons
        });

        if (Utils.isValue(o.messages) && typeof o.messages === "string") {
            o.messages = Utils.isObject(o.messages);
        }

        if (typeof o.messages === "object" && Utils.objectLength(o.messages) > 0) {
            $.each(o.messages, function(){
                that.add(this);
            });
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var sendButton = element.find(".js-chat-send-button");
        var input = element.find("input[type=text]");

        sendButton.on(Metro.events.click, function () {
            var msg = ""+input.val();
            if (msg.trim() === "") {return false;}
            Utils.exec(o.onSendButtonClick, [msg, $.proxy(that.add, that)], element[0]);
            input.val("");
        });
    },

    add: function(msg){
        var that = this, element = this.element, o = this.options;
        var index, message, sender, time, item, avatar, text;
        var messages = element.find(".messages");

        message = $("<div>").addClass("message").addClass(msg.position).appendTo(messages);
        sender = $("<div>").addClass("message-sender").html(msg.name).appendTo(message);
        time = $("<div>").addClass("message-time").html(msg.time).appendTo(message);
        item = $("<div>").addClass("message-item").appendTo(message);
        avatar = $("<img>").attr("src", msg.avatar).addClass("message-avatar").appendTo(item);
        text = $("<div>").addClass("message-text").html(msg.text).appendTo(item);

        if (Utils.isValue(msg.id)) {
            message.attr("id", msg.id);
        }

        if (o.randomColor === true) {
            index = Utils.random(0, that.classes.length - 1);
            text.addClass(that.classes[index]);
        } else {
            if (msg.position === 'left' && Utils.isValue(o.clsMessageLeft)) {
                text.addClass(o.clsMessageLeft);
            }
            if (msg.position === 'right' && Utils.isValue(o.clsMessageRight)) {
                text.addClass(o.clsMessageRight);
            }
        }

        Utils.exec(o.onMessage, [msg], message[0]);

        setImmediate(function(){
            element.fire("onmessage", {
                message: msg,
                element: message[0]
            });
        });

        messages.animate({
            scrollTop: messages[0].scrollHeight
        }, 1000);

        this.lastMessage = msg;

        return this;
    },

    addMessages: function(messages){
        var that = this, element = this.element, o = this.options;

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

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('chat', Chat);