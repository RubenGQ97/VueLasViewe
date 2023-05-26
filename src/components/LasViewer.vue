<template>
  <div
    class="border border-success border-5 canvas-container"
    ref="canvas"
  ></div>
</template>

<style>

.canvas-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>

<script>


import LasLoader from "../utils/LasLoader.js";
import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";



export default {
  name: "LasViewer",
  data() {
    return {
      camera: null,
      data: null,
      flyControls:null,
    };
  },

  mounted() {
    this.initialize();
  },

  methods: {
    async initialize() {
      //leemos los datos del archivo
      this.data = await LasLoader();


      const canvas = this.$refs.canvas;

      //configuramos la escena
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      
      //configuramos la camara y los controles
      this.camera = new THREE.PerspectiveCamera();
      this.camera.position.set(this.data[0], this.data[1], this.data[2]);
      this.flyControls = new FlyControls(
        this.camera,
        canvas
      );
      this.flyControls.movementSpeed = 3;
      this.flyControls.rollSpeed = 0.01;



      //Creamos el material de los puntos, la geometria y a partir de ello creamos los puntos para mostrar
      const material = new THREE.PointsMaterial({ size: 0.5, color: "green" });
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(this.data, 3)
      );
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvas.appendChild(renderer.domElement);
      
      //bucle animacion
      const animate = () => {
        requestAnimationFrame(animate);
        this.flyControls.update(1)
        renderer.render(scene, this.camera);
      };

      animate();
    },
  },
};
</script>
