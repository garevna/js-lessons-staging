# ![ico-35 study] Змінні. Типи даних

Трохи забігаючи наперед, уведемо поняття **глобального об'єкта**.
Глобальний об'єкт - це те середовище, у якому ми «живемо» (функціонуємо) і за межі якого ми вийти не можемо.

@@@@
<br>На стороні клієнта JS працює в браузері, у консолі якого, до речі, ми й виконуємо всі наведені нижче операції.<br><br>Це можливо тому, що движок **V8**, вбудований у кожен браузер, інтерпретує наш код і виконує його.
![](images/v8-logo.svg)
@@@@

Спрощено кажучи, глобальним об'єктом для нас є браузер (якщо точніше, то його об'єктна модель, але це ми будемо розбирати пізніше).
Сам браузер функціонує в операційній системі і має доступ до її можливостей.
Але ми не можемо вийти за межі браузера і взаємодіяти з операційною системою безпосередньо.

Отже, операційна система виділяє системні ресурси, зокрема - пам'ять, для роботи додатків, зокрема браузера.
Браузер розпоряджається виділеним йому ресурсом пам'яті, частину якого він виділяє движку V8.
Далі ми говоритимемо про змінні, тобто саме про пам'ять, яку використовуватиме наш додаток.

Для нашого коду доступ до глобального об'єкта забезпечується за допомогою змінної **~window~**.

## ![ico-30 icon] Пам'ять і дані

Пам'ять являє собою величезну кількість комірок, кожна з яких може містити 0 або 1.

@@@@
Така комірка - це **біт** пам'яті.<br>Тому двійкова система числення стала базою для появи перших комп'ютерів.<br>Із **8 бітів** виходить **1 байт** пам'яті.
![](illustrations/vars-bit-and-byte.svg)
@@@@

В **1 байт** пам'яті можна помістити максимум 8 одиниць, тобто двійкове число ~11111111~.

У десятковій системі числення це буде число ~255~ без знака.
Якщо **байт** (8 біт) інтерпретувати як знакове число, то один біт міститиме знак числа (**+ **або** -**), тому максимальне число зі знаком, яке може «поміститися» в один байт, буде 127 (сім одиниць).

••-1111111↓↓2 ↓↓ → -127↓↓10↓↓••

^^Будь-яке число може бути представлене в двійковій системі числення набором нулів і одиниць:^^

{{{vars-01.js}}}

^^Будь-яке число можна розкласти за ступенями двійки + залишок (0 або 1).^^
^^Оскільки в двійковій системі двійка - це десятка, замінюємо ступені двійки на ступені десятки, складаємо і додаємо залишок.^^
^^Усе досить просто.^^

{{{vars-binary.js}}}

Як ви вже здогадалися, комп'ютер може працювати тільки з двійковими числами, тобто з наборами нулів і одиниць.
Логічне запитання: як же в комп'ютері зберігається текст, картинки і відео тощо.

Будь-який відтінок представляється у вигляді кількох чисел:

{{{vars-color.js}}}

Будь-який символ представляється його кодом (числом):

{{{vars-char.js}}}

Таким чином, будь-яка інформація представлена в пам'яті комп'ютера наборами нулів і одиниць, і управління розподілом пам'яті - дуже складний процес.
Абсолютно неймовірно оперувати фізичними адресами пам'яті для доступу до даних.
Це робить операційна система.
Вам не потрібно знати фізичні адреси, за якими зберігатимуться ваші дані.
Для кожного елемента даних вам потрібно придумати ім'я і повідомити движку, який елемент даних ви зберігатимете під цим ім'ям.
Таким чином і створюється **змінна**.
Отже, **змінні** полегшують вам маніпуляції з даними і забезпечують безпеку операційної системи та додатків, що працюють.
_________________________________________________________________

## ![ico-30 icon] var

