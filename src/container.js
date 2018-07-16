export default class Container {
  constructor (element, numbers, isMerageSort) {
    this.container = element
    this.numbers = numbers
    this.idxes = null // 记录元素坐标
    this.isMerageSort = isMerageSort // 归并排序时，容器将会初始化为上下两栏

    this.labelHeight = 20

    this.swapTime = 1000

    this.defaultColor = '#2980B9'

    this.midHeight = isMerageSort ? this.container.offsetHeight / 2 : this.container.offsetHeight

    this.moveDownTime = 1000
    this.moveUpTime = 1000
    this.tempDataIndex = null
    this.isMoveDown = false
  }
  reset () {

  }
  init () {
    // 清空容器
    this.container.innerHTML = ''
    // 查找最大元素值，并初始化元素坐标数组
    let max = this.numbers[0]
    this.idxes = new Array(this.numbers.length)
    for (let i = 0; i < this.numbers.length; i++) {
      this.idxes[i] = i
      if (max < this.numbers[i]) {
        max = this.numbers[i]
      }
    }
    // 初始化坐标x轴，y轴单位长度
    this.xUnit = Math.floor(this.container.offsetWidth / this.numbers.length)
    this.yUnit = Math.floor((this.midHeight - this.labelHeight) / Math.ceil(max))
    // 创建元素
    for (let i = 0; i < this.numbers.length; i++) {
      let dom = this._createDOM(i)
      this.container.appendChild(dom)
    }
  }
  clearColumnColor () {
    for (let i = 0; i < this.container.children.length; i++) {
      this.container.children[i].getElementsByClassName('column')[0].style.backgroundColor = this.defaultColor
    }
  }
  labelColor (idx, color) {
    this.container.children[this.idxes[idx]].getElementsByClassName('label')[0].style.backgroundColor = color
  }
  columnColor (idx, color) {
    this.container.children[this.idxes[idx]].getElementsByClassName('column')[0].style.backgroundColor = color
  }
  swap (idx1, idx2) {
    let el1 = this.container.children[this.idxes[idx1]]
    let el2 = this.container.children[this.idxes[idx2]]
    // 处理元素坐标数组
    let tempIdx = this.idxes[idx1]
    this.idxes[idx1] = this.idxes[idx2]
    this.idxes[idx2] = tempIdx
    // 处理元素
    if (el1.offsetLeft > el2.offsetLeft) {
      var temp = el1
      el1 = el2
      el2 = temp
    }

    let originLeft1 = this._getOrginLeft(idx1)
    let originLeft2 = this._getOrginLeft(idx2)

    el1.style.left = originLeft2 + 'px'
    el2.style.left = originLeft1 + 'px'
  }
  moveDown (idx1, idx2) {
    if (!this.isMoveDown) {
      this.isMoveDown = true
      this.tempDataIndex = this.idxes.slice()
    }
    this.tempDataIndex[idx2] = this.idxes[idx1]

    let el = this.container.children[this.idxes[idx1]]
    let targetBottom = 0
    let targetLeft = this._getOrginLeft(idx2)

    el.style.left = targetLeft + 'px'
    el.style.bottom = targetBottom + 'px'
  }
  moveUp (idx1, idx2) {
    let el = this.container.children[this.idxes[idx1]]

    let targetBottom = this.midHeight
    let targetLeft = this.getOrginLeft(idx2)

    el.style.left = targetLeft + 'px'
    el.style.bottom = targetBottom + 'px'
  }
  moveUpGroup (start, end) {
    let targetBottom = this.midHeight

    for (let i = start; i <= end; i++) {
      let el = this.container.children[this.idxes[i]]
      el.style.bottom = targetBottom
    }
    if (this.isMoveDown) {
      this.isMoveDown = false
      this.idxes = this.tempDataIndex.slice()
    }
  }
  _getOrginLeft (index) {
    return this.xUnit * index + index * 0.1
  }
  _createDOM (idx) {
    let pillarEl = document.createElement('div')
    pillarEl.className = 'number'
    pillarEl.style.width = this.xUnit * 0.8 + 'px'
    pillarEl.style.height = this.yUnit * this.numbers[idx] + this.labelHeight + 'px'
    pillarEl.style.left = this.xUnit * idx + idx * 0.1
    pillarEl.style.bottom = this.isMerageSort ? this.midHeight : 0

    let columnEl = document.createElement('div')
    columnEl.className = 'column'
    columnEl.style.width = '100%'
    columnEl.style.height = this.yUnit * this.numbers[idx] + 'px'

    let labelEl = document.createElement('div')
    labelEl.innerHTML = this.numbers[idx]
    labelEl.className = 'label'
    labelEl.style.width = '100%'
    labelEl.style.height = this.labelHeight + 'px'

    pillarEl.appendChild(columnEl)
    pillarEl.appendChild(labelEl)
    return pillarEl
  }
}
