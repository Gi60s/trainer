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
    id: 'into',
    title: 'Follow up quiz for JavaScript intro',
    description: '',
    questions: [
      {
        type: 'select',
        multiple: false,
        prompt: 'What is the answer?',
        choices: [
          {
            answer: 'Answer 1',
            value: 0
          },
          {
            answer: 'Answer 2',
            value: 1
          }
        ]
      }
    ]
  },
  list: {
    'intro': { id: 'intro', title: 'Follow up quiz for JavaScript intro', description: '' }
  }
});

// export mutations object
export const mutations = {
  update (state, payload) {
    state.list[payload.id] = payload;
  },

  lessonSet (state, payload) {
    state.lesson = payload
  }
};

export const actions = {
  save ({ commit, state }, id) {
    // TODO: perform axios save
  }
}