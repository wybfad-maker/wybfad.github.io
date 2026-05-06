<template>
  <view class="content">
    <view class="tit_bar">
      <view>特勤制造处</view>
      <view></view>
    </view>
    <view class="nav">
      <template v-for="(nav, i) in navArr" :key="i">
        <view class="nav_item" :class="{ 'active': currentNav.id === nav.id }" v-if="nav?.id !== 1"
          @click="changeNav(nav)">
          {{ nav?.name }}
        </view>
      </template>
      <view class="bl_line" />
      <view class="br_line" />
    </view>
    <view class="nav_son" v-if="currentNav?.children?.[0]">
      <view class="nav_son_item"
        :class="{ 'btn': currentNav?.sonType === 'btn', 'bar': currentNav?.sonType !== 'btn', 'active': currentSon.id === son.id }"
        v-for="(son, i) in currentNav.children" :key="i">
        <text>{{ son?.name }}</text>
        <view v-if="son?.sort" class="upp" />
        <view v-if="son?.sort" class="del" />
      </view>
    </view>
    <!-- <view class="data_box" v-if="currentNav.id===0">
			<view class="data_item" v-for="(da,i) in data1" :key="i">
				<view class="data_item_left">
					<view class="data_item_left_tit">{{da?.title}}</view>
					<view class="data_info">
						<view class="data_info_item" v-for="(daInfo,i) in dataInfoArr" :key="i">
							<view class="data_info_item_label">{{daInfo?.label+':'}}</view>
							<view class="data_info_item_value">{{da?.[daInfo?.prop]}}</view>
						</view>
					</view>
				</view>
				<view class="data_detail">
					<image :src="da.imgUrl" mode="aspectFit" />
					<text>{{da?.goodsName}}</text>
				</view>
			</view>
		</view> -->
    <view class="data_box" v-if="currentNav.id !== 1">
      <template v-if="dutyData?.[0]">
        <view class="jsdata_item" v-for="(da, i) in dutyData" :key="i">
          <view class="img_box">
            <image :src="da.pic" mode="aspectFit" />
          </view>
          <view class="name">{{ da.name }}</view>
          <view class="price">{{ da.price }}</view>
        </view>
      </template>
      <text class="no_data" v-else>{{ queryText }}</text>
    </view>
    <view class="data_box" v-else>
      <text class="no_data">{{ queryText }}</text>
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUnmounted
} from 'vue';
import {
  onLoad
} from '@dcloudio/uni-app';
import useFnEffect from '@/common/common.js'
import {
  getManu
} from '@/common/api.js';

const {
  formatDate
} = useFnEffect()

const sonLabelArr = [{
  name: '物品图'
}, {
  name: '名称'
}, {
  name: '总收益'
}]
const navArr = reactive([{
  id: 1,
  tVal: 0,
  name: '推荐',
  sonType: 'btn',
  children: [{
    id: '1-1',
    name: '按总收益',
    fn: () => { }
  }, {
    id: '1-2',
    name: '按小时收益',
    fn: () => { }
  }],
}, {
  id: 2,
  tVal: 1,
  name: '技术中心',
  sonType: 'bar',
  children: [...sonLabelArr]
}, {
  id: 3,
  tVal: 2,
  name: '工作台',
  sonType: 'bar',
  children: [...sonLabelArr]
}, {
  id: 4,
  tVal: 3,
  name: '制药台',
  sonType: 'bar',
  children: [...sonLabelArr]
}, {
  id: 5,
  tVal: 4,
  name: '防具台',
  sonType: 'bar',
  children: [...sonLabelArr]
}])
const data1 = Array.from({
  length: 4
}, () => ({
  title: '技术中心',
  totalRevenue: '55251',
  suggestPrice: '1616877',
  suggestPoint: '4:00',
  goodsName: '多用途战术增高架',
  imgUrl: `/static/bg/s01.png`,
}))
const dutyData = ref([])
const dataInfoArr = [{
  label: '总收益',
  prop: 'totalRevenue'
}, {
  label: '推荐售价',
  prop: 'suggestPrice'
}, {
  label: '推荐卖点',
  prop: 'suggestPoint'
}]
const data2 = ref(Array.from({
  length: 5
}, () => ({
  imgUrl: `/static/bg/s01.png`,
  name: 'SR-3M紧凑突击步枪',
  price: '98430',
})))

