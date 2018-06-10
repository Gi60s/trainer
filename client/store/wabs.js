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
    auth: {
        accessToken: undefined,
        expires: undefined
    },
    user: undefined
});

// export mutations object
export const mutations = {
    authUpdate (state, payload) {
        state.auth.accessToken = payload ? payload.accessToken : undefined;
        state.auth.expires = payload ? new Date(payload.expires) : undefined;
    },
    userUpdate (state, payload) {
        state.user = payload || null;
    }
};
