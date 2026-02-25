<template>
	<!-- <view class="tbody" :style="{ backgroundImage: 'url(' + bgImg + ')' }"> -->
	<view class="tbody">
		<view class="header">
			<view class="page-title">我的</view>
			<view class="login-area" :style="{ backgroundImage: 'url(' + myBgImg + ')' }">
				<view class="login-box" v-if="!isLogin" @click="gotoLogin">
					<view class="login-img">
						<image class="logo" :src="avatarUrl0" />
					</view>
					<view class="info">
						<!-- <button v-if="false" class="loginBtn" open-type="getPhoneNumber"
                        @getphonenumber="(e)=>comeLogin(e)">点击登录</button> -->
						<!-- <view class="tips" v-if="false" @click="openPages(userSettingPath)">登录体验更多功能</view> -->
						<!-- <button class="loginBtn" open-type="getUserInfo" @getuserinfo="(e)=>comeLogin(e)">点击登录</button> -->
						<button class="loginBtn">点击登录</button>
						<!-- <uv-loading-icon :show="isLoading" :vertical="true" text="登录中..." /> -->
					</view>
				</view>
				<view class="login-box islogin" v-else>
					<view class="user">
						<view class="login-img">
							<uv-image :src="userInfo.avatarUrl||avatarUrl1" width="80px" height="80px" shape="circle">
								<template v-slot:error>
									<img class="err_img" :src="avatarUrl0" alt="file_ava">
								</template>
							</uv-image>
						</view>
						<view class="name" v-if="userInfo.nickName !== ''">{{ userData.nickName }}</view>
					</view>
				</view>
				<!-- <view class="invite_area" v-if="isLogin&&userData.myInvitationCode">
					<view class="invite_text" @click="openPages(inviteListPath)">我的邀请码</view>
				</view> -->
			</view>
		</view>
		<uv-popup ref="popup" mode="bottom" custom-style="min-height: 500rpx" bgColor="#192228" round="0"
			@change="changePopup" @maskClick="handleMask" :closeOnClickOverlay="false">
			<view class="login-content">
				<view class="login-content-item title">小程序</view>
				<view class="login-content-item tips relative">
					建议您使用微信头像和昵称，以便更好地体验
					<!-- <view class="bl-line" />
					<view class="br-dot" />
					<view class="br-line" /> -->
				</view>
				<view class="login-content-item avatar">
					<view>头像</view>
					<button class="avatar-wrapper loginBtn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
						<!-- <image class="avatar" :src="userData?.usavatarUrl||avatarUrl0" /> -->
						<uv-avatar :src="userData.avatarUrl||avatarUrl1" />
					</button>
				</view>
				<view class="login-content-item nickname-item">
					<view>昵称</view>
					<input class="weui-input" type="nickname" v-model="userData.nickName" placeholder="填写昵称" />
				</view>
				<view class="login-content-item mobile-phone">
					<view>手机号</view>
					<button class="loginBtn-mobile" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
						<input class="weui-input" type="input" v-model.number="userData.mobile" placeholder="填写手机号" />
					</button>
				</view>
				<view class="login-content-item invitationCode" v-if="showInvite">
					<view>邀请码</view>
					<input class="weui-input" :class="{'disabled':userData.registerInvitationCode?true:false}"
						type="text" v-model="userData.registerInvitationCode" placeholder="填写邀请码(选填)" />
				</view>
				<view class="login-content-item argeement">
					<uv-checkbox-group v-model="checkboxValue" size="16" iconSize="10" activeColor="#1eea8f">
						<uv-checkbox shape="square" v-for="(item, idx) in checkboxList" :key="idx" :label="item.label"
							:name="item.name">
							<template #default>
								<view class="argeement_radio">
									阅读并同意<text @click="openPages(userArguementPath)">《用户协议》</text>、<text
										@click="openPages(privacyPolicyPath)">《隐私政策》</text>
								</view>
							</template>
						</uv-checkbox>
					</uv-checkbox-group>
				</view>
				<view class="login-content-item btn" @click="firstLogin">确认</view>
				<view class="close-btn">
					<uv-icon class="close-icon" name="close" color="#fff" size="20px" @click="closePopup" />
				</view>
			</view>
		</uv-popup>
		<view class="level-area" v-if="userData.level&&userData.nextLevel">
			<view class="tl-line" />
			<view class="tr-dot" />
			<view class="tr-line" />
			<view class="level-area-header">
				<view class="header-left">
					<view class="title-first">V{{levelObj[userInfo.level].id}}</view>
					<view>{{userInfo.level}}</view>
				</view>
				<view class="points" @click="openPages(`${inviteListPath}?bar=change`)">积分：{{userInfo?.points||0}}
				</view>
			</view>
			<view class="level-area-main" v-if="userInfo.level">
				<uv-line-progress v-if="userInfo?.nextLevel"
					:percentage="userInfo.totalAmount/levelObj[userInfo.nextLevel].min*100" :showText="false" height="4"
					activeColor="#1DE68C" inactiveColor="#595e5d" />
				<uv-line-progress v-else :percentage="2" :showText="false" height="4" activeColor="#1DE68C" />
				<view class="level-area-info">
					<view class="left-info">
						<view>{{userInfo.totalAmount}}</view>
						<view v-if="userInfo.nextLevel">/</view>
						<view v-if="userInfo.nextLevel">{{levelObj[userInfo?.nextLevel]?.min}}</view>
					</view>
					<view class="right-info">
						<view>Lv：{{levelObj[userInfo.level].id+1}}</view>
						<view class="rules-btn" @click="openPages(vipMemberPath)">会员权益</view>
					</view>
				</view>
			</view>
			<view class="bl-line" />
			<view class="br-dot" />
			<view class="br-line" />
		</view>
		<view class="order-area">
			<view class="order-header" @click="openPages(orderListPath, 'ALL')">
				<view>我的订单</view>
				<view class="open-btn">
					<view>全部</view>
					<image src="/static/icons/more.svg" style="width: 12px;height: 11.97px;" />
				</view>
			</view>
			<view class="order-power">
				<view class="order-power-content">
					<!-- <view class="order-power-item" @click="openPages(orderListPath, 'all')">
						<uv-icon name="file-text" color="#01FA9E" size="20" />
						<view>全部</view>
					</view>｜
					<view class="order-power-item" @click="openPages(orderListPath, 'PENDING')">
						<uv-icon name="empty-order" color="#01FA9E" size="20" />
						<view>待服务</view>
					</view>｜
					<view class="order-power-item" @click="openPages(orderListPath, 'PAID')">
						<uv-icon name="order" color="#01FA9E" size="20" />
						<view>已完成</view>
					</view> -->
					<view class="order-power-it" @click="openPages(orderListPath, 'PENDING')">
						<image src="/static/icons/wallet.svg" />
						<view>待付款</view>
					</view>
					<view class="order-power-it" @click="openPages(orderListPath, 'PAID')">
						<image src="/static/icons/order.svg" />
						<view>待接单</view>
					</view>
					<view class="order-power-it" @click="openPages(orderListPath, 'COMPLETED')">
						<image src="/static/icons/duscuss.svg" />
						<view>已完成</view>
					</view>
				</view>
				<view class="tl-line" />
				<view class="tr-dot" />
				<view class="tr-line" />
				<view class="bl-line" />
				<view class="br-dot" />
				<view class="br-line" />
			</view>
		</view>
		<view class="logio_logo" />
		<view class="job-area">
			<view class="job-item" @click="openPages(collectPath)">
				<image src="/static/icons/collect.svg" />
				<view>商品收藏</view>
			</view>
			<!-- <view class="job-item" @click="showToastInfo">
				<image src="/static/icons/notice.svg" />
				<view>通知设置</view>
			</view> -->
			<view class="job-item" v-if="dueShow('测试')" @click="openPages(inviteListPath)">
				<image src="/static/icons/invite.svg" />
				<view>邀请赚佣</view>
			</view>
			<view class="job-item" @click="openPages(userArguementPath)">
				<image src="/static/icons/pact.svg" />
				<view>用户协议</view>
			</view>
			<view class="job-item" @click="openPages(privacyPolicyPath)">
				<image src="/static/icons/safe.svg" />
				<view>隐私政策</view>
			</view>
		</view>
		<!-- <view class="power-area">
			<view class="power-item" v-for="(pow, i) in powerList" :key="i" @click="openPages(pow.path, pow.param)">
				<view class="power-item-left">
					<uv-icon :name="pow.icon" :color="pow.color" size="20" />
					<view>{{ pow.name }}</view>
				</view>
				<uv-icon name="arrow-right" color="#888888" size="16" />
			</view>
		</view> -->
		<Tabbar v-show="showTabBar" />	
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import route from '@/uni_modules/uv-ui-tools/libs/util/route.js';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		toLogin,
		getPhone,
		deleteToken,
		getUserInfo,
		updateUserInfo,
		getAgentList,
		setAgent,
		getBanner,
		uploadImage
	} from '@/common/api.js';
	import {
		useStore
	} from '@/store/index.js'
	import {
		useImgEffect,
		useBaseEffect
	} from '@/common/useDataEffect.js';
	import Tabbar from '@/pages/components/tabbar.vue'

	const {
		getUser,
		setUser,
		getBd_vid,
		getAgentCode,
		getInvitationCode
	} = useStore();
	const {
		bgImg
	} = useImgEffect();
	const {
		levelObj
	} = useBaseEffect()
	import useFnEffect from '@/common/common.js'

	const {
		dueShow,
		initShare
	} = useFnEffect()
	const isLogin = ref(false);
	const showTabBar = ref(true)
	const showInvite = ref(true)
	const userData = ref({
		level: '会员待激活',
		nextLevel: '已激活会员之路',
		totalAmount: 0,
		experience: 1,
		score: 0,
		nickName: '',
		avatarUrl: '',
		mobile: '',
		blance: '0.00',
		points: 0,
		agent: null,
		registerInvitationCode: ''
	})
	const userInfo = ref({
		level: '会员待激活',
		nextLevel: '已激活会员之路',
		totalAmount: 0,
		experience: 1,
		score: 0,
		nickName: '',
		avatarUrl: '',
		blance: '0.00',
		mobile: '',
		userId: '',
		points: 0,
		agent: null,
		registerInvitationCode: ''
	})
	const checkboxList = reactive([{
		name: 'argee',
		label: '同意',
		disabled: false
	}])
	const checkboxValue = ref([])
	const avatarUrl0 = `/static/icons/logo.svg`
	// 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
	const avatarUrl1 = `/static/icons/avatar_logo.png`
	const orderListPath = `/components/my/order/orderList`
	const vipMemberPath = `/components/my/vip/index`
	const collectPath = `/components/my/collect/collect`
	const userArguementPath = `/components/my/userArgeement/index`
	const privacyPolicyPath = `/components/my/privacyPolicy/index`
	const inviteListPath = `/components/my/invite/inviteList`
	const showObj = reactive({
		show1: true,
		show2: true,
		show3: true
	})
	const invitationCode = ref('')
	const agentCode = ref()
	const agentList = ref()
	const myBgImg = ref('/static/bg/my_bg.png')
	const init = async () => {
		// let now = new Date().getTime()
		// let outTime = new Date('2025/12/31 22:10:00').getTime()
		// if (now < outTime) {
		// 	// showObj.show1 = false;
		// 	// showObj.show2 = false;
		// 	showObj.show3 = false;
		// }
		let infoImg = await getBanner({
			type: 2
		}).catch((err) => {
			console.log('获取图片失败');
		});
		if (infoImg?.[0]?.url) {
			myBgImg.value = infoImg[0].url;
		} else {
			console.log('获取图片为空');
			myBgImg.value = '/static/bg/my_bg.png';
		}
		// console.log('myBgImg', myBgImg.value)
		invitationCode.value = getInvitationCode //uni.getStorageSync('invitationCode')
		if (invitationCode.value) userData.value.registerInvitationCode = invitationCode.value
		agentCode.value = getAgentCode
		if (agentCode.value) {
			userData.value.agent = {
				agentCode: getAgentCode
			}
		}
		console.log('my invitationCode', invitationCode.value, userData.value)
		let token = uni.getStorageSync('token')
		if (!token) {
			isLogin.value = false;
			return;
		}
		// uni.removeStorageSync('token');return;
		const userInfoRes = await getUserInfo({
			token: token
		}).catch((err) => {
			uni.showToast({
				title: err?.message || '账户登录已过期，请重新登录',
				icon: 'none'
			})
			return {
				success: false
			}
		});
		console.log('userInfoRes', userInfoRes);
		if (userInfoRes?.success || userInfoRes?.code) {
			userInfoRes.success === false
		}
		if (userInfoRes.success === false || ['300'].includes(userInfoRes.code)) {
			uni.removeStorageSync('token');
			// uni.removeStorageSync('userData');
			setUser(null)
			await deleteToken({
				token: token
			})
			return;
		}
		// const userDataStore = uni.getStorageSync('userData');
		// console.log('userDataStore', userDataStore);
		userData.value = {
			...userData.value,
			// ...userDataStore,
			...getUser,
			...userInfoRes,
		};
		userData.value.nickName = userInfoRes.nickName;
		userData.value.avatarUrl = userInfoRes.avatarUrl;
		// userData.value.avatarUrl = uni.getStorageSync('avatar') || avatarUrl1
		if (userData.value.nickName && userData.value.mobile) {
			userInfo.value = {
				...userData.value
			}
		}
		// userData.value.nextLevel = '白金会员'
		// console.log('userData', userData.value);
		// uni.setStorageSync('userData', userData.value);
		// if (userInfoRes?.avatarUrl && userData.value?.avatarUrl) {
		// 	uploadImg(userInfoRes.avatarUrl)
		// }
		setUser(userData.value)
		isLogin.value = true;
	}
	const onChooseAvatar = async (e) => {
		if (!e) {
			console.log('未获取事件')
			return;
		}
		console.log('onChooseAvatar event', e)
		// avatarUrl0.value = e.detail.avatarUrl
		userData.value.avatarUrl = e.detail.avatarUrl
		// uni.setStorageSync('userData', userData.value)
		setUser(userData.value)
		uploadImg(e.detail.avatarUrl)
	}
	const onGetPhoneNumber = async (e) => {
		if (!e) {
			console.log('未获取事件')
			return;
		}
		console.log(e)
		// avatarUrl0.value = e.detail.avatarUrl
		// let encryptedData = e.detail.encryptedData
		let target = e.target
		await getPhone({
			code: target.code,
		}).then((res) => {
			console.log(res)
			userData.value.mobile = res
			console.log('userData', userData.value)
			// uni.setStorageSync('userData', userData.value)
			setUser(userData.value)
		}).catch((err) => {
			console.log('getMobile err', err)
		})
	}
	const isLoading = ref(false)
	const changePopup = async (e) => {
		console.log('changePopup', e)
	}
	const handleMask = async (e) => {
		// console.log('handleMask',e)
		uni.removeStorageSync('token')
		// uni.removeStorageSync('userData')
		setUser(null)
	}
	const closePopup = async (e) => {
		// console.log('closePopup',e)
		uni.removeStorageSync('token')
		// uni.removeStorageSync('userData')
		setUser(null)
		showTabBar.value = true
		popup.value.close()
	}
	const popup = ref()
	const bdZhuCe = async () => {
		const bd_vid = getBd_vid //uni.getStorageSync('bd_vid') || ''
		if (!bd_vid) return;
		await wx.request({
			url: 'https://ocpc.baidu.com/ocpcapi/api/uploadConvertData',
			method: 'POST',
			data: {
				token: '7yrCwakoAdung8RY1BxAd3LmDReGi0TU@JQEub1XHvsd5p5CCgGOJDd0Ij8KmrBOo',
				conversionTypes: [{
					logidUrl: `http://yyt.wxqzlkj.cn?bd_vid=${bd_vid}`,
					newType: 25
				}],
				success() {
					console.log('注册回传成功')
				},
				fail(res) {
					console.log('注册回传失败')
					// uni.showToast({
					// 	icon: 'none',
					// 	title: res?.header?.errors?.message || '注册回传失败'
					// })
				}
			}
		})
	}
	const firstLogin = async () => {
		console.log('checkboxList', checkboxList, 'checkboxValue', checkboxValue.value)
		if (!checkboxValue.value.length) {
			uni.showToast({
				icon: 'none',
				title: '请先勾选同意协议'
			})
			return;
		}
		if (!userData.value.avatarUrl || !userData.value.nickName || !userData.value.mobile) {
			uni.showToast({ // || !userData.value.mobile、手机号
				// title: '请先填全头像和昵称',
				title: '请先填全头像、昵称和手机号',
				icon: 'none'
			})
			return;
		}
		// const userInfos = uni.getStorageSync('userData')
		// const userInfos = getUser
		const token = uni.getStorageSync('token')
		let userInfos = await getUserInfo({
			token
		}).catch((err) => {
			uni.showToast({
				title: err.message || '获取用户信息失败',
				icon: 'none'
			})
			return {
				success: false
			}
		});
		// if()
		// console.log(userInfos)
		agentCode.value = getAgentCode //uni.getStorageSync('agentCode')
		// if(!agentCode.value) agentCode.value = 1132
		agentCode.value ? (agentList.value = await getAgentList()) : '';
		// console.log('firstLogin agentCode',agentCode.value,agentList.value)
		if (agentCode.value && agentList.value?.length) {
			// console.log('has agentCode',agentCode.value,agentList.value)
			// 设置agent
			for (let i = 0; i < agentList.value.length; i++) {
				// console.log(agentList.value[i].agentCode,agentCode.value,agentList.value[i].agentCode === String(agentCode.value))
				if (agentList.value[i]?.agentCode && agentList.value[i]?.name && agentList.value[i].agentCode ===
					String(agentCode.value)) {
					console.log('setAgent data', agentCode.value, agentList.value[i].name, userInfos.id)
					await setAgent({
						agentCode: agentCode.value,
						name: agentList.value[i].name,
						userId: userInfos.id
					}).catch((err) => {
						console.log('setAgent err', err)
					})
					break;
				} else {
					console.log('no agentCode')
				}
			}
		}
		uni.showLoading({
			title: '登录中...',
			mask: true
		})
		console.log('firsrLogin', userInfo.value)
		await bdZhuCe();
		let UserObj = {
			avatarUrl: userData.value.avatarUrl,
			mobile: userData.value.mobile,
			nickName: userData.value.nickName,
			userId: userInfos.id
		}
		invitationCode.value = getInvitationCode || ''
		//uni.getStorageSync('invitationCode') || ''
		if (invitationCode.value && showInvite.value) UserObj.registerInvitationCode = invitationCode.value
		console.log('UserObj', UserObj, invitationCode.value)
		const updateUserInfoRes = await updateUserInfo(UserObj).catch((err) => {
			console.log('updateUserInfoRes err', err)
			uni.showToast({
				title: err.message || '更新userInfo失败',
				icon: 'none'
			})
			if (['邀请码只能在注册后10分钟内绑定'].includes(err.message)) showInvite.value = false
			return {
				success: false
			}
		});
		uni.hideLoading();
		if (updateUserInfoRes.success === false) {
			return;
		};
		console.log('updateUserInfoRes', updateUserInfoRes)
		let userInfoRes = await getUserInfo({
			token
		}).catch((err) => {
			console.log('获取userInfo失败')
			uni.showToast({
				title: err.message || '获取用户信息失败',
				icon: 'none'
			})
			return {
				success: false
			}
		});
		if (userInfoRes.success === false) {
			return;
		};
		userData.value = {
			...userData.value,
			...userInfoRes
		}
		userInfo.value = {
			...userData.value
		}
		console.log('userInfo', userData.value, userInfo.value)
		// uni.setStorageSync('userData', userData.value)
		setUser(userData.value)
		isLogin.value = true;
		showTabBar.value = true;
		popup.value.close()
	}
	const gotoLogin = async () => {
		const token = uni.getStorageSync('token')
		if (!token) {
			uni.login({
				provider: 'weixin',
				success: async (loginRes) => {
					console.log('loginRes：', loginRes);
					if (!loginRes.code) {
						uni.showToast({
							title: '获取code失败',
							icon: 'none'
						})
						return;
					}
					uni.showLoading({
						title: '登录中...',
						mask: true
					})
					// 发送到后端
					const result = await toLogin({
						code: loginRes.code,
					}).catch((err) => {
						uni.showToast({
							title: err.message || '登录请求失败',
							icon: 'none'
						})
						return {
							success: false
						}
					});
					if (result.success && result.success === false) {
						console.log('登录请求失败')
						return;
					};
					if (!result?.token) {
						console.log('获取token失败')
						uni.showToast({
							title: '登录请求失败',
							icon: 'none'
						})
						return;
					}
					console.log('loginRes', result);
					uni.setStorageSync('token', result.token)
					// window.localStorage.setItem('token',result.token)
					let userInfoRes = await getUserInfo({
						token: result.token
					}).catch((err) => {
						uni.showToast({
							title: err.message || '登录失败',
							icon: 'none'
						})
						return {
							success: false
						}
					});
					if (!userInfoRes || userInfoRes.success === false) {
						console.log('获取userInfo失败')
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						})
						return;
					};
					console.log('userInfoRes', userInfoRes)
					userData.value = {
						...userData.value,
						...userInfoRes,
						// avatarUrl: userData.value.avatarUrl,
						// nickName: userData.value.nickName,
						// mobile: userData.value.mobile
					}
					agentCode.value && (userData.value.agent = {
						agentCode: agentCode.value
					})
					console.log('invitationCode', invitationCode.value, getAgentCode)
					invitationCode.value && (userData.value.registerInvitationCode = invitationCode
						.value)
					console.log('toLoginEd userData', userData.value)
					// uni.setStorageSync('userData', userData.value)
					setUser(userData.value)
					userInfo.value = {
						...userData.value
					}
					console.log('请求成功:', loginRes)
					if (!userData.value.avatarUrl || !userData.value.nickName || !userData.value
						.mobile) {
						uni.hideLoading();
						showTabBar.value = false
						popup.value.open()
						return;
					}
					if (0 || false) {
						uni.hideLoading();
						showTabBar.value = false
						popup.value.open();
						return;
					}
					isLogin.value = true;
					uni.hideLoading();
					// isLoading.value = false;
					showTabBar.value = true;
					popup.value.close();
					return;
				},
				fail: (err) => {
					console.error('登录失败:', err)
				}
			})
			return;
		}
		// const userInfo = uni.getStorageSync('userData')
		let userInfoRes = await getUserInfo({
			token: token
		}).catch((err) => {
			console.log('err', err)
			return {
				success: false
			}
		})
		if (userInfoRes.success === false || userInfoRes.code === 300) {
			uni.removeStorageSync('token');
			// uni.removeStorageSync('userData');
			setUser(null)
			await deleteToken({
				token: token
			})
			// uni.showToast({
			// 	title: '账户登录已过期，请重新登录',
			// 	icon: 'none'
			// })
			return;
		}
		// console.log('userInfoRes', userInfoRes)
		userData.value = {
			...userData.value,
			...userInfoRes,
		}
		userInfo.value = {
			...userData.value
		}
		// console.log('toLoginEd userData', userData.value)
		// userData.value.avatarUrl = uni.getStorageSync('avatar') || avatarUrl1
		// uni.setStorageSync('userData', userData.value)
		setUser(userData.value)
	}
	const openPages = (path, param) => {
		// console.log(path, param)
		if (path === '') return;
		if (path.includes('orderList') || path.includes('otherOrder') || path.includes('myCoupon')) {
			uni.navigateTo({
				url: path + '?orderType=' + param
			})
		} else {
			uni.navigateTo({
				url: path
			})
		}
	}
	const showToastInfo = () => {
		uni.showToast({
			title: '开发中，敬请期待',
			icon: 'none'
		})
	}
	const uploadImg = async (tempUrl) => {
		console.log('tempUrl', tempUrl)
		const fs = wx.getFileSystemManager();
		// 下载临时文件到本地
		const downloadRes = await uni.downloadFile({
			url: tempUrl,
			success: async (downRes) => {
				console.log('下载成功', downRes);
				if (downRes.statusCode !== 200) return;
				console.log('下载成功临时文件', downRes.tempFilePath);
				// 读取为base64
				const base64 = fs.readFileSync(downRes.tempFilePath, 'base64');
				const base64Url = `data:image/jpeg;base64,${base64}`;
				uni.setStorageSync('avatar', base64Url)
				return;
				// 3. 创建模拟 File 对象（在小程序中无法创建真正的 File 对象）
				// 但可以创建一个包含必要信息的对象
				const simulatedFile = {
					name: `avatar_${Date.now()}.jpg`,
					size: base64.length,
					type: 'image/jpeg',
					path: downRes.tempFilePath, // 临时文件路径
					lastModified: Date.now(),
					base64: base64Url,
					// 模拟 File 的方法
					arrayBuffer: async () => {
						// 将 base64 转换为 ArrayBuffer
						const binaryString = atob(base64)
						const len = binaryString.length
						const bytes = new Uint8Array(len)
						for (let i = 0; i < len; i++) {
							bytes[i] = binaryString.charCodeAt(i)
						}
						return bytes.buffer
					}
				}
				console.log('simulatedFile', simulatedFile)
				// 上传图片到服务器
				await uploadImage(simulatedFile).catch((err) => {
					console.log('uploadImage err', err)
				})
			},
			fail: (err) => {
				console.log('下载失败', err);
			}
		});
		console.log('downloadRes', downloadRes)
	}
	onLoad((option) => {
		console.log(option)
		initShare(getUser?.myInvitationCode)
		// init();
	});
	init();
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';

	.loginBtn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 !important;
		margin: 0 !important;
		border: none !important;
		background: none !important;
		overflow: auto;
		width: 100px;
		height: 28px;
		font-size: 14px;
		line-height: 12px;
		color: $darktheme-color;

		&::after {
			display: none;
		}
	}

	.tbody {
		box-sizing: border-box;
		min-height: 100vh;
		background-color: #14191D;
		background-repeat: repeat;
		background-position: top center;
		/* 从上往下对齐 */
		background-size: 100% auto;
		font-size: 16px;

		.header {
			.page-title {
				margin: auto;
				padding: 46px 24px 0;
				font-size: 12px;
				color: $darktheme-color;
				text-align: center;
			}
		}
	}

	.header {
		z-index: 3;
		position: relative;
		box-sizing: border-box;

		.login-area {
			width: 100%;
			height: 240px;
			margin: 12px 0 0;
			display: flex;
			align-items: center;
			justify-content: center;
			// border: 1px solid #495353;
			// background-image: url('/static/bg/my_bg.png');
			// background-color: linear-gradient(to bottom,
			// 		rgba(255, 255, 255, 0) 0%,
			// 		rgba(255, 255, 255, 0.8) 100%);
			background-color: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
			background-repeat: no-repeat;
			background-size: cover;

			.invite_area {
				width: calc(100% - 40px);
				padding: 0 20px 10px;
				position: absolute;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 10px;

				.invite_text {
					flex: 1;
					display: flex;
					white-space: nowrap;
					overflow-x: scroll;
					font-family: PingFang SC;
					font-weight: 400;
					font-style: Regular;
					font-size: 14px;
					color: rgba(#ffffff, 0.7);
					line-height: 100%;
					letter-spacing: 0%;
					vertical-align: middle;

					&>text {
						color: #ffffff;
						text-decoration: underline;
						text-decoration-style: solid;
						text-decoration-offset: 0%;
						text-decoration-thickness: 0%;
					}
				}

				.invite_btn {
					width: 14px;
					height: 14px;
				}
			}

		}
	}

	.login-box {
		min-width: 80px;
		min-height: 107px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		position: relative;

		.login-img {
			width: 80px;
			height: 80px;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			border-radius: 50%;
			background-color: rgba(20, 25, 29, 1);
			border: 3px solid rgba(225, 225, 225, 0.2);

			.logo {
				width: 41.97px;
				height: 42.74px;
			}
		}

		.info {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: $darktheme-color;
			font-size: 16px;
			margin-top: 10px;

			.loginBtn {
				width: 56px;
				height: 12px;
				font-size: 14px;
				line-height: 12px;
				color: $darktheme-color;
			}
		}

		.user {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
			color: $darktheme-color;

			.logo {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.login-img {
				:deep(.uv-image__error) {
					background: none;
				}

				:deep(.err_img) {
					width: 41.97px;
					height: 42.74px;
				}
			}

			.name {
				margin-top: 10px;
				height: 12px;
				white-space: nowrap;
				font-size: 14px;
				line-height: 12px;
			}
		}
	}

	.islogin {
		margin: 10px 12px;
		justify-content: space-between;
	}

	.login-content {
		position: relative;
		padding: 10px 20px 20px;
		z-index: 13;
		display: flex;
		flex-direction: column;
		align-items: self-start;
		justify-content: center;
		color: rgba(234, 234, 234, 1);
		font-size: 12px;

		.login-content-item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			padding: 10px 0 0;
			width: 100%;

			&>view:nth-child(1) {
				width: 40px;
				margin-right: 16px;
				color: rgba(128, 128, 128, 1);
			}

			&.title {
				padding-bottom: 5px;
			}

			&.argeement {
				padding-bottom: 5px;
				justify-content: flex-start;
				gap: 3px;
			}

			&.invitationCode {
				font-size: 12px;

				.weui-input.disabled {
					opacity: 0.6;
					cursor: not-allowed;
					color: rgba(157, 158, 158, 1);
				}
			}

			.weui-input {
				font-size: 14px;
				min-width: 110px;
				padding: 0 8px;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}

			.loginBtn {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 !important;
				margin: 0 !important;
				border: none !important;
				background: none !important;
				font-size: 16px;
				color: #ffffff;
			}

			.loginBtn-mobile {
				padding: 0 !important;
				margin: 0 !important;
				text-align: start;
				background: none !important;

				.weui-input {
					color: #ffffff;
					font-size: 14px;
					min-width: 150px;
					padding: 0 8px;
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}
			}
		}

		.title {
			font-size: 18px;
			font-weight: 600;
		}

		.tips {
			border-top: 1px solid rgba(59, 65, 64, 1);
		}

		.avatar {
			.avatar-wrapper {
				height: 42px;
				width: 58px;
				padding: 0 8px;
			}
		}

		.nickname-item {
			&>view:nth-child(1) {
				margin-right: 16px;
			}
		}


		.btn {
			height: 28px;
			padding: 0 25px;
			margin: 0 auto;
			font-size: 14px;
			line-height: 14px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 30px;
			box-sizing: border-box;
			color: rgba(20, 25, 29, 1);
			background-color: rgba(30, 234, 143, 1);
		}

		.close-btn {
			position: absolute;
			right: 12px;
			top: 12px;
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}
	}

	.argeement_radio {
		display: flex;
		align-items: center;
		color: rgba(#ffffff, 0.6);

		&>text {
			color: rgba(#ffffff, 0.9);
		}
	}

	.level-area {
		height: 75px;
		z-index: 3;
		padding: 10px 12.5px 9px;
		margin: 0 20px 10px;
		position: relative;
		box-sizing: border-box;
		border-top: 1px solid rgba(59, 65, 64, 1);
		border-bottom: 1px solid rgba(59, 65, 64, 1);
		background: url('/static/bg/level_bg.png'), rgba(3, 47, 6, 0.15);
		background-blend-mode: overlay, normal;
		background-size: cover;

		&-header {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			font-family: Microsoft YaHei;
			font-weight: 400;
			font-style: Regular;
			font-size: 14px;
			line-height: 16px;
			letter-spacing: 0%;

			.header-left {
				height: 22px;
				display: flex;
				align-items: flex-end;
				color: rgba(225, 225, 225, 1);
				gap: 3px;

				.title-first {
					background: linear-gradient(180deg, #FFFFFF 0%, #A4A4A4 100%);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					font-family: MiSans;
					font-weight: 900;
					font-style: Heavy;
					font-size: 26px;
					leading-trim: NONE;
					line-height: 21.6px;
					letter-spacing: 0%;
				}
			}

			.points {
				padding-right: 6px;
				color: rgba(#ffffff, 0.4);
			}
		}

		&-main {
			height: 27px;
			padding-right: 5px;
			margin-top: 7px;

			.level-area-info {
				height: 18px;
				margin-top: 5px;
				color: #f1f1f1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-family: Microsoft YaHei;
				font-weight: 700;
				font-style: Bold;
				font-size: 12px;
				leading-trim: NONE;
				line-height: 14px;
				letter-spacing: 0%;
				text-align: center;
				vertical-align: middle;

				.left-info {
					height: 14px;
					display: flex;
					align-items: center;
					gap: 3px;

					&>view:first-child {
						color: #9ca3a8;
					}
				}

				.right-info {
					height: 18px;
					display: flex;
					align-items: center;
					gap: 5px;

					.rules-btn {
						width: 70px;
						height: 100%;
						border-radius: 12px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						font-style: Regular;
						font-size: 12px;
						leading-trim: NONE;
						line-height: 14px;
						letter-spacing: 0%;
						display: flex;
						align-items: center;
						justify-content: center;
						color: rgba(20, 25, 29, 1);
						background: rgba(239, 208, 109, 1);
					}
				}
			}
		}
	}

	.order-area {
		z-index: 3;
		margin: 0 20px 10px;
		box-sizing: border-box;

		.order-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0;

			&>view:nth-child(1) {
				color: $darktheme-color;
				font-weight: 600;
				font-size: 16px;
				line-height: 16px;
				// margin-left: 12px;
				// padding: 0 8px;
				// border-left: 2px solid $defult-green;
			}

			.open-btn {
				padding-right: 2px;
				display: flex;
				align-items: center;
				font-size: 12px;
				line-height: 14px;
				color: rgba(31, 247, 150, 1);
				;

				&>view:nth-child(1) {
					padding-right: 3px;
				}
			}
		}

		.order-power {
			height: 76.5px;
			width: 100%;
			position: relative;
			margin: 20.27px 0 0;
			box-sizing: border-box;
			border-top: 1px solid rgba(59, 65, 64, 1);
			border-bottom: 1px solid rgba(59, 65, 64, 1);

			/* 关键：让图片覆盖整个容器 */
			// background-position: center center;
			/* 居中显示 */
			// background-repeat: no-repeat; /* 不重复 */
			.order-power-content {
				height: 75px;
				padding: 0 24.5px;
				box-sizing: border-box;
				background: url('/static/bg/bar_bg2.png') rgba(#14191d, 0.98);
				background-blend-mode: overlay, normal;
				background-size: cover;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: $defult-green;

				.order-power-item {
					font-size: 12px;
					color: $darktheme-color;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 8px;

					&>view {
						margin-top: 4px;
					}
				}

				.order-power-it {
					height: 43px;
					font-size: 14px;
					line-height: 14px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 24px;
						height: 24px;
					}

					&>view {
						margin-top: 5px;
						color: rgba(31, 247, 150, 1);
					}
				}
			}
		}
	}

	.power-area {
		margin: 12px;
		z-index: 3;
		background-color: $darktheme-body-bgcolor;
		border-radius: 6px;
		padding: 12px 12px 8px;
		font-size: 12px;
		color: $darktheme-color;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.power-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 12px;
			padding: 8px 0;
			width: 100%;
			border-bottom: 1px solid $darktheme-color;

			.power-item-left {
				display: flex;
				align-items: center;
				justify-content: center;

				&>view:nth-child(2) {
					padding-left: 8px;
				}
			}

			&>view:nth-child(2) {
				padding-right: 12px;
			}
		}
	}

	.job-area {
		margin: 20.27px 20px 20px;
		padding-bottom: 85px;
		z-index: 3;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.job-item {
			height: 38px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;

			image {
				width: 16px;
				height: 16px;
			}

			view {
				color: rgba(208, 208, 208, 1);
				font-size: 12px;
			}
		}
	}

	.logio_logo {
		width: 90px;
		height: 18.94px;
		position: absolute;
		left: 50%;
		bottom: 122.8px;
		transform: translateX(-50%);
		background-image: url('/static/icons/logo_2.svg');
		opacity: 0.6;
		z-index: 1;
	}
</style>