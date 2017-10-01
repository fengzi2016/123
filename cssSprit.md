# 学习雪碧图总结

## 一、初看遇到的问题
1. **什么是mixin?**

mixin是Sass Basics中的用法，官方文档里面是这样写的：
> A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. You can even pass in values to make your mixin more flexible. A good use of a mixin is for vendor prefixes. Here's an example for border-radius. 

就是可以重复利用和可以传参数的CSS“模板”

例子:

    @mixin border-radius($radius) {
      -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
    }

    .box { @include border-radius(10px); }
2. **nth($sprite,9)** 是什么意思？

>nth()函数用来指定列表中某个位置的值。不过在Sass中，nth()函数和其他语言不同，1是指列表中的第一个标签值，2是指列给中的第二个标签值，依此类推。

例子：
   
    >> nth(10px 20px 30px,1) 
    10px
    >> nth((Helvetica,Arial,sans-serif),2) 
    "Arial" 
    >>  nth((1px solid red) border-top green,1) 
    (1px "solid" #ff0000)
所以($sprite,9)的意思就是选$sprite这个参数里的第9个标签值。


## 二、第二遍的精简

1. **图片大小比例化**,需要修改的部分：

修改"sprite-width和sprite-heigth"模板

    @mixin sprite-width($sprite) {
    width: 90%;
    }

    @mixin sprite-height($sprite) {
    height: 90%;
    }

2. **background-size比例化**，需要修改的部分：

首先修改"sprite-size"模板

    @mixin sprite-size($sprite,$img_height) {
    $sprite-total-height: nth($sprite, 8);
    background-size: auto  ($sprite-total-height / $img_height) * 100%;
    }

其次修改 "sprite"模板
    
     @mixin sprite($sprite,$img_height) {
    /*增加参数$img_height*/
    @include sprite-size($sprite,$img_height);
    @include sprite-image($sprite);
    @include sprite-width($sprite);
    @include sprite-height($sprite);
    }
    .box {
     /*增加参数$img_height*/
    @include sprite($img-1,893px);
    }
3.**background-position比例化**，需要修改的部分:

修改"sprite-position"模板

    @mixin sprite-position($sprite,$img_height) {
        $sprite-total-height: nth($sprite, 8);
        $sprite-total-width: nth($sprite, 7);
        $sprite-y: nth($sprite, 2) / ($sprite-total-height - $img_height) * 100%;
        background-position: 0  $sprite-y;
    }

## 总结：

做到容器大小自适应，图片大小自适应，偏移量大小自适应。