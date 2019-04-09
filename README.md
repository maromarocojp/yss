概要
==================
軽量、シンプルで汎用性の高いドロワーメニューjQyeryプラグインです。

特徴
==================
・スライドで出す要素と開閉ボタンはbody内のどこにおいても良い
・ひとつのページにいくつも設置できる
・レスポンシブ対応
・余計なオプションが無く軽量
・余計なオプションが無いのでカスタマイズしたい場合はJS、CSSの知識が必要

使い方
==================
jQyery、yss.js、yss.cssを読み込んだうえで、以下の様にクラスとデータ属性を設定します。


    <p class="yss_open" data-yss="number1">開くボタン</p>
 
    <div class="yss_contents" data-yss="number1">
      <p class="yss_close">閉じる</p>
      <!-- スライド要素内 -->
    </div>

詳細はブログで解説しています。
https://blog.maromaro.co.jp/archives/6779


This software is released under the MIT License, see LICENSE.txt.