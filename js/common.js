$(function(){
    /*$("img.lazy").lazyload({
        effect:'fadeIn',
        threshold : 150
    });*/
})

var is_wap = 0;

//增加搜索记录
function add_history(obj,type){
    var parent = $(obj).parents(".form-inline");
    var search_keyword = $(obj).parents("form").find(".form-input").val();
    var data_key = parent.data('key');

    if(!$.trim(search_keyword)) return ;

    $.ajax({
        url: '/searchHistory/ajax_add_history',
        type: 'GET',
        dataType: 'json',
        data: { keyword: search_keyword},
    }).done(function(res) {})
    if(data_key == "alibaba" && !is_wap){
        $.ajax({
            url: '/Public/ajax_encode',
            type: 'GET',
            dataType: 'json',
            async:false,
            data: { keyword: search_keyword },
        }).done(function(res) {
            if(res.status) {
                search_keyword = res.data;
                parent.find('#keywords').val(search_keyword);
            }
        })
        window.open(parent.attr("action") + "?keywords="  + search_keyword);
    }
}

function type_search(data){
    var link = $('.form-search').find('.dropdown-menu .active').data("url");
    var swd = $(".form-search").find('input[name=swd]').val()
    var data_key = $('.form-search').find('.dropdown-menu .active').data('key');
    var keyword = $('.form-search').find('.dropdown-menu .active').data('keyword');

    var str = '';
    if(!$.trim(swd)) return false;

    $.ajax({
        url: '/searchHistory/ajax_add_history',
        type: 'GET',
        dataType: 'json',
        data: { keyword: swd},
    }).done(function(res) {})


    if(data_key == "alibaba" && !is_wap){
        $.ajax({
            url: '/Public/ajax_encode',
            type: 'GET',
            dataType: 'json',
            async:false,
            data: { keyword: swd },
        }).done(function(res) {
            if(res.status) {
                swd = res.data;
            }
        })
    }
    str = keyword + "=" + swd;

    if(data_key == 'jd'){
        str += '&enc=utf-8';
    }

    window.open(link + "?"  + str);
}

function get_history(keyword,selector){
    if(!$.trim(keyword)) {
        // $('.search-result').html("").hide();
        // return false;
    }

    $.ajax({
        url: '/searchHistory/ajax_get_hisorys',
        type: 'GET',
        dataType: 'json',
        data: { keyword: keyword },
    }).done(function(res) {
        if(res.status){
            var str = "";
            if(res.data){
                 // onclick='li_location(this)'
                $.each(res.data,function(index, val){
                    str += "<li data-id='" + val.id + "' class='li-" + val.id + "'><a class='t'>" + val.title + "</a><span class='close-kw' onclick='close_kw(this)'>x</span></li>";
                })
            }
            if(!str) {
                $('.search-result').hide();
                return false
            }
            $('.search-result').show();
            $('.search-result ul').html(str);
            // $('.search-result li').bind('click');
        }else{
            $('.search-result').hide();
        }
    })
}