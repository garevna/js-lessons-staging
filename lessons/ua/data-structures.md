# ![ico-35 study] Структури даних

Взагалі кажучи, тепер ми з вами приступаємо до вивчення **посилального типу даних**.
Спробуємо розібратися, що ж це таке.

По-перше, коли ми говоримо про будь-які **структури даних**, ми маємо на увазі якийсь набір даних, зібраних під одним ім'ям.
Наприклад, список студентів групи або список учнів класу є структурою даних, тому що містить десятки строкових значень (змінних типу 'string').
Однак якщо ви просите список студентів групи, ви не будете перераховувати вміст списку, тим більше, що ви можете і не знати його. Ви назвете шифр групи.
Так виходить структура даних.
Ім'я одне, а даних, що зберігаються під цим ім'ям, може бути дуже багато.

Чому такі типи даних є **посилальними**?

Тому, що якщо ви передаєте назву структури даних, то ви не передаєте при цьому її зміст.
Ви передаєте тільки **посилання** на структуру даних.

Якщо ми передаватимемо це посилання з однієї змінної в іншу, ми передаватимемо не групу, а **посилання** на неї.

Наприклад, у вас є якась структура даних (наприклад, список студентів групи), посилання на яку зберігається у змінній **~group~**.

Після виконання присвоювання:

~~~js
var students = group
~~~

у змінній **~students~** буде посилання на ту саму структуру даних.
Нової структури даних при цьому не створюється, передається тільки **посилання**.

@@@@
![](images/reference-is-a-lockpick-ukr.svg)
<br>Якщо у вас є посилання на структуру даних, ви отримуєте доступ до вмісту цієї структури даних за посиланням.<br>
@@@@

Давайте познайомимося ближче зі структурами даних у JS. Принаймні, з двома з них - масивами та об'єктами.
Вони відрізняються за способом організації доступу до елементів структури даних.
У масивах елементи строго вишикувані за порядком, і доступ до них здійснюється за їхнім порядковим номером усередині колекції.
В об'єктах немає строго порядку слідування, і замість порядкового номера елементи такої колекції (структури) мають унікальні ідентифікатори, за якими ми можемо знайти їх у колекції.

_________________________________________________

## ![ico-30 icon] Массивы

**тип даних: ~object~**

• Масив - це впорядкований набір змінних.
• Кожна змінна називається **елементом масиву**.
• Елементи масиву мають порядковий номер (**_індекс_** елемента масиву).

![ico-20 warn] Індексація елементів масиву починається з нуля, тобто перший елемент масиву матиме індекс ~ 0~.

Оголосити масив дуже просто:

~~~js
var array = [3.14, false, 'mother', null, undefined]
~~~

Те, що ви бачите в правій частині оператора присвоювання - це **вираз**.
Перш, ніж виконати присвоювання, движок завжди обчислює вираз у правій частині оператора присвоювання.
А в правій частині оператора присвоювання движок бачить квадратні дужки з перерахуванням через кому значень всередині квадратних дужок.
Движок розуміє, що ми хочемо створити масив, і створює масив (точніше, він викликає для цього спеціальний конструктор, але про це ми поговоримо пізніше).
Де движок розмістив створену структуру даних (масив) - ми ніколи не дізнаємося, бо нам він повернув тільки **посилання** на цей масив.
Саме це посилання поміщено у змінну **~array~**.
![ico-25 warn] Не масив, а **посилання** на масив.

Тепер доступ до вмісту масиву здійснюється таким чином:

~~~js
array[2]
~~~

тобто ми використовуємо для цього ім'я масиву, після якого вказуємо **індекс** елемента в квадратних дужках.
Індекс - це порядковий номер, починаючи з нуля:

| 0    | 1     | 2        | 3    | 4         |
| 3.14 | false | 'mother' | null | undefined |

У результаті отримуємо значення елемента масиву:

~~~console
'mother'
~~~

Ми маємо доступ до елементів масиву не тільки для читання.
Наступне присвоювання змінить значення останнього елемента масиву:

~~~js
array[4] = 'father'
~~~

Після цього присвоювання наш масив буде таким:

~~~console
► (5) [3.14, false, 'mother', null, 'father']
~~~

___________________________________

Якщо тепер ми виконаємо таке присвоєння:

~~~js
var collection = array
~~~

то у змінній **~collection~** буде посилання на той самий масив.

Перевіримо?

Давайте змінимо елемент масиву **~collection~**:

~~~js
collection[3] = 'brother'
~~~

і подивимося на масив **~array~**:

~~~js
array
~~~

~~~console
► (5) [3.14, false, 'mother', 'brother', 'father']
~~~

Як бачите, зміни, які ми внесли (за посиланням!) у масив **~collection~**, відобразилися в масиві **~array~**.
Це відбувається тому, що і змінна **~collection~**, і змінна **~array~** є **посиланнями на один і той самий масив**.

_________________________________________________

