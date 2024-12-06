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
                },
                "weekStart": 1
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
                "rowsCount": "Exibindo:",
                "search": "Pesquisar:",
                "info": "Exibindo de $1 até $2 de $3 registros",
                "prev": "Anterior",
                "next": "Próximo",
                "all": "Todos",
                "inspector": "Inspetor",
                "skip": "Ir para",
                "empty": "Nada para exibir"
            },
            "colorSelector": {
                addUserColorButton: "ADICIONAR PARA AMOSTRAS",
                userColorsTitle: "CORES DO USUÁRIO"
            },
            "switch": {
                on: "on",
                off: "off"
            }
        }
    });
}(Metro, m4q));
