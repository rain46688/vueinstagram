<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step = 2">Next</li>
      <li v-if="step == 2" @click="publish">publish</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <ContainerComp @inputText="newContent = $event" :newImageFilter='newImageFilter' :instagramData='instagramData' :step='step' :imageUrl='imageUrl' />

  <button @click="more()">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

  <h4>{{$store.state.data}}</h4>

</template>

<script>

import ContainerComp from './components/ContainerComp.vue';
import data from './assets/data.js';
// import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      instagramData: data,
      step: 0,
      imageUrl: '',
      newContent: '',
      newImageFilter : '',
    }
  },
  components: {
    ContainerComp,
  },
  methods: {
    more() {

      this.axios.get(`https://codingapple1.github.io/vue/more${this.instagramData.length - 3}.json`)
        .then(result => {
          console.log(result.data);
          this.instagramData.push(result.data);
        })
    },
    upload(e) {
      let a = e.target.files;
      console.log(a[0]);
      let url = URL.createObjectURL(a[0]);
      console.log(url);
      this.step = 1;
      this.imageUrl = url;

    },
    publish() {
      console.log("newContent : ", this.newContent);

      let newObject = {
        name: "Kim Hyun",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.imageUrl,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.newContent,
        filter: this.newImageFilter,
      };
      this.instagramData.unshift(newObject);
      this.step = 0;
    },
  },
  mounted() {
    this.emitter.on('filter', (a) => {
      console.log(a);
      this.newImageFilter = a;
    })
  },
}
</script>

<style>
body {
  margin: 0;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}

.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}

.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}

.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}

.inputfile {
  display: none;
}

.input-plus {
  cursor: pointer;
}

#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
