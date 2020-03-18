// 左侧列表数据
const Mune_classify = [
    {
        "id": 0,
        "name": "全部商品",
        "code": 20000,
        "icon": require('../../assets/classify/quanbu.svg'),
        "action_icon": require('../../assets/classify_action/quanbu.svg')
    },
    {
        "id": 1,
        "name": "手机数码",
        "code": 20001,
        "icon": require('../../assets/classify/shouji.svg'),
        "action_icon": require('../../assets/classify_action/shouji.svg')
    },
    {
        "id": 2,
        "name": "电脑办公",
        "code": 20002,
        "icon": require('../../assets/classify/diannao.svg'),
        "action_icon": require('../../assets/classify_action/diannao.svg')
    },
    {
        "id": 3,
        "name": "家用电器",
        "code": 20003,
        "icon": require('../../assets/classify/xiyiji.svg'),
        "action_icon": require('../../assets/classify_action/xiyiji.svg')
    },
    {
        "id": 4,
        "name": "食品饮料",
        "code": 20004,
        "icon": require('../../assets/classify/yinliao.svg'),
        "action_icon": require('../../assets/classify_action/yinliao.svg')
    },
    {
        "id": 5,
        "name": "美妆个护",
        "code": 20005,
        "icon": require('../../assets/classify/meizhuang.svg'),
        "action_icon": require('../../assets/classify_action/meizhuang.svg')
    },
    {
        "id": 6,
        "name": "钟表手饰",
        "code": 20006,
        "icon": require('../../assets/classify/weibiaoti2fuzhi02.svg'),
        "action_icon": require('../../assets/classify_action/weibiaoti2fuzhi02.svg')
    },
    {
        "id": 7,
        "name": "礼品箱包",
        "code": 20007,
        "icon": require('../../assets/classify/baobao.svg'),
        "action_icon": require('../../assets/classify_action/baobao.svg')
    },
    {
        "id": 8,
        "name": "家居家纺",
        "code": 20008,
        "icon": require('../../assets/classify/jiaju.svg'),
        "action_icon": require('../../assets/classify_action/jiaju.svg')
    },
    {
        "id": 9,
        "name": "母婴用品",
        "code": 20009,
        "icon": require('../../assets/classify/muying.svg'),
        "action_icon": require('../../assets/classify_action/muying.svg')
    },
    {
        "id": 10,
        "name": "营养保健",
        "code": 20010,
        "icon": require('../../assets/classify/baojian.svg'),
        "action_icon": require('../../assets/classify_action/baojian.svg')
    },
    {
        "id": 11,
        "name": "运动户外",
        "code": 20011,
        "icon": require('../../assets/classify/yundong.svg'),
        "action_icon": require('../../assets/classify_action/yundong.svg')
    },
    {
        "id": 12,
        "name": "限",
        "code": 20013,
        "icon": require('../../assets/classify/xian.svg'),
        "action_icon": require('../../assets/classify_action/xian.svg')
    },
    {
        "id": 13,
        "name": "其他商品",
        "code": 20012,
        "icon": require('../../assets/classify/shouji.svg'),
        "action_icon": require('../../assets/classify_action/shouji.svg')
    }
]

export default Mune_classify;

// sort
export const SortData = [
    {
        id: 0,
        name: '即将开奖',
        icon: null
    },
    {
        id: 1,
        name: '人气',
        icon: null
    },
    {
        id: 2,
        name: '最新',
        icon: null
    },
    {
        id: 3,
        name: '价值',
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAASNJREFUOBHtlL8OgjAQxmlJeA13F6OrK4HESScXn0IniaPRSd/DweBkDH9GZ+Pmq0gC+B3xSEWKg4mTJHC0vd93115bw9A8QRCswjC8k9W4GKJuAMBGCDHlsTzPt47jzLjNVvIPWwVMAK3Rn5AQ9bMP2xe4Ao4QzQM41gmUadeAR44QRdEQWezQttQpFHAT2CQgnqo+pQZVSrWMyCBbNQNMx5P4XDC4yLKs0wSSgG3bB9M0e7SQaZqeWfRvf7ECIo7jFso0wbt3Xff2KShq3SZ/lOsk8ekCWEopr9hpgyb4uUku2Btz1LsvqfAQ2AKy0OnrBNTdRf7g1t8fDE617oBUI6qXQhlZI0A3Ct0gL0eRfd9gGlAyKPxojmpEhrUWAh8vwAfUIO66BWcWEwAAAABJRU5ErkJggg==",
        icon_bottom: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAXNJREFUOBHtVL1OAkEQnlkSauAF7G1MaG2hsRFsbHgIC1AgdhrulIv6GpqoNP4EaG01dr6EgYZGczd+s8RzOe6ws3KTudud72dnLztHlDJEhEejkYeYIY5SKDbFSUCF4/H4DPk9Bwuq1WrLWdupcRMJ4QcwH6HvJio4dbk6j8VJIdZ17NZh5l3w1KCVNIjLBnAOgpaqxB0I7/C2A8eowewSizyiD2xfASteJVSSjjQDHg6HdZR2A3xpR6tyHq4BNF2Ty+WegR9GUbThlupo4mmlUhmAX8YRvDAMn2Lgf/IHX4AlKKxRyA0KzTV3399+21N6pXViaSAeDX1SmYSOyUSv0iturRKLX9gmIy+4lx1i3jTUng5wSy8gyqNNbrMMrJD4yvKY+nww8ezdFoHXSQk9LPPGiKjO3cn9dxUpwp/GUNKSAVGN25OHLKFq4pbMMAiQbyK0FQOYLfxNFsQpBprSsSScp1OeegTxix5iJn4p8wf4BWntvCIjpw8zAAAAAElFTkSuQmCC",
        icon_top: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAX5JREFUOBHtVDtOw0AQnVlLqZNcID10tLT5CBoIDQU5BEIJkLQgOSYWcA2QAjSgKJ8zIDougVKliWQPbzbIcpxNqOgYaez1zHszb9ceEzlMhFi6BR8+k27xygGxIc4mlEhB8ZZITlO5kC+nrdSzXZp0IEOcI9eF670pQeEmjdV1Ql4hxlRHtzY2cAzcnIRa2QKJbOzt7keqdjoC8VWrq0mQPyThByxz2FSPL6bnGrfkTUQFqbkKsPj5OjE/Ib/S0bJSl0yBDkuYL1HEDYpMnztfnymscwmV2yRygrMYOAH/wT86AZ5MJqU4jhvwfq1W+/VVjcfjLcWLyMBEUbQDYdfGmI/hcLi/SeRoNDoA6Z2Z257n7ZpKpfICwj08h+DzugJKBOZRcfBeuVz2F9+2CEMOZph0hueoXq9Wq29YW8sS0dAOhh1JdBRUOgMyUYCz2FPmOqLmkpHUB3RcUoCiIWJNpFRqiI5Lf5MlsqOAhtRWiIuw46oKINeHz+Brf4Dfh/3Ca3+yqGkAAAAASUVORK5CYII="
    }
]