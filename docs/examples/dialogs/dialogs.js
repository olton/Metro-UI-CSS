function timeoutDemo(){
    Metro.dialog.create({
        title: "Timeout demo",
        content: "<div>This dialog will be closed after 3 sec</div>",
        autoHide: 3000
    });
}

function customsDemo(){
    Metro.dialog.create({
        title: "Customs demo",
        content: "<div>This dialog with customs classes</div>",
        clsDialog: "bg-dark",
        clsTitle: "fg-yellow",
        clsContent: "fg-white",
        clsDefaultAction: "alert"
    });
}

function animateDemo(){
    Metro.dialog.create({
        title: "Animation demo",
        content: "<div>This dialog animated with onShow, onHide events</div>",
        onShow: function(){
            var el = $(this);
            el.addClass("ani-swoopInTop");
            setTimeout(function(){
                el.removeClass("ani-swoopInTop");
            }, 500);
        },
        onHide: function(){
            console.log("hide");
            var el = $(this);
            el.addClass("ani-swoopOutTop");
            setTimeout(function(){
                //el.removeClass("ani-swoopOutTop");
            }, 5000);
        }
    });
}

function actionsDemo(){
    Metro.dialog.create({
        title: "Dialog actions",
        content: "<div>This dialog with custom actions</div>",
        actions: [
            {
                caption: "Yes, i'am",
                cls: "js-dialog-close alert",
                onclick: function(){
                    alert("You choose YES");
                }
            },
            {
                caption: "No, thanks",
                cls: "js-dialog-close",
                onclick: function(){
                    alert("You choose NO");
                }
            }
        ]
    });
}
