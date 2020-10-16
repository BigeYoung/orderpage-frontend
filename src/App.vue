<template>
  <v-app>
    <v-main>
      <v-card-title class="text-center justify-center py-6 d-none d-sm-flex">
        <h2>华南理工大学智能制造实验室</h2>
      </v-card-title>
      <v-tabs grow icons-and-text>
        <v-tab v-for="r in routes" :key="r.key" :to="r.path">
          {{ r.name }}
          <v-badge
            color="green"
            :content="count[r.path.replace('/', '')]"
            :value="count[r.path.replace('/', '')]"
            overlap
          >
            <v-icon>{{
              r.path === $route.path
                ? r.meta.icon.replace("-outline", "")
                : r.meta.icon
            }}</v-icon>
          </v-badge>
        </v-tab>
      </v-tabs>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),

  computed: {
    routes() {
      return this.$router.options.routes.filter((x) => x.meta);
    },
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    update() {
      this.$store.dispatch("count/get");
    },
  },
  mounted() {
    this.update();
    this.timer = setInterval(this.update, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
