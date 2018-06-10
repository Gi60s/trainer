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
  courses: {
    awd: {
      id: 'awd',
      title: 'Advanced Web Development',
      discoverability: 'public',
      guided: 'both',
      materials: [
        { id: 'intro1', store: 'lessons' },
        { id: 'funct', store: 'projects' },
        { id: 'intro', store: 'quizzes' },
        { id: 'intro2', store: 'lessons' },
        { id: 'obj', store: 'projects' },
        { id: 'build', store: 'lessons' }
      ],
      tags: ['node', 'nodejs', 'javascript', 'html', 'css', 'webpack', 'vue', 'web components']
    }
  },
  lesson: {
    title: 'Intro to JavaScript',
    content: `
    ## Page 1
    
    Some text
    
    --- section break
    
    Some text
    
    === page break
    `,
    pages: [
      {
        title: 'Page 1',
        sections: [
          { title: 'Section 1', type: 'markdown', content: '<p>This is the first section</p>' },
          { title: 'Section 2', type: 'markdown', content: '<p>This is the second section</p>' },
          { title: 'Section 3', type: 'markdown', content: '<p>This is the third section</p>' }
        ]
      },
      {
        title: 'Page 2',
        sections: [
          { title: 'Section 1', type: 'markdown', content: '<p>This is the first section</p>' },
          { title: 'Section 2', type: 'markdown', content: '<p>This is the second section</p>' },
          { title: 'Section 3', type: 'markdown', content: '<p>This is the third section</p>' }
        ]
      },
      {
        title: 'Page 3',
        sections: [
          { title: 'Section 1', type: 'markdown', content: '<p>This is the first section</p>' },
          { title: 'Section 2', type: 'markdown', content: '<p>This is the second section</p>' },
          { title: 'Section 3', type: 'markdown', content: '<p>This is the third section</p>' }
        ]
      }
    ]
  },
  lessons: {
    'intro1': { id: 'intro1', title: 'Intro to JavaScript', description: 'Syntax, scope, variables, context, and functions'},
    'intro2': { id: 'intro2', title: 'Intro to JavaScript 2', description: 'Objects, classes, and prototypes'},
    'build': { id: 'build', title: 'Build tools', description: '' },
  },
  projects: {
    'funct': { id: 'funct', title: 'Fun with Functions', description: 'Put into practice the use of creating and using funcitons.'},
    'obj': { id: 'obj', title: 'Objects', description: 'Create objects using composition and classes' }
  },
  quizzes: {
    'intro': { id: 'intro', title: 'Follow up quiz for JavaScript intro', description: '' }
  }
});

// export mutations object
export const mutations = {
  courseUpdate (state, payload) {
    state.courses[payload.id] = payload;
  }
};