<template>
  <v-row class="ma-0" v-resize="onResize">
    <v-col cols="12" md="6">
      <v-card
        flat
        class="ma-3 pt-8 d-flex flex-column justify-center align-center"
      >
        <ProductSVG
          :coverColor="values.cover_color"
          :boxColor="values.box_color"
          :productName="values.product_name"
          :ratio="Math.min(windowSize.x, windowSize.y) / 400"
        />
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <OrderParam
        v-for="p in params"
        :key="p.title"
        :title="p.title"
        :value="values[p.title]"
        @input="values[p.title] = $event"
        :options="p.options"
      />
      <v-btn
        outlined
        class="float-right ma-3"
        :disabled="!canSubmit || submitting"
        :loading="submitting"
        @click="submit"
        >提交订单</v-btn
      >
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="2000" color="error">
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import OrderParam from "@/components/OrderParam.vue";
import ProductSVG from "@/components/ProductSVG.vue";
import axios from "axios";

export default {
  components: {
    OrderParam,
    ProductSVG,
  },
  data: () => ({
    submitting: false,
    params: [
      {
        title: "box_color",
        options: ["Crimson", "Orchid", "IndianRed", "Turquoise", "Red", "Pink"],
      },
      {
        title: "cover_color",
        options: ["Crimson", "Orchid", "IndianRed", "Turquoise", "Red", "Pink"],
      },
      {
        title: "product_name",
        options: ["Box_Wood", "Box_UDisk"],
      },
    ],
    values: {
      box_color: "",
      cover_color: "",
      product_name: "",
    },
    windowSize: {
      x: 0,
      y: 0,
    },
    error: null,
    snackbar: false,
  }),

  computed: {
    canSubmit() {
      return Object.values(this.values).every((x) => x);
    },
  },

  mounted() {
    this.onResize();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    submit() {
      this.submitting = true;
      axios({
        method: "post",
        url: "/api/order",
        data: {
          values: this.values,
          box_idx:
            this.params
              .find((x) => x.title === "box_color")
              .options.indexOf(this.values.box_color) + 1,
          cover_idx:
            this.params
              .find((x) => x.title === "cover_color")
              .options.indexOf(this.values.cover_color) + 1,
        },
      })
        .then(() => {
          this.$store.dispatch("count/get");
        })
        .catch((error) => {
          this.error = error;
          this.snackbar = true;
        })
        .finally(() => {
          this.submitting = false;
        });
    },
  },
};
</script>

<style>
</style>