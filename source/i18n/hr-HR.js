/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'hr-HR': {
            "calendar": {
                "months": [
                    "Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac",
                    "Sij", "Velj", "Ožu", "Tra", "Svi", "Lip", "Srp", "Kol", "Ruj", "Lis", "Stu", "Pro"
                ],
                "days": [
                    "Nedjelja","Ponedjeljak","Utorak", "Srijeda", "Četvrtak", "Petak", "Subota",  
                    "Ne","Po", "Ut", "Sr", "Če", "Pe", "Su", 
                    "Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub" 
                ],
                "time": {
                    "days": "DANI",
                    "hours": "SATI",
                    "minutes": "MINUTE",
                    "seconds": "SEKUNDE",
                    "month": "MJESEC",
                    "day": "DAN",
                    "year": "GODINA"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Otkaži",
                "done": "Gotovo",
                "today": "Danas",
                "now": "Sada",
                "clear": "Izbriši",
                "help": "Pomoć",
                "yes": "Da",
                "no": "Ne",
                "random": "Nasumično",
                "save": "Spremi",
                "reset": "Reset"
            },
            "table": {
                "rowsCount": "Broj redaka:",
                "search": "Pretraga:",
                "info": "Prikazujem $1 do $2 od $3",
                "prev": "Nazad",
                "next": "Naprijed",
                "all": "Sve",
                "inspector": "Inspektor",
                "skip": "Idi na stranicu",
                "empty": "Prazno"
            },
            "colorSelector": {
                addUserColorButton: "Dodaj uzorcima",
                userColorsTitle: "Korisničke boje"
            }
        }
    });
}(Metro, m4q));
