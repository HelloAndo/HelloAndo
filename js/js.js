var ZXTC = {};
$(function(){
    ZXTC.banner = function(){
        var ban = $(".center_team1");
        var ban_ul=ban.find('ul');
        var ban_uli=ban_ul.find('li');
        var len = ban_uli.length;
        var li_width=ban_uli.width()+13;
        
        var left_b=ban.find('.left');
        var right_b=ban.find('.right');
        
        //后面增加4个
        for (var i = 0; i < 4; i++) {
            ban_ul.append(ban_uli.eq(i).clone());
        }
        //前面增加4个
        for (var i = len - 1; i > len - 5; i--) {
            ban_ul.prepend(ban_uli.eq(i).clone());
        }
        
        
        // 根据图片数量变更容器长度
        ban_ul.css({'width':li_width*(len+8)+'px','left':-(li_width * 4)+'px'});
        
         //缓存当前图片索引
        var n = 4;
        
        // 图片滚屏
        var bannerMove = function(){
            ban_ul.animate({
                'left':-li_width*n+'px'
            },500,function(){
                if(n>=len+4){
                    n=4;
                    ban_ul.css('left',-li_width*n+'px');
                }
                else if(n<=4){
                    n=len+4;
                    ban_ul.css('left',-li_width*n+'px');
                }
            });
        };

        var bannerLeft = function(){
            n++;
            bannerMove();
        }
        var bannerRight = function(){
            n--;
            bannerMove();
        }
        // 默认轮播
        var timen = setInterval(bannerLeft,3000);

        right_b.on("click",function(){
            if(ban_ul.is(":animated")){
                return false;
            }
            else{
                clearInterval(timen);
                bannerLeft();
                timen = setInterval(bannerLeft,4000);
            }
        })

        left_b.on("click",function(){
            if(ban_ul.is(":animated")){
                return false;
            }
            else{
                clearInterval(timen);
                bannerRight();
                timen = setInterval(bannerLeft,4000);
            }
        })
    }();
    
    /*首页的图片效果*/
    $('.home_div').hover(function(){
       $(this).find('.word_img').removeClass('hide');
       $(this).siblings('.home_div').find('.word_img').addClass('hide');
   })

// css3动画补增
$('.center_ul1 li').hover(function() {
    $(this).find('img').addClass('fadeScaleRotate');
}, function() {
    $(this).find('img').removeClass('fadeScaleRotate');
});




});


$(function(){

var $pageWrap = $('.pageWrap'),
    $sideNav = $('.sideNav'),
    $sideNav_li = $('.sideNav').find('li');

var img,
    img_w,
    img_h,
    img_k;

var win_w = $(window).width();
var win_h = $(window).height();
var win_k = win_h/win_w;
var nowPage=0;

imgAdjust($('.img_bg'));
$(window).resize(function(event) {
    imgAdjust($('.img_bg'));
    // win_h = $(window).height();
});

$('.header').hover(function() {
    $(this).stop(true, false)
            .addClass('over')
            .removeClass('out')
            .animate({'height': 185}, 300);
    $(this).find('.header_call b').addClass('animated lightSpeedIn');
        
}, function() {
    $(this).stop(true, false)
            .removeClass('over')
            .addClass('out')
            .animate({'height': 120}, 300);
    $(this).find('.header_call b').removeClass('animated lightSpeedIn');
    
});


// 控制页面切换的三种方式start
// 鼠标控制
$('.pageWrap').mousewheel(function(event){
    event.stopPropagation();
    var img_len=$('.screenWrap').length;
    if ($(this).is(':animated')) {return}
    
    if ( event.deltaY>0 && nowPage >0 ) {
        nowPage--;
        gotoPage();
        // $(this).animate({top: -nowPage+'00%' }, 400);
            // $(this).animate({top: -nowPage*$('.screenWrap').height()}, 400)
    }else if( event.deltaY<0 && nowPage<img_len-1 ){
        nowPage++;
        gotoPage();
        // $(this).animate({top: -nowPage+'00%' }, 400);
            // $(this).animate({top: -nowPage*$('.screenWrap').height()}, 400)
    }
});
// 页面指示按钮控制
$sideNav_li.click(function(event) {
    nowPage = $(this).index();
    gotoPage();
});
// 下一页按钮控制
$('.next_container>a').click(function(event) {
    nowPage++;
    gotoPage();
});

// 控制页面切换的三种方式end

$('.gs_p3 li').hover(function() {
    $(this).addClass('self_animate_breathe');
}, function() {
    $(this).removeClass('self_animate_breathe')
});






gotoPage();

// 控制页面滚动的函数
function gotoPage(){
    // 滚动到相应页面
    $pageWrap.animate({top: -nowPage+'00%' }, 400);
    // 更新指示点样式
    $sideNav_li.removeClass('active')
                .eq( nowPage ).addClass('active');
    // 添加一次性动画
    var $thisPage = $('.gs_p'+ ( nowPage+1 ) ),
        $thisAnimate = $thisPage.find('.dtc');
    if( ( $thisPage ) != undefined && !( ( $thisPage ).hasClass('delAnimate') )  ){
        switch( nowPage ){
            case 0:
                $thisAnimate.children('h1').addClass('animated fadeInLeft');
                                                        // .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                                        //     $thisPage.addClass('delAnimate');
                                                        // });
                 $thisAnimate.children('p').addClass('animated fadeInRight');
                 $thisPage.addClass('delAnimate');
                 break;
            case 1:
                $thisAnimate.find('h1').addClass('animated fadeInUp');
                $thisAnimate.find('p').addClass('animated fadeInDown');
                console.log(1)
                $thisPage.addClass('delAnimate');
                break;
            case 2:
                $thisAnimate.addClass('animated pulse');
                $thisPage.addClass('delAnimate');
                break;
            default:
                break;
        }
    }
}


function imgAdjust(obj){

// var img = $('.img_bg');
img=obj;
img_w = img.width();
img_h = img.height();
img_k = img_h/img_w;

win_w = $(window).width();
win_h = $(window).height();
win_k = win_h/win_w;
img.css({
    'left': '0',
    'top': '0'
    });
    if ( img_k < win_k ) {
        img.height( win_h );
        img.width( win_h/img_k );
        img_w = win_h/img_k;
        img.css('left', (win_w - img_w)/2 );
    }else{
        img.width( win_w );
        img.height( win_w*img_k );
        img_h = win_w*img_k;
        img.css('top', (win_h - img_h)/2 );
    }


}



});



