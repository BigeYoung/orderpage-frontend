<template>
  <v-main>
    <v-container>
      <v-row v-if="!products">
        <v-col cols="12" md="4" v-for="i in count['done']" :key="i">
          <v-skeleton-loader
            v-bind="attrs"
            type="card, article, actions"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12" md="4" v-for="p in products" :key="p.guid">
          <ProductCard :product="p" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  data: () => ({
    products: null,
  }),
  methods: {
    update() {
      axios.get("/api/products/done").then((response) => {
        this.products = response.data.products;
      });
    },
  },
  mounted() {
    this.update();
    this.timer = setInterval(this.update, 9000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
  }
};
</script>

<style>
</style>