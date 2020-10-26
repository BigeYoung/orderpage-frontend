<template>
  <g filter="url(#box-offset)">
    <g :filter="'url(#' + basicColor + 'shadow)'">
      <title>Shadow</title>
      <ellipse
        stroke="null"
        id="svg_10"
        :ry="10 * ratio"
        :rx="40 * ratio"
        :cy="70 * ratio"
        :cx="50 * ratio"
        :fill="color"
      />
    </g>
    <g :fill="'url(#' + basicColor + 'box-out)'">
      <title>Outside</title>
      <rect
        stroke="null"
        id="svg_4"
        :height="50 * ratio"
        :width="80 * ratio"
        :y="15 * ratio"
        :x="10 * ratio"
      />
      <ellipse
        stroke="null"
        id="svg_2"
        :ry="10 * ratio"
        :rx="40 * ratio"
        :cy="65 * ratio"
        :cx="50 * ratio"
      />
    </g>
    <g :fill="'url(#' + basicColor + 'box-in)'">
      <title>Inside</title>
      <ellipse
        :stroke="color"
        :stroke-width="2 * ratio"
        id="svg_10"
        :ry="10 * ratio"
        :rx="39 * ratio"
        :cy="15 * ratio"
        :cx="50 * ratio"
      />
    </g>
  </g>
</template>

<script>
import Color from "color";

export default {
  props: {
    basicColor: String,
    ratio: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    color() {
      return this.basicColor || "#0001";
    },
    darkColor() {
      if (!this.basicColor) return "#1111";
      return Color(this.basicColor.toLowerCase()).darken(0.3);
    },
    deepDarkColor() {
      if (!this.basicColor) return "#1111";
      return Color(this.basicColor.toLowerCase()).darken(0.5);
    },
  },
};
</script>
