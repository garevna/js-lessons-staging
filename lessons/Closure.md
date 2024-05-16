# ![ico-30 study] Замыкание

[Замыкание](https://www.w3schools.com/js/js_function_closures.asp "W3Schools") - это эффект, с помощью которого можно "скрыть" переменные в контексте родительской функции, возвращающей функцию.

[Замыкание](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) - это комбинация: функция + лексическая среда, в которой эта функция была объявлена.

Если функция возвращает функцию, то Lexical Environment родительской функции попадает в цепочку областей видимости дочерней функции.

Т.е. все аргументы, полученные родительской функцией при вызове, а так же все переменные и функции, объявленные в ней, будут доступны дочерней функции (она их "видит")

^^Однако больше нигде они доступны не будут, поскольку ссылки на них доступны только дочерней функции.^^

Итак, эффект замыкания возникает только в том случае, если функция возвращает функцию.

◘◘![ico-25 cap] ** 1**◘◘

~~~js
function parent (arg) {
  var frog = 'I\'m frog'
  return function () {
    console.log(arg, frog)
  }
}

var child = parent('Hello!')
~~~

Вызовем дочернюю функцию:

~~~js
child()  // Hello!  I'm frog
~~~

◘◘![ico-25 cap] ** 2**◘◘

~~~js
var parent = message => () => console.log(message)

var hello = parent('Hello!')
var welcome = parent('Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

Альтернативой замыканию является другой механизм - карринг:

◘◘![ico-25 cap] ** 3**◘◘

~~~js
var parent = message => console.log(message)

var hello = parent.bind(null, 'Hello!')
var welcome = parent.bind (null, 'Welcome!')

hello()    // Hello!
welcome()  // Welcome!
~~~

◘◘![ico-25 cap] ** 4**◘◘

~~~js
function parent (omega) {
  var alpha = 0
  return () => omega > alpha
    ? omega-- - alpha++
    : null
}

var child = parent(20)
~~~

Теперь каждый очередной вызов функции **child** будет возвращать новое число меньше предыдущего на 2
и так до тех пор, пока возвращаемое значение больше 0

~~~js
child() // 20
child() // 18
...
~~~

◘◘![ico-25 cap] ** 5**◘◘

~~~js
function first (firstArg) {
  function second (secondArg) {
    return firstArg.toString().split('').join(secondArg)
  }
  return function () {
    return second('*')
  }
}

first('Happy New Year!')()
~~~

Результат будет: ••"H*a*p*p*y* *N*e*w* *Y*e*a*r*!"••

_______________________

## ![ico-25 icon] IIFE

**_Immediately Invoked Function Expression_**

Функциональное выражение [**IIFE**](https://developer.mozilla.org/uk/docs/Glossary/IIFE "MDN"), т.е. вызов объявляемой анонимной функции "на месте"
( в месте ее объявления )

В этом примере анонимная функция "завернута" в круглые скобки:

◘◘![ico-25 cap] ** 6**◘◘

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})
~~~

Когда движок доходит до строки, в которой находится этот код, он вычисляет выражение в круглых скобках, 
и значением этого выражения будет **ссылка** на функцию, объявление которой находится в скобках.

~~~console
ƒ (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
}
~~~

Если после этого функционального выражения поставить круглые скобки, то произойдет немедленный вызов функции в месте ее объявления:

~~~js
(function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
    }
})()
~~~

Поскольку объявленная внутри круглых скобок функция возвращает объект, то результат будет:

~~~console
▼ { name: undefined, visit: "04.07.2019", id: 1562225761228 }
    id: 1562225761228
    name: undefined
    visit: "04.07.2019"
  ► __proto__: Object
~~~

Поскольку полученную ссылку на функцию мы не сохраняем, то сборщик мусора при очередном проходе удалит объект функции из памяти. 
Поэтому внутри скобок объявляется анонимная функция, поскольку ее имя никогда не будет использовано.

Вызов функции без аргумента привел к тому, что свойство name объекта получило значение undefined

Передадим функции аргумент, причем имя получим через модальное окно prompt:

~~~js
var user = (function (userName) {
  return {
    name: userName,
    visit: new Date().toLocaleDateString(),
    id: new Date().getTime()
  }
})(prompt('Enter your name:'))
~~~

В модальном окне введем имя **_Семен_**

В результате переменная user станет объектом:

~~~console
▼ { name: "Семен", visit: "04.07.2019", id: 1562226083644 }
    id: 1562226083644
    name: "Семен"
    visit: "04.07.2019"
  ► __proto__: Object
