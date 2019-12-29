/**
 * Created by meng_jin on 2018/1/4.
 */
$(function(){
    //fastclick  点击速度优化
    FastClick.attach(document.body);
    $('.people_sm li').html('<i></i>');
    $('.people_sm li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var Index = $(this).index();
        $('.sm_content').children('div').eq(Index).show().siblings('div').hide();
    });
    $('.people_kyz li').html('<i></i>');
    $('.people_kyz li').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var Index = $(this).index();
        $('.kyz_content').children('div').eq(Index).show().siblings('div').hide();
    });
    $(document).on('click','.close-btn1',function(){
        $('.common_model').hide();
    });
    $(document).on('click','.wait_soon_btn',function(){
        $('.wait_soon').fadeIn();
    });
});