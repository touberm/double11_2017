$(function(){
  $("#fixed").hide();
  $("#phone").hide();

  /* 动态设置#pandect图片大小 */
 
  var win_w = $(window).width();
  /* 914:520 win_w-16:roll_h-16 */
  var roll_w = $('.roll').width();
  var roll_h = roll_w*1250/760;

  var unit_w = roll_w;
  var unit_h = roll_h;

  // $("#pandect .title").css({'padding-top':win_h*80/1024,'padding-bottom':win_h*50/1024,'height':win_h*100/1024});
  // $("#tables .table_title").css({'padding-bottom':win_h*50/1024,'height':win_h*111/1024});
  
  $("#pandect .roll").css({'height':roll_h});
  $("#pandect .roll ul").css({'width':unit_w*3,'height':unit_h});
  $("#pandect .roll ul li").css({'height':unit_h,'width':unit_w});
  $("#pandect .roll ul li img").css({'height':unit_h,'width':unit_w});


  /*初始small 下第一个li opacity;1 */
  $('#pandect .option .unit').each(function(index,ele){
    if(index == 0){
      $(ele).css({'opacity':1});
    }
  })  
  /* 轮播 */
  var max_pand_num = $("#pandect .roll ul li").length;//轮播图最大数
  var pand_num = 0;//当前轮播图序号
  var pandect_timer = setInterval(function(){
    pand_num = (pand_num >= max_pand_num - 1) ? 0 : (pand_num+1);
    $('#pandect .roll ul').animate({'left':pand_num*(0-unit_w)},400,'swing');
  },3000);


  /*details*/
  /* 比例 big 1024-100 : 412
  563 : 412 w:h
  txt 423:412
    small 1024-100 : 130
  */
  var big_w = $('.details .big').width();
  var big_h = 412*big_w/563;
  console.log(big_w);
  $('.details .big').height(big_h);
  $('.details .big ul').height(big_h);
  $('.details .big ul li').height(big_h);
  $('.details .big ul li img').height(big_h);
  var big_num = 0;
  var max_big_num = $(".details").eq(0).find('.big ul li').length;
  console.log(max_big_num);

  var big_timer = setInterval(function(){
    big_num = (big_num >= max_big_num - 1) ? 0 : (big_num+1);
    $('.details .big ul').animate({'left':big_num*(0-big_w)},400,'swing');
  },3000);


/*   console.log($('.details .container').outerHeight());
  if(win_h <= $('.details .container').outerHeight()){
    console.log('开启.details缩放')
    console.log(412*win_h/924);
    console.log(563*win_h/924);
    $('.details .container .main').css({'height':412*win_h/924});
    $('.details .container .main .big').css({'height':412*win_h/924,'width':563*win_h/924});
    $('.details .container .main .big ul').css({'height':412*win_h/924,'width':563*win_h/924*4});
    $('.details .container .main .big ul li').css({'height':412*win_h/924,'width':563*win_h/924});
    $('.details .container .main .big ul li img').css({'height':412*win_h/924,'width':533*win_h/924});
    $('.details .container .main .txt').css({'height':412*win_h/924,'width':423*win_h/924});
    $('.details .container .main .txt img').css({'height':412*win_h/924,'width':423*win_h/924});
    $('.details .container .small').css({'height':130*win_h/924});
    $('.details .container .small li').css({'height':130*win_h/924,'width':130*win_h/924});
    $('.details .container .small li img').css({'height':130*win_h/924,'width':130*win_h/924});
  }
 */

  /*初始small 下第一个li opacity;1 */
  $('.details').each(function(index,ele){
    $(ele).find('.small li').eq(0).css({'opacity':1});
  })



  
  

});