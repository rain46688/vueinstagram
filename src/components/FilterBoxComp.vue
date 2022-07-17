<template>
    <div :class="`${filter} filter-item`" :style="`background-image:url(${imageUrl})`">
        <!-- <slot name="b"></slot>, -->
        <slot name="a"></slot>
        <!-- <slot :데이터="데이터"></slot> -->
        <button @click="fire">버튼</button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        imageUrl: String,
        filter: String,

    },
    methods : {
        fire(){
            this.emitter.emit('filter',this.filter);
        },
    }
}
</script>

<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
    background-position: center;
}
</style>