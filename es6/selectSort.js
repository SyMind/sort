class SelectSort {
    constructor(element, numbers) {
        this.container = new Container(element, numbers);
        this.numbers = numbers;
        this.oldNumbers = numbers.slice();

        this.timer = null;
        this.defaultTimeout = 1000;
        
        this.i = 0; //外层循环标记量
        this.j = this.i; //内层循环标记量
        this.temp1 = 0; //用于每一次遍历是进行比较时存储的最小临时变量
        this.temp2 = 0; //用于一次遍历完，用于交换的临时存储变量
        this.index = 0; //记录每一次遍历最小时出现的数组索引值。
        this.flag = false; //用于记录是否执行内层循环

        this.isFinished = false; //用于记录排序是否结束
        this.isSwaped = false;   //记录是否存在交换动画
        this.swapIndex1 = null;
        this.swapIndex2 = null;

        this.selectedColor = '#27AE60';
        this.orderedColor = '#2ECC71';
        
        this.flag1 = false;
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

        this.defaultTimeout = 1000;

        this.i = 0;
        this.j = this.i;
        this.temp1 = 0;
        this.temp2 = 0;
        this.index = 0;
        this.flag = false;

        this.isFinished = false;
        this.isSwaped = false;

        this.selectedColor = '#27AE60';
        this.orderedColor = '#2ECC71';
        
        this.flag1 = false;
        this.container.numbers = this.oldNumbers;
        this.init();
    }
    next() {
        if(this.flag) {
            if (this.temp1 <= this.numbers[this.j + 1]) {
            } else {
                this.temp1 = this.numbers[this.j + 1];
                this.index = (this.j + 1);
            }
            this.j++;
            if(this.j >= this.numbers.length - 1) {   //内层循环结束
                this.flag = false;
                this.temp2 = this.numbers[this.i];
                this.numbers[this.i] = this.temp1;
                this.numbers[this.index] = this.temp2;
                this.isSwaped = true;  //更新与交换操作相关的标记
                this.swapIndex1 = this.i;
                this.swapIndex2 = this.index;
                this.i++;
            }
        } else if(this.i < this.numbers.length - 1) {
            this.temp1 = this.numbers[this.i];
            this.index = this.i;
            this.j = this.i;
            this.flag = true;
        } else {
            this.flag = false;
            this.isFinished = true;
        }
    }
    run() {
        function handler(_this) { 
            _this.run();
        }
        if(!this.flag1) {
            this.next();
        }
        this.container.clearColumnColor();
        //将处理的元素着色
        this.container.columnColor(this.j, this.selectedColor);
        //将最小元素着色
        this.container.columnColor(this.index, this.selectedColor);
        if(this.isSwaped) { //存在交换
            if(!this.flag1) {
                this.flag1 = true;
                // 将已排序元素标签着色
                this.container.labelColor(this.swapIndex2, this.orderedColor);
                clearInterval(this.timer);
                this.timer = this.container.timeoutAnimate(handler, 500, this);
            } else {
                this.flag1 = false;
                this.isSwaped = false;  
                this.container.swap(this.swapIndex1, this.swapIndex2);
                clearInterval(this.timer);
                this.timer = this.container.timeoutAnimate(handler, this.container.swapTimeout, this);
            }
        } else if(this.isFinished) {
            this.container.clearColumnColor();
            this.container.labelColor(this.numbers.length - 1, this.orderedColor);
            clearInterval(this.timer);
        } else {
            clearInterval(this.timer);
            this.timer = this.container.timeoutAnimate(handler, this.defaultTimeout, this);
        }
    }
}