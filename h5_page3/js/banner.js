/**
 * Created by meng_jin on 2017/9/19.
 */
$(document).ready(function(){
    var bar = $(".main_visual .bar");
    var imgNum = $(".main_image ul li").size();
    for(var j=1;j<=imgNum;j++){
        $('.flicking_con').append('<li></li>');
    }
    $('.flicking_con li:first').addClass('on');
    barAniMate();
    $dragBln = false;

    $(".main_image").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".flicking_con li"),
        counter : function (e){
            $(".flicking_con li").removeClass("on").eq(e.current-1).addClass("on");
        }
    });

    $(".main_image").bind("mousedown", function() {
        $dragBln = false;
    });

    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });

    $(".main_image a").click(function(){
        if($dragBln) {
            return false;
        }
    });

    timer = setInterval(function(){
        barAniMate();
        $("#btn_next").click();
    }, 5000);

    $(".main_visual").bind("touchstart",function(){
        bar.stop().css('width',0);
        clearInterval(timer);
    }).bind("touchend", function(){
        barAniMate();
        timer = setInterval(function(){
            barAniMate();
            $("#btn_next").click();
        }, 5000);
    });

    function barAniMate(){
        bar.animate({width:'100%'},5000,function(){
            $(this).css('width',0);
        });
    }
});