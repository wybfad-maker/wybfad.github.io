<template>
  <view class="tbody">
    <view class="nav">
      <view class="nav_item" :class="{ 'selected': currentWar.nav.id === nav.id }" v-for="(nav, i) in navArr" :key="i"
        @click="changeNav(nav)">
        <view class="img_box">
          <image class="img" :src="nav?.url || ''" />
        </view>
        <view>{{ nav?.text || 'nav' }}</view>
      </view>
    </view>
    <view class="content" v-if="currentWar?.nav?.id === 1">
      <view class="kzb_search">
        <view class="kzb_search_1">
          <view class="kzb_search_1_item" :class="{ 'selected': currentWar.type === type }" v-for="(type, i) in typeArr"
            :key="i" @click="changeType(type)">{{ type?.text || 'type' }}</view>
        </view>
        <view class="kzb_search_2">
          <view class="kzb_search_2_label">价值：</view>
          <view class="kzb_search_2_box">
            <view class="kzb_search_2_box_item" :class="{ 'active': currentWar.val === val }"
              v-for="(val, i) in valueArr" :key="i" @click="currentWar.val = val">
              <text class="icon" /><text>{{ val }}w</text>
            </view>
          </view>
        </view>
      </view>
      <view class="kzb_FA_container">
        <view class="kzb_item" v-for="(bot, i) in combot_" :key="i">
          <view class="item_tit">方案{{ i + 1 }}</view>
          <view class="item_time">更新：{{ formatDate(bot.schemeUpdatedAt) }}</view>
          <view class="item_detail">
            <view class="detail_left">
              <view>总花费</view>
              <view>{{ bot.totalHafCost }}</view>
            </view>
            <view class="detail_right">
              <view class="detail_item">
                <text>最终战备</text>
                <text>{{ bot.currentValue }}</text>
              </view>
              <view class="detail_item">
                <text>总战备差价</text>
                <text>{{ bot.currentValue - bot.totalHafCost }}</text>
              </view>
            </view>
          </view>
          <view class="unit_box" v-if="bot?.schemeItems">
            <view class="unit" v-for="(unit, i) in bot.schemeItems" :key="i">
              <view class="img_box">
                <image class="img" :src="unit.objectPic" :alt="unit.from" />
              </view>
              <view class="unit_right">
                <view class="unit_tit">{{ unit.objectName }}</view>
                <view class="unit_price">
                  <view>花费：<text>{{ unit.costHafCoin }}</text></view>
                  <view>战备：<text>{{ unit.currentValue }}</text></view>
                </view>
                <view class="unit_diffValue">
                  <text :style="{ color: goodsGrade?.[unit.objectGrade]?.color || '#0ff794' }">{{
                    goodsGrade?.[unit.objectGrade]?.text || '假账：' }}{{ unit.diffValue }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="content" v-else-if="currentWar?.nav?.id === 2">
      <view class="tit_bar">
        <view>每日密码</view>
        <view>{{ getToday() }}</view>
      </view>
      <view class="day_box">
        <view class="day_item" v-for="(di, i) in Object.keys(pss)" :key="i">
          <view class="day_item_left">
            <view class="day_item_left_tit">{{ diObj?.[diToObj?.[di]]?.name || di }}</view>
            <view class="day_con">
              <view class="day_con_label">位置信息：</view>
              <view class="day_con_con">{{ diObj?.[diToObj?.[di]]?.address }}</view>
            </view>
          </view>
          <view class="day_detail">
            <view>{{ pss?.[di]?.[0] }}</view>
            <text>查看详情</text>
          </view>
        </view>
      </view>
    </view>
    <SpecialDuty v-else-if="currentWar?.nav?.id === 3" />
    <view class="content" v-else-if="currentWar?.nav?.id === 4">
      <view class="tit_bar">
        <view>子弹自选</view>
        <view></view>
      </view>
      <view class="data_box"></view>
    </view>
    <Tabbar />
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
  onLoad,
  onHide
} from '@dcloudio/uni-app';
import useFnEffect from '@/common/common.js'
import {
  getCombot,
  getPss,
  getCombots,
  getPass
} from '@/common/api.js';
import SpecialDuty from '../SpecialDuty.vue'
import Tabbar from '@/pages/components/tabbar.vue'

