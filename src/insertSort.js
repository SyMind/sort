class InsertSort {
    constructor(element, numbers) {
        this.container = new Container(element, numbers);
        this.numbers = numbers;
        this.oldNumbers = numbers.slice();

        this.timer = null;
        this.defaultTime = 1000;

        this.i = 0;
        this.j = 0;
        this.guard = null;
        this.flag =  false;

        this.isFinished = false;
        this.isSwaped = false;

        this.selectedColor = '#27AE60';
        this.orderedColor = '#2ECC71';

        this.flag1 = false;
        this.guardIndex = null;
        this.swapIndex1 = null;
        this.swapIndex2 = null;
        this.flag2 = false;
        this.orderedIndex = null;
    }
    init() {
        this.container.init();
    }
    pause() {
        clearTimeout(this.timer);
    }
    reset() {
        this.container.reset();
        clearTimeout(this.timer);

        this.i = 0;
        this.j = 0;
        this.flag =  false;

        this.isFinished = false;
        this.isSwaped = false;

        this.flag1 = false;
        this.flag2 = false;
        this.container.numbers = this.oldNumbers;
        this.init();
    }
    next() {
        if (this.flag) {
            if (this.j >= 0 && this.guard < this.numbers[this.j]) {  
                this.isSwaped = true;
                this.swapIndex1 = this.j;
                this.swapIndex2 = this.j + 1;
                this.numbers[this.j + 1] = this.numbers[this.j];
                this.j--;
            } else {    // 内层循环结束
                this.flag = false;
                this.flag2 = true;
                this.orderedIndex = this.j + 1;
                this.numbers[this.j + 1] = this.guard;
                this.i++;
            }
        } else if (this.i < this.numbers.length) {
            this.guard = this.numbers[this.i];
            this.guardIndex = this.i;
            this.j = this.i - 1;
            this.flag = true;
        } else {
            this.isFinished = false;
        }
    }
    run() {
        if(!this.flag1) {
            if(this.flag2) {
                this.flag2 = false;
                this.container.labelColor(this.orderedIndex, this.orderedColor);
            }
            this.next();
        }
        this.container.clearColumnColor();
        if(this.isSwaped) { //存在交换
            if(!this.flag1) {
                this.flag1 = true;
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.run();
                }, this.defaultTime);
            } else {
                this.flag1 = false;
                this.isSwaped = false;  
                this.container.swap(this.swapIndex1, this.swapIndex2);
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.run();
                }, this.defaultTime);
            }
        } else if(this.isFinished) {
            this.container.clearColumnColor();
            this.container.labelColor(this.numbers.length - 1, this.orderedColor);
        } else {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.run();
            }, this.defaultTime);
        }
    }
}