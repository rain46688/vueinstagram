<template>
    <div :class="`${filter} filter-item`" :style="`background-image:url(${imageUrl})`">
        <!-- <slot name="b"></slot>, -->
        <slot name="a"></slot>
        <!-- <slot :데이터="데이터"></slot> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            데이터: "필터명",
        }
    },
    props: {
        imageUrl: String,
        filter: String,

    },
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