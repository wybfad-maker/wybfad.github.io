import { reactive, ref, computed } from 'vue'

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
{
  id: 3,
  text: '特勤处制造',
  url: '/static/icons/spanner_nav.svg'
},
{
  id: 4,
  text: '子弹自选',
  url: '/static/icons/bullet_nav.svg'
}
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
const currentWar = reactive({
  nav: navArr[0],
  type: typeArr[0],
  val: valueArr.value[0]
})
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
    if (bot?.schemeType === currentWar.type.name && combot.value[i]?.targetValue === (
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