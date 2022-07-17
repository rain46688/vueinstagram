<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input placeholder="검색" />

        <div v-for="(a,i) in follower" :key="i" class="post-header">
            <div class="profile" :style="{ backgroundImage : `url(${a.image})`}"></div>
            <span class="profile-name">{{ a.name }}</span>
        </div>

    </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    name: 'MyPageComp',
    // composition api써서 개발하는 방식
    setup() {
        // 특이점음 ref라는 함수에다가 변수를 만들때 감싸줘야됨
        let follower = ref([]);

        // 라이프 사이클 훅! 함수를 가져올때는 on 머시기 이렇게 적고 ()=> 에로우 함수로 안에 작성해야됨
        // 마운트 될때 실행함 이것도 따로 import 해줘야되는거
        onMounted(() => {
            axios.get('./follower.json').then((a) => {
                // .value 무조건 적어야됨
                follower.value = a.data;
            })
        })

        // axios.get('./follower.json').then((a)=>{
        //     // .value 무조건 적어야됨
        //     follower.value = a.data;
        // })

        return { follower };

    },

}
</script>

<style>
</style>