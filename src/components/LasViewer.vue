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
      console.log("Lectura");
      this.data = await LasLoader();
      console.log(this.data);
      // Obtener el contexto del canvas
      const canvas = this.$refs.canvas;

      // Configurar la escena
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      this.camera = new THREE.PerspectiveCamera();
      this.camera.position.set(this.data[0], this.data[1], this.data[2]);
      this.flyControls = new FlyControls(
        this.camera,
        canvas
      );
      this.flyControls.movementSpeed = 3;
      this.flyControls.rollSpeed = 0.01;



      // Crear un material para los puntos
      const material = new THREE.PointsMaterial({ size: 0.5, color: "green" });

      // Crear una geometría de puntos a partir del punto de la nube de puntos
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(this.data, 3)
      );

      // Crear el objeto Points y agregarlo a la escena
      const points = new THREE.Points(geometry, material);
      console.log("Puntos", points);
      scene.add(points);

      // Configurar el renderizador
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvas.appendChild(renderer.domElement);

      // Función para animar la escena
      const animate = () => {
        requestAnimationFrame(animate);
        this.flyControls.update(1)
        renderer.render(scene, this.camera);
      };

      // Iniciar la animación
      animate();
    },
  },
};
</script>
