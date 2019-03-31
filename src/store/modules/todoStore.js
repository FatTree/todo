import axios from 'axios';
import { format } from 'util';
import { log } from 'util';

const state = {
    lists: [],
};
const getters = {
    all: state => state.lists.map(list => state.lists.indexOf(list)),
    unchecked: state => state.lists.filter(list => !list.checkflag).map(list => state.lists.indexOf(list)),
    done: state => state.lists.filter(list => list.checkflag).map(list => state.lists.indexOf(list)),
};

const mutations = {
    // insert state from db
    loadData(state, lists) {
        state.lists = lists;
    },
    /**
     * update data to db and state
     * 1. Defind param: payload.
     * 2. Judge the value of param 'action', than assign function.
     * 3. Ajax to server side and update state.
     */
    updateData(state, payload) {
        const { action, index, item } = payload;
        // eslint-disable-next-line object-curly-newline
        const { checkflag, detail, memberid, id } = item;
        if (action === 'create') {
            axios.post('http://localhost:8081/ssm-simple/checklist/create', {
                id,
                checkflag: 0,
                detail,
                memberid,
            }).then(() => {
                state.lists.push(item);
            });
        } else if (action === 'remove') {
            axios.post('http://localhost:8081/ssm-simple/checklist/delete', {
                id,
            }).then(() => {
                state.lists.splice(index, 1);
            });
        } else if (action === 'check') {
            axios.post('http://localhost:8081/ssm-simple/checklist/check', {
                id,
                checkflag,
            }).then(() => {
                state.lists[index].checkflag = checkflag;
            });
        }
    },
};

const actions = {
    loadData({ commit }, mbId) {
        axios.post('http://localhost:8081/ssm-simple/checklist/list', { memberId: mbId }).then((res) => {
            commit('loadData', res.data.result);
            console.log(res);
        });
    },
};

export default{
    namespaced: true,
    strict: true,
    state,
    getters,
    actions,
    mutations,
};
