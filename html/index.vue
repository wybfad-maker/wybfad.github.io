<template>
  <div class="rbody">
    <el-card class="mainCard">
      <div class="rmain">
        <div class="title">404</div>
        <div class="tips">
          <span>{{ time }}</span>
          秒后返回首页
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { router } from '@/router/router';
import { ref, onMounted } from 'vue';
let time = ref(5);
const add = () => {
  time.value--;
};
onMounted(() => {
  let timer = setInterval(add, 1000);
  setTimeout(() => {
    clearInterval(timer);
    router.push('/company');
  }, 4999);
});
</script>
<style lang="scss" scoped>
.mainCard {
  margin: 12px;

  .rmain {
    height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 72px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    span:nth-child(1) {
      font-size: 30px;
      color: orange;
      font-weight: 500;
      margin-right: 6px;
    }
  }
}
</style>
