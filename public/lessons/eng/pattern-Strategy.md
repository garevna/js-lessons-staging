# ![ico-30 study] Design Patterns

_____________________________________

### ![ico-20 icon] Strategy

This is a **behavioral** pattern.

It allows you to describe several strategies of the object's behavior with the ability to choose the desired strategy.

_______________________________

First, let's create a few helper modules, which you can then import into the main module of the class.

^^^[helpers/validStrategyNames.js]
~~~js
export const validStrategyNames = [
  'sum-of-all-numeric-fields',
  'array-field-length',
  'key'
]
~~~
^^^

Let's create the helper functions ~strategyError~, ~dataError~, ~keyError~, ~keyPropError~, ~arrayFieldError~:

^^^[helpers/strategyError.js]
~~~js
export function strategyError () {
  const stack = `
    Valid strategy names:<br>
      • sum-of-all-numeric-fields<br>
      • array-field-length<br>
      • key (key name should be third argument.)
  `
  throw Object.assign(new Error('Invalid strategy.'), {
    name: 'Invalid strategy.',
    message: 'First argument should be the name of strategy.',
    stack
  })
}
~~~
^^^

^^^[helpers/dataError.js]
~~~js
export function dataError () {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Source data error.',
    message: 'Invalid source data.',
    stack: 'Source data should be the array of objects.'
  })
}
~~~
^^^

^^^[helpers/keyError.js]
~~~js
export function keyError () {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Sorting key error.',
    message: 'Empty key field.',
    stack: 'Third argument should be the name of key field.'
  })
}
~~~
^^^

^^^[helpers/keyPropError.js]
~~~js
export function keyPropError (key) {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Sorting error.',
    message: `Invalid key ${key}.`,
    stack: `There is no prop  in source data.`
  })
}
~~~
^^^

^^^[helpers/arrayFieldError.js]

~~~js
export function arrayFieldError (key) {
  throw Object.assign(new Error('Sorting error'), {
    name: 'Sorting error.',
    message: `Invalid key ${key}.`,
    stack: `There is no prop  in source data.`
  })
}
~~~
^^^
____________________________________

^^^[helpers/testStrategy.js]
~~~js
import { validStrategyNames } from './validStrategyNames'
import { strategyError } from './strategyError'
import { dataError } from './dataError'
import { keyError } from './keyError'
import { keyPropError } from './keyPropError'
import { arrayFieldError } from './arrayFieldError'

export function testStrategy (strategyName, data, key) {
  if (!validStrategyNames.includes(strategyName)) return strategyError()

  if (!Array.isArray(data)) return dataError()

  if (strategyName === 'key' && !key) return keyError()

  if (strategyName === 'key' && !data.filter(record => record[key]).length) {
    return keyPropError(key)
  }

  if (strategyName === 'array-field-length') {
    const err = data
      .filter(record => Object.keys(record).filter(key => Array.isArray(record[key]).length))
      .length

    if (err) arrayFieldError()
  }
}
~~~
^^^
____________________________________

Let's create a **SortStrategy** class.
An instance of this class will sort the resulting array of objects according to the specified strategy.
In this example, the instance can use three collation strategies:

| **key** | Sort by a given key.<br>^^Each element (object) of the array must have a property with an appropriate name.^^ |
| **sum-of-all-numeric-fields** | Sort by the sum of all numeric properties of the object.<br>^^All numeric properties of the object that is an element of the original (sorted) array will be summed.<br>The source array will be sorted by the sum of the numeric properties of the objects.^^ |
| **array-field-length** | Sort by length of the array property.<br>^^All objects that are elements of the original (sortable) array must have an array property.<br>The source array will be sorted by the length of the property array.^^ |

Switching from one strategy to another occurs by changing the **valueOf** property of each element of the source array.

^^^[class SortStrategy]
~~~js
import { testStrategy } from './helpers/testStrategy'

class SortStrategy  {
  constructor () {
    Object.assign(this, {
      strategy: null,
      testStrategy
    })
  }

  sort (algorithm, data, key) {
    this.testStrategy(algorithm, data, key)

    this[algorithm](data)

    data.forEach((record, index, arr) => {
      let current = index, prev = index
      while (--prev >= 0) {
        if (arr[current] + 0 < arr[prev] + 0) {
          ;[arr[prev], arr[current]] = [arr[current], arr[prev]]
          current = prev
        }
      }
    })
  }

