<template>
<div class="out">
    <h1> TODO LIST</h1>
    <input class="todo__input" v-model="todoDetail" @keyup.enter="create" placeholder="add todo" type="text">
    <br>
    <div class="filter">
        <!-- <a v-for="(val, key) in filters" 
            :href="'#/'+key" 
            class="filter__btn"
            @click="result = key"> {{val}} </a> -->
        <router-link v-for="(val, key) in filters" 
            :to="'/todo/'+key" 
            class="filter__btn"> {{val}} </router-link>
    </div>
    <div class="list">
        <List v-for='index in stateFilter' 
            :key="index"
            :index='index' />
        <!-- <List v-for='(todoState, index) in stateFilter'
            :index='index' 
            :lid='todoState.id' 
            :memberid='todoState.memberid' 
            :detail='todoState.detail' 
            :checkflag='todoState.checkflag' /> -->
    </div>
</div>
</template>
<script>
import List from '@/components/List.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { mapActions, mapMutations, mapState, mapGetters} from 'vuex'
const filters = {
    all: 'all',
    unchecked: 'unchecked',
    done: 'done',
}
export default {
    name: 'todo',
    data: function() {
        return {
            todoDetail: '',
            filters,
            result: 'all',
        }
    },
    methods: {
        create(){
            const memId = 'A0001'
            let detail = this.todoDetail && this.todoDetail.trim()
            if(!detail) return

            let now = new Date();
            let yy = now.getFullYear();
            let MM = '' + (now.getMonth() + 1);
            let DD = '' + now.getDate();
            let HH = '' + now.getHours();
            let mm = '' + now.getMinutes();
            let ss = '' + now.getSeconds();

            function fmt(v) {
                if(v.length < 2) {
                    return v = '0' + v
                }
                return v
            }
            let id = `ch${fmt(yy)}${fmt(MM)}${fmt(DD)}${fmt(HH)}${fmt(mm)}${fmt(ss)}`;
            console.log(`id = ${id}`);
            console.log('create:' + detail);
            let payload = {
                action: 'create',
                index: 0,
                item : {
                    id,
                    checkflag: false,
                    detail,
                    memberid: memId
                }
            };
            this.$store.commit('todoStore/updateData', payload)
            this.todoDetail = ''
        },
    },
    computed: {
        todo() {
            return this.$store.state.todoStore.lists[this.index]
        },
        todoStates() {
            return this.$store.state.todoStore.lists
        },
        stateFilter() {
            let rs = this.$store.state.route.params.filter
            let lst = this.$store.state.todoStore.lists
            if(!rs) {
                rs = 'all'
            }
            // return this.$store.getters['todoStore/todoFilter']
            return this.$store.getters['todoStore/'+rs]
        }
    },
    components: {
        List,
    },
}
</script>
<style>
/* *{
    border: 1px solid gray ;
} */
.out{
    width: 500px;
    margin: 0 auto;
}
.todo__input {
    line-height: 2em;
    width: 60%;
}
.filter {
    line-height: 3em;
}
.filter__btn {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin: 0.5em;
    padding: 0.2em;
    border: 1px solid gray;
    border-radius: 5px;
}
.filter__btn--selected {

}
.list {
    width: 300px;
    margin: 0 auto;
    text-align: left;
    /* padding-left: 3em; */
}
</style>

