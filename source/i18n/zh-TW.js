/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'zh-TW': {
            "calendar": {
                "months": [
                    "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                    "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
                ],
                "days": [
                    "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                    "日", "一", "二", "三", "四", "五", "六",
                    "週日", "週一", "週二", "週三", "週四", "週五", "週六"
                ],
                "time": {
                    "days": "天",
                    "hours": "時",
                    "minutes": "分",
                    "seconds": "秒",
                    "month": "月",
                    "day": "日",
                    "year": "年"
                }
            },
            "buttons": {
                "ok": "確認",
                "cancel": "取消",
                "done": "完成",
                "today": "今天",
                "now": "現在",
                "clear": "清除",
                "help": "幫助",
                "yes": "是",
                "no": "否",
                "random": "隨機",
                "save": "儲存",
                "reset": "重設"
            },
            "table": {
                "rowsCount": "顯示筆數",
                "search": "搜尋",
                "info": "顯示第 $1 至 $2 筆，共 $3 筆資料",
                "prev": "上一頁",
                "next": "下一頁",
                "all": "全部",
                "inspector": "設定表格欄位",
                "skip": "跳轉至",
                "empty": "目前沒有資料可以顯示"
            },
            "colorSelector": {
                addUserColorButton: "加入自訂顏色",
                userColorsTitle: "選擇的顏色"
            }
        }
    });
}(Metro, m4q));
