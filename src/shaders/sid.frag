
precision mediump float;

#define PI 3.14159265359

uniform float u_time;
uniform float u_waves_cnt;
uniform vec2 u_resolution;
uniform float u_transit_opacity;
uniform sampler2D u_noise_tex;
uniform sampler2D u_foreground;
uniform sampler2D u_tree_tex;
varying vec2 vTexCoord;

