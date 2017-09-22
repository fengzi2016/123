

/**
 * The Module Pattern
 * 模块模式
 */
//用一个全局变量传递
var myModule = (function () {
    return {
      hello: function hello() {
        return 'Hello, world!';
      }
    };
  }());
  
  test('Module pattern', function () {
    equal(myModule.hello(),
      'Hello, world!',
      'Module works.');
  });
  //用一个参数传递
  (function (exports) {
    var api = {
        moduleExists: function test() {
          return true;
        }
      };
    $.extend(exports, api);
  }((typeof exports === 'undefined') ?
      window : exports));
  
  test('Pass in exports.', function () {
    ok(moduleExists(),
      'The module exists.');
  });
  //传递应用对象
  var app = {};
  
  (function (exports) {
  
    (function (exports) {
      var api = {
          moduleExists: function test() {
            return true;
          }
        };
      $.extend(exports, api);
    }((typeof exports === 'undefined') ?
        window : exports));
  
  }(app));
  
  test('Pass app as exports.', function () {
    ok(app.moduleExists(),
      'The module exists.');
  });
// 
// 异步模块定义
//   异步加载需要的模块
 
define(['ch04/amd1', 'ch04/amd2'],
  function myModule(amd1, amd2) {
    var testResults = {
        test1: amd1.test(),
        test2: amd2.test()
      },

      // Define a public API for your module:
      api = {
        testResults: function () {
          return testResults;
        }
      };

    return api;
  });
 /* 当使用CSS或者html文件时，需要在文件路径前加 text!
 */
'use strict'
require(['ch04/mymodule.js', 'text!ch04/mymodule.html'],
function(myModule,view){
    let container = document.body;
    css = 'ch04/mymodule.css';
    myModule.render(container,view,css);
    test('AMD Plugins', function () {
        equal($('#mymodule').text(), 'Hello, world!',
          'Plugin loading works.');
      });
});
/**
 * Node.js 模块
 */
/*暴露部分*/
'use strict';
var foo = function foo () {
  return true;
};

exports.foo = foo;
/**
 * 接收部分
 */
var flatiron = require('flatiron'),
app = flatiron.app;
/*或者利用相对路径*/
'use strict';
var mod = require('./ch04-modules.js'),
  result = (mod.foo() === true) ? 'Pass:' : 'Fail:';

console.log(result, '.foo() should return true.');


/**
 * ES6 模块化
 */
//暴露部分
var foo = function foo () {
    return true;
  };
  export { foo };
/********/
//只暴露模块中的一部分
var foo = function foo () {
    return true;
};
export default foo;//不需要大括号
    
  //接收部分
  import { foo } from 'es6-foo';
  /*******/
  import { foo as bar } from 'es6-foo';//重命名
  /*******/
  import foo from 'es6-foo';//接收部分暴露，不需要大括号
  
  let test = foo() === true ? 'Pass' : 'Fail';
  
  console.log(test, 'foo() should import and return true.');