<template>
  <g>
    <slot></slot>
    <rect
      stroke="null"
      id="lidrect"
      :height="20 * ratio"
      :width="82 * ratio"
      :y="10 * ratio"
      :x="9 * ratio"
      :fill="'url(#' + basicColor + 'cover)'"
    />
    <ellipse
      stroke="null"
      id="lidellipse1"
      :ry="10 * ratio"
      :rx="41 * ratio"
      :cy="30 * ratio"
      :cx="50 * ratio"
      :fill="'url(#' + basicColor + 'cover)'"
    />
    <ellipse
      stroke="null"
      id="lidellipse2"
      :ry="10 * ratio"
      :rx="41 * ratio"
      :cy="10 * ratio"
      :cx="50 * ratio"
      :fill="lightColor"
    />
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
    lightColor() {
      if (!this.basicColor) return "#0001";
      return Color(this.basicColor.toLowerCase()).lighten(0.1);
    },
  },
};
</script>

<style>
</style>