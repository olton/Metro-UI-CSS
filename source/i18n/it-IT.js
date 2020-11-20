/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'it-IT': {
            "calendar": {
                "months": [
                    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
                    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
                ],
                "days": [
                    "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato",
                    "Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa",
                    "Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
                ],
                "time": {
                    "days": "GIORNI",
                    "hours": "ORE",
                    "minutes": "MIN",
                    "seconds": "SEC",
                    "month": "MESE",
                    "day": "GIORNO",
                    "year": "ANNO"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Annulla",
                "done": "Fatto",
                "today": "Oggi",
                "now": "Adesso",
                "clear": "Cancella",
                "help": "Aiuto",
                "yes": "Sì",
                "no": "No",
                "random": "Random",
                "save": "Salvare",
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