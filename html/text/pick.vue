<template>
  <view class="tbody" v-if="1 || getUser?.id">
    <view class="page-title">选人</view>
    <view class="select-sex">
      <view class="select-sex-item" :class="{ 'selected': pickItm === 'man' ? true : false }" @click="pickItm = 'man'">
        <img class="sexIcon" src="/static/bg/s01.png" alt="猛男" />
        <view class="text text1">猛男</view>
        <view class="text text2">陪玩</view>
      </view>
      <view class="select-sex-item" :class="{ 'selected': pickItm === 'woman' ? true : false }"
        @click="pickItm = 'woman'">
        <img class="sexIcon" src="/static/bg/s02.png" alt="甜妹" />
        <view class="text text1">甜妹</view>
        <view class="text text2">陪玩</view>
      </view>
    </view>
    <view class="pick-list">
      <view class="pick-list-item" v-for="(li, i) in pickList_" :key="i" @click="openPlayer(li)">
        <img src="/static/bg/Maskbg.png" alt="mask" class="item_bg" />
        <img class="pick-list-item-img" :src="li.avatar" alt="头像" />
        <view class="pick-list-item-info">
          <view class="pick-list-item-info-title">
            <view class="list-item-name">
              {{ li?.name }}
            </view>
            <img class="sex-icon" v-if="li?.sex" src="/static/icons/man.svg" alt="男" />
            <img class="sex-icon" v-else src="/static/icons/woman.svg" alt="女" />
          </view>
          <view class="pick-list-item-info-descs" v-if="li?.descs">
            <view class="desc-item" :class="{ 'woman': li?.sex === 0 }" v-for="item in li.descs" :key="item">
              {{ item }}
            </view>
          </view>
          <view class="pick-list-item-info-descs" v-else>
            暂无标签
          </view>
        </view>
        <view class="pick-list-item-btn" @click.prevent="submitOrder(li)">下单</view>
      </view>
    </view>
    <Tabbar />
  </view>
  <view class="tbody" v-else>
    <view class="page-title">选人</view>
  </view>
</template>

<script setup>
import {
  ref,
  reactive,
  computed
} from 'vue';
import {
  onLoad
} from '@dcloudio/uni-app';
import {
  getUserInfo,
  deleteToken
} from '@/common/api.js'
import {
  useStore
} from '@/store/index.js'
import useFnEffect from '@/common/common.js'
import Tabbar from '@/pages/components/tabbar.vue'

const {
  getUser,
  setUser,
  setPlayer
} = useStore();
const {
  dueShow
} = useFnEffect()

const playerPath = `/components/pick/player/player`
const electPath = `/components/pick/elect/elect`

