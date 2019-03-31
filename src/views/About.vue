<template>
  <div class="about">
    <h1>About me</h1>
    <profolio name='fafa' email='fafa@email.com' />
    <p>{{ countState }}</p>
    <button @click="increment">+</button>
  </div>
</template>
<script>
import Profolio from '@/components/Profolio.vue';
import { mapActions, mapMutations, mapState} from 'vuex'

export default {
  name: 'About',
  components: {
    Profolio,
  },
  computed: {
    ...mapState({
      countState: state => state.countStore.count
    })
  },
  methods: mapActions('countStore',['increment'])
  
}
</script>

