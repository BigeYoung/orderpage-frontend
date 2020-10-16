<template>
  <div>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">{{
          $t(title)
        }}</v-list-item-title>
        <v-expand-transition group>
          <v-slide-group
            v-if="selecting"
            :value="value"
            @change="change($event)"
            active-class="inside-light"
            show-arrows
          >
            <v-slide-item
              v-for="o in options"
              :key="o"
              :value="o"
              v-slot:default="{ toggle }"
            >
              <v-card
                @click="toggle"
                class="mr-3"
                width="120"
                height="120*0.618"
                outlined
              >
                <v-card-text class="title text-center">
                  {{ $t(o) }}
                </v-card-text>
              </v-card>
            </v-slide-item></v-slide-group
          >
          <v-list-item-subtitle v-else>{{ $t(value) }}</v-list-item-subtitle>
        </v-expand-transition>
      </v-list-item-content>
      <v-list-item-action v-if="!selecting">
        <v-btn icon @click="selecting = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    options: Array,
    value: String,
  },
  data: () => ({
    selecting: true,
  }),
  methods: {
    change(value) {
      this.$emit("input", value);
      if (value) this.selecting = false;
    },
  },
};
</script>

<style>
.inside-light {
  border: 1px DeepSkyBlue solid !important;
  box-shadow: 0 0 10px skyblue inset !important;
}
</style>