const pickItm = ref('man')
const sexArr = [{
  sex: 0,
  name: '女',
  text: '甜妹陪玩',
  color: `rgba(#fe5b7f, 0.15);`,
  border: `1px solid #fe5b7f`
}, {
  sex: 1,
  name: '男',
  text: '猛男陪玩',
  color: `rgba(#2075f5, 0.15)`,
  border: `1px solid #003c95`
}]
const pickList = reactive([{
  id: '1',
  name: 'Ls一刚',
  avatar: 'https://cdn.uviewui.com/uview/album/1.jpg',
  sex: 1,
  color: '#fe5b7f',
  descs: ['实力', '幽默担当', '服务态度好']
}, {
  id: '2',
  name: '王刚留下',
  avatar: 'https://cdn.uviewui.com/uview/album/2.jpg',
  sex: 0,
  color: '#269dff',
  descs: ['搞笑一绝', '幽默担当', '服务态度好']
}, {
  id: '3',
  name: '在线咬人猫2号',
  avatar: 'https://cdn.uviewui.com/uview/album/3.jpg',
  sex: 1,
  color: '#269dff',
  descs: ['搞笑一绝', '幽默担当', '服务态度好']
}, {
  id: '4',
  name: '邦邦就是2拳',
  avatar: 'https://cdn.uviewui.com/uview/album/4.jpg',
  sex: 1,
  color: '#fe5b7f',
  descs: ['实力', '服务态度好']
}, {
  id: '5',
  name: 'Ls一刚',
  avatar: 'https://cdn.uviewui.com/uview/album/5.jpg',
  sex: 0,
  color: '#269dff',
  descs: ['搞笑一绝', '幽默担当', '服务态度好']
}])
const pickList_ = computed(() => {
  return pickList.filter((li) => {
    return li.sex === (pickItm.value === 'man' ? 1 : 0)
  })
})
const openPages = (path) => {
  // console.log(path)
  uni.navigateTo({
    url: path
  })
}
const openPlayer = (li) => {
  // console.log('openPlayer', li)
  setPlayer(li)
  openPages(playerPath)
}
const submitOrder = (li) => {
  console.log('submitOrder', li)
  setPlayer(li)
  openPages(electPath)
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.tbody {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #14191D;
  background-repeat: repeat;
  background-position: top center;
  /* 从上往下对齐 */
  background-size: 100% auto;
  /* 宽度100%，高度自适应 */
  padding: 0 15px;
  color: $darktheme-color;

  .page-title {
    height: 85px;
    margin: auto;
    box-sizing: border-box;
    padding: 46px 24px 24px;
    font-size: 12px;
    text-align: center;
  }
}

.select-sex {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 120px 0 20px;
  margin: 10px 0 20px;
  gap: 15px;

  .select-sex-item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    border: 1px solid rgba(70, 74, 74, 1);
    border-radius: 8px;
    gap: 4px;

    .sexIcon {
      width: 70px;
      height: 70.71px;
    }

    .text {
      min-width: 64px;
      height: 100%;
      font-family: Inter;
      font-weight: 400;
      font-style: Regular;
      font-size: 14px;
      letter-spacing: 0%;
      color: #ffffff;
      display: flex;
      align-items: center;
    }

    &.selected {
      background: linear-gradient(285.63deg, rgba(19, 24, 29, 0.5) 30.49%, rgba(32, 245, 154, 0) 132.37%);
      border: 1px solid rgba(15, 247, 148, 1);

      .text {
        color: rgba(32, 245, 154, 1);
        font-size: 16px;
      }
    }
  }
}

.pick-list {
  // max-height: calc(100vh - 260px);
  max-height: calc(100vh - 275px);
  overflow-y: scroll;
  padding-bottom: 100px;
  margin: 0;
  display: flex;
  flex-direction: column;
  // gap: 10px;

  .pick-list-item {
    height: 90px;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background: #18181b;
    box-sizing: border-box;
    border: 1px solid #153353;
    box-shadow: 0px 0px 12px 0px rgba(#000, 0.2);

    .item_bg {
      width: 96px;
      height: 90px;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
    }

    &-img {
      z-index: 2;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      box-sizing: border-box;
      // border: 2px solid rgba(#0ff794, 1);
      // border: 2px solid rgba(#003c95, 1);
    }

    &-info {
      flex: 1;
      z-index: 2;
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      gap: 10px;

      &-title {
        display: flex;
        align-items: center;
        gap: 10px;

        .list-item-name {
          font-family: Helvetica Neue;
          font-weight: 700;
          font-style: Bold;
          font-size: 14px;
          line-height: 14px;
          letter-spacing: 0%;
          color: rgba(241, 241, 241, 1);
        }

        .sex-icon {
          width: 14px;
          height: 14px;
        }
      }

      &-descs {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;

        .desc-item {
          padding: 3px 4px;
          font-family: Helvetica Neue;
          font-weight: 400;
          font-style: Regular;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0%;
          color: rgba(#f1f1f1, 1);
          background: rgba(#2075f5, 0.15);
          border: 1px solid rgba(#003c95, 1);
          border-radius: 50px;

          &.woman {
            background: rgba(#fe5b7f, 0.15);
            border: 1px solid rgba(#fe5b7f, 1);
          }
        }
      }
    }

    .pick-list-item-btn {
      width: 65px;
      height: 28px;
      font-family: MiSans;
      font-weight: 400;
      font-style: Regular;
      font-size: 14px;
      line-height: 14px;
      letter-spacing: 0%;
      border-radius: 4px;
      color: rgba(20, 25, 29, 1);
      background: rgba(32, 245, 154, 1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>