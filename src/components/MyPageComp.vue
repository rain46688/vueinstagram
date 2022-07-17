<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input v-model="SearchKey" @input="search()" placeholder="검색" />

        <div v-for="(a, i) in follower" :key="i" class="post-header">
            <div class="profile" :style="{ backgroundImage: `url(${a.image})` }"></div>
            <span class="profile-name">{{ a.name }}</span>
        </div>

    </div>
</template>

<script>

import { computed, onMounted, ref, toRefs, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name: 'MyPageComp',
    props: {
        one: Number,
    },
    // composition api써서 개발하는 방식
    setup(props) {
        // 특이점음 ref라는 함수에다가 변수를 만들때 감싸줘야됨 그래야 실시간으로 반영됨
        let follower = ref([]);
        let followerSearch = ref([]);
        let followerOrigin = ref([]);
        let SearchKey = ref([]);

        // 프롭스 사용법!! toRefs이걸로 감싸야됨 그래야 실시간 반영됨
        // props 부분에 명시 해두긴해야되는듯 저거 없으면 에러남
        let { one } = toRefs(props);
        console.log("props를 composition api 방식으로 가져오기 : ", one.value);

        // props 데이터 변경 감시자 만들기 가능
        watch(one, () => {

        })

        let result = computed(() => {
            return follower.value.length;
        })
        console.log("결과 : ", result.value);
        // 결과도value 붙여줘야됨 하지만 결과가 0이 나옴 마운트 되기전에 이게 실행되어서 그렇다함!

        let store = useStore();
        console.log("store 가져오기 : ", store.state.name);
        // 잘 가져와짐 kim

        // 라이프 사이클 훅! 함수를 가져올때는 on 머시기 이렇게 적고 ()=> 에로우 함수로 안에 작성해야됨
        // 마운트 될때 실행함 이것도 따로 import 해줘야되는거
        onMounted(() => {
            axios.get('./follower.json').then((a) => {
                // .value 무조건 적어야됨
                follower.value = a.data;
                followerOrigin.value = [...a.data];
            })
        })

        function search() {
            console.log("search : ", SearchKey.value);

            console.log("followerOrigin.value : ", followerOrigin.value);

            if (SearchKey.value === '') {
                follower.value = [...followerOrigin.value];
                console.log("follower.value : ", follower.value);
            } else {
                let followerSearch = follower.value.filter(arr => {
                    if (arr.name.includes(SearchKey.value)) {
                        console.log(arr.name);
                        return true;
                    }
                });
                console.log("followerSearch : ", followerSearch);
                follower.value = [...followerSearch];
            }
        }

        // axios.get('./follower.json').then((a)=>{
        //     // .value 무조건 적어야됨
        //     follower.value = a.data;
        // })

        return { follower, search, followerSearch, SearchKey, followerOrigin };

    },

}
</script>

<style scoped>
</style>