const currentNav = ref(navArr[1])
const currentSon = ref(navArr[0].children[0])
const changeNav = async (nav) => {
  console.log('nav', nav)
  currentNav.value = nav
  await getManuFn()
}
const queryText = ref('数据请求中...')
const getManuFn = async () => {
  if (!currentNav.value.tVal) return;
  const getManuRes = await getManu(currentNav.value.tVal).catch((err) => {
    queryText.value = '请求失败，请稍后重试'
    console.log('getManu err', err)
  })
  // console.log('getManuRes', getManuRes, getManuRes?.data?.data)
  if (getManuRes?.data?.data) {
    dutyData.value = {
      ...getManuRes?.data?.data
    }
  } else {
    queryText.value = '暂无数据'
  }
  console.log('dutyData', dutyData.value, dutyData.value?.[0])
}
const init = async () => {
  await getManuFn()
}
init()
onLoad((option) => { })
const timer = ref(null)
onMounted(() => {
  timer.value = setInterval(() => {
    getManuFn()
  }, 10 * 60 * 1000)
})
onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

image {
  will-change: transform;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 85px;
}

.tit_bar {
  border-left: 4px solid #0FF794;
  background: #464a4a33;
  padding: 0 20px;
  margin: 20px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 16px;
}

.nav {
  flex: 1;
  height: 35px;
  padding: 0 5px;
  margin: 0 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #515355;

  .nav_item {
    width: 42px;
    height: 100%;
    box-sizing: border-box;
    color: #e8ebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    &.active {
      color: #0ff796;
      border-bottom: 3px solid rgba(15, 247, 148, 1)
    }
  }

  .bl_line,
  .br_line {
    width: 2px;
    height: 1px;
    background: #a8aaaa;
    position: absolute;
    bottom: -1px;
  }

  .bl_line {
    left: 0;
  }

  .br_line {
    right: 0;
  }
}

.nav_son {
  width: 100%;
  height: 42px;
  padding: 0 5px;
  margin: 5px 20px;
  box-sizing: border-box;
  position: relative;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // border-bottom: 1px solid #515355;
  gap: 10px;

  &_item {
    flex: 1;
    width: 42px;
    height: 100%;
    margin: 5px 0;
    box-sizing: border-box;
    position: relative;
    color: #e8ebeb;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    &.active {
      background: #0ff796;
      border: 3px solid rgba(15, 247, 148, 1)
    }
  }
}

.data_box {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  // margin: 0 0 20px;
  padding: 0 20px 20px;
  box-sizing: border-box;
  height: calc(100vh - 172px - 66px - 87px - 85px);
  overflow-y: auto;

  .data_item {
    display: flex;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #3C4041;
    background: #212629;
    box-shadow: 0 0 12px #0003;
    height: 120px;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;

    &_left {
      flex: 1;
      margin-right: 20px;

      &_tit {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .data_info {
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        gap: 5px;

        &_item {
          display: flex;
          align-items: center;
          gap: 2px;

          &_label {
            width: 65px;
            color: #f1f1f1;
          }

          &_value {
            color: #f4cf67;
          }
        }
      }
    }

    .data_detail {
      display: flex;
      width: 120px;
      height: 100px;
      box-sizing: border-box;
      padding: 12.5px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
      border-bottom: 2px solid #0FF794;
      background: #383d40;

      image {
        width: 58.33px;
        height: 58.33px;
      }

      text {
        color: #ffffffe6;
        font-family: Helvetica Neue;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
        white-space: nowrap;
      }
    }
  }
}

.data_box {
  .jsdata_item {
    height: 110px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    font-family: Inter;
    font-weight: 400;
    font-style: Regular;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0%;
    text-align: center;
    overflow-x: scroll;
    gap: 5px;

    &:nth-child(odd) {
      background: #1e2225;
    }

    &:nth-child(even) {
      background: none;
    }

    .img_box,
    .name,
    .price {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img_box {
      width: 90px;
      height: 90px;
      background: #41474c;
      border-bottom: 2px solid #0ff794;

      image {
        width: 58.33px;
        height: 58.33px;
      }
    }

    .name,
    .price {
      // flex: 1;
      padding: 10px;
    }

    .name {
      flex: 5;
      overflow-y: auto;
    }

    .price {
      flex: 4;
      padding: 10px;
      white-space: nowrap;
      overflow-x: scroll;
    }
  }
}
</style>