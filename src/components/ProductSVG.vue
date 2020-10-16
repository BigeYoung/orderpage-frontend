<template>
  <svg
    :width="100 * ratio"
    :height="150 * ratio"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient y2="0" x2="1" y1="0" x1="0" :id="coverColor + 'cover'">
        <stop offset="0" :stop-color="Normal(coverColor)">
          <animate
            attributeName="offset"
            values="0;0.2;0.3;0.2;0"
            dur="10s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="0.5" :stop-color="Darken(coverColor)">
          <animate
            attributeName="offset"
            values="0.5;0.9;1;0.9;0.5"
            dur="10s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
      <filter
        x="-50%"
        y="-50%"
        width="200%"
        height="300%"
        :id="boxColor + 'shadow'"
      >
        <feGaussianBlur :stdDeviation="5 * ratio" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
      </filter>
      <filter x="-50%" y="-50%" width="200%" height="400%" id="box-offset">
        <feOffset result="offOut" in="SourceGraphic" dx="0" :dy="60 * ratio" />
      </filter>
      <linearGradient y2="0" x2="1" y1="0" x1="0" :id="boxColor + 'box-out'">
        <stop offset="0" :stop-color="Normal(boxColor)">
          <animate
            attributeName="offset"
            values="0;0.2;0.3;0.2;0"
            dur="10s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="0.5" :stop-color="Darken(boxColor)">
          <animate
            attributeName="offset"
            values="0.5;0.9;1;0.9;0.5"
            dur="10s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
      <linearGradient y2="0" x2="0" y1="1" x1="0" :id="boxColor + 'box-in'">
        <stop offset="0" :stop-color="DeepDarken(boxColor)" />
        <stop offset="1" :stop-color="Darken(boxColor)" />
      </linearGradient>
    </defs>
    <BoxSVG :basicColor="boxColor" :ratio="ratio" />
    <image
      :href="require('@/assets/'+(productName||'unknown')+'.png')"
      :height="65*ratio"
      :width="65*ratio"
      :x="20*ratio"
      :y="20*ratio"
    >
      <animateTransform
        attributeName="transform"
        dur="5s"
        type="translate"
        values="0 0;0 5;0 0"
        repeatCount="indefinite"
        begin="0.1"
      /></image>
    <CoverSVG :basicColor="coverColor" :ratio="ratio">
      <animateTransform
        attributeName="transform"
        dur="5s"
        type="translate"
        values="0 0;0 10;0 0"
        repeatCount="indefinite"
        begin="0.1"
      />
    </CoverSVG>
  </svg>
</template>

<script>
import Color from "color";
import BoxSVG from "@/components/BoxSVG.vue";
import CoverSVG from "@/components/CoverSVG.vue";

export default {
  components: {
    BoxSVG,
    CoverSVG,
  },
  props: {
    boxColor: String,
    coverColor: String,
    productName: String,
    ratio: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    Normal(c) {
      return c || "#0001";
    },
    Darken(c) {
      if (!c) return "#1111";
      return Color(c.toLowerCase()).darken(0.5);
    },
    DeepDarken(c) {
      if (!c) return "#1111";
      return Color(c.toLowerCase()).darken(0.7);
    },
    Lighten() {
      if (!this.basicColor) return "#0001";
      return Color(this.basicColor.toLowerCase()).lighten(0.1);
    },

  },
};
</script>
