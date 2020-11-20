/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'pt-BR': {
            "calendar": {
                "months": [
                    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
                    "Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                ],
                "days": [
                    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
                    "Do", "Se", "Te", "Qa", "Qi", "Se", "Sa",
                    "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
                ],
                "time": {
                    "days": "DIAS",
                    "hours": "HORAS",
                    "minutes": "MINUTOS",
                    "seconds": "SEGUNDOS",
                    "month": "MÊS",
                    "day": "DIA",
                    "year": "ANO"
                }
            },
            "buttons": {
                "ok": "OK",
                "cancel": "Cancelar",
                "done": "Feito",
                "today": "Hoje",
                "now": "Agora",
                "clear": "Limpar",
                "help": "Ajuda",
                "yes": "Sim",
                "no": "Não",
                "random": "Aleatório",
                "save": "Salvar",
                "reset": "Restaurar"
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