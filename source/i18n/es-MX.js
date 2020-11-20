/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'es-MX': {
            "calendar": {
                "months": [
                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                    "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
                ],
                "days": [
                    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
                    "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa",
                    "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
                ],
                "time": {
                    "days": "DÍAS",
                    "hours": "HORAS",
                    "minutes": "MINS",
                    "seconds": "SEGS",
                    "month": "MES",
                    "day": "DÍA",
                    "year": "AÑO"
                }
            },
            "buttons": {
                "ok": "Aceptar",
                "cancel": "Cancelar",
                "done": "Hecho",
                "today": "Hoy",
                "now": "Ahora",
                "clear": "Limpiar",
                "help": "Ayuda",
                "yes": "Si",
                "no": "No",
                "random": "Aleatorio",
                "save": "Salvar",
                "reset": "Reiniciar"
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