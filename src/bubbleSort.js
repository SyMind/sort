class BubbleSort {
    constructor(element, numbers) {
        this.container = new Container(element, numbers);
        this.numbers = numbers;
        this.oldNumbers = numbers.slice();

        this.i = 0; // 外层循环标记量
        this.j = 0; // 内存循环量

        this.defaultTimeout = 1000;

        this.isFinished = false; // 外层循环是否结束
        this.isInnerFinished = false;  // 内层循环是否结束
        this.isSelected = false; // 是存在元素被选中

        this.selectedColor = '#27AE60';
        this.orderedColor = '#2ECC71';
    }
    init() {
        this.container.init();
    }
    pause() {
        clearTimeout(this.timer);
    }
    reset() {
        // 重置容器
        this.container.reset();

        // 清除定时器
        clearTimeout(this.timer);

        // 重置循环变量
        this.i = 0;
        this.j = 0;

        // 重置标记量
        this.isFinished = false;
        this.isInnerFinished = false;
        this.isNeedSwap = false;
        this.isSelected = false;
        this.selectedIndex1 = 0;
        this.selectedIndex2 = 0;
        this.container.numbers = this.oldNumbers;
        this.init();
    }
    step() {
        if (this.isInnerFinished) { // 处理内层循环体
            this.isSelected = true;
            // 记录选中项
            this.selectedIdx1 = this.j;
            this.selectedIdx2 = this.j + 1;
            if (this.numbers[this.selectedIdx1] > this.numbers[this.selectedIdx2]) {
                let tempIdx = this.numbers[this.selectedIdx1];
                this.numbers[this.selectedIdx1] = this.numbers[this.selectedIdx2];
                this.numbers[this.selectedIdx2] = tempIdx;
                this.isNeedSwap = true;  // 更新与交换操作相关的标记
            }
            ++this.j;
            if(this.j >= this.numbers.length - this.i - 1) {   // 内层循环结束
                this.orderedIndex = this.isNeedSwap ? this.j - 1 : this.j
                this.isInnerFinished = false;
                this.i++;
            }
        } else if(this.i < this.numbers.length - 1) { // 外部循环体没有结束时，准备下一次内部循环
            this.isInnerFinished = true;
            this.j = 0;
        } else {
            this.isFinished = true;
        }
    }
    run() {
        function handler(_this) { 
            _this.run();
        }
        // 不存在交换动画时，直接进行下一步
        if(!this.swapFlag) {
            this.step();
        }
        // 内层循环结束时，标记已经排序完毕的元素
        if(!this.isInnerFinished) {
            this.container.labelColor(this.orderedIndex, this.orderedColor);
        }
        // 将选中的元素着色
        if(this.isSelected) { 
            this.isSelected = false;
            this.container.clearColumnColor();
            this.container.columnColor(this.selectedIdx1, this.selectedColor);
            this.container.columnColor(this.selectedIdx2, this.selectedColor);
        }
        //存在交换时，在下一次运行时执行交换动画
        if(this.isNeedSwap) {
            this.isNeedSwap = false;  
            this.container.swap(this.selectedIdx1, this.selectedIdx2);
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.run();
            }, this.container.swapTime);
        } else if(this.isFinished) {
            this.container.clearColumnColor();
            this.container.labelColor(0, this.orderedColor);
        } else {
            this.run();
        }
    }
}