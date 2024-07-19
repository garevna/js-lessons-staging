# ![ico-30 icon] Переменные. Типы данных

_________________________________________________________________

## ![ico-25 icon] var

Переменные - это контейнеры для хранения данных

Для объявления переменной используется ключевое слово ~var~

При объявлении переменной ей можно сразу присвоить начальное значение:

~~~js
var x = 5
~~~

![ico-25 warn] Если мы объявим переменные, но не присвоим им начальные значения:

~~~js
var x, y, z
~~~

то их значением будет   ~undefined~


![ico-25 warn] Если мы не объявим переменную, но попытаемся обратиться к ней:

~~~js
console.log(sigma)
~~~

![ico-20 err] то в консоли появится сообщение об ошибке:

~~~console
Uncaught ReferenceError: sigma is not defined
~~~

Можно объявить сразу несколько переменных в одной строке, разделяя их запятой:

~~~js
var person = 'Сергей',  hobby = 'football',  age = 30
~~~

или так:

~~~javascript
var person = 'Сергей',  
    hobby = 'football',  
    age = 30
~~~

______________________________________________________________

## ![ico-25 icon] Правила построения имен переменных

![ico-25 warn] Имена переменных могут содержать буквы, цифры, символы подчеркивания и знаки доллара

![ico-25 warn] Имена переменных могут начинаться с буквы, сиволов ~ $~ и ~ _~

![ico-25 warn] Имена переменных чувствительны к регистру ( ~name~ и ~Name~ - разные переменные )

[![ico-25 warn] **_Зарезервированные слова_**](https://www.w3schools.com/js/js_reserved.asp) не могут использоваться как имена переменных

______________________________________________________________

## ![ico-25 icon] Типы данных

______________________________________________________________

### ![ico-20 icon] строка

**тип данных: "string"**

заключается в двойные ("Доброе утро") или одинарные ('My name is ...') кавычки

Внутри строки можно использовать кавычки, если они не совпадают с кавычками самой строки:

~~~js
'Посмотри слово "Бегемот" в словаре'
"Посмотри слово 'Бегемот' в словаре"
~~~

______________________________________________________________

### ![ico-20 icon] число

**тип данных: "number"**

записывается без кавычек

состоит из цифр

для отделения десятичных разрядов используется точка

~~~js
var x = 53.25
~~~

______________________________________________________________

### ![ico-20 icon] логическая переменная

**тип данных: "boolean"**

принимает только два возможных значения:  **~true~**  или  **~false~**

^^(без кавычек, "_true_" - это уже строка)^^


______________________________________________________________

### ![ico-20 icon] undefined

**тип данных: "undefined"**

Переменные иногда (очень редко!) объявляются без присваивания им начального значения

Если переменная объявлена без значения, ее значение будет **~undefined~**

^^(без кавычек, "_undefined_" - это уже строка)^^

______________________________________________________________

## ![ico-25 icon] Динамическая типизация

В  JavaScript используется динамическая типизация данных

Это означает, что тип данных переменной определяется при присваивании ей значения

~~~js
var x = 0
console.log(x)             // в консоли будет    0
console.log(typeof x)      // в консоли будет    "number"

x = 'lol'
console.log(x)            // в консоли будет   "lol"
console.log(typeof x)     // в консоли будет    "string"
~~~

______________________________________________________________

## ![ico-25 icon] Спецификация ECMAScript

На сегодняшний день спека определяет семь типов данных:

• Boolean
• Null
• Undefined
• Number
• String
• Symbol (ES6)
• Object

______________________________________________________________

## [![ico-30 hw] Упражнения](test/dataTypes)