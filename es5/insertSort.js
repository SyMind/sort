'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InsertSort = function () {
    function InsertSort(element, numbers) {
        _classCallCheck(this, InsertSort);

        this.container = new Container(element, numbers);
        this.numbers = numbers;
        this.oldNumbers = numbers.slice();

        this.timer = null;
        this.defaultTimeout = 1000;

        this.i = 0;
        this.j = 0;
        this.guard = null;
        this.flag = false;

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

    _createClass(InsertSort, [{
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

            this.defaultTimeout = 1000;

            this.i = 0;
            this.j = 0;
            this.flag = false;

            this.isFinished = false;
            this.isSwaped = false;

            this.flag1 = false;
            this.flag2 = false;
            this.container.numbers = this.oldNumbers;
            this.init();
        }
    }, {
        key: 'next',
        value: function next() {
            if (this.flag) {
                if (this.j >= 0 && this.guard < this.numbers[this.j]) {
                    this.isSwaped = true;
                    this.swapIndex1 = this.j;
                    this.swapIndex2 = this.j + 1;
                    this.numbers[this.j + 1] = this.numbers[this.j];
                    this.j--;
                } else {
                    // 内层循环结束
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
    }, {
        key: 'run',
        value: function run() {
            function handler(_this) {
                _this.run();
            }
            if (!this.flag1) {
                if (this.flag2) {
                    this.flag2 = false;
                    this.container.labelColor(this.orderedIndex, this.orderedColor);
                }
                this.next();
            }
            this.container.clearColumnColor();
            if (this.isSwaped) {
                //存在交换
                if (!this.flag1) {
                    this.flag1 = true;
                    clearInterval(this.timer);
                    this.timer = this.container.timeoutAnimate(handler, 500, this);
                } else {
                    this.flag1 = false;
                    this.isSwaped = false;
                    this.container.swap(this.swapIndex1, this.swapIndex2);
                    clearInterval(this.timer);
                    this.timer = this.container.timeoutAnimate(handler, this.container.swapTimeout, this);
                }
            } else if (this.isFinished) {
                this.container.clearColumnColor();
                this.container.labelColor(this.numbers.length - 1, this.orderedColor);
                clearInterval(this.timer);
            } else {
                clearInterval(this.timer);
                this.timer = this.container.timeoutAnimate(handler, 500, this);
            }
        }
    }]);

    return InsertSort;
}();