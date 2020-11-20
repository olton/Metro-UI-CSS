/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'hu-HU': {
            "calendar": {
                "months": [
                    'Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
                    'Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'
                ],
                "days": [
                    'Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat',
                    'V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz',
                    'Vas', 'Hét', 'Ke', 'Sze', 'Csü', 'Pén', 'Szom'
                ],
                "time": {
                    "days": "NAP",
                    "hours": "ÓRA",
                    "minutes": "PERC",
                    "seconds": "MP"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Mégse",
                "done": "Kész",
                "today": "Ma",
                "now": "Most",
                "clear": "Törlés",
                "help": "Segítség",
                "yes": "Igen",
                "no": "Nem",
                "random": "Véletlen",
                "save": "Mentés",
                "reset": "Visszaállítás"
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