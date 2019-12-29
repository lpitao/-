/**
 * Created by meng_jin on 2017/9/20.
 */
$(function(){
    var tabsSwiper = new Swiper('.swiper-container',{
        speed:500,
        onSlideChangeStart: function(){
            $(".tabs .active").removeClass('active');
            $(".tabs li").eq(tabsSwiper.activeIndex).addClass('active');
        }
    });

    $(".tabs li").on('touchstart mousedown',function(e){
        e.preventDefault()
        $(".tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper.swipeTo($(this).index());
    });

    $(".tabs li").click(function(e){
        e.preventDefault();
    });
});
