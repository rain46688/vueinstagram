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

<div v-if="step == 99">
  <h4>Hellow {{ $store.state.name }}!</h4>
  <!-- computed 함수에 미리 정의해놓으면 짧게 쓸수있음 -->
  <h4>computed Hellow {{ comname }}!</h4>
  <!-- mapState 매우 간단하게 작성 가능 -->
  <h4>mapState Hellow {{ myname }}!</h4>
  <h4>Your Age {{ $store.state.age }}!</h4>
  <h4>mapState Your Age {{ age }}!</h4>

  <button @click="$store.commit('ageChange', 10)">Button</button>
  <!-- 위에껄 쉽게 바꾸기 가능 -->
  <button @click="ageChange(10)">mapMutations Button</button>

  <p>{{ $store.state.more }}!</p>
  <button @click="$store.dispatch('getData')">더보기 버튼</button>

  <p>{{ now() }} {{ count }}</p>
  <button @click="count++">button</button>
  </div>

  <ContainerComp @inputText="newContent = $event" :newImageFilter='newImageFilter' :instagramData='instagramData'
    :step='step' :imageUrl='imageUrl' />

  <button v-if="step == 0" @click="more()">더보기</button>

  <div v-if="step == 0" class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>

</template>

<script>

import ContainerComp from './components/ContainerComp.vue';
import data from './assets/data.js';
// import axios from 'axios';

import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      instagramData: data,
      step: 3,
      imageUrl: '',
      newContent: '',
      newImageFilter: '',
      count: 0,

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

    now() {
      return new Date()
    },

    // store에있는 함수들도 쉽게 가져다 쓰기 이건 methods에 넣어야됨
    ...mapMutations(['ageChange'])
  },

  // 여기도 method 처럼 함수를 만들수 있지만 차이점이있음
  // 이건 첨에 호출할때 결과를 저장하고 다음에 호출할때는 결과만 보여주고 로직은 다시 수행하지 않음
  // 그래서 내부 메모리 절약을 할수있음
  computed: {
    now2() {
      return new Date()
    },
    comname() {
      return this.$store.state.name;
    },
    // store에서 정의한 변수들 쉽게 가져다 쓰는 축약식
    ...mapState(['name', 'age', 'likes']),
    ...mapState({ myname: 'name' }),
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
