/**
 yss.js
 
 Copyright (c) 2019 Maromaro
 
 Please confirm the usage with the following URL.
 https://blog.maromaro.co.jp/archives/6779
 
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
 */

$('.yss_content').each(function() {
  
  var
    current_scrollY,
    $open_btn,
    $close_btn,
    $content = $(this),
    id,
    content_position = 'right',
    breakpoint = 768; //ブレークポイント
  
  if($(this).hasClass('yss_left')){
     content_position = 'left';
  }
  
  $(function(){
    
    id = $content.data('yss');
    $open_btn = $('.yss_open[data-yss="'+id+'"]');
    $close_btn = $content.find('.yss_close');
    var $close_btn02 = $('.yss_active[data-yss="'+id+'"]');
    
    //コンテンツサイズ調整
    content_size();
    $(window).on('resize', content_size);
    
    //PC時に隠す
    pc_menu_hide();
    $(window).on('resize', pc_menu_hide);
    
    //コンテンツ開
    $open_btn.click(content_open);
    
    //コンテンツ閉
    $close_btn.click(content_close);
    $close_btn02.click(content_close);
    
    //メニュー内のアンカーリンクをクリックしたらコンテンツ閉
    $content.find('a[href^="#"]').click(content_close);
    
    var
      content_scrollTop,
      content_innerHeight,
      content_scrollHeight;
    
    //コンテンツ内がスクロールしたら
    $content.scroll( function(){
      content_scrollTop = $content.scrollTop();
      content_innerHeight = $content.innerHeight();
      content_scrollHeight = $content.get(0).scrollHeight;
      
      if (content_scrollTop === 0) {
        //最上だったら1px下げる
        $content.prop( { scrollTop: 1 } );
      }
      else if (content_scrollTop + content_innerHeight === content_scrollHeight) {
        //最下だったら1px上げる
        $content.prop( { scrollTop: content_scrollTop - 1 } );
      }
    });
    
    //コンテンツ内にタッチしたとき、最上か最下だったらスクロールを停止する
    //またはコンテンツ内の要素がスクロールするに満たない場合停止する
    $content.on('touchmove.noScroll', function(e) {
      
      //子要素の合計の高さを取得
      var content_childrenH = 0;
      $content.children().each(function(){
        content_childrenH = content_childrenH + $(this).outerHeight();
      });
      
      var target = $(e.target);
      if(target.parents($content).length && content_scrollTop !== 0 && content_scrollTop + content_innerHeight !== content_scrollHeight && $content.innerHeight() <= content_childrenH){
        e.stopPropagation();
      }else{
        e.preventDefault();
      }
      
    });
    
  });
  
  //コンテンツ閉
  function content_open(){
    //ボタンがactiveだったら閉じる
    if($(this).hasClass('yss_active')){
      content_close();
      return;
    }
    
    $content.prop( { scrollTop: 1 } );
    //コンテンツ以外のスクロールを止める
    $('body').on('touchmove.noScroll', function(e) {
      var target = $(e.target);
      if(target.parents($content).length){
        e.stopPropagation();
      }else{
        e.preventDefault();
      }
    });
    $('html, body').css('overflow','hidden');
    $('body').css({'-webkit-overflow-scrolling':'auto'});
    
    //コンテンツ開
    if(content_position == 'left'){
      //コンテンツ位置が左の場合左から
      $content.animate({
        'left':'0'
      },{
        'duration': 200,
        'easing': 'swing',
        'complete': function(){
          current_scrollY = $( window ).scrollTop();
        }
      });
      $(this).addClass('yss_active');
    }else{
      //右から
      $content.animate({
        'right':'0'
      },{
        'duration': 200,
        'easing': 'swing',
        'complete': function(){
          current_scrollY = $( window ).scrollTop();
        }
      });
      $(this).addClass('yss_active');
    }
  }
  //コンテンツ閉
  function content_close(){
    $( 'html, body' ).css('overflow','auto').prop( { scrollTop: current_scrollY } );
    $('body').css({'-webkit-overflow-scrolling':'touch'});
    
    if(content_position == 'left'){
      $content.animate({
        'left':'-100%'
      },{
        'duration': 200,
        'easing': 'swing',
        'complete': function(){
          $('body').off('.noScroll');
        }
      });
    }else{
      $content.animate({
        'right':'-100%'
      },{
        'duration': 200,
        'easing': 'swing',
        'complete': function(){
          $('body').off('.noScroll');
        }
      });
    }
    $open_btn.removeClass('yss_active');
  }
  
  //コンテンツサイズ調整
  function content_size(){
    var h = window.innerHeight;
    
    $content.css({'height':h+'px'});
    
  }
  
  //レスポンシブ時、PCビューでメニューを消す
  function pc_menu_hide(){
    if(window.innerWidth > breakpoint){
      $('.yss_pchide').hide();
    }else{
      $('.yss_pchide').show();
    }
  }

});

