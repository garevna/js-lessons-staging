# ![ico-30 study] Приведение типов

______________________________________

## ![ico-25] Явное приведение типов

Самый простой способ явного приведения данных произвольного типа к типу ~string~, ~number~ или ~boolean~ - использование встроенных одноименных функций **~String()~**,  **~Number()~**,  **~Boolean()~**

![ico-25 cap] ** 1 **

~~~js
var x = '10'
Number(x)    // 10
~~~

вернет число 10

![ico-25 cap] ** 2 **

~~~js
Number('туман')
~~~

вернет специальное значение  **~NaN~** ( _Not  a  Number_ ),

что означает, что строка "туман" не может быть преобразована к числу

![ico-25 cap] ** 3 **

~~~js
String(50)   // "50"
~~~

вернет строку "50"

![ico-25 cap] ** 4 **

~~~js
Boolean('50')  // true
~~~

вернет логическое значение  ~true~

___________________________________________________________________

### ![ico-20 icon] Явное приведение к number

![ico-20 warn] Во всех нижеперечисленных случаях результат будет ** 0**:

~~~js
Number(null)    // 0
Number(false)   // 0
Number('')      // 0
Number(' ')     // 0
Number([])      // 0
Number('\n')    // 0
Number('\t')    // 0
~~~

^^"пробельные" символы ~""~, ~"   "~, ~"\n"~, ~"\t"~ всегда приводятся к 0^^

~~~js
Number(String.fromCharCode(9))   // 0
Number(String.fromCharCode(10))  // 0
Number(String.fromCharCode(11))  // 0
Number(String.fromCharCode(12))  // 0
Number(String.fromCharCode(13))  // 0
~~~

^^~String.fromCharCode(cod)~ возвращает символ, код которого равен **cod**^^

![ico-20 warn] ~Number(true)~  вернет 1

![ico-20 warn] В случаях, когда преобразовать выражение к числу невозможно, результат будет  **~NaN~** (^^Not a Number^^):

![ico-25 cap] ** 5 **

~~~js
Number(undefined)   // NaN
Number(' 12s ')     // NaN
Number('4+8')       // NaN
Number([5, 7, 4])   // NaN
Number(NaN)         // NaN
Number({})          // NaN
~~~

![ico-20 warn]  Во всех остальных случаях результат будет  числом

![ico-25 cap] ** 6 **

~~~js
Number(57)            // вернет 57
Number(4 * '8')       // вернет 32
Number([5])           // вернет 5
Number([5] + [8])     // вернет 58
Number(null - true)   // вернет -1
~~~

______________________________

#### ![ico-20 icon] parseInt & parseFloat

Для приведения к целому числу или к числу с плавающей запятой ( с десятичными знаками ) можно использовать встроенные функции ~parseInt~ и ~parseFloat~

В отличие от конструктора **~Number~**, эти функции парсят строку, даже если в ней есть "левые" символы после числа - эти символы просто будут проигнорированы:

~~~js
Number('3.14abc')      // NaN
parseFloat('3.14abc')  // 3.14
parseInt('3.14abc')    // 3

Number('3.14/5')        // NaN
parseFloat('3.14/5')    // 3.14
~~~

Однако если строка начинается с символов, которые не могут быть приведены к числу, эти функции вернут **~NaN~**

____________________________________________________________________

### ![ico-20 icon] Явное приведение к boolean

![ico-20 warn] Во всех нижеперечисленных случаях результат будет  ~false~:

~~~js
Boolean('')
Boolean(0)     
Boolean(-0)  
Boolean(NaN)
Boolean(null)
Boolean(undefined)
Boolean(false)
~~~

![ico-20 warn] Во всех остальных случаях результат будет  ~true~

При приведении строки к булевому типу действует простое правило:

если длина строки равна 0, то возвращается ~false~, в противном случае - ~true~

____________________________________________________________________

### ![ico-20 icon] Явное приведение к string


~~~js
var str = String(5 + 8 + false)  //  "13"

var x = {}
String(x)  //  "[object Object]"

var y = [5, true, 'hello', 11]
String(y)  //  "5,true,hello,11"
~~~

При приведении числа к типу ~string~ можно использовать метод **_~toString()~_**, который принимает один аргумент - десятичное число 2, 8 или 16 ( система исчисления )

Десятичная система исчисления подразумевается по умолчанию, поэтому аргумент при этом можно опустить

Для того, чтобы получить строчное значение числа в двоичной системе исчисления, нужно передать методу **_~toString()~_** аргумент 2, в восьмеричной - 8, в шестнадцатеричной - 16

~~~js
Number(2).toString(2)    // "10"
Number(58).toString(2)   // "111010"
Number(8).toString(8)    // "10"
Number(58).toString(8)   // "72"
Number(16).toString(16)  // "10"
Number(58).toString(16)  // "3a"
~~~

____________________________________________________________________

### ![ico20] Явное приведение к object

~~~js
Object(5 + 8 + false)
~~~

~~~console
▼ Number {13}
  ► __proto__: Number
    [[PrimitiveValue]]: 13
~~~

~~~js
var x = 10
Object(x)
~~~

~~~console
▼ Number {10}
  ► __proto__: Number
    [[PrimitiveValue]]: 10
~~~

~~~js
var y = [5, true, 'hello', 11]
Object(y)
~~~

Преобразования не будет, поскольку тип данных переменной ** y** уже ~object~

____________________________________________________________________

[![ico-30 hw] **Упражнения**](https://docs.google.com/forms/d/e/1FAIpQLSdFHuyyukF2rmA04BN1AmS5MCNXWgQmR5t7mmxyTpzdBZVGGw/viewform)

____________________________________________________________________

[![ico-20 link] ^^w3schools^^](https://www.w3schools.com/jsref/jsref_infinity.asp)

[![ico-20 link] ^^Equality in JavaScript^^](https://dorey.github.io/JavaScript-Equality-Table/unified/)