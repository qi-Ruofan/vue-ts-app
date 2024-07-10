<template>
  <div>
    hello Login
  </div>
</template>

<script lang='ts' setup>
// import http from '@/utils/http';

// http.post('/users/login', {
//   "email" : "huangrong@imooc.com",
//   "pass": "huangrong"
// }).then((res) => {
//   console.log(res.data)
// })

import { useStore } from '@/store'
const store = useStore()

store.dispatch('users/login').then((res) => {
  console.log(res.data)
})
</script>

<style lang='scss' scoped>

</style>