  'sum-of-all-numeric-fields' (arrayOfObjects) {
    return arrayOfObjects
      .map(item => item.valueOf = function () {
         return Object.keys(this)
           .reduce((res, prop) => res += Number(this[prop]) || 0, 0)
      })
  }

  'array-field-length' (arrayOfObjects) {
    return arrayOfObjects
      .map(item => item.valueOf = function () {
        const propName = Object.keys(this)
          .find(prop => Array.isArray(this[prop]))
        return this[propName].length
      })
  }

  'key' (arrayOfObjects, keyField) {
    return arrayOfObjects
      .map((item, index, array) => Object.assign(array[index], {
        valueOf () { return this[keyField] }
      }))
  }
}
~~~
^^^

Now let's deal with the initial data. We will use three arrays of objects with a different set of properties.

^^^[salary]
~~~js
const salary = [
  { name: 'Stephan', jan: 5000, fab: 5200, mar: 5800, apr: 4950, may: 4700, jun: 5100, jul: 5300, aug: 5000, sep: 4900, nov: 4800, dec: 5500 },
  { name: 'Georg', jan: 2000, fab: 2200, mar: 2500, apr: 2550, may: 2400, jun: 2800, jul: 2100, aug: 2000, sep: 2200, nov: 2450, dec: 2700 },
  { name: 'Mary', jan: 3100, fab: 3200, mar: 3000, apr: 3400, may: 3000, jun: 3300, jul: 3400, aug: 3700, sep: 3800, nov: 3700, dec: 3900 },
  { name: 'Piter', jan: 2000, fab: 2250, mar: 1800, apr: 1950, may: 2100, jun: 2100, jul: 2700, aug: 2500, sep: 2900, nov: 2800, dec: 4000 },
  { name: 'Helen', jan: 2000, fab: 2100, mar: 1700, apr: 1900, may: 2000, jun: 2000, jul: 2500, aug: 2000, sep: 2400, nov: 2700, dec: 3500 },
  { name: 'Michael', jan: 3000, fab: 3200, mar: 2800, apr: 2950, may: 2700, jun: 3100, jul: 3300, aug: 4000, sep: 3900, nov: 3800, dec: 4500 },
  { name: 'Andry', jan: 2800, fab: 2700, mar: 2800, apr: 2750, may: 2700, jun: 2500, jul: 2800, aug: 2700, sep: 2700, nov: 2800, dec: 3000 }
]
~~~
^^^

^^^[workers]
~~~js
const workers = [
  { name: 'Stephan', payments: [5000, 5200, 5800, 4950, 4700, 5100, 5300, 5000, 4900, 4800, 5500] },
  { name: 'Georg', payments: [2000, 2200, 2500, 2550, 2400, 2800, 2100, 2000, 2200] },
  { name: 'Mary', payments: [900, 700, 1000, 1200, 200, 400, 250] },
  { name: 'Piter', payments: [1000, 2050, 1800, 700, 300, 500] },
  { name: 'Helen', payments: [200, 210, 170, 190, 200] },
  { name: 'Michael', payments: [3000, 3200, 2800, 2950] },
  { name: 'Andry', payments: [1000, 1000, 900, 950] }
]
~~~
^^^

^^^[users]
~~~js
const users = [
  { name: 'Stephan', age: 30, works: 7, children: 2 },
  { name: 'Georg', age: 25, works: 2, children: 1 },
  { name: 'Mary', age: 34, works: 10, children: 1 },
  { name: 'Piter', age: 50, works: 25, children: 3 },
  { name: 'Helen', age: 40, works: 20, children: 3 },
  { name: 'Michael', age: 38, works: 16, children: 2 },
  { name: 'Andry', age: 45, works: 20, children: 2 }
]
~~~
^^^

The only thing left to do is to create an instance of the **SortStrategy** class:
~~~js
const sortStrategy = new SortStrategy
~~~

and check how it works.

~~~js
function sort (algorithm, data, key) {
  try {
    sortStrategy.sort(algorithm, data, key)
    console.log(data)
  } catch (error) {
    console.warn(error)
  }
}

sort('sum-of-all-numeric-fields', salary)
sort('key', users, 'name')
sort('array-field-length', worker)
~~~

{{{pattern-strategy.js}}}
