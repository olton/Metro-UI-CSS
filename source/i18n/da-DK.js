/* global Metro */
(function(Metro, $) {
    $.extend(Metro['locales'], {
        'da-DK': {
            "calendar": {
                "months": [
                    "Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December",
                    "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
                ],
                "days": [
                    "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag",
                    "Sø", "Ma", "Ti", "On", "To", "Fr", "Lø",
                    "Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
                ],
                "time": {
                    "days": "DAGE",
                    "hours": "TIMER",
                    "minutes": "MIN",
                    "seconds": "SEK",
                    "month": "MON",
                    "day": "DAG",
                    "year": "ÅR"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Annuller",
                "done": "Færdig",
                "today": "Idag",
                "now": "Nu",
                "clear": "Ryd",
                "help": "Hjælp",
                "yes": "Ja",
                "no": "Nej",
                "random": "Tilfældig",
                "save": "Gem",
                "reset": "Nulstil"
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