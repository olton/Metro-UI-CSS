/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'en-US': {
            "calendar": {
                "months": [
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                "days": [
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                    "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa",
                    "Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"
                ],
                "time": {
                    "days": "DAYS",
                    "hours": "HOURS",
                    "minutes": "MINS",
                    "seconds": "SECS",
                    "month": "MON",
                    "day": "DAY",
                    "year": "YEAR"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Cancel",
                "done": "Done",
                "today": "Today",
                "now": "Now",
                "clear": "Clear",
                "help": "Help",
                "yes": "Yes",
                "no": "No",
                "random": "Random",
                "save": "Save",
                "reset": "Reset"
            },
            "table": {
                "rowsCount": "Show entries:",
                "search": "Search:",
                "info": "Showing $1 to $2 of $3 entries",
                "prev": "Prev",
                "next": "Next",
                "all": "All",
                "inspector": "Inspector",
                "skip": "Goto page",
                "empty": "Nothing to show"
            },
            "colorSelector": {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            }
        }
    });
}(Metro, m4q));