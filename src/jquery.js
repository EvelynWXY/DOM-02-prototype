window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //查找div
      //jQuery接收一个选择器，根据选择器得到一些元素，返回一个对象，对象有方法可以操作这些元素
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }
  const api = Object.create(jQuery.prototype); //创建一个对象，这个对象的__proto__为括号里的：jQuery.prototype
  //相当于const api = { __proto__: jQuery.prototype };
  //   api.elements = elements;
  //   api.oldApi = selectorOrArrayOrTemplate.oldApi;
  //assign 把 后者对象的属性复制到前者（api）上（浅复制）
  Object.assign(api, {
    elements: elements, //把 elements 复制到 api 的 elements
    oldApi: selectorOrArrayOrTemplate.oldApi, //把selectorOrArrayOrTemplate.oldApi 设置到 api 的 oldApi
  });

  //api可以操作elements
  //   const api={}
  //返回一个对象去操作 elements
  //   return {
  //     elements: elements,

  //     oldApi: selectorOrArrayOrTemplate.oldApi,
  //   };
  return api;
  //return api; //不return elements，return可以操作elements的api
};
//闭包：函数访问外部的变量
jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  //一开始 jQuery 的 prototype 中就有 constructor 属性
  get(index) {
    return this.elements[index];
  },
  //插入到某个节点
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el)); // 遍历 elements，对每个 el 进行 node.appendChild 操作
    } else if (node.jquery === true) {
      this.each((el) => node.get(0).appendChild(el)); // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  //elements是一个数组，在每一个element上添加一个class，给className遍历elements
  //api为一个对象，其中key为addClass，value为(){}是一个function
  addClass(className) {
    for (let i = 0; i < elements.length; i++) {
      this.elements[i].classList.add(className); //每个element添加一个className
    }
    return this; //此处的this就是api,之所以使用this是因为在这个函数中可以没有api这个变量，而是直接使用return
  },
  //遍历并对每个元素执行fn,each接收一个函数在某个时候会调用这个函数，调用的时候会传elements[i]和i
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this; //this就是 api 对象
  },
  //获取每个元素的爸爸
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  //获取儿子
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children); //... 为展开操作符号
      //等价于array.push(node.children[0],node.children[1],node.children[2]...)
    });
    return jQuery(array);
  },
  //打印出每个元素
  print() {
    console.log(this.elements);
  },

  //查找XXX里面的xx元素
  find(selector) {
    let array = []; //声明临时数组储存我们新查找的元素
    for (let i = 0; i < this.elements.length; i++) {
      //用之前的空数组连接上新的元素，然后把新的元素得到的新数组再放回array，即array = array + elements2
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this; //this 就是 api
    //jQuery 传什么，就会返回一个对象操作什么
    return jQuery(array); //给 array 返回 newApi
  },
  end() {
    return this.oldApi; //this 就是当前的 api //api2
  },
};
