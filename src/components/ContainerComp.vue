<template>
    <div>
        <!-- 저번시간에 만든거 -->
        <div v-if="step == 0">
            <PostComp v-for="(data, num) in instagramData" :key="num" :data='data' />
        </div>

        <!-- 필터선택페이지 -->
        <div v-if="step == 1">
            <div :class="`${newImageFilter} upload-image`" :style="`background-image:url(${imageUrl})`"></div>
            <div class="filters">
                <FilterBoxComp v-for="(a, i) in filters" :key="a" :imageUrl="imageUrl" :filter="filters[i]">
                    <!-- <template v-slot:default="작명"> {{ 작명.데이터 }}</template> -->
                    <template v-slot:a>{{ filters[i] }}</template>
                    <!-- <template v-slot:b>{{ i }}</template> -->
                </FilterBoxComp>
            </div>
        </div>

        <!-- 글작성페이지 -->
        <div v-if="step == 2">
            <div :class="`${newImageFilter} upload-image`" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
            <div class="write">
                <textarea @change="$emit('inputText', texts)" v-model="texts" class="write-box"></textarea>
            </div>
        </div>
    </div>

    <!-- 마이페이지 -->
    <div v-if="step == 3">
        <MyPageComp />
    </div>

</template>

<script>

import PostComp from './PostComp.vue';
import FilterBoxComp from './FilterBoxComp.vue';
import MyPageComp from './MyPageComp.vue';

export default {
    name: 'ContainerComp',
    data() {
        return {
            texts: 'write!',
            filters: ["aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson",
                "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua",
                "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
        }
    },
    props: {
        instagramData: Array,
        step: Number,
        imageUrl: String,
        newImageFilter: String,

    },
    components: {
        PostComp,
        FilterBoxComp,
        MyPageComp,

    },
    methods: {
        textChange() {
            console.log(this.texts);
        },
    }

}
</script>

<style>
.upload-image {
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size: cover;
}

.filters {
    overflow-x: scroll;
    white-space: nowrap;
}

.filter-1 {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
}

.filters::-webkit-scrollbar {
    height: 5px;
}

.filters::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
}
</style>