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
                },
                "weekStart": 2
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
                "rowsCount": "Einträge anzeigen:",
                "search": "Suche:",
                "info": "Eintrag $1 bis $2 von $3",
                "prev": "Zurück",
                "next": "Nächste",
                "all": "Alle",
                "inspector": "Filter",
                "skip": "Gehe zu Seite",
                "empty": "Keine Einträge..."
            },
            "colorSelector": {
                addUserColorButton: "ZU DEN FARBFELDERN HINZUFÜGEN",
                userColorsTitle: "BENUTZERDEFINIERTE FARBEN"
            },
            "switch": {
                on: "an",
                off: "aus"
            }
        }
    });
}(Metro, m4q));
