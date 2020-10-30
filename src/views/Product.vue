<template>
  <div>
    <v-app-bar
      dark
      shrink-on-scroll
      prominent
      extended
      :extension-height="80"
      fade-img-on-scroll
      scroll-target="#scrolling-view"
    >
      <template v-slot:img>
        <div class="d-flex justify-end">
          <ProductSVG
            :ratio="2.5"
            :box-color="box_color"
            :cover-color="cover_color"
            :product-name="product.name"
          />
        </div>
      </template>
      <v-toolbar-title>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span v-if="product">{{ $t(product.name) }}</span>

        <v-chip-group column class="mx-12">
          <v-chip
            v-for="f in product.features"
            :key="f.id"
            class="mr-1 mb-1"
            disabled
            ><strong>{{ $t(f.parameter) }}</strong
            >&nbsp;
            <span>({{ $t(f.description) }})</span>
          </v-chip>
        </v-chip-group>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-sheet id="scrolling-view">
      <v-row>
        <v-col cols="12" md="6">
          <v-timeline align-top dense>
            <v-timeline-item color="green" small>
              <v-row>
                <v-col cols="3" class="pt-0">
                  <strong>{{
                    $moment(product.order.created_at).format("HH:mm:ss")
                  }}</strong>
                </v-col>
                <v-col class="pt-0">
                  <strong>用户下单</strong>
                  <div>订单编号：{{ product.order.id }}</div>
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item
              :color="o.status === 'done' ? 'green' : 'grey'"
              small
              v-for="o in product.operations"
              :key="o.index"
            >
              <v-row :class="o.status === 'done' || 'grey--text'">
                <v-col cols="3" class="pt-0">
                  <strong>{{
                    o.status === "done"
                      ? $moment(o.end_time).format("HH:mm:ss")
                      : "等待"
                  }}</strong>
                </v-col>
                <v-col class="pt-0">
                  <strong>{{ $t(o.name) }}</strong>
                  <div>{{ o.param }}</div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="ma-6">
            <v-list-item two-line v-if="!pallet_loading">
              <v-list-item-avatar>
                <v-icon v-if="!pallet" large color="error"
                  >mdi-alert-circle</v-icon
                >
                <v-icon
                  v-else-if="pallet.ProductID !== $route.params.product_guid"
                  large
                  color="error"
                  >mdi-alert-circle</v-icon
                >
                <v-icon v-else-if="!pallet.PortValid" large color="warning"
                  >mdi-link-variant-off</v-icon
                >
                <v-icon v-else large color="success">mdi-link-variant</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ pallet.Node }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="!pallet">
                  该托盘未注册。
                </v-list-item-subtitle>
                <v-list-item-subtitle
                  v-else-if="pallet.ProductID !== $route.params.product_guid"
                >
                  该托盘被其他产品占用。
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  {{ pallet.Address }}:{{ pallet.ServicePort }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import ProductSVG from "@/components/ProductSVG.vue";
import axios from "axios";

export default {
  components: {
    ProductSVG,
  },
  data: () => ({
    product: null,
    pallet: null,
    pallet_loading: true,
  }),
  mounted() {
    this.update();
    this.timer = setInterval(this.update, 5000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    update() {
      axios
        .get("/api/products/info/" + this.$route.params.product_guid)
        .then((response) => {
          this.product = response.data.products;
          axios
            .get("/api/products/pallet/" + this.product.pallet_guid)
            .then((response) => (this.pallet = response.data))
            .finally(() => (this.pallet_loading = false));
        });
    },
  },
  computed: {
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
</style>