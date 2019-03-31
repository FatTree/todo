import Vue from 'vue';
import Vuex from 'vuex';
import countStore from './modules/countStore';
import todoStore from './modules/todoStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countStore,
    todoStore,
  },
});
