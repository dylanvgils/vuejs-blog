import _ from 'lodash';
import Vue from 'vue';

import * as types from '../types';

const endpoint = 'posts.json';

const state = {
    posts: {}
};

const getters = {
    [types.GET_POSTS]: state => state.posts,
    [types.GET_POST_BY_PERMALINK]: state => permalink => state.posts[permalink]
};

const mutations = {
    [types.SET_POSTS](state, posts) {
        state.posts = _.mapKeys(posts, 'permalink');
    },
    [types.ADD_POST](state, { permalink, title, content }) {
        state.posts = { ...state.posts, [permalink]: { title, content } };
    }
};

const actions = {
    [types.FETCH_POSTS]({ commit }) {
        Vue.http.get(endpoint)
            .then(({ data }) => {
                commit(types.SET_POSTS, data);
            });
    },
    [types.FETCH_POST]({ commit }, permalink) {
        Vue.http.get(`${ endpoint }?orderBy="permalink"&equalTo="${ permalink }"`)
            .then(({ data }) => {
                commit(types.ADD_POST, data[Object.keys(data)[0]]);
            });
    },
    [types.CREATE_POST]({ commit }, post) {
        Vue.http.post(endpoint, post)
            .then(({ data }) => {
                commit(types.ADD_POST, post);
            });
    }
};

export default {
    state, getters, mutations, actions
};