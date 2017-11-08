$(function(){
  $("#fixed").hide();
  $("#phone").hide();

  /* 动态设置#pandect图片大小 */
  var win_h=0; //当前屏幕高度
  win_h = $(window).height() - 80;//减去fixed高度
  console.log(win_h);
  

  $("#pandect .title").css({'padding-top':win_h*80/1024,'padding-bottom':win_h*50/1024,'height':win_h*100/1024});
  $("#tables .table_title").css({'padding-bottom':win_h*10/1024,'height':win_h*111/1024});
  var unit_h = win_h - $("#pandect .title").outerHeight(true) - $("#pandect .option").outerHeight(true);// 轮播高度
  console.log(unit_h);
  var unit_w = unit_h*910/510; //轮播宽度
  $("#pandect .roll").css({'height':unit_h,'width':unit_w});
  $("#pandect .roll ul").css({'width':unit_w*3,'height':unit_h});
  $("#pandect .roll ul li").css({'width':unit_w,'height':unit_h});
  $("#pandect .roll ul li img").css({'width':unit_w,'height':unit_h});


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
    $('#pandect .option .unit').css({'opacity':0.4}).eq(pand_num).css({'opacity':1});
  },3000);

  $('#pandect .option .unit').on('click',function(){
    var index = $('#pandect .option .unit').index(this);
    pand_num = index;
    $('#pandect .roll ul').animate({'left':pand_num*(0-unit_w)},400,'swing');
    $('#pandect .option .unit').css({'opacity':0.4}).eq(index).css({'opacity':1});
  });


  /*details*/
  /* 比例 big 1024-100 : 412
  563 : 412 w:h
  txt 423:412
    small 1024-100 : 130
  */
  console.log(win_h);
  console.log($('.details .container').outerHeight());
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


  /*初始small 下第一个li opacity;1 */
  $('.details').each(function(index,ele){
    $(ele).find('.small li').eq(0).css({'opacity':1});
  })


  /* 点击切换 */
  $('.details .small li').on('click',function(){
    var parent = $(this).parents('.details');
    var index =  parent.find('.small li').index(this);
    parent.find('.small li').css({'opacity':0.6}).eq(index).css({'opacity':1});
    var unit_w = $('.details .container .main .big').width();
    parent.find('.big ul').animate({'left':index*(0-unit_w)},600,'swing');
  }).on('mouseover',function(){
    if($(this).css('opacity') == 0.6){
      $(this).css('opacity',0.9)
    }
  }).on('mouseleave',function(){
    if($(this).css('opacity') == 0.9){
      $(this).css('opacity',0.6)
    }
  });
  
  

  


  $('.jump').on('click',function(){
    var str = window.location.href;
    var strFirst = str.indexOf('#');
    if(strFirst == -1){
      window.location.href = str + '#page6';
    }else{
      str = str.substring(0,strFirst);
      console.log('first: ' + strFirst);
      console.log('str: ' + str);
      window.location.href = str + '#page6';
    }
  });






  /*表单验证*/

  
 
 
  /*获取验证码*/
  $('.getVerify').click(function () {
    var parent = $(this).parents('#fixed');
    parent.num = 0;
    get_verify(parent);
  });
  function get_verify(parent) {
    var parent = parent;
    var mobile = parent.find(".tel").val();
    var partten = /^1[3-9]\d{9}$/;
    if(!partten.test(mobile)){
      parent.find('.hint').text("请输入正确的手机号码").css('color','red');
      parent.find(".tel").focus();
      return false;
    }
    $.get("http://www.cy177.com/api.php?op=sms&callback=?",{ mobile: mobile,type:'国庆2017',random:Math.random()}, function(data){
      if(data=="0") {
        parent.time = 120;
        parent.find(".getVerify").attr("disabled", true);
        parent.isinerval = setInterval( function () {
          CountDown(parent)
        } , 1000);
      }else if(data=="true") {
        parent.find('.hint').text("你已注册请勿重复").css('color','red');
      }else if(data=="-1") {
        parent.find('.hint').text("你今天获取验证码次数已达到上限").css('color','red');
      }else {
        parent.find('.hint').text("短信发送失败").css('color','red');
      }
    },'jsonp');
  }
  /*验证码禁用*/
  function CountDown(parent) {
    if (parent.time < 1) {
      parent.find(".getVerify").val("获取验证码").attr("disabled", false).css({'cursor':'pointer'});
      clearInterval(parent.isinerval);
      return;
    }
    parent.find(".getVerify").val(parent.time+"秒后重获").css({'cursor':'not-allowed'});
    parent.time--;
  }
  /*验证码是否正确 */
  
    $(".verify").blur(function(){
      var parent = $(this).parents('#fixed');
      /* 验证码为空时不验证 */
      if(parent.find('.verify').val() != '' && parent.find('.verify').val() != '验证码'){
        verify = parent.find(".verify").val();
        mobile= parent.find(".tel").val();
        $.get("http://www.cy177.com/api.php?callback=?",{op:"sms_idcheck",action:"id_code",mobile:mobile,mobile_verify:verify,type:'国庆2017'}, function(data){
          if( data == "1" ) {
            parent.find('.hint').text("验证码正确").css('color','green');
          } else {
            parent.find('.hint').text("验证码不正确").css('color','red');
            return false;
          }
        },'jsonp');
      }
    });

  /*表单提交*/
  
  $(".sub").click(function(){
    

    var parent = $(this).parents('#fixed');
    verify = parent.find(".verify").val();
    mobile= parent.find(".tel").val();
    username = parent.find(".name").val();
    type = parent.find('.type').val();
    console.log('name: '+username+', mobile: '+mobile+', verify :'+verify+', type :' +type);
    /*点击提交按钮 验证数据*/
    $.get("http://www.cy177.com/index.php?m=ptjd&c=index&a=register&callback=?",{Cname:username,Mobile:mobile,type:type,mobile_verify:verify},function(data){
      if(data == 'success'){
        alert('感谢您的参与！我们将会尽快与您联系！');
        /* 刷新页面 并删除锚记 */
        var href = location.href;
        var str = '';
        str = href.substring(0,href.indexOf('#'));
        location.href = str;
      }else if(data == 'true'){
        alert('您已成功参与活动报名，请勿重复提交！');
      }else if(data == 'errorcode'){
        parent.find('.hint').text("验证码输入错误").css('color','red');
      }else if(data == 'errortel'){
        parent.find('.hint').text("手机号码不正确").css('color','red');
      }
    },'jsonp');
    return false;
  })


  $('.tel').on('focus',function () {
		if($(this).attr('value') == '电话'){
			$(this).val('');
		}
	}).on('blur',function () {
		if($(this).val() == ''){
			$(this).attr('value','电话').val('电话');
		}
	}).on('change',function () {
    if($(this).val() != '' && $(this).val != '电话'){
      $(this).attr('value',$(this).val());
    }
  });
	$('.verify').on('focus',function () {
    if($(this).attr('value') == '验证码'){
      $(this).val('');
    }
  }).on('blur',function () {
		if($(this).val() == ''){
		  $(this).val('验证码').val('验证码');
		}
	}).on('change',function () {
    if($(this).val() != '' && $(this).val != '验证码'){
      $(this).attr('value',$(this).val());
    }
  });
  


});