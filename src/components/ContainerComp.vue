<template>
    <div>
        <PostComp v-for="(data, num) in instagramData" :key="num" :data='data'/>
    </div>
</template>

<script>

import PostComp from './PostComp.vue';

export default {
    name : 'ContainerComp',
    props : {
        instagramData : Array,
    },
    components : {
        PostComp
    }

}
</script>

<style>
</style>