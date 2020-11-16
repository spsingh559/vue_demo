<template>
  <div>
    <v-row >
      <v-col v-for="user in users" :key="user.id">
        <v-card class="mx-auto" max-width="344" style="margin-left:200px">
          <v-img
            src="https://i.pinimg.com/originals/17/56/8f/17568fcd478e0699067ca7b9a34c702f.png"
            height="200px"
          ></v-img>

          <v-card-title>
            {{ user.name }}
          </v-card-title>

          <v-card-actions>
            <v-btn color="orange lighten-2" text @click="submit(user.id)">
              Explore the Places I visited
            </v-btn>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
        </v-row>
      
  

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{ name }} love travelling and here are list of visited cities
        </v-card-title>
        <v-card-text>
          <v-chip
            class="ma-2"
            color="primary"
            v-for="loc in locationVisited"
            :key="loc"
            @click="findCountry(loc)"
          >
            {{ loc }}
          </v-chip>
        </v-card-text>

        <v-card-text v-if="show">
          You are very curious to know about the places,
          <b>{{ placeName }}</b> is in <b>{{ country }}</b>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="close"> close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import usersData from "../data/Travellers.json";
import places from "../data/Places.json";
export default {
  name: "HomePage",
  data: () => ({
    users: usersData,
    dialog: false,
    locationVisited: [],
    name: "",
    country: "",
    countries: places,
    show: false,
    placeName: "",
  }),
  methods: {
    submit(id) {
      this.dialog = true;
      this.users.forEach((data) => {
        if (data.id == id) {
          this.locationVisited = data.places;
          this.name = data.name;
        }
      });
      console.log(this.locationVisited);
    },
    findCountry(loc) {
      this.show = true;

      this.countries.forEach((data) => {
        if (data.place == loc) {
          this.placeName = loc;
          this.country = data.country;
        }
      });
      console.log(this.country);
    },
    close() {
      this.show = false;
      this.dialog = false;
    },
  },
};
</script>
