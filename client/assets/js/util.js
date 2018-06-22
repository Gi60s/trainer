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

const rxPageSplit = /^\s*={2,}$/m
const rxPageTitle = /^\s*#{1,}\s*(.*)$/m
const rxSectionSplit = /^\s*-{2,}$/m



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

export function parseLessonContent(content) {
  const titles = []

  const pages = content
    .split(rxPageSplit)
    .map((s, index) => {
      const match = rxPageTitle.exec(s)
      const title = match ? match[1] : 'Page ' + (index + 1)
      titles.push(title)

      const sections = s.trim()
        .split(rxSectionSplit)
        .map(v => v.trim())

      return {
        title,
        sections
      }
    })

  return {
    titles,
    pages
  }
}