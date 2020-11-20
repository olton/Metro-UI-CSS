/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'tr-TR': {
            "calendar": {
                "months": [
                    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
                    "Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
                ],
                "days": [
                    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",
                    "Pa", "Pz", "Sa", "Ça", "Pe", "Cu", "Ct",
                    "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"
                ],
                "time": {
                    "days": "GÜN",
                    "hours": "SAAT",
                    "minutes": "DAK",
                    "seconds": "SAN",
                    "month": "AY",
                    "day": "GÜN",
                    "year": "YIL"
                }
            },
            "buttons": {
                "ok": "Tamam",
                "cancel": "Vazgeç",
                "done": "Bitti",
                "today": "Bugün",
                "now": "Şimdi",
                "clear": "Temizle",
                "help": "Yardım",
                "yes": "Evet",
                "no": "Hayır",
                "random": "Rasgele",
                "save": "Kurtarmak",
                "reset": "Sıfırla"
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