'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BubbleSort = function () {
    function BubbleSort(element, numbers) {
        _classCallCheck(this, BubbleSort);

        this.container = new Container(element, numbers);
        this.numbers = numbers;
        this.oldNumbers = numbers.slice();

        this.i = 0;
        this.j = 0;
        this.temp = null;

        this.timer = null;
        this.defaultTimeout = 1000;

        this.isFinished = false;
        this.isSwaped = false;
        this.swapIndex1 = null;
        this.swapIndex2 = null;
        this.flag = false; //标记是否执行内部循环体
        this.flag0 = false; //为了使next中内部循环标记j处理滞后
        this.flag1 = false; //标记是否存在未处理的交换动画
        this.flag3 = false; //当前处理的元素
        this.selectedIndex1 = 0;
        this.selectedIndex2 = 0;

        this.selectedColor = '#27AE60';
        this.orderedColor = '#2ECC71';
    }

    _createClass(BubbleSort, [{
        key: 'init',
        value: function init() {
            this.container.init();
        }
    }, {
        key: 'pause',
        value: function pause() {
            clearTimeout(this.timer);
        }
    }, {
        key: 'reset',
        value: function reset() {
            clearTimeout(this.timer);
            this.i = 0;
            this.j = 0;

            this.defaultTimeout = 1000;

            this.isFinished = false;
            this.isSwaped = false;
            this.flag = false;
            this.flag0 = false;
            this.flag1 = false;
            this.flag3 = false;
            this.selectedIndex1 = 0;
            this.selectedIndex2 = 0;
            this.container.numbers = this.oldNumbers;
            this.init();
        }
    }, {
        key: 'next',
        value: function next() {
            if (this.flag) {
                //处理内部循环体
                if (!this.flag0) {
                    this.flag0 = true;
                    this.j = 0;
                }
                this.flag3 = true;
                this.selectedIndex1 = this.j;
                this.selectedIndex2 = this.j + 1;
                if (this.numbers[this.j] > this.numbers[this.j + 1]) {
                    this.temp = this.numbers[this.j];
                    this.numbers[this.j] = this.numbers[this.j + 1];
                    this.numbers[this.j + 1] = this.temp;
                    this.isSwaped = true; //更新与交换操作相关的标记
                    this.swapIndex1 = this.j;
                    this.swapIndex2 = this.j + 1;
                }
                this.j++;
                if (this.j >= this.numbers.length - 1 - this.i) {
                    // 内层循环结束
                    this.flag2 = true;
                    if (this.isSwaped) {
                        this.orderedIndex = this.j - 1;
                    } else {
                        this.orderedIndex = this.j;
                    }
                    this.flag = false;
                    this.i++;
                    this.flag0 = false;
                }
            } else if (this.i < this.numbers.length - 1) {
                //外部循环体结束判别
                this.flag = true;
            } else {
                this.isFinished = true;
            }
        }
    }, {
        key: 'run',
        value: function run() {
            function handler(_this) {
                _this.run();
            }
            //不存在未处理的排序动画时再执行下一步
            if (!this.flag1) {
                this.next();
            }
            //存在已经排序完毕的元素
            if (this.flag2) {
                this.flag2 = false;
                this.container.labelColor(this.orderedIndex, this.orderedColor);
            }
            //将处理的元素着色
            if (this.flag3) {
                this.flag3 = false;
                this.container.clearColumnColor();
                this.container.columnColor(this.selectedIndex1, this.selectedColor);
                this.container.columnColor(this.selectedIndex2, this.selectedColor);
            }
            //存在交换时，在下一次运行时执行交换动画
            if (this.isSwaped) {
                if (!this.flag1) {
                    this.flag1 = true;
                    clearInterval(this.timer);
                    this.timer = this.container.timeoutAnimate(handler, this.defaultTimeout, this);
                } else {
                    this.flag1 = false;
                    this.isSwaped = false;
                    this.container.swap(this.swapIndex1, this.swapIndex2);
                    clearInterval(this.timer);
                    this.timer = this.container.timeoutAnimate(handler, this.container.swapTimeout, this);
                }
            } else if (this.isFinished) {
                this.container.clearColumnColor();
                this.container.labelColor(0, this.orderedColor);
            } else {
                clearInterval(this.timer);
                this.timer = this.container.timeoutAnimate(handler, this.defaultTimeout, this);
            }
        }
    }]);

    return BubbleSort;
}();