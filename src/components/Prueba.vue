<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { load } from "@loaders.gl/core";
import { LASLoader } from "@loaders.gl/las";
import * as THREE from "three";
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';


export default {
 
    name: "LasViewer",
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
        
      // Obtener el contexto del canvas
        const canvas = this.$refs.canvas;
        const context = canvas.getContext("webgl");


        //Carga de datos
        const response = await fetch("/assets/pequeño.las")
        const buffer= await response.arrayBuffer()
        const data = await load(buffer,LASLoader);
        console.log("data",data)
        //configuramos los controles
        const flyControls = new FlyControls(camera, this.canvas);
        flyControls.movementSpeed = 5

        // Crear una instancia del cargador de archivos LAS
        /*const loader = new load(LASLoader);

        // Cargar el archivo .las
        const response = await fetch("ruta/al/archivo.las");
        const arrayBuffer = await response.arrayBuffer();
        const pointCloud = await loader.parse(arrayBuffer);*/

        // Configurar la escena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        this.camera = new THREE.PerspectiveCamera();
        this.camera.position.set(0, 0, 10);
        // Crear un material para los puntos
        const material = new THREE.PointsMaterial({ size: 0.5, color: "green" });

        // Crear una geometría de puntos a partir del punto de la nube de puntos
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(data.attributes.POSITION.value, 3)
        );
      
        // Crear el objeto Points y agregarlo a la escena
        const points = new THREE.Points(geometry, material);
        console.log("Puntos",points)
        scene.add(points);

        // Configurar la cámara
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(data[0],data[1],data[2])

        // Configurar el renderizador
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            context: context,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Función para animar la escena
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        // Iniciar la animación
        animate();
    },
  },
};
</script>

<style>
canvas {
  width: 100%;
  height: 100%;
}
</style>
