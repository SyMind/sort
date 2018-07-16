import './main.css'
import BubbleSort from './bubbleSort.js'
import InsertSort from './insertSort.js'
import MergeSort from './mergeSort.js'
import SelectSort from './selectSort.js'

let data = [6, 5, 4, 3, 2, 1]

let container = document.getElementById('container')
let runBtn = document.getElementById('runBtn')
let resetBtn = document.getElementById('resetBtn')
let pauseBtn = document.getElementById('pauseBtn')
let submitBtn = document.getElementById('submitBtn')
let submitBtn2 = document.getElementById('submitBtn2')
let aTags = document.getElementById('nav').getElementsByTagName('a')
let sortStr = 'bubbleSort'

let sort = new BubbleSort(container, data)
initElements(data)
sort.init()

function initElements (numbers) {
  let elements = document.getElementById('elements')
  let template = ''
  for (var i = 0; i < numbers.length; i++) {
    template += '<div class="group">' +
                  '<label>' + i + '</label>' +
                  '<input type="text" value=' + numbers[i] + '>' +
                '</div>'
  }
  elements.innerHTML = template
}
// 重置
resetBtn.onclick = function (e) {
  e.preventDefault()
  pauseBtn.className = 'a-disabled'
  runBtn.className = ''
  sort.reset()
}
runBtn.onclick = function (e) {
  e.preventDefault()
  pauseBtn.className = ''
  this.className = 'a-disabled'
  sort.run()
}
pauseBtn.onclick = function (e) {
  e.preventDefault()
  sort.pause()
  this.className = 'a-disabled'
  runBtn.className = ''
}
function operationBtnReset () {
  pauseBtn.className = 'a-disabled'
  runBtn.className = ''
}
// 随机生成数组
function randomArray (length, min, max) {
  var result = new Array(length)
  var range = max - min
  for (var i = 0; i < length; i++) {
    var rand = Math.random()
    result[i] = min + Math.round(rand * range)
  }
  return result
}
// 设置数组长度
submitBtn.onclick = function (e) {
  e.preventDefault()
  var arrLenStr = document.getElementById('arrLen').value
  if (arrLenStr.length === 0) {
    alert('请您在输入框中输入数组的长度值')
    return
  }
  var arrLen = parseInt(arrLenStr)
  if (!arrLen) {
    alert('数组的长度值应为数字')
    return
  }
  sort.reset()
  var nums = randomArray(arrLen, 1, 100)
  initElements(nums)
  switch (sortStr) {
    case 'bubbleSort':
      sort = new BubbleSort(container, nums)
      break
    case 'insertSort':
      sort = new InsertSort(container, nums)
      break
    case 'mergeSort':
      sort = new MergeSort(container, nums)
      break
    case 'selectSort':
      sort = new SelectSort(container, nums)
      break
  }
  sort.init()
  operationBtnReset()
}
// 设置数组元素
submitBtn2.onclick = function (e) {
  e.preventDefault()
  var elements = document.getElementById('elements')
  var inputs = elements.getElementsByTagName('input')
  var nums = []
  for (var i = 0; i < inputs.length; i++) {
    console.log(inputs[i].value)
    var num = parseInt(inputs[i].value)
    if (!num) {
      alert('第' + i + '个元素非法，只能设置数字' + inputs[i].value)
      return
    }
    nums.push(num)
  }
  e.preventDefault()
  sort.oldNumbers = nums
  sort.reset()
  initElements(nums)
}
// 导航
for (var i = 0; i < aTags.length; i++) {
  (function (i, _this) {
    aTags[i].onclick = function () {
      sort.reset()
      pauseBtn.className = 'a-disabled'
      runBtn.className = ''
      switch (aTags[i].innerHTML) {
        case '选择排序':
          _this.sortStr = 'selectSort'
          _this.sort = new SelectSort(_this.container, _this.data)
          _this.sort.init()
          break
        case '冒泡排序':
          _this.sortStr = 'bubbleSort'
          _this.sort = new BubbleSort(_this.container, _this.data)
          _this.sort.init()
          break
        case '插入排序':
          _this.sortStr = 'insertSort'
          _this.sort = new InsertSort(_this.container, _this.data)
          _this.sort.init()
          break
        case '归并排序':
          _this.sortStr = 'mergeSort'
          _this.sort = new MergeSort(_this.container, _this.data)
          _this.sort.init()
          break
      }
    }
  })(i, this)
}
