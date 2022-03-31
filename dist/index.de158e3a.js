//jQuery提供一个函数，这个函数接收一个选择器，CSS选择器
//const api = jQuery(".test"); // 不返回元素们，返回 api 对象
//api.addClass("red") 的返回值是api,继续调用.addClass()为链式操作
//api
// jQuery(".test")
//   .addClass("red") //this 就是 api
//   .addClass("blue") //this 就是 api
//   .addClass("green"); //遍历所有刚才获取的元素，添加.red
// obj.fn(p1); //函数里的 this 就是obj
// obj.fn.call(obj, fn);
// const x1 = jQuery(".test").find(".child"); //查找 test 里面的 child
// console.log(x1);
// const api1 = jQuery(".test"); //获取 test
// api1.addClass("blue"); //在上面加了blue
// const api2 = api1.find(".child").addClass("red"); //获取到 test 的 child 并加上 red
// api1.addClass("green"); //在 api1 上加 green
// jQuery(".test") //操作 api1
//   .find(".child") //对 api2 进行操作
//   .addClass("red")
//   .addClass("blue")
//   .addClass("green")
//   .end()
//   .addClass("yellow");
//上述代码改写为以下，可以更好的理解jquery.js中的：
//array.oldApi = this;以及end()函数
// const api1 = jQuery(".test");
// const api2 = find(".child").addClass("red").addClass("blue").addClass("green");
// const oldApi = api2.end().addClass("yellow"); //使用新api调用end()
// const x = jQuery(".test").find(".child");
// //x 是可以操作所有 child 的 api
// //(div) => console.log(div) 函数传进去的时候没有被调用，在each()里被调用
// x.each((div) => console.log(div));
//找到并打印出test的爸爸
// const x = jQuery(".test");
// x.parent().print();
// const x = jQuery(".test");
// x.children().print();
//若是普通的 div 就用el开头或者直接命名 DOM对象
// const elDiv1 = document.querySelector(".test"); //找到第一个类名为 test 的 div
// //若是jQuery产生的一个 api 对象，要使用 jQuery 的 $ 开头
// const $div2 = $(".test"); //div2获取的是操作 test 对应的 div 的一个 api，不是div本身
// //div2 到底是 DOM 对象 还是 jQuery 对象
// //DOM 对象只能使用 DOM API querySelector  appendChild
// //jQuery 对象只能使用 jQuery 的 API  find each
// $div2.each();
//增加一个div
const $div = $("<div>123456</div>");
$div.appendTo(document.body);

//# sourceMappingURL=index.de158e3a.js.map
