/**
 *  @license
 *    Copyright 2018 Brigham Young University
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 **/
'use strict'

export function debounce(callback, delay) {
  let timeoutId
  return function() {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(callback, delay)
  }
}

export function deepCopy(obj) {
  const map = arguments[1] || new WeakMap()
  const prev = map.get(obj)

  if (prev) {
    return prev
  } else if (Array.isArray(obj)) {
    const result = obj.map(v => deepCopy(v, map))
    map.set(obj, result)
    return result
  } else if (obj && typeof obj === 'object') {
    const result = {}
    Object.keys(obj)
      .forEach(key => {
        result[key] = deepCopy(obj[key], map)
      })
    map.set(obj, result)
    return result
  } else {
    return obj
  }
}