Ваші дані (числа, рядки тощо) зберігатимуться в пам'яті комп'ютера, поки працює ваш застосунок, але вам не потрібно знати точно, де саме движок зберігає їх.
Імена змінних - це зручна форма адресації, коли вам не потрібно маніпулювати фізичними адресами пам'яті.
Вам достатньо вказати движку ім'я змінної, і надалі ви зможете використовувати це ім'я для отримання доступу до даних.

Для оголошення змінної використовується ключове слово **~var~**, за яким (через пробіл) слідує ім'я змінної.

Зустрівши таке оголошення, движок резервує певну ділянку пам'яті комп'ютера і «прив'язує» до вказаного вами імені змінної адресу пам'яті, виділеної для її зберігання.

^^Зверніть увагу, що в разі потреби движок може перемістити збережене значення в іншу ділянку пам'яті, водночас він автоматично змінить значення адреси, до якої прив'язане ім'я змінної, ви навіть не дізнаєтесь про це.^^

![ico-25 warn] Оголошення змінної за допомогою ключового слова **~var~** поміщає нашу змінну в глобальний об'єкт **~window~**.

~~~js
var number
~~~

Що це означає для нас?
Що ми можемо звернутися до значення цієї змінної як безпосередньо за її ім'ям, так і опосередковано, через глобальний об'єкт:

^^ у точковій нотації:^^
••window.number••

^^або так:^^

••window['number']••

Під час оголошення змінної їй можна відразу присвоїти початкове значення.

Для цього використовується найпоширеніший **оператор мови** - оператор присвоювання **~ =~**.

§§§§ Demo | var_01_template §§§§

У лівій частині оператора присвоювання має бути ім'я змінної, у правій - якийсь **вираз**.
Движок обчислить значення виразу в правій частині оператора присвоювання і помістить обчислене значення в змінну, ім'я якої вказано в лівій частині оператора.

~~~js
var number = 5 + 8 - 4
~~~

Після виконання цього коду у змінній **~number~** буде число 9.

Якщо в лівій частині оператора присвоювання міститься вираз, значення якого не є іменем змінної:

~~~js
'user' + 'Name' = 9 + 8
~~~

то движок згенерує виняток:

~~~error
    Uncaught SyntaxError: Invalid left-hand side in assignment
~~~

Однак це не означає, що в лівій частині оператора присвоювання не може бути виразу.

Розглянемо приклад.

^^^[![ico-25 coffee] 1]

Оголосимо змінну **~userName~** і присвоїмо їй значення 'Piter':

~~~js
var userName = 'Piter'
~~~

Наша змінна потрапила в глобальний об'єкт **~window~**.
Тому ми маємо доступ до неї як до змінної **~window.userName~**.
Або як **~window['userName']~**.

Тому ми можемо використовувати в лівій частині оператора присвоювання вираз, після обчислення якого движок отримає посилання на змінну:

~~~js
window['user' + 'Name'] = 'Helen'
~~~

Можете перевірити самостійно, що значення змінної **~userName~** змінилося.

^^^

^^Коли ми дійдемо до деструктуризації, ви побачите, які ще вирази можуть бути в лівій частині оператора присвоєння.^^



![ico-25 warn] Якщо ми оголосимо змінні, але не присвоїмо їм початкові значення:

~~~js
var x, y, z
~~~

то їхнім значенням буде **~undefined~** (не визначено).

![ico-25 warn] Якщо ми не оголосимо змінну, але спробуємо звернутися до неї:

~~~js
console.log(sigma)
~~~

![ico-20 err] то в консолі з'явиться повідомлення про помилку:

~~~error
    Uncaught ReferenceError: sigma is not defined
~~~

Можна оголосити відразу кілька змінних в одному рядку, розділяючи їх комою:

~~~js
var person = 'Piter',  hobby = 'football',  age = 30
~~~

______________________________________________________________

## ![ico-30 icon] Імена змінних

![ico-25 warn] Імена змінних можуть містити букви, цифри, символи підкреслення і знаки долара.

![ico-25 warn] Імена змінних можуть починатися з літери, символів ~ $~ і ~ _~.

§§§§ Demo | var_02_template §§§§

Рекомендується давати довгі та зрозумілі імена змінних і функцій, складені з декількох слів.
Це покращує читабельність коду:

~~~js
var lastUserVisit = '2019-02-05'
~~~

![ico-25 warn] Імена змінних чутливі до регістру (~name~ і ~Name~ - різні змінні).

§§§§ Demo | var_03_template §§§§

@@@@
![](illustrations/camel-case.png)

**Camel Case** - стиль написання імен змінних, що складаються з декількох слів, коли кожне наступне слово починається з літери у верхньому регістрі.<br><br>Перша літера, з якої починається ім'я змінної, має бути в нижньому регістрі.
@@@@

^^З літери у верхньому регістрі заведено починати тільки імена конструкторів і класів, з якими ми познайомимося пізніше.^^

^^На майбутнє: імена **функцій** рекомендується починати з **дієслова**, щоб відрізняти їх від імен змінних, у яких зберігаються дані.^^

[![ico-25 warn] **_Зарезервовані слова_**](https://www.w3schools.com/js/js_reserved.asp ) не можуть використовуватися як імена змінних.

![ico-25 warn] Імена змінних не можуть починатися з цифри.

~~~js
var 14br = 10
~~~

~~~error
    Uncaught SyntaxError: Invalid or unexpected token
~~~

______________________________________________________________

## ![ico-30 icon] Типи даних

Як ви вже зрозуміли, будь-які дані зберігаються в пам'яті комп'ютера як набір нулів і одиниць.
Для того, щоб движок міг коректно інтерпретувати цей набір нулів і одиниць, він повинен знати, що було збережено за цією адресою: число, рядок або щось інше.

Припустимо, за вказаною адресою в пам'яті міститься двійкове число:

••0100011001000111010010000100100101001011010011000100110101001110••

Його можна інтерпретувати як десяткове ціле число:

••5064095785634516000••

або як рядок, кожен символ якого займає 1 байт:

••FGHIKLMN••

Існує також маса інших варіантів інтерпретації.

^^У змінних можуть зберігатися числа, рядки, логічні значення, специфічні значення **~null~** і **~undefined~**, а також дані **посилального типу**, з якими ми познайомимося пізніше.^^

Отже, важливо, щоб движок знав тип даних, які зберігаються у змінній.

На відміну від мов із суворою типізацією, нам не потрібно під час оголошення змінної вказувати тип даних, які ми передбачаємо зберігати в цій змінній.

**Тип даних визначається в процесі присвоювання значення.**
Це називається **динамічною типізацією**.

______________________________________________________________

### ![ico-25 icon] String

Рядок - це впорядкований набір символів, які укладаються в подвійні (_"My name is Piter"_) або одинарні (_'My name is Piter'_) лапки.

| ^^ 0^^ | ^^ 1^^ | ^^ 2^^ | ^^ 3^^ | ^^ 4^^ | ^^ 5^^ | ^^ 6^^ | ^^ 7^^ | ^^ 8^^ | ^^ 9^^ | ^^10^^ | ^^11^^ | ^^12^^ | ^^13^^ | ^^14^^ | ^^15^^ |
| ** M** | ** y** |        | ** n** | ** a** | ** m** | ** e** |        | ** i** | ** s** |        | ** P** | ** i** | ** t** | ** e** | ** r** |

Можна загорнути рядок і в зворотні лапки **~ `~**, але зворотні лапки заведено використовувати для [**►►►темплейтних літералів**►►►](page/literals).

Якщо всередині рядка зустрічаються подвійні лапки, то сам рядок має бути загорнутий в одинарні, і навпаки.

◘◘![ico-25 cap]◘◘

~~~js
var str = '"es2023" is a shorthand for "ECMAScript 2023 Language Specification".'
~~~
~~~js
var str = "'es2023, x' is a shorthand for 'ECMAScript 2023 Language Specification'."
~~~

Однак можна використовувати екрануючий слеш **~&bsol;~**, щоб дати зрозуміти движку, що це не закривна лапка, а просто символ рядка:

~~~js
str = '\'es2023, x\' is a shorthand for \'ECMAScript 2023 Language Specification\'.'
~~~

Кожен символ має свій числовий код.

Відповідність між символом і його кодом встановлюється в кодувальній таблиці.

Найширше охоплення символів різних алфавітів представлено в кодуванні **UTF-8** (Unicode Transformation Format, 8-bit).

Кодування [%%% **UTF-8**%%%](https://blog.hubspot.com/website/what-is-utf-8 ) зараз є домінуючим у веб.

_____________________________________

Оскільки рядки - це впорядкований набір символів, то кількість символів у рядку визначає його довжину, логічно?
Тож у рядків є властивість **~length~**, яка доступна нам у такий спосіб:

§§§§ Demo | var_string_length_template §§§§

До речі, зверніть увагу на такий вираз:

~~~console
message + string
~~~

Тут оператор **~ + ~** виступає в ролі оператора **конкатенації рядків**.
Це створює певні незручності, оскільки нам звичніше розглядати його як **арифметичний оператор** додавання.
^^З огляду на **динамічну типізацію**, така двоїстість оператора **~ + ~** може призвести до неприємних побічних ефектів, які ми розглянемо в розділі «Приведення типів».^^
^^Пізніше ми познайомимося з **темплейтними літералами**, які дозволять нам уникати конкатенації рядків.^^

______________________________________________________________

### ![ico-25 icon] Number

**тип даних: "number"**.

![ico-20 warn] Записується без лапок.

![ico-20 warn] Для відокремлення десяткових розрядів використовується крапка:

~~~js
var x = 53.25
~~~

Це найпроблемніший тип даних у **JavaScript**.

Розберемося, у чому тут проблема.

До одного й того самого типу ~number~ належать цілі числа, десяткові числа (числа з плаваючою крапкою), числа в експоненціальній формі (~5e+37~), а також такі значення, як **~Infinity~** (нескінченність) і **~NaN~** (**Not a Number** - не число).

| ціле число                      | ~15~                        |
| число з плаваючою крапкою       | ~5.80~                      |
| число в експоненціальній формі  | ~5e+37~                     |
| **~Infinity~**                  | нескінченність              |
| **~NaN~**                       | **Not a Number** - не число |

Існує обмеження на величину числа, що пов'язано з виділенням пам'яті на зберігання даних типу **~number~**.

#### ![ico-20 icon] Цілі числа

**Безпечне** ціле число може містити максимум 15 цифр:

{{{vars-number-1.js}}}

Зверніть увагу, що після 20 цифр число автоматично подається в експоненціальній формі.

#### ![ico-20 icon] Експоненціальна форма

Цілі числа з великою кількістю нулів (500000000000000) або дуже маленькі числа з плаваючою крапкою (0.000000001) набагато зручніше записувати в експоненціальній формі.

Експоненціальна форма запису числа має вигляд: **~1.8e+5~**, де символ **~e ~** розділяє мантису і порядок числа. У цьому прикладі мантиса (змістовна частина числа) дорівнює **~1.8~**, а **~5 ~**- це ступінь, до якого потрібно піднести число **~10~**. Щоб отримати число у звичному для нас вигляді, потрібно помножити мантису на число, що вийшло в результаті піднесення до степеня числа **~10~**:

••1.8 ✖ 10↑↑5 ↑↑••

У результаті ми отримаємо число **180000**.

••500 → 5e+2 (5 * 10↑↑2 ↑↑)••
••5000 → 5e+3 (5 * 10↑↑3 ↑↑)••
••50000 → 5e+4 (5 * 10↑↑4 ↑↑)••

••0.05 → 5e-2 (5 / 10↑↑2 ↑↑)••
••0.005 → 5e-3 (5 / 10↑↑3 ↑↑)••
••0.0005 → 5e-4 (5 / 10↑↑4 ↑↑)••

{{{vars-number-exponential-1.js}}}

Однак «під капотом» движок сам перетворює число до експоненціальної форми для економії пам'яті.

{{{vars-number-exponential-2.js}}}

_____________________________________

#### ![ico-20 icon] Infinity

![ico-20 warn] Значення **~Infinity~** може вийти під час ділення на нуль:

~~~js
var x = 1, y = 0
var z = x / y
~~~

^^Значенням змінної **~z ~** буде **~Infinity~**.^^

Взагалі кажучи, **~Infinity~** - це константа, яка має певне значення, що пов'язано з обмеженням обсягу пам'яті для зберігання чисел.

{{{vars-number-infinity.js}}}

_____________________________________

#### ![ico-20 icon] NaN

![ico-20 warn] Значення **~NaN~** може вийти під час спроби виконання арифметичних операцій з операндами, що не є числами і не приводяться до числа, наприклад: ~5 * 'total'~, а також під час спроби розділити нуль на нуль: ~0 / 0~.


![ico-20 warn] Значення **~NaN~** не дорівнює жодному іншому значенню, включаючи саме значення **~NaN~**.

![ico-20 warn] Жодні арифметичні операції в JS ніколи не будуть завершені з помилкою, оскільки в разі помилки операція поверне **~NaN~**.

__________________________________________________

#### ![ico-20 icon] Похибка обчислень

А тепер поговоримо про точність обчислень і округлення чисел.

{{{vars-number-4.js}}}

Отже, робота з числами у нас явно не в пріоритеті, і якщо ви раптом вирішите використовувати **JS** як **Fortran**, то вам доведеться попаритися з похибками обчислень.

_____________________________________

#### ![ico-20 icon] Тести number

◘◘** 1**◘◘

→→→ 8e-2 | 800, 0.8, 0.08, 8 | 0.08 →→→

◘◘** 2**◘◘

→→→ 1.7e+2 | 170, 1.7, 0.17, 17 | 170 →→→

◘◘** 3**◘◘

→→→ 0.3e+310 | 3e+309, Infinity | Infinity →→→

◘◘** 4**◘◘

→→→ 3e-300 ✖ 1e+30 | 3e-900, Infinity, 0, 3e-270 | 3e-270 →→→

◘◘** 5**◘◘

→→→ 1e-5 + 2e-5 | 3e-5, 0.00003, 0.000030000000000000004, NaN | 0.000030000000000000004 →→→

◘◘** 6**◘◘

→→→ 0.003 + 0.0015 | 0.0045000000000000005, 0.0045, 45e-4, NaN | 0.0045000000000000005 →→→

◘◘** 7**◘◘

→→→ 5e+310 - Infinity | 0, Infinity, NaN | NaN →→→

◘◘** 8**◘◘

→→→ 0.005 + Infinity + NaN | 0.005, 0, Infinity, NaN | NaN →→→

◘◘** 9**◘◘

→→→ 5e+300 - Infinity | 5e+300, 0, -Infinity, NaN | -Infinity →→→

______________________________________________________________

### ![ico-20 icon] Boolean

Логічний тип даних.

Приймає тільки два можливих значення:  **~true~** або **~false~**.

^^(без лапок, '_true_' - це вже рядок).^^

Дані цього типу автоматично отримуються в результаті порівнянь:

~~~js
5 > 8
~~~
~~~console
false
~~~

~~~js
'a' < 'b'
~~~
~~~console
true
~~~

Заодно, до речі, ми познайомилися з бінарними операторами порівняння **~ >~** і **~ <~**.
За допомогою операторів порівняння створюються [►►►**логічні вирази**►►►](page/Boolean).
Результатом обчислення значення **логічного виразу** завжди буде **логічне значення** (**~true~** або **~false~**).

Тобто якщо ми оголосимо змінну **~bool~**:

~~~js
var bool = 5 > 8
~~~

то це буде змінна **логічного типу** (**~boolean~**).

Далі ми будемо часто стикатися з даними типу **~boolean~**.

______________________________________________________________

### ![ico-20 icon] undefined

**тип даних: "undefined"**.

Змінні іноді оголошуються без присвоювання їм початкового значення.

Якщо змінна оголошена без значення, її значення буде **~undefined~**.

^^(без лапок, _'undefined'_ - це вже рядок).^^

______________________________________________________________

## ![ico-25 icon] Оператор typeof

^^Ще один оператор мови, з яким ви знайомитеся сьогодні.^^
^^Перший, як ви пам'ятаєте, це **оператор присвоювання**.^^
^^Далі ми познайомилися з двома **операторами порівняння**.^^

Оператори мови завжди мають **операнди**.
Наприклад, оператор присвоювання має два операнди: один - ліворуч, другий - праворуч.

![ico-20 warn] Операнди завжди відокремлюються від оператора пропуском.

Залежно від числа операндів оператор може бути:

| оператор  | число операндів | приклад                                  |
| унарний   | 1               | **~typeof~**                             |
| бінарний  | 2               | **~ =~**, **~ >~**, **~ <~**             |
| тернарний | 3               | цей оператор ми розглянемо трохи пізніше |

Оголосимо змінну **~num~** і присвоїмо їй значення 10:

~~~js
var num = 10
~~~

А тепер скористаємося оператором **~typeof~**, щоб дізнатися тип даних змінної **~num~**:

~~~js
typeof num
~~~

В консолі ми побачимо:

~~~console
'number'
~~~

Давайте розберемося, що робить движок, коли зустрічає вираз ~**typeof** num~.
Движок обчислює значення цього виразу і замінює вираз ~**typeof** num~ на обчислене значення.

Подивимося ще один приклад:

~~~js
var companyName = 'Google'

typeof companyName
~~~

~~~console
'string'
~~~

![ico-25 warn] Оператор **~typeof~** повертає **рядок**.

Що це означає?

~~~js
var boolean = false

typeof boolean
~~~

~~~console
'boolean'
~~~

Це означає, що якщо движок зіткнеться з таким виразом (позбавленим усякого сенсу, крім пізнавального - для вас):

~~~js
typeof typeof boolean
~~~

то ми завжди отримаємо одну й ту саму відповідь:

~~~console
'string'
~~~

Можливі значення (рядки), що повертаються оператором **~typeof~**:

• ~string~
• ~number~
• ~bigint~
• ~boolean~
• ~object~
• ~undefined~
• ~function~
• ~symbol~

Як бачите, у цьому списку є типи даних, які ми поки що не розглядали і які нам ще належить вивчити.

__________________________________________________

### ![ico-20 icon] Тести typeof

◘◘** 1**◘◘

→→→ typeof 2e-200 | 'number', 'string', 'boolean', 'undefined' | number →→→

◘◘** 2**◘◘

→→→ typeof NaN | 'number', 'string', 'boolean', 'undefined' | number →→→

◘◘** 3**◘◘

→→→ typeof 'Infinity' | 'number', 'string', 'boolean', 'undefined' | string →→→

◘◘** 4**◘◘

→→→ typeof 5 > 8 | 'number', 'string', 'boolean', 'undefined' | boolean →→→

◘◘** 5**◘◘

→→→ typeof undefined | 'number', 'string', 'boolean', 'undefined' | undefined →→→

__________________________________________________

## ![ico-25 icon] Специфікація ECMAScript

Сучасна [%%%специфікація мови%%%](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html ) визначає сім типів даних:

<span class="tab-2" />• **Undefined Type**
<span class="tab-2" />• **Null Type**
<span class="tab-2" />• **Boolean Type**
<span class="tab-2" />• **String Type**
<span class="tab-2" />• **Symbol Type**
<span class="tab-2" />• **Numeric Types**
<span class="tab-4" />• **Number Type**
<span class="tab-4" />• **BigInt Type**
<span class="tab-2" />• **Object Type**

Оператор **~typeof~** працює «по-старому», оскільки якби принцип його роботи було змінено, то багато сайтів, створених до 2015 року, просто посипалися б.
Однак використовуючи його, варто пам'ятати про його «недосконалість».

Під час порівняння типів даних двох змінних враховуйте, що символи розташовані в кодувальній таблиці в алфавітному порядку, тому під час порівняння більшим буде той,
який розташований далі від початку таблиці.