const {
  initShare,
  formatDate
} = useFnEffect()
const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}
const navArr = reactive([{
  id: 1,
  text: '卡战备推举',
  url: '/static/icons/star_nav.svg'
},
{
  id: 2,
  text: '每日密码',
  url: '/static/icons/lock_nav.svg'
},
  // {
  // 	id: 3,
  // 	text: '特勤处制造',
  // 	url: '/static/icons/spanner_nav.svg'
  // },
  // {
  // 	id: 4,
  // 	text: '子弹自选',
  // 	url: '/static/icons/bullet_nav.svg'
  // }
])
const typeArr = reactive([{
  name: 'market',
  text: '市场直购'
}, {
  name: 'market2',
  text: '市场(含补货配件)'
}, {
  name: 'mixed',
  text: '市场+兑换(混合)'
}])
const valueArr = ref([11.25, 18.75, 24.75, 55, 60, 78])
// const valueArr = ref([11, 18, 55, 60, 78])
const currentWar = reactive({
  nav: navArr[0],
  type: typeArr[0],
  val: valueArr.value[0]
})
const changeNav = (nav) => {
  // console.log(nav)
  currentWar.nav = nav
}
const changeType = (type) => {
  // console.log(type)
  currentWar.type = type
}
const goodsGrade = reactive({
  0: {
    text: '溢价：',
    color: '#ff5722'
  },
  4: {
    text: '假账：',
  }
})
/* const combot = ref([{
  currentValue: 113479,
  schemeItems: [{
      costHafCoin: 12055,
      currentValue: 11756,
      diffValue: -299,
      from: "市场",
      objectGrade: 0,
      objectName: "UZI冲锋枪",
      objectPic: "https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png"
    },
    {
      costHafCoin: 21061,
      currentValue: 30348,
      diffValue: 9287,
      from: "市场",
      objectGrade: 4,
      objectName: "PEQ-2红色激光镭指",
      objectPic: "https://playerhub.df.qq.com/playerhub/60004/object/13160000005.png"
    }, {
      costHafCoin: 21061,
      currentValue: 30348,
      diffValue: 9287,
      from: "市场",
      objectGrade: 4,
      objectName: "PEQ-2红色激光镭指",
      objectPic: "https://playerhub.df.qq.com/playerhub/60004/object/13160000005.png"
    }, {
      costHafCoin: 10800,
      currentValue: 10679,
      diffValue: -121,
      from: "市场",
      objectGrade: 0,
      objectName: "SR9射手步枪",
      objectPic: "https://playerhub.df.qq.com/playerhub/60004/object/18050000008.png"
    }, {
      costHafCoin: 21061,
      currentValue: 30348,
      diffValue: 9287,
      from: "市场",
      objectGrade: 4,
      objectName: "PEQ-2红色激光镭指",
      objectPic: "https://playerhub.df.qq.com/playerhub/60004/object/13160000005.png"
    }
  ],
  schemeType: "market",
  schemeUpdatedAt: "2026-02-03T15:25:01.074Z",
  targetValue: 112500,
  totalHafCost: 86038
}]) */
const combot = ref([])
const combot_ = computed(() => {
  // 筛选方案一：
  // let tmp = combot.value.filter((it) =>  (it?.schemeType === currentWar.type.name));
  // console.log('tmp', tmp)
  // let temp = combot.value.filter((it) => (it?.schemeType === currentWar.type.name) && (it?.targetValue === (
  // 	currentWar.val * 10000)))
  let temp = []
  // 筛选方案二：
  // combot.value.forEach((it) => {
  // 	if (it?.schemeType === currentWar.type.name && it?.targetValue === (currentWar.val * 10000)) {
  // 		temp.push(it)
  // 	}
  // })
  console.log(combot.value.length)
  // 筛选方案三：
  combot.value.map((bot, i) => {
    if (bot?.schemeType === currentWar.type?.name && combot.value[i]?.targetValue === (
      currentWar.val * 10000)) {
      temp.push(bot)
    }
  })
  // 筛选方案四：
  // for (let i = 0; i < combot.value.length; i++) {
  // 	if (combot.value[i]?.schemeType === currentWar.type.name && combot.value[i]?.targetValue === (
  // 			currentWar.val * 10000)) {
  // 		temp.push(combot.value[i])
  // 	}
  // }
  console.log('temp', temp)
  return temp
});
const pss = ref({
  "db": {
    "password": "8190",
    "updated": "20260201000001",
    "overridden": true
  },
  "cgxg": {
    "password": "8752",
    "updated": "20260201000001",
    "overridden": true
  },
  "bks": {
    "password": "1141",
    "updated": "20260201000001",
    "overridden": true
  },
  "htjd": {
    "password": "3678",
    "updated": "20260201000001",
    "overridden": true
  },
  "cxjy": {
    "password": "1758",
    "updated": "20260201000001",
    "overridden": true
  }
})
const diObj = reactive({
  "db": {
    name: '零号大坝',
    address: `主变电站右侧，进入地下管道后匍匐到通道尽头处`,
    url: `https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png`
  },
  "cgxg": {
    name: '长弓溪谷',
    address: `地图右下角标点附近地下入口`,
    url: `https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png`
  },
  "bks": {
    name: '巴克什',
    address: `大浴场北侧`,
    url: `https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png`
  },
  "htjd": {
    name: '航天基地',
    address: `工业区组装室2楼`,
    url: `https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png`
  },
  "cxjy": {
    name: '潮汐监狱',
    address: `监狱行政区1楼大厅楼梯拐角处`,
    url: `https://playerhub.df.qq.com/playerhub/60004/object/18020000004.png`
  }
})
const diToObj = reactive({
  a: 'db',
  b: 'cgxg',
  c: 'bks',
  d: 'htjd',
  e: 'cxjy',
})
const init = async () => {
  // const combotRes = await getCombot().catch((err) => {
  // 	console.log('getCombot err', err)
  // })
  // console.log(valueArr.value.indexOf(currentWar.val))
  const combotRes = await getCombots(valueArr.value.indexOf(currentWar.val)).catch((err) => {
    console.log('getCombot err', err)
  })
  combot.value = [...combotRes.data.data]
  console.log('combotRes', combotRes)
  // const pssRes = await getPss().catch((err) => {
  // 	console.log('getPss err', err)
  // })
  const pssRes = await getPass().catch((err) => {
    console.log('getPss err', err)
  })
  pss.value = {
    ...pssRes.data.data
  }
  console.log('pssRes', pssRes)
}
const timer = ref(null)
onLoad(() => {
  initShare()
  init()
})
onMounted(() => {
  timer.value = setInterval(() => {
    init()
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

.tbody {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #14191D;
  background-repeat: repeat;
  background-position: top center;
  /* 从上往下对齐 */
  background-size: 100% auto;
  /* 宽度100%，高度自适应 */
  padding: 20px 20px 0;
  color: $darktheme-color;

  .content {
    padding-bottom: 50px;
  }
}

.nav {
  z-index: 3;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 20px;
  box-sizing: border-box;
  overflow-x: scroll;
  gap: 10px;

  .nav_item {
    width: 75px;
    height: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: none;
    border: 1px solid #464a4a;
    box-sizing: border-box;
    border-radius: 8px;
    gap: 10px;

    .img_box {
      width: 24px;
      height: 24px;
      border-radius: 2.88px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0FF794;

      .img {
        width: 12px;
        height: 12px;
        color: #161A1D;
      }
    }

    view {
      white-space: nowrap;
      color: rgba(208, 208, 208, 1);
      font-size: 12px;
    }

    &.selected {
      border: 1px solid #0FF794;

      view {
        color: #0FF794;
      }
    }
  }
}

.kzb_search {
  margin: 20px 0;
  font-size: 14px;
  color: #fff;

  .kzb_search_1 {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #0FF794;
    box-sizing: border-box;
    padding: 0 15px;
    gap: 4px;

    &_item {
      height: 42px;
      color: #0ff794;
      box-sizing: border-box;
      // margin-bottom: 10px;
      color: #E8EBEB;
      display: flex;
      justify-content: center;
      align-items: center;

      &.selected {
        color: #0ff794;
        border-bottom: 5px solid #0FF794;
      }
    }
  }

  .kzb_search_2 {
    padding: 15px 15px 5px;
    background: #464a4a33;
    display: flex;
    gap: 5px;

    &_box {
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      &_item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin: 0 0 10px 10px;
        font-size: 12px;
        gap: 5px;

        .icon {
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #4b4f52;
          border-radius: 50%;
          font-size: 12px;
          color: #cacbcb;
        }

        &.active {
          .icon {
            background: #13f894;

            &::before {
              font-size: 12px;
              padding: 2px;
              content: '✔';
              color: #252a2d;
            }
          }

          text {
            color: #0ff794;
          }
        }
      }
    }
  }
}

.kzb_FA_container {
  padding-bottom: 50px;
  box-sizing: border-box;

  .kzb_item {
    width: 100%;
    margin-bottom: 20px;
    font-size: 14px;
    color: #e2e2e3;
    border-radius: 4px;
    border: 1px solid #4D5154;
    box-sizing: border-box;
    background: #212629;
    padding: 10px;

    .item_tit {
      margin-bottom: 5px;
      overflow: scroll;
      white-space: nowrap;
      line-height: 16px;
    }

    .item_time {
      font-size: 12px;
      color: #6a7282;
      margin-bottom: 5px;
    }

    .item_detail {
      display: flex;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #4D5154;
      background: #1b1e20;
      padding: 10px;

      .detail_left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-right: 1px dashed #4D5154;
        margin-right: 10px;
        color: #aeb3bd;
        font-size: 12px;
        gap: 5px;

        view:nth-child(2) {
          color: #0ff794;
          font-size: 18px;
        }
      }

      .detail_right {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;

        .detail_item {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #aeb3bd;
          gap: 4px;

          text:nth-child(2) {
            color: #f4cf67;
          }
        }
      }
    }

    .unit_box {
      margin-top: 10px;
      height: 300px;
      overflow: auto;

      .unit {
        border-top: 1px dashed #4D5154;
        box-sizing: border-box;
        padding: 15px 0;
        display: flex;
        height: 80px;

        &:nth-of-type(1) {
          border-top: none;
        }

        .img_box {
          width: 48px;
          height: 48px;
          padding: 10px;
          border-bottom: 2px solid #0FF794;
          box-sizing: border-box;
          background: #41474c;
          display: flex;
          align-items: center;
          justify-content: center;

          .img {
            width: 28px;
            height: 26px;
            object-fit: cover;
          }
        }

        .unit_right {
          flex: 1;
          height: 60px;
          margin-left: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .unit_tit {
            font-weight: 500;
          }

          .unit_price {
            display: flex;
            align-items: center;
            color: #6a7282;
            font-size: 12px;
            gap: 5px;

            view>text {
              color: #fff;
              font-size: 14px;
            }
          }

          .unit_diffValue {
            font-weight: 700;
            color: #0ff794;
            font-size: 16px;
          }
        }
      }
    }
  }
}

.tit_bar {
  border-left: 4px solid #0FF794;
  background: #464a4a33;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 16px;
  margin: 20px 0;
  height: 46px;
}

.day_box {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;

  .day_item {
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
      height: 100px;
      box-sizing: border-box;
      margin-right: 20px;
      padding: 15px;

      &_tit {
        height: 16px;
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .day_con {
        width: 100%;
        display: flex;
        font-size: 12px;
        max-height: 54px;
        box-sizing: border-box;

        &_label {
          width: 70px;
          color: #f1f1f1;
        }

        &_con {
          flex: 1;
          overflow-y: scroll;
        }
      }
    }

    .day_detail {
      display: flex;
      width: 120px;
      height: 100px;
      box-sizing: border-box;
      padding: 12.5px 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-bottom: 2px solid #0FF794;
      background: #383d40;

      view:nth-child(1) {
        color: #0ff794;
        font-family: Helvetica Neue;
        font-size: 32px;
        font-style: normal;
        font-weight: 500;
        line-height: 32px;
      }

      text {
        color: #ffffffe6;
        font-family: Helvetica Neue;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px;
        text-decoration-line: underline;
        text-decoration-style: solid;
        text-decoration-skip-ink: auto;
        text-decoration-thickness: auto;
        text-underline-offset: auto;
        text-underline-position: from-font;
      }
    }
  }
}
</style>