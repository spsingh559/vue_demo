<template>
   <v-content>
    <v-container class="fill-height" fluid>
      <HomePage />
    </v-container>
   </v-content>
</template>

<script>
import HomePage from '../components/HomePage'
export default {
  name:'Home',
  components:{HomePage}
};
</script>
