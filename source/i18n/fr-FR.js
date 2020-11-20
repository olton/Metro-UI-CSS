/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'fr-FR': {
            "calendar": {
                "months": [
                    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
                    "Janv", "Févr", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
                ],
                "days": [
                    "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                    "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa",
                    "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
                ],
                "time": {
                    "days": "JOURS",
                    "hours": "HEURES",
                    "minutes": "MINS",
                    "seconds": "SECS",
                    "month": "MOIS",
                    "day": "JOUR",
                    "year": "ANNEE"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Annulé",
                "done": "Fait",
                "today": "Aujourd'hui",
                "now": "Maintenant",
                "clear": "Effacé",
                "help": "Aide",
                "yes": "Oui",
                "no": "Non",
                "random": "Aléatoire",
                "save": "Sauvegarder",
                "reset": "Réinitialiser"
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