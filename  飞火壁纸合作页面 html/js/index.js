var jump_mk = 1,
    nowIndex = 0;
$(window).resize(function() {
    jump_mk = 1;
    setTimeout(function() {
        $(".out-div").stop().animate({ "scrollTop": nowIndex * $(".out-div").height() }, 50, function() {
            jump_mk = 0;

        });
    }, 200);

});
var fake_load_num = 0,
    flashLoad = 100;
function fakeLoad(flg) {
    if (flg != "end") {
        if (fake_load_num < 100 && flashLoad != 100) {
            fake_load_num++;
            if (fake_load_num >= 100) {
                if (flashLoad >= 100) {
                    fake_load_num = 100;
                } else {
                    fake_load_num = 99;
                }
            }
            setTimeout(fakeLoad, 30);
        } else {
            fake_load_num = 100;
            jump_mk = 0;
        }
    } else {
        fake_load_num = 100;
        jump_mk = 0;

    }

}
fakeLoad();
setTimeout(function() {
    fakeLoad("end")
}, 10000);
function jumpPsge(num) {
    if (jump_mk == 0) {
        jump_mk = 1;
        setTimeout(function() {
            $(".out-div").stop().animate({ "scrollTop": num * $(".out-div").height() }, 500, function() {
                jump_mk = 0;
            });
        }, 200);
    }
}
//滚轮事件
function scrollFunc(e) {
    if (jump_mk == 1) {
        return false;
    }
    var direct = 0;
    e = e || window.event;
    if (e.wheelDelta) { 
        direct = e.wheelDelta;
    } else if (e.detail) { 
        direct = -1 * e.detail;
    }
    if (direct > 0) {

        if (nowIndex - 1 < 0) {

            nowIndex = 0;
            return;
        } else {
            nowIndex--;
        }
    } else {

        if (nowIndex * 1 + 1 > 3) {
            nowIndex = 3;
            return;
        } else {
            nowIndex++;

        }
    }
    jumpPsge(nowIndex);
}
//绑定鼠标滚轮事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
} //W3C
window.onmousewheel = document.onmousewheel = scrollFunc;
$(document).mousemove(function(e){
    $("#mouseXY").css({ "position": "absolute", "left": e.pageX , "top": e.pageY });
});