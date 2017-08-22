import _ from 'lodash';
import Vue from 'vue';
import firebase from 'firebase';

import * as types from '../types';

const ref = 'posts/';

const state = {
    posts: {}
};

const getters = {
    [types.GET_POSTS]: state => state.posts,
    [types.GET_POST_BY_PERMALINK]: state => permalink => state.posts[permalink]
};

const mutations = {
    [types.SET_POSTS](state, posts) {
        state.posts = _.mapKeys(posts, (value, key) => { 
            value._id = key;
            return  value.permalink;
        });
    },
    [types.ADD_POST](state, post) {
        const newPost = _.mapKeys(post, (value, key) => { 
            value._id = key;
            return  value.permalink;
        });

        state.posts = { ...state.posts, ...newPost };
    },
    [types.DELETE_POST](state, id) {
        state.posts = _.pickBy(state.posts, post => post._id != id);
    }
};

const actions = {
    [types.FETCH_POSTS]({ commit }) {
        firebase.database()
            .ref(ref)
            .once('value', snapshot => {
                commit(types.SET_POSTS, snapshot.val());
            });

        // Vue.http.get(endpoint)
        //     .then(({ data }) => {
        //         commit(types.SET_POSTS, data);
        //     });
    },
    [types.FETCH_POST]({ commit }, permalink) {
        firebase.database()
            .ref(ref)
            .orderByChild('permalink')
            .equalTo(permalink)
            .once('value', snapshot => {
                commit(types.ADD_POST, snapshot.val());
        });

        // Vue.http.get(`${ endpoint }?orderBy="permalink"&equalTo="${ permalink }"`)
        //     .then(({ data }) => {
        //         commit(types.ADD_POST, data);
        //     });
    },
    [types.CREATE_POST]({ commit, state }, post) {
        firebase.database()
            .ref(ref)
            .push({
                ...post,
                date: new Date().getTime()
            })
            .once('value', snapshot => {
                commit(types.ADD_POST, {[snapshot.key]: snapshot.val()})
            });

        // Vue.http.post(endpoint, post)
        //     .then(({ data }) => {
        //         commit(types.ADD_POST, post);
        //     });
    },
    [types.DELETE_POST]({ commit }, id) {
        firebase.database()
            .ref(ref.concat(id))
            .remove()
            .then(() => {
                commit(types.DELETE_POST, id);
            });
    }
};

export default {
    state, getters, mutations, actions
};