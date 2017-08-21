import _ from 'lodash';
import Vue from 'vue';
import firebase from 'firebase';

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
    }
};

const actions = {
    [types.FETCH_POSTS]({ commit }) {
        firebase.database().ref('/posts').once('value').then(snapshot => {
            commit(types.SET_POSTS, snapshot.val());
        });

        // Vue.http.get(endpoint)
        //     .then(({ data }) => {
        //         commit(types.SET_POSTS, data);
        //     });
    },
    [types.FETCH_POST]({ commit }, permalink) {
        firebase.database()
            .ref('/posts')
            .orderByChild('permalink')
            .equalTo(permalink)
            .once('value')
            .then(snapshot => {
                commit(types.ADD_POST, snapshot.val());
        });

        // Vue.http.get(`${ endpoint }?orderBy="permalink"&equalTo="${ permalink }"`)
        //     .then(({ data }) => {
        //         commit(types.ADD_POST, data);
        //     });
    },
    [types.CREATE_POST]({ commit, state }, post) {
        firebase.database()
            .ref('/posts')
            .push(post)
            .once('value', snapshot => {
                commit(types.ADD_POST, {[snapshot.key]: snapshot.val()})
            });

        // Vue.http.post(endpoint, post)
        //     .then(({ data }) => {
        //         commit(types.ADD_POST, post);
        //     });
    }
};

export default {
    state, getters, mutations, actions
};