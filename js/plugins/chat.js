var Chat = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.input = null;
        this.classes = "primary secondary success alert warning yellow info dark light".split(" ");

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        title: null,
        width: "100%",
        height: "auto",
        randomColor: false,
        messageLeftColor: "default",
        messageRightColor: "default",
        messages: null,
        sendButtonTitle: "Send",
        clsSendButton: "",
        onMessage: Metro.noop,
        onSendButtonClick: Metro.noop,
        onSendMessage: Metro.noop,
        onReceiveMessage: Metro.noop,
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
                cls: o.clsSendButton,
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
                var msg = this, index;
                var message, sender, time, item, avatar, text;

                message = $("<div>").addClass("message").addClass(msg.position).appendTo(messages);
                sender = $("<div>").addClass("message-sender").html(msg.name).appendTo(message);
                time = $("<div>").addClass("message-time").html(msg.time).appendTo(message);
                item = $("<div>").addClass("message-item").appendTo(message);
                avatar = $("<img>").attr("src", msg.avatar).addClass("message-avatar").appendTo(item);
                text = $("<div>").addClass("message-text").html(msg.text).appendTo(item);

                if (o.randomColor === true) {
                    index = Utils.random(0, that.classes.length - 1);
                    text.addClass(that.classes[index]);
                } else {
                    if (msg.position === 'left' && Utils.isValue(o.messageLeftColor)) {
                        text.addClass(o.messageLeftColor);
                    }
                    if (msg.position === 'right' && Utils.isValue(o.messageRightColor)) {
                        text.addClass(o.messageRightColor);
                    }
                }

            });
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){}
};

Metro.plugin('chat', Chat);