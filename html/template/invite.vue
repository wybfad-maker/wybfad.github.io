<template>
  <view class="tbody">
    <view class="invitebox inviteCode_area">
      <view class="invitebox_header">我的推广码</view>
      <view class="invitebox_body">
        <view class="invitebox_body_left">
          {{ getUser.myInvitationCode }}
        </view>
        <view class="invitebox_body_right" @click="copyInviteInfo(getUser.myInvitationCode)">复制</view>
      </view>
    </view>
    <view class="invitebox inviteLink_area">
      <view class="invitebox_header">我的推广链接</view>
      <view class="invitebox_body">
        <view class="invitebox_body_left">{{ getUser.invitationUrl }}</view>
        <view class="invitebox_body_right" @click="copyInviteInfo(getUser.invitationUrl)">复制</view>
      </view>
    </view>
    <view class="invitebox inviteList_area">
      <view class="invitebox_header">推广记录</view>
      <view class="invitebox_tb_body">
        <view class="invitebox_tb_hd">
          <view>昵称</view>
          <view>联系方式</view>
          <view>注册时间</view>
        </view>
        <view class="invitebox_tb_bd" v-if="inviteList.length !== 0">
          <view class="invitebox_item" v-for="li in inviteList" :key="li">
            <view>{{ li.nickName || '-' }}</view>
            <view>{{ li.mobile || '-' }}</view>
            <view>{{ li.registerTime || '-' }}</view>
          </view>
        </view>
        <view class="invitebox_tb_bd" v-else>
          <view class="invitebox_item invitebox_nodata">
            暂无数据
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  reactive,
} from 'vue';
import {
  onHide,
  onLoad,
  onUnload,
} from '@dcloudio/uni-app';
import {
  useStore
} from '@/store/index.js'
import useFnEffect from '@/common/common.js'
import {
  deleteToken,
  getUserInfo,
  getInviteList,
  pointsChangeList
} from '@/common/api.js';

const {
  getUser,
  setUser,
} = useStore();
const {
  dueShow
} = useFnEffect()
const inviteList = ref([])
const recordList = ref([])

function formatDate (date) {
  return new Date(date).toLocaleString().replace(/\//g, '-')
}
const init = async () => {
  let paramsObj = {
    userId: getUser.id,
    page: 1,
    size: 100,
  }
  const inviteListRes = await getInviteList(paramsObj).catch(err => {
    console.log('getInviteList', err)
  })
  // console.log(inviteListRes)
  // inviteList.value = Array.from({
  // 	length: 9
  // }, () => inviteListRes.inviteDetails[0])
  inviteList.value = inviteListRes.inviteDetails
  // console.log(inviteListRes)
  const recordListRes = await pointsChangeList(paramsObj).catch(err => {
    console.log('recordListRes', err)
  })
  recordList.value = recordListRes.data.pointRecords.map(item => {
    return {
      ...item,
      createTime: formatDate(item, createTime),
      updateTime: formatDate(item.updateTime),
    }
  })
}
const copyInviteInfo = (info) => {
  uni.setClipboardData({
    data: info,
    success: function () {
      uni.showToast({
        title: '复制成功',
        icon: 'none'
      })
    }
  });
}
onLoad(async () => {
  await init()
})
</script>

<style lang="scss" scoped>
.tbody {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #14191D;
  color: rgba(255, 255, 255, 0.9);
  padding: 25px 20px 30px;
  font-size: 14px;
}

.invitebox {
  width: calc(100vw - 40px);
  border: 1px solid rgba(59, 64, 64, 1);

  &_header {
    flex: 1;
    height: 36px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: PingFang SC;
    font-weight: 400;
    font-style: Regular;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0%;
    vertical-align: middle;
    text-transform: uppercase;
    background: none;
    color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid rgba(59, 64, 64, 1);
  }

  &_body {
    flex: 1;
    min-height: 46px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(21, 30, 30, 1);
    font-family: PingFang SC;
    letter-spacing: 0%;
    font-size: 12px;

    &_left {
      flex: 1;
      overflow-x: scroll;
      white-space: nowrap;
      font-weight: 400;
      font-style: Regular;
      line-height: 14px;
      vertical-align: middle;
      text-transform: uppercase;
      color: rgba(31, 247, 150, 1);
    }

    &_right {
      width: 60px;
      height: 28px;
      color: #ffffff;
      margin-left: 12px;
      font-weight: 300;
      font-style: Light;
      line-height: 12px;
      letter-spacing: 0%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      border: 1px solid rgba(40, 50, 58, 1);
    }
  }
}

.inviteCode_area {
  margin-bottom: 10px;
}

.inviteLink_area {
  margin-bottom: 25px;
}

.inviteList_area {
  .invitebox_tb_body {
    // max-height: calc(100vh - 297px);
    // overflow-y: scroll;
    background: none;

    .invitebox_tb_hd,
    .invitebox_item {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: Inter;
      font-weight: 500;
      font-style: Medium;
      font-size: 12px;
      line-height: 30px;
      letter-spacing: 0%;
      text-align: center;
      vertical-align: middle;

      &>view {
        flex: 4;
        text-align: left;
        overflow-x: scroll;
        white-space: nowrap;
        margin: 0 4px;
      }

      &>view:nth-child(2) {
        text-align: center;
      }

      &>view:nth-child(3) {
        flex: 5;
      }
    }

    .invitebox_tb_hd {
      &>view {
        text-align: center;
      }
    }

    .invitebox_tb_bd {
      max-height: calc(100vh - 343px);
      background: rgba(21, 30, 30, 1);
      overflow-y: scroll;
    }

    .invitebox_item:nth-child(odd) {
      background: rgba(43, 63, 64, 1);
    }

    .invitebox_item:nth-child(even) {
      background: rgba(21, 30, 30, 1);
    }

    .invitebox_nodata {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Inter;
      font-weight: 500;
      font-style: Medium;
      font-size: 12px;
      line-height: 30px;
      letter-spacing: 0%;
      color: rgba(128, 128, 128, 1);
    }
  }
}
</style>