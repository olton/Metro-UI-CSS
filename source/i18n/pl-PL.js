/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'pl-PL': {
            "calendar": {
                "months": [
                    "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień",
                    "Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"
                ],
                "days": [
                    "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota",
                    "NDZ", "PN", "WT", "ŚR", "CZW", "PT", "SB",
                    "Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"
                ],
                "time": {
                    "days": "DNI",
                    "hours": "GODZINY",
                    "minutes": "MINUTY",
                    "seconds": "SEKUNDY",
                    "month": "MIESIĄC",
                    "day": "DZIEŃ",
                    "year": "ROK"
                },
                "weekStart": 1
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Anuluj",
                "done": "Gotowe",
                "today": "Dziś",
                "now": "Teraz",
                "clear": "Wyczyść",
                "help": "Pomoc",
                "yes": "Tak",
                "no": "Nie",
                "random": "Losowy",
                "save": "Zapisz",
                "reset": "Resetowanie"
            },
            "table": {
                "rowsCount": "Pokaż wpisy:",
                "search": "Wyszukaj:",
                "info": "Wyświetlanie wpisów od $1 do $2 z łącznie $3",
                "prev": "Poprzedni",
                "next": "Następny",
                "all": "Wszystkie",
                "inspector": "Inspektor",
                "skip": "Idź do strony",
                "empty": "Nic do wyświetlenia"
            },
            "colorSelector": {
                addUserColorButton: "DODAJ DO PRÓBEK",
                userColorsTitle: "KOLOR UŻYTKOWNIKA"
            },
            "switch": {
                on: "Włącz",
                off: "Wyłącz"
            }
        }
    });
}(Metro, m4q));
