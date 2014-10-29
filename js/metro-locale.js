(function($){
    $.Metro.currentLocale = 'en';

    if (METRO_LOCALE != undefined)  $.Metro.currentLocale = METRO_LOCALE; else $.Metro.currentLocale = 'en';
    //console.log(METRO_LOCALE, $.Metro.currentLocale);

    $.Metro.Locale = {
        'en': {
            months: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            days: [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
            ],
            buttons: [
                "Today", "Clear", "Cancel", "Help", "Prior", "Next", "Finish"
            ]
        },
        'fr': {
            months: [
                "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
                "Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
            ],
            days: [
                "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
                "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"
            ],
            buttons: [
                "Aujourd'hui", "Effacer", "Annuler", "Aide", "Précedent", "Suivant", "Fin"
            ]
        },
        'nl': {
            months: [
                "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December",
                "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"
            ],
            days: [
                "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag",
                "Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"
            ],
            buttons: [
                "Vandaag", "Verwijderen", "Annuleren", "Hulp", "Vorige", "Volgende", "Einde"
            ]
        },
        'ua': {
            months: [
                "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
                "Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
            ],
            days: [
                "Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота",
                "Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
            ],
            buttons: [
                "Сьогодні", "Очистити", "Скасувати", "Допомога", "Назад", "Вперед", "Готово"
            ]
        },
        'ru': {
            months: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            days: [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
            ],
            buttons: [
                "Сегодня", "Очистить", "Отменить", "Помощь", "Назад", "Вперед", "Готово"
            ]
        },
        /** By NoGrief (nogrief@gmail.com) */
        'zhCN': {
            months: [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
            ],
            days: [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                "日", "一", "二", "三", "四", "五", "六"
            ],
            buttons: [
                "今日", "清除", "Cancel", "Help", "Prior", "Next", "Finish"
            ]
        },
        'it': {
            months: [
                'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
                'Gen',' Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'
            ],
            days: [
                'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica',
                'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'
            ],
            buttons: [
                "Oggi", "Cancella", "Cancel", "Help", "Prior", "Next", "Finish"
            ]
        },
        'de': {
            months: [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember",
                "Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
            ],
            days: [
                "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag",
                "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
            ],
            buttons: [
                "Heute", "Zurücksetzen", "Abbrechen", "Hilfe", "Früher", "Später", "Fertig"
            ]
        },
        /** By Javier Rodríguez (javier.rodriguez at fjrodriguez.com) */
        'es': {
            months: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
            ],
            days: [
                "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
                "Do", "Lu", "Mar", "Mié", "Jue", "Vi", "Sáb"
            ],
            buttons: [
               "Hoy", "Limpiar", "Cancel", "Help", "Prior", "Next", "Finish"
            ]
        },
        'pt': {
            months: [
                'Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
                'Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'
            ],
            days: [
                'Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado',
                'Dom','Seg','Ter','Qua','Qui','Sex','Sab'
            ],
            buttons: [
                "Hoje", "Limpar", "Cancelar", "Ajuda", "Anterior", "Seguinte", "Terminar"
            ]
        },
        'cs': {
            months: [
                "Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec",
                "Led", "Ún", "Bř", "Dub", "Kvě", "Če", "Čer", "Srp", "Zá", "Ří", "Li", "Pro"
            ],
            days: [
                "Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota",
                "Ne", "Po", "Út", "St", "Čt", "Pá", "So"
            ],
            buttons: [
                "Dnes", "Vyčistit", "Zrušit", "Pomoc", "Předešlý", "Další", "Dokončit"
            ]
        },
        /** By Satit Rianpit <siteslave@msn.com> **/
        'th': {
            months: [
                "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
                "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
            ],
            days: [
                "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์",
                "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."
            ],
            buttons: [
                "วันนี้", "ล้าง", "ยกเลิก", "ช่วยเหลือ", "กลับ", "ต่อไป", "เสร็จ"
            ]
        }
    };

    $.Metro.setLocale = function(locale, data){
        $.Metro.Locale[locale] = data;
    };
})(jQuery);
