/**
 * Created by meng_jin on 2017/9/18.
 */
$(function () {
    //fastclick  点击速度优化
    FastClick.attach(document.body);
    //禁止页面滑动的函数
    function stopScroll(){
        return false;
    }
    $('.menu').click(function(){
        $(this).toggleClass('active');
        var menuItem = $('.menu_list')
        if( $(this).hasClass('active') ){
            menuItem.stop().slideDown('fast');
        }else{
            menuItem.stop().slideUp('fast');
        }
    });
    $(document).on('click','.menu',function(e){
        e.stopPropagation()
    });
    $(document).on('click',function(){
        $('.menu').removeClass('active');
        $('.menu_list').stop().slideUp('fast');
    });

    $(document).on('scroll',$(document).scrollTop());

    $(".top_btn").click(function () {
        var speed=300;
        $('body,html').animate({
            scrollTop: 0
        }, speed);

        return false;
    });

    $('.activation_input input').focus(function(){
        if($(this).val()=='请输入激活码') {
            $(this).val('')
        }
    }).blur(function(){
        if($(this).val()=='') {
            $(this).val('请输入激活码')
        }
    });

    $('.fl4_list li').click(function(){
       $(this).addClass('active').siblings().removeClass('active');
        var Index = $(this).index();
        $('.list_content').children().eq(Index).show().siblings().hide();
    });
    $('.fl4_item li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        var Index = $(this).index();
        $('.item_content').children().eq(Index).show().siblings().hide();
    });
    $('.play_btn').click(function(){
        $(this).next()[0].play();
    });
    $(document).on('click','.close-btn1',function(){
        $('.common_model').fadeOut();
        $(document).off('touchmove',stopScroll);
    });
    $(document).on('click',function(){
        $('.common_model').fadeOut();
        $(document).off('touchmove',stopScroll);
    });
    $(document).on('click','.sign_btn',function(e){
        e.stopPropagation();
        $('.login_model').fadeIn();
        $(document).on('touchmove',stopScroll);
    });
    $(document).on('click','.login_model_box',function(e){
        e.stopPropagation()
    });

});


