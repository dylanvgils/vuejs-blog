import firebase from 'firebase';

import * as types from '../types';

const state = {
    uid: null,
};

const getters = {
    [types.GET_USER]: state => state.uid
};

const mutations = {
    [types.SET_USER](state, uid) {
        state.uid = uid;
    }
};

const actions = {
    [types.INIT_USER]({ commit }, uid) {
        commit(types.SET_USER, uid);
    },
    [types.SIGN_IN]({ commit }, payload) {
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit(types.SET_USER, user.uid);
            })
            .catch(error => {
                console.log(error);
            });
    },
    [types.SIGN_OUT]({ commit }) {
        firebase.auth().signOut().then(() => {
            commit(types.SET_USER, null);
        });
    }
};

export default {
    state, getters, mutations, actions
};