~~~

Анонимная функция была вызвана единственный раз, после чего она удаляется из памяти (поскольку ссылка на нее не сохраняется).

______________________

В этом примере анонимная функция получает агрумент "Hello", объявляет переменную **_message_** в своей функциональной области видимости, 
в которой сохраняет полученное значение аргумента, и возвращает анонимную функцию.

При этом ее контекст демонтируется (удаляется из стека), и логично предположить, что переменная **_message_** также будет удалена из памяти,

![ico-20 yes] но!

сборщик мусора не может удалить переменную  **_message_**  из памяти, поскольку возвращаемая анонимная функция использует в своем контексте ссылку на нее.

А пока есть хоть одна активная ссылка на переменную, сборщик мусора не может очистить память, выделенную под эту переменную.

Этот эффект называется "замыкание".

После вычисления значения функционального выражения в переменной **_func_** будет ссылка на анонимную функцию,
в контексте которой будет "замкнута" переменная **_message_**.

Теперь ссылка на переменную **_message_** существует только в контексте возвращаемой функции.

◘◘![ico-25 cap] ** 7**◘◘

~~~js
var sayHello = (function (message) {
  return function (name) {
    console.log(`${ message }, ${ name }`)
  }
})('Hello')

sayHello('Дима')
sayHello ('Николай')
~~~

Эффект замыкания часто используется для защиты переменных, но следует помнить, что это всего лишь побочный эффект, а не прием, и этот эффект может приводить к утечкам памяти.

-----------------------------

## ![ico-25 icon] Паттерн "Модуль"

Сочетание IIFE с эффектом замыкания дает нам один из паттернов проектирования под названием "Модуль", который, к сожалению, активно используется в разработке, а так же при сборке приложений. 

Любое приложение (application) собирается из модулей, каждый из которых имеет собственную изолированную область видимости. 
Все переменные и функции, объявленные в модуле, доступны только в пределах этого модуля.

Но для того, чтобы "спрятать" переменные и функции внутри модуля, логичнее использовать прием каррирования, а не побочный эффект работы сборщика мусора.
Советую внимательно ознакомиться с приемом каррирования, который заимствован из функциональных языков программирования и является более корректным способом е только "прятать" переменные внутри функции (модуля), но и строить красивые цепочные вычисления.

_____________________________

## ![ico-25 warn] Function

![ico-20 err] Функции, созданные конструктором **Function**, не создают замыкания

◘◘![ico-25 cap] ** 8**◘◘

~~~js
var __var__ = 'Global Scope'

function functionConstructor() {
  var __var__ = 'Function Scope'
  return new Function('console.warn(__var__)')
}

function functionDeclaration() {
  var __var__ = 'Closured Scope'
  return function () {
    console.info(__var__)
  }
}

functionConstructor()()   // Global Scope
functionDeclaration()()   // Closured Scope
~~~

_____________________________

## ![ico-25 warn] Memory Leaks

![ico-20 warn] Замыкание может приводить к утечкам памяти.

Следующий код приведет к остановке приложения по причине переполнения памяти:

◘◘![ico-25 cap] ** 9**◘◘

~~~js
var globalFunc
 
function closure () {
  var data = new Array(1000000)
  var func = globalFunc
 
  function innerFunc() {
    if (func) return data
  }

  return function () {}
}
 
setInterval(() => globalFunc = closure(), 5)
~~~

За счет чего возникают утечки памяти в этом фрагменте кода ?

Каждый раз, когда срабатывает таймер, вызывается ~closure~ и происходит переопределение значения ~globalFunc~
В каждом новом варианте ~globalFunc~ в замыкание попадают переменные ~data~, ~func~ и ~innerFunc~
При этом ссылка на предыдущее значение ~globalFunc~ попадает в локальную переменную ~func~,
которая попала в замыкание нового значения ~globalFunc~,
тем самым вместе с предыдущим значением ~globalFunc~ в замыкание попадают все переменные, 
которые были в замыкании ~globalFunc~, т.е. ~innerFunc~ в том числе
Переменная ~data~ будет занимать приличный кусок памяти
Ссылка на ~data~ попадает в замыкание ~innerFunc~
~innerFunc~ попадает в замыкание кадой новой версии ~globalFunc~

Получается глубокая вложенность переменных в замыкании, и ~data~ будет дублироваться до тех пор,
пока это не приведет к переполнению памяти (очень быстро, поскольку итервал таймера - 5 милисекунд)

_____________________________

[![ico-30 hw] **Тесты**](https://garevna.github.io/js-quiz/#closures)