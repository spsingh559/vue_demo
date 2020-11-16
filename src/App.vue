<template>
  <v-app>
    
    <v-app-bar app>
      <v-toolbar-title >
        <span class="headline text-uppercase">Location Portal </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

     <v-content>
       <router-view/> <!-- Importing components -->
    </v-content>

  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
