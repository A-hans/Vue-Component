/**
  @params context 组件实例
  @params componentName 需要寻找的组件名
*/

//向上寻找符合条件的第一个子组件
function findComponentUpward (context, componentName) {
    let parent = context.$parent;
    let name = parent&&parent.$options.name;
    while(parent&&(!name || [componentName].indexOf(name) < 0)){
        parent = parent.$parent;
        if(parent) {
            name = parent.$options.name;
        }
    }

    return parent;
}

//向上寻找所有符合条件的组件
//会返回每一层递归的结果
function findComponentsUpward(context,componentName) {
    //存放符合条件的组件
    const parents = [];
    let parent = context.$parent;
    if(parent){
        if(componentName === parent.$options.name){
            parents.push(parent);
            return parent.concat(findComponentsUpward(parent,componentName));
        }else{
            return [];
        }   
    }
}

//向下寻找最近的指定组件
function findComponentDownward(context,componentName) {
    let children = context.$children;
    let target = null;
    if(children.length) {
        for(let child of children) {
            const name = child.$options.name;
            if(name === componentName) {
                target = child;
                break;
            }else{
               target = findComponentDownward(child,componentName);
               if(target) {
                   break;
               }
            }
        }
        return target;
    }
}

//向下寻找所有符合条件组件
// function findComponentsDownward(context,componentName) {
//     const targets = [];
//     const children = context.$children;
//     if(children.length) {
//         for(let child of children) {
//             const name = child.$options.name;
//             if(name === componentName) {
//                 targets.push(child);
//             }else{
//                 targets.concat(findComponentsDownward(child,componentName));
//             }
//             return targets;
//         }
//     }
// }

//reduce版本
function findComponentsDownward(context,componentName){
    return context.$children.reduce((components,child)=>{
        const name = child.$options.name;
        if(name === componentName) {
            components.push(child);
        }
        return components.concat(findComponentsDownward(child,componentName));
    },[])
}

//找到指定组件的兄弟组件
function findBrothersComponents(context,componentName,exceptMe = true) {
    //获取当前层级父级下的所有组件
    let res = context.$parent.$children.filters((child)=>{
        return child.$option.name === componentName;
    })
    //若组件名称相同，防止筛选自己
    /* 
    Vue.js 在渲染组件时，都会给每个组件加一个内置的属性 _uid，
    这个 _uid 是不会重复的，借此我们可以从一系列兄弟组件中把自己排除掉
    */
    const index = res.findIndex(item => item._uid === context._uid);
    if(exceptMe){
        res.splice(res[index],1);
    }
    return res;
}

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]'  : 'boolean',
      '[object Number]'   : 'number',
      '[object String]'   : 'string',
      '[object Function]' : 'function',
      '[object Array]'    : 'array',
      '[object Date]'     : 'date',
      '[object RegExp]'   : 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]'     : 'null',
      '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
  }

  // deepCopy
  function deepCopy(data) {
    const t = typeOf(data);
    let o;
  
    if (t === 'array') {
      o = [];
    } else if ( t === 'object') {
      o = {};
    } else {
      return data;
    }
  
    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(deepCopy(data[i]));
      }
    } else if ( t === 'object') {
      for (let i in data) {
        o[i] = deepCopy(data[i]);
      }
    }
    return o;
  }
  
export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothersComponents,
    deepCopy
}
