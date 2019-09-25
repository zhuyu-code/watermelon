/*
 * @Description: ,
 * @version: 
 * @Author: 朱宇
 * @Date: 2019-09-24 21:49:45
 * @LastEditTime: 2019-09-25 08:40:06
 */
let lists = ['sd','sd2','sdf'];
$(function () {
    getListsBy();
    $('#my_input').focus(function () {
        $('#selected_menu').show();
    })
    $('#my_input').keyup(function (value) {
        getByValue(value.target.value);
    })
})
//封装ajax请求easymock数据
function getListsBy() {
    $.ajax({
        type: 'GET',
        url: 'http://jsonplaceholder.typicode.com/posts',
        dataType: 'JSON',
        success: function (mes) {
            lists = mes;
            console.log(lists)
            for (let i = 0; i < lists.length; i++) {
                $('#my_lists').prepend('<li>' + lists[i].title + '</li>');
            }
            selectItem();
        }
    })
}
function getByValue(values) {
    let indexsArr = [];
    for (let i = 0; i < lists.length; i++) {
        const indexStr = lists[i].title.indexOf(values);
        indexStr ? '' : indexsArr.push(lists[i].title);
    }
    if (indexsArr.length !== 0) {
        $('#my_lists').empty();
        for (let i = 0; i < indexsArr.length; i++) {
            $('#my_lists').prepend('<li>' + renderRed(indexsArr[i], values) + '</li>');
            // + '<span>'++'</span>'
        }
        selectItem()
    } else {
        $('#my_lists').empty().append('空');
    }
}
// 选择li
function selectItem() {
    $('#my_lists li').click(function (value) {
        $('#my_input').val(value.target.outerText);
        $('#selected_menu').hide();
    })
}
function renderRed(indexsArrItem, values) {
    return "<li>" + "<span style='color: red'>" + values + "</span>" + indexsArrItem.substring(values.length, indexsArrItem.length) + "</li>"
}
