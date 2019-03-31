<template>
    <div class="List">
        <div class="list__out">
            <input type="hidden" value='index'>
            <input type="checkbox" :checked="todo.checkflag" @change="check('{{todo.lid}}','{{todo.checkflag}}')">
            {{index}}    {{todo.detail}}
            <button class="list__right" @click="remove('{{todo.id}}')" type="button">delete</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import VueAxios from 'vue-axios';
import { mapActions, mapMutations, mapState, mapGetters} from 'vuex'
export default {
    name: 'List',
    methods: {
        remove(lid){
            console.log('remove : '+this.todo.id);
            let id = this.todo.id;
            let checkflag = this.todo.checkflag;
            let chflag = true
            if(checkflag) {
                chflag = false
            } 
            let payload = {
                action: 'remove',
                index: this.index,
                item : {
                    id
                }
            };
            this.$store.commit('todoStore/updateData', payload)
        },
        check(lid,flag){
            let id = this.todo.id;
            let checkflag = this.todo.checkflag;
            // let idx = this.$store.state.todoStore.lists[this.index];
            console.log('check : ' + id);
            let chflag = true
            if(checkflag) {
                chflag = false
            } 
            let payload = {
                action: 'check',
                index: this.index,
                item : {
                    id,
                    checkflag: chflag,
                }
            };
            this.$store.commit('todoStore/updateData', payload)
        }
    },
    props: {
        lid: String,
        memberid: String,
        detail: String,
        checkflag: Boolean,
        index: Number
    },
    computed: {
        todo() {
            return this.$store.state.todoStore.lists[this.index]
        },
    },
}
</script>
<style>
.list__out {
    border-top: 1px solid #d3d3d3;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}
.list__right {
    float:right;
} 
</style>

