class Container {
    constructor(element, numbers, isMerageSort) {
        this.container = element;
        this.numbers = numbers;
        this.idxes = null; // 记录元素坐标
        this.isMerageSort = isMerageSort; // 归并排序时，容器将会初始化为上下两栏

        this.labelHeight = 20;
        this.xUnit = null;
        this.yUnit = null;
        
        this.swapTimeout = 1000;
        this.swapTimer = null;

        this.defaultColor = '#2980B9';

        if (isMerageSort) {
            this.midHeight = this.container.offsetHeight / 2;
        } else {
            this.midHeight = this.container.offsetHeight;
        }
        this.moveDownTimer = null;
        this.moveUpTimer = null;
        this.moveDownTimeout = 1000;
        this.moveUpTimeout = 1000;
        this.tempDataIndex = null;
        this.flag0 = false;
    }
    reset() {
        clearInterval(this.moveDownTimer);
        clearInterval(this.moveUpTimer);
        clearInterval(this.swapTimer);
    }
    init() {
        // 清空容器
        this.container.innerHTML = '';
        // 查找最大元素值，并初始化元素坐标数组
        let max = this.numbers[0];
        this.idxes = new Array(this.numbers.length);
        for(let i = 0; i < this.numbers.length; i++) {
            this.idxes[i] = i;
            if(max < this.numbers[i]) {
                max = this.numbers[i];
            }
        }
        // 初始化坐标x轴，y轴单位长度
        this.xUnit = Math.floor(this.container.offsetWidth / this.numbers.length);
        this.yUnit = Math.floor((this.midHeight - this.labelHeight) / Math.ceil(max));
        // 创建元素
        for(let i = 0; i < this.numbers.length; i++) {
            let dom = this._createDOM(i);
            this.container.appendChild(dom);
        }
    }
    clearColumnColor() {
        for(let i = 0; i < this.container.children.length; i++) {
            this.container.children[i].getElementsByClassName('column')[0].style.backgroundColor = this.defaultColor;
        }
    }
    labelColor(idx, color) {
        this.container.children[this.idxes[idx]].getElementsByClassName('label')[0].style.backgroundColor = color;
    }
    columnColor(idx, color) {
        this.container.children[this.idxes[idx]].getElementsByClassName('column')[0].style.backgroundColor = color;
    }
    swap(idx1, idx2) {
        let el1 = this.container.children[this.idxes[idx1]];
        let el2 = this.container.children[this.idxes[idx2]];
        //处理元素坐标数组
        let tempIdx = this.idxes[idx1]
        this.idxes[idx1] = this.idxes[idx2];
        this.idxes[idx2] = tempIdx;
        //处理元素
        if(el1.offsetLeft > el2.offsetLeft) {
            var temp = el1;
            el1 = el2;
            el2 = temp;
        }

        let originLeft1 = this._getOrginLeft(idx1);
        let originLeft2 = this._getOrginLeft(idx2);
        // 计算动画帧数
        // let nums = Math.ceil(this.swapTimeout / 30);
        // 计算动画速度
        // let speed = (originLeft2 - originLeft1) / nums;
        // let flag = 0;
        // function handler(_this) {
        //     flag++;
        //     if(flag >= nums) {
        //         clearInterval(_this.swapTimer);
        //         el1.style.left = originLeft2 + 'px';
        //         el2.style.left = originLeft1 + 'px';
        //         return;
        //     }
        //     el1.style.left = el1.offsetLeft + speed + 'px';
        //     el2.style.left = el2.offsetLeft - speed + 'px';
        // }
        // handler(this);
        // clearInterval(this.swapTimer);
        // this.swapTimer = this.animate(handler, 30, this);

        el1.style.left = originLeft2 + 'px';
        el2.style.left = originLeft1 + 'px';
    }
    moveDown(idx1, idx2) {
        if(!this.flag0) {
            this.flag0 = true;
            this.tempDataIndex = this.idxes.slice();
        }
        this.tempDataIndex[idx2] = this.idxes[idx1];
        var obj1 = this.container.children[this.idxes[idx1]];
        var endBottom = 0;
        var endLeft = this._getOrginLeft(idx2);
        var leftDistance = endLeft - obj1.offsetLeft;
        var nums = Math.ceil(this.moveDownTimeout / 30);
        var leftSpeed = Math.ceil(leftDistance / nums);
        var bottomSpeed = Math.ceil(this.midHeight / nums);
        var flag = 0;
        function handler(_this) {
            flag++;
            if(flag >= nums) {
                clearInterval(_this.moveDownTimer);
                obj1.style.left = endLeft + 'px';
                obj1.style.bottom = endBottom + 'px';
                return;
            }
            obj1.style.left = obj1.offsetLeft + leftSpeed + 'px';
            obj1.style.bottom = parseInt(obj1.style.bottom) - bottomSpeed + 'px';
        }
        handler(this);
        clearInterval(this.moveDownTimer);
        this.moveDownTimer = this.animate(handler, this.moveDownSpeed, this);
    }
    moveUp(idx1, idx2) {
        var obj1 = this.container.children[this.idxes[idx1]];
        var endBottom = this.midHeight;
        var endLeft = this.getOrginLeft(idx2);
        var leftDistance = endLeft - obj1.offsetLeft;
        var nums = Math.ceil(this.moveUpTimeout / 30);
        var leftSpeed = leftDistance / nums;
        var bottomSpeed = this.midHeight / nums;
        var flag = 0;
        function handler(_this) {
            flag++;
            if(flag >= nums) {
                clearInterval(_this.moveUpTimer);
                obj1.style.left = endLeft + 'px';
                obj1.style.bottom = endBottom + 'px';
                return;
            }
            obj1.style.left = obj1.offsetLeft + leftSpeed + 'px';
            obj1.style.bottom = parseInt(obj1.style.bottom) + bottomSpeed + 'px';
        }
        handler(this);
        clearInterval(this.moveUpTimer);
        this.moveUpTimer = this.animate(handler, this.moveDownSpeed, this);
    }
    moveUp2(start, end) {
        var endBottom = this.midHeight;
        var nums = Math.ceil(this.moveUpTimeout / 30);
        var bottomSpeed = this.midHeight / nums;
        var flag = 0;
        function handler(_this) {
            flag++;
            if(flag >= nums) {
                clearInterval(_this.moveUpTimer);
                for(let i = start; i <= end; i++) {
                    var obj1 = _this.container.children[_this.idxes[i]];
                    obj1.style.bottom = endBottom + 'px';
                }
                if(_this.flag0) {
                    _this.flag0 = false;
                    _this.idxes = _this.tempDataIndex.slice();
                }
                return;
            }
            for(let i = start; i <= end; i++) {
                var obj1 = _this.container.children[_this.idxes[i]];
                obj1.style.bottom = parseInt(obj1.style.bottom) + bottomSpeed + 'px';
            }
        }
        handler(this);
        clearInterval(this.moveUpTimer);
        this.moveUpTimer = this.animate(handler, this.moveDownSpeed, this);
    }
    animate(callback, timeout, param) {
        var args = Array.prototype.slice.call(arguments,2); 
        var _cb = function() { 
            callback.apply(null,args); 
        }
        return setInterval(_cb,timeout); 
    }
    timeoutAnimate(callback, timeout, param) {
        var args = Array.prototype.slice.call(arguments, 2); 
        var _cb = function() { 
            callback.apply(null, args); 
        }
        return setTimeout(_cb, timeout); 
    }
    _getOrginLeft(index) {
        return this.xUnit * index + index * 0.1;
    }
    _createDOM(idx) {
        let pillarEl = document.createElement('div');
        pillarEl.className = 'number';
        pillarEl.style.width = this.xUnit * 0.8 + 'px';
        pillarEl.style.height = this.yUnit * this.numbers[idx] + this.labelHeight + 'px';
        pillarEl.style.left = this.xUnit * idx + idx * 0.1;
        pillarEl.style.bottom = this.isMerageSort ? this.midHeight : 0

        let columnEl =  document.createElement('div');
        columnEl.className = 'column';
        columnEl.style.width = '100%';
        columnEl.style.height = this.yUnit * this.numbers[idx] + 'px';

        let labelEl = document.createElement('div');
        labelEl.innerHTML = this.numbers[idx];
        labelEl.className = 'label';
        labelEl.style.width = '100%';
        labelEl.style.height = this.labelHeight + 'px';

        pillarEl.appendChild(columnEl);
        pillarEl.appendChild(labelEl);
        return pillarEl;
    }
}