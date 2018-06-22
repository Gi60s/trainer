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
'use strict';

// export state as a function
export const state = () => ({
  current: {
    id: 'intro1',
    title: 'Intro to JavaScript',
    description: 'Syntax, scope, variables, context, and functions',
    tags: ['red', 'green', 'blue'],
    content: `# Title 1 has a long title

1

--

2

--

3

==

# Title 2 has a long title

1

--

2

--

3

==

1

--

2

--

3

==

# Title 4

1

--

2

--

3

==

`
  },
  list: [
    { id: 'intro1', title: 'Intro to JavaScript', description: 'Syntax, scope, variables, context, and functions'},
    { id: 'intro2', title: 'Intro to JavaScript 2', description: 'Objects, classes, and prototypes'},
    { id: 'build', title: 'Build tools', description: '' }
  ]
});

// export mutations object
export const mutations = {
  update (state, payload) {
    const id = payload.id;
    state.current = payload;

    console.log(state.list)
    const index = state.list.findIndex(v => v.id === id);
    if (index !== -1) {
      state.list.splice(index, 1, {
        id: payload.id,
        title: payload.title,
        description: payload.description
      })
    }
  }
};

export const actions = {
  save ({ commit, state }, lesson) {
    // TODO: perform axios save
    commit('update', lesson)
  }
}