const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}



const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = "tmp_base64src"; //自定义文件名

// 此方法返回指定对象的原型（内部[[Prototype]]属性的值）
var getProto = Object.getPrototypeOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

// `function Object() { [native code] }`
var ObjectFunctionString = fnToString.call(Object);

// 是函数
var isFunction = function isFunction(obj) {
    // 浏览器支持: Chrome <=57, Firefox <=52
    // 在某些浏览器中, 检测 HTML <object> elements 返回 "function"
    // (例如, `typeof document.createElement( "object" ) === "function"`)
    // 我们不想将任意DOM节点分类为一个函数。
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

// 是普通对象
var isPlainObject = function(obj) {
    var proto, Ctor;

    // 检测明显的负面影响 false/''/null/undefined/0/NaN
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = getProto(obj);

    // 没有原型的对象 (例如, `Object.create( null )`) 是普通的
    if (!proto) {
        return true;
    }

    // 带有原型的对象是普通的，前提是它们是由全局 Object 函数构造的
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};

// 克隆
var clone = function() {
    var options, name, src, copy, copyIsArray, _clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // 处理深度复制情况
    if (typeof target === "boolean") {
        deep = target;

        // 跳过 boolean 和 target
        target = arguments[i] || {};
        i++;
    }

    // 当目标是字符串或其他时处理大小写（可能在深复制中）
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }

    // 如果仅传递一个参数，则将 target 设置为一个新的对象
    if (i === length) {
        target = {};
        i--;
    }

    for (; i < length; i++) {

        // 仅处理非 null/undefined 的值
        if ((options = arguments[i]) != null) {

            // 扩展基础对象
            for (name in options) {
                copy = options[name];

                // 防止对象原型污染
                // 防止永无止境的循环
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                // 如果我们要合并普通对象或数组，则进行递归
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    src = target[name];

                    // 确保源值的类型正确
                    if (copyIsArray && !Array.isArray(src)) {
                        _clone = [];
                    } else if (!copyIsArray && !isPlainObject(src)) {
                        _clone = {};
                    } else {
                        _clone = src;
                    }
                    copyIsArray = false;

                    // 克隆它们，切勿移动原始对象
                    target[name] = clone(deep, _clone, copy);

                    // 过滤未定义的值
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // 返回修改后的对象
    return target;
};


function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function base64src(base64data, cb) {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
        return new Error("ERROR_BASE64SRC_PARSE");
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    fsm.writeFile({
        filePath,
        data: buffer,
        encoding: "binary",
        success() {
            cb(filePath);
        },
        fail() {
            return new Error("ERROR_BASE64SRC_WRITE");
        },
    });
}

const promisic = function(func) {
    return function(params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                },
            });
            func(args);
        });
    };
};

/*函数防抖*/
const debounce = function(fn, interval) {
    var timer;
    var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
    return function() {
        clearTimeout(timer);
        var context = this;
        var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
        timer = setTimeout(function() {
            fn.call(context, args);
        }, gapTime);
    };
};

// 小数点精准运算
const NP = function(exports) {
    /**
     * @file 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
     * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
     */
    /**
     * 把错误的数据转正
     * strip(0.09999999999999998)=0.1
     */
    function strip(num, precision) {
        if (precision === void 0) {
            precision = 12;
        }
        return +parseFloat(num.toPrecision(precision));
    }
    /**
     * 返回数字长度
     * @param {*number} num 输入数值
     */
    function digitLength(num) {
        // Get digit length of e
        var eSplit = num.toString().split(/[eE]/);
        var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
        return len > 0 ? len : 0;
    }
    /**
     * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
     * @param {*number} num 输入数
     */
    function float2Fixed(num) {
        if (num.toString().indexOf('e') === -1) {
            return Number(num.toString().replace('.', ''));
        }
        var dLen = digitLength(num);
        return dLen > 0 ? num * Math.pow(10, dLen) : num;
    }
    /**
     * 检测数字是否越界，如果越界给出提示
     * @param {*number} num 输入数
     */
    function checkBoundary(num) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn(num + ' is beyond boundary when transfer to integer, the results may not be accurate');
        }
    }
    /* 精确乘法 */
    function times(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)));
        }
        var num1Changed = float2Fixed(num1);
        var num2Changed = float2Fixed(num2);
        var baseNum = digitLength(num1) + digitLength(num2);
        var leftValue = num1Changed * num2Changed;
        checkBoundary(leftValue);
        return leftValue / Math.pow(10, baseNum);
    }
    /* 精确加法 */
    function plus(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return plus.apply(void 0, [plus(num1, num2), others[0]].concat(others.slice(1)));
        }
        var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
    }
    /* 精确减法 */
    function minus(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return minus.apply(void 0, [minus(num1, num2), others[0]].concat(others.slice(1)));
        }
        var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
        return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
    }
    /* 精确除法 */
    function divide(num1, num2) {
        var others = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            others[_i - 2] = arguments[_i];
        }
        if (others.length > 0) {
            return divide.apply(void 0, [divide(num1, num2), others[0]].concat(others.slice(1)));
        }
        var num1Changed = float2Fixed(num1);
        var num2Changed = float2Fixed(num2);
        checkBoundary(num1Changed);
        checkBoundary(num2Changed);
        return times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));
    }
    /* 四舍五入 */
    function round(num, ratio) {
        var base = Math.pow(10, ratio);
        return divide(Math.round(times(num, base)), base);
    }
    var index = {
        strip: strip,
        plus: plus,
        minus: minus,
        times: times,
        divide: divide,
        round: round,
        digitLength: digitLength,
        float2Fixed: float2Fixed
    };
    exports.strip = strip;
    exports.plus = plus;
    exports.minus = minus;
    exports.times = times;
    exports.divide = divide;
    exports.round = round;
    exports.digitLength = digitLength;
    exports.float2Fixed = float2Fixed;
    exports['default'] = index;
    return exports;
}({});

var Utils = { dateFormat, promisic, base64src, isPlainObject, isFunction, clone, debounce, NP ,formatTime};

export { dateFormat, promisic, base64src, isPlainObject, isFunction, clone, debounce, NP ,formatTime};

export default Utils;
