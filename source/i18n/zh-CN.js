/* global Metro */
(function(Metro, $) {
    $.extend(Metro.locales, {
        'zh-CN': {
            "calendar": {
                "months": [
                    "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
                    "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
                ],
                "days": [
                    "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
                    "日", "一", "二", "三", "四", "五", "六",
                    "周日", "周一", "周二", "周三", "周四", "周五", "周六"
                ],
                "time": {
                    "days": "天",
                    "hours": "时",
                    "minutes": "分",
                    "seconds": "秒",
                    "month": "月",
                    "day": "日",
                    "year": "年"
                }
            },
            "buttons": {
                "ok": "确认",
                "cancel": "取消",
                "done": "完成",
                "today": "今天",
                "now": "现在",
                "clear": "清除",
                "help": "帮助",
                "yes": "是",
                "no": "否",
                "random": "随机",
                "save": "保存",
                "reset": "重啟"
            },
            "table": {
                "rowsCount": "显示结果",
                "search": "搜索:",
                "info": "显示第 $1 至 $2 项结果，共 $3 项",
                "prev": "上页",
                "next": "下页",
                "all": "全部",
                "inspector": "显示隐藏列",
                "skip": "跳页",
                "empty": "表中数据为空"
            },
            "colorSelector": {
                addUserColorButton: "ADD TO SWATCHES",
                userColorsTitle: "USER COLORS"
            }
        }
    });
}(Metro, m4q));
