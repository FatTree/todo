class toBackVo {
    constructor(action, index, item) {
        this.action = action;
        this.index = index;
        this.item = new item();
    }
}

class item {
    constructor(lid, memberid, detail, checkflag, index) {
        this.lid = lid;
        this.memberid = memberid;
        this.detail = detail;
        this.checkflag = checkflag;
        this.index = index;
    }
}
