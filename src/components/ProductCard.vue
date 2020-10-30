<template>
  <v-card>
    <div class="pa-3 d-flex flex-column justify-center align-center cool">
      <ProductSVG
        :coverColor="cover_color"
        :boxColor="box_color"
        :productName="product.name"
        :ratio="Math.min(windowSize.x, windowSize.y) / 500"
      />
    </div>

    <v-card-title>{{ $t(product.name) }}</v-card-title>
    <v-card-subtitle v-if="!pallet" class="warning--text">
      <v-icon small color="warning">mdi-alert-circle</v-icon>
      托盘 {{product.pallet_guid}} 未注册。
    </v-card-subtitle>
    <v-card-subtitle v-else-if="pallet.ProductID!==product.guid" class="warning--text">
      <v-icon small color="warning">mdi-alert-circle</v-icon>
      托盘 {{pallet.Node}} 被占用。
    </v-card-subtitle>
    <v-card-subtitle v-else :class="pallet.PortValid ? 'green--text' : 'gray--text'">
      <v-icon small :color="pallet.PortValid ? 'green' : 'gray'">{{
        pallet.PortValid ? "mdi-link-variant" : "mdi-link-variant-off"
      }}</v-icon
      >{{ pallet.Address + ":" + pallet.ServicePort }}</v-card-subtitle
    >

    <v-card-text>
      <v-chip v-for="f in product.features" :key="f.id" class="mr-1 mb-1"
        ><strong>{{ $t(f.parameter) }}</strong
        >&nbsp;
        <span>({{ $t(f.description) }})</span>
      </v-chip>
    </v-card-text>

    <v-card-text v-if="product.status !== 'error'">
      <div>
        步骤{{ operations_done }}/{{ operations_total }}：{{ $t(next_step) }}
      </div>
      <v-progress-linear
        color="primary"
        height="10"
        :value="(operations_done / operations_total) * 100"
        striped
        rounded
      ></v-progress-linear>
    </v-card-text>
    <v-card-text v-else>
      <div class="red--text">错误：{{ product.message }}</div>
      <v-progress-linear
        color="error"
        height="10"
        :value="(operations_done / operations_total) * 100"
        striped
        rounded
      ></v-progress-linear>
    </v-card-text>

    <v-card-actions>
      <span class="v-card__text grey--text">{{ orderTime }}下单</span>
      <v-spacer />
      <v-btn
        v-if="product.status !== 'error'"
        color="primary"
        text
        :to="'/product/' + product.guid"
      >
        查看详细加工状态
      </v-btn>
      <v-btn v-else color="error" text disabled> 重试 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";
import ProductSVG from "@/components/ProductSVG.vue";
import axios from "axios";

export default {
  data: () => ({
    windowSize: {
      x: 0,
      y: 0,
    },
    pallet: null,
  }),

  mounted() {
    this.onResize();
    axios
      .get("/api/products/pallet/" + this.product.pallet_guid)
      .then((response) => (this.pallet = response.data));
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
  components: {
    ProductSVG,
  },
  props: {
    product: Object,
  },
  computed: {
    orderTime() {
      return moment(this.product.order.created_at).fromNow();
    },
    canSubmit() {
      return Object.values(this.values).every((x) => x);
    },
    operations_total() {
      return this.product.operations.length;
    },
    operations_done() {
      return this.product.operations.filter((x) => x.status == "done").length;
    },
    next_step() {
      var next_step = this.product.operations.find((x) => x.status != "done");
      if (!next_step) return "已完成";
      return next_step.name;
    },
    cover_color() {
      return this.product.features.find(
        (x) => x.description == "Cover,Upper,Box"
      ).parameter;
    },
    box_color() {
      return this.product.features.find(
        (x) => x.description == "Box,Upper,Pallet"
      ).parameter;
    },
  },
};
</script>

<style>
.cool {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23bdf4ff'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23e3f6ff'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1 0-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: local;
  background-size: cover;
}
</style>