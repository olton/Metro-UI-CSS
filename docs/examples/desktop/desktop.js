var Desktop = {
    options: {
        windowArea: ".window-area",
        windowAreaClass: "",
        taskBar: ".task-bar > .tasks",
        taskBarClass: ""
    },

    wins: {},

    setup: function(options){
        this.options = $.extend( {}, this.options, options );
        return this;
    },

    addToTaskBar: function(wnd){
        var icon = wnd.getIcon();
        var wID = wnd.win.attr("id");
        var item = $("<span>").addClass("task-bar-item started").html(icon);

        item.data("wID", wID);

        item.appendTo($(this.options.taskBar));
    },

    removeFromTaskBar: function(wnd){
        var wID = wnd.attr("id");
        var items = $(".task-bar-item");
        var that = this;
        $.each(items, function(){
            var item = $(this);
            if (item.data("wID") === wID) {
                delete that.wins[wID];
                item.remove();
            }
        })
    },

    createWindow: function(o){
        o.onDragStart = function(){
            win = $(this);
            $(".window").css("z-index", 1);

            if (!win.hasClass("modal")) {
                win.css("z-index", 3);
            }
        };
        o.onDragStop = function(){
            win = $(this);
            if (!win.hasClass("modal"))
                win.css("z-index", 2);
        };
        o.onWindowDestroy = function(win){
            Desktop.removeFromTaskBar($(win));
        };

        var w = $("<div>").appendTo($(this.options.windowArea));
        var wnd = w.window(o).data("window");

        var win = wnd.win;
        var shift = Metro.utils.objectLength(this.wins) * 16;

        if (wnd.options.place === "auto" && wnd.options.top === "auto" && wnd.options.left === "auto") {
            win.css({
                top: shift,
                left: shift
            });
        }
        this.wins[win.attr("id")] = wnd;
        this.addToTaskBar(wnd);

        return wnd;
    }
};

Desktop.setup();

var w_icons = [
    'rocket', 'apps', 'cog', 'anchor'
];
var w_titles = [
    'rocket', 'apps', 'cog', 'anchor'
];

function createWindow(){
    var index = Metro.utils.random(0, 3);
    var w = Desktop.createWindow({
        resizeable: true,
        draggable: true,
        width: 300,
        icon: "<span class='mif-"+w_icons[index]+"'></span>",
        title: w_titles[index],
        content: "<div class='p-2'>This is desktop demo created with Metro 4 Components Library</div>"
    });

    setTimeout(function(){
        w.setContent("New window content");
    }, 3000);
}

function createWindowWithCustomButtons(){
    var index = Metro.utils.random(0, 3);
    var customButtons = [
        {
            html: "<span class='mif-rocket'></span>",
            cls: "sys-button",
            onclick: "alert('You press rocket button')"
        },
        {
            html: "<span class='mif-user'></span>",
            cls: "alert",
            onclick: "alert('You press user button')"
        },
        {
            html: "<span class='mif-cog'></span>",
            cls: "warning",
            onclick: "alert('You press cog button')"
        }
    ];
    Desktop.createWindow({
        resizeable: true,
        draggable: true,
        customButtons: customButtons,
        width: 360,
        icon: "<span class='mif-"+w_icons[index]+"'></span>",
        title: w_titles[index],
        content: "<div class='p-2'>This is desktop demo created with Metro 4 Components Library.<br><br>This window has a custom buttons in caption.</div>"
    });
}

function createWindowModal(){
    Desktop.createWindow({
        resizeable: false,
        draggable: true,
        width: 300,
        icon: "<span class='mif-cogs'></span>",
        title: "Modal window",
        content: "<div class='p-2'>This is desktop demo created with Metro 4 Components Library</div>",
        overlay: true,
        //overlayColor: "transparent",
        modal: true,
        place: "center",
        onShow: function(win){
            var win = $(win);
            win.addClass("ani-swoopInTop");
            setTimeout(function(){
                $(win).removeClass("ani-swoopInTop");
            }, 1000);
        },
        onClose: function(win){
            var win = $(win);
            win.addClass("ani-swoopOutTop");
        }
    });
}

function createWindowYoutube(){
    Desktop.createWindow({
        resizeable: true,
        draggable: true,
        width: 500,
        icon: "<span class='mif-youtube'></span>",
        title: "Youtube video",
        content: "https://youtu.be/ZlhUJ6QkvL8",
        clsContent: "bg-dark"
    });
}

function openCharm() {
    var charm = $("#charm").data("charms");
    charm.toggle();
}

$(".window-area").on("click", function(){
    Metro.charms.close("#charm");
});

$(".charm-tile").on("click", function(){
    $(this).toggleClass("active");
});