### ![ico-25 icon] length

У масивів, як і в рядків, є властивість **~length~** (довжина масиву, або число елементів масиву).

Доступ до цієї властивості можливий у **крапковій нотації** (через крапку після імені масиву):

~~~js
collection.length
~~~

~~~console
5
~~~

_________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[1] | 'Piter', 'Madelin', 'Gregory', null, undefinded | Madelin →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', null, undefinded | undefinded →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = students
group[3] = 'Frodo'
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', 'Frodo', null, undefinded | Frodo →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[3] = students[0]
~~~

→→→ group.length | 0, 1, 2, 3, 4, undefinded | 4 →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[0] = students
~~~

→→→ group.length | 0, 1, 2, 3 | 1→→→

◘◘![ico-20 hw] 6◘◘

~~~js
var  students = ['Frodo', 'Stephan', 'Madelin', 'Helen']
var hello = 'Hi ' + students[1] + '!'
~~~

→→→ hello | 'Hi !', 'Hi Frodo!', 'Hi Stephan!', 'Hi Madelin!', 'Hi Helen!' | Hi Stephan!→→→

_____________________________________________________________

## ![ico-25 icon] Об'єкти

**тип даних: ~object~**

Якщо масиви ми створювали за допомогою квадратних дужок, то для створення об'єктів ми будемо використовувати фігурні дужки ~{}~.
Вміст масиву ми перераховували всередині квадратних дужок через кому.
Індекси елементів у масиві визначалися автоматично на підставі порядку їхнього слідування під час перерахування.
Вміст об'єкта буде так само перераховуватися через кому, але є нюанс: **об'єкт не є впорядкованим набором елементів**.
Дані, які зберігатимуться в об'єкті, не матимуть індексів, а замість індексів ми використовуватимемо ключі, тобто текстові рядки (тип 'string').
І якщо дані в масиві ми називали **елементами масиву**, то дані в об'єкті ми будемо називати **властивостями об'єкта**.
Кожна властивість об'єкта має **ім'я** і **значення**.

Ось так визначається об'єкт **~human~** з трьома властивостями: **~name~**, **~age~** і **~employed~**:

◘◘![ico-25 cap] 5◘◘

~~~js
var human = {
  name: 'Frodo',
  age: 35,
  employed: true
}
~~~

Щоб движок зрозумів вас правильно, властивості об'єкта, що перераховуються всередині фігурних дужок, мають бути виразом ~ім'я: значення~.

Ім'я властивості є **ключем** для доступу до значення властивості, так само, як індекс елемента масиву є ключем для доступу до елемента масиву.
Ми можемо використовувати **крапкову нотацію** для доступу до властивостей об'єкта:

~~~js
human.name
~~~

~~~console
'Frodo'
~~~

Однак можна так само використовувати нотацію квадратних дужок, як у масивів, тільки замість цілочисельних індексів усередині квадратних дужок вказуються ключі, тобто рядки:

~~~js
human['name']
~~~

~~~console
'Frodo'
~~~

Чому така нотація буває зручнішою за точкову?

Припустимо, що ім'я ключа в нас міститься у змінній:

~~~js
var propName = 'name'
~~~

Тоді ми можемо отримати значення властивості об'єкта за ключем, що зберігається у змінній **~propName~**:

~~~js
human[propName]
~~~

~~~console
'Frodo'
~~~

Ми досить легко можемо додавати властивості об'єкту звичайним присвоюванням:

~~~js
human.hobby = ['sport', 'reading']
~~~

Після такого присвоювання об'єкт **~human~** у консолі матиме такий вигляд:

~~~console
▼ {name: 'Frodo', age: 35, employed: true, hobby: Array(2)}
    age: 35
    employed: true
    hobby: (2) ['sport', 'reading']
    name: "Frodo"
  ► [[Prototype]]: Object
~~~

Позже мы с вами узнаем, что это за свойство ~[[Prototype]]: Object~, которого мы с вами не добавляли объекту, но которое будет присутствовать в любом объекте.

Для удаления свойств нужно использовать оператор **~delete~**:

~~~js
delete human.hobby
~~~

Цей оператор можна застосовувати тільки до властивостей об'єкта, і він повертає логічне значення ~true~ або ~false~ залежно від того, відбулося видалення чи ні.

________________________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var memo = [1, false, 4.8, 'Google', [0, 1]]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 6◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students.group | 'Dev-05', 'Programming', 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Dev-05 →→→

◘◘![ico-20 hw] 7◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | undefinded →→→

◘◘![ico-20 hw] 8◘◘

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ students.names[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Helen Surmot →→→

◘◘![ico-20 hw] 9◘◘

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ students[4].name | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Gregory Trump →→→

◘◘![ico-20 hw] 10◘◘

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ students[4].homeworks[1] | 7, 10, 8, 4, 5, 9, undefinded | 5 →→→

________________________________________________________

[![ico-20 link] MDN](external/mdn-data-structures)