/*
 * @Description: 
 * @version: 
 * @Author: 朱宇
 * @Date: 2019-09-23 20:08:27
 * @LastEditTime: 2019-09-27 10:08:02
 */

//创建xhr对象
var xhr = new XMLHttpRequest();
//建立与服务器连接，数据为easymock自己构造
xhr.open("GET", "http://jsonplaceholder.typicode.com/posts", true);
//ajax加载方式，并且处理数据
xhr.onload = function () {
  if (this.status == 200) {
    var contentArrayK = JSON.parse(this.responseText);
    var contentArray = contentArrayK.map(item => {
      return item.title.slice(0, 40);
    })
    // console.log(contentArray)
    //封装获取id，防止写错
    function ById(id) {
      return document.getElementById(id)
    }
    //获取input框
    var input = ById("input");
    //获取展示ul
    var ul = ById("ul");
    ul.onclick = function (e) {
      var e = window.event || e;
      var tar = e.srcElement || e.target;
      if (tar.nodeName == "LI") {
        input.value = tar.innerText;
        dis.style.display = "none"
      }
    }
    //获取dis
    var dis = ById("dis");
    //模拟下拉框，使用focus控制下拉框的展示，下拉框展示使用遍历获取的数组
    input.onfocus = function () {
      let items = ''
      for (let i = 0; i < contentArray.length; i++) {
        items += `
    <li>${contentArray[i]}</li>
  `
      }
      ul.innerHTML = items;
      dis.style.display = "block";

    }

    //失去焦点下拉框消失
    input.onblur = function () {
      // dis.style.display = "none"
    }
    //使用input事件监听input框的值变化
    input.addEventListener("input", checkContent)
    //input框的值变化执行的函数
    function checkContent(e) {
      let reg = new RegExp(`^${e.target.value}`);
      let items = '';
      for (let i = 0; i < contentArray.length; i++) {
        let regData = contentArray[i].match(reg)
        if (regData) {
          items += `
  <li><span style="color:red">${contentArray[i].slice(0,e.target.value.length)}</span>${contentArray[i].slice(e.target.value.length)}</li>
`
        } else {
          items += `
  <li>${contentArray[i]}</li>
`
        }
      }
      ul.innerHTML = items;
    }
  }
}

xhr.send();