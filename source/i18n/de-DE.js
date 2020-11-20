/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'de-DE': {
            "calendar": {
                "months": [
                    "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
                ],
                "days": [
                    "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                    "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa",
                    "Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"
                ],
                "time": {
                    "days": "TAGE",
                    "hours": "STD",
                    "minutes": "MIN",
                    "seconds": "SEK"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Abbrechen",
                "done": "Fertig",
                "today": "Heute",
                "now": "Jetzt",
                "clear": "Löschen",
                "help": "Hilfe",
                "yes": "Ja",
                "no": "Nein",
                "random": "Zufällig",
                "save": "Speichern",
                "reset": "Zurücksetzen"
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