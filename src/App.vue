<template>
  <div class=" container-fluid">
    <div class=" row">
      <div class="p-0  d-flex flex-column justify-content-center border-left border-3 sidebar col-3 ">
          <div class=" ">
            <h1 class=" text-center title-style mt-auto">LasViewer</h1>
            <h2 class="text-center subtitle-style">VueJs</h2>
          </div>
      </div>
      <div class=" p-0 col-9">
        <LasViewer />
      </div>
    </div>
  </div>
</template>


<style>
.sidebar{
  background: rgb(255, 255, 255);
}

.title-style {
    color: #49a800;
    font-size: 50px;
    font-weight: bold;
    padding: 0;
    margin-bottom: 0;
}

.subtitle-style {
    color: rgb(0, 0, 0);
    font-size: 15px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 30px;
    text-shadow: 1px 1px 1px rgba(0,0,0,.5);
    padding-bottom: 40px;
}
</style>


<script>
import LasViewer from './components/LasViewer.vue';

export default {
  name: 'App',
  components: {
    LasViewer,
  },
};
</script>
