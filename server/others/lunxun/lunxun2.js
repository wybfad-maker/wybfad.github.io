// 轮询获取付款结果流程
// 1. 发起付款
// 2. 获取付款结果
// 3. 处理付款结果
// 4. 付款成功/失败
// 一、使用定时器轮询订单查询
// 付款结果
// 0 付款中
// 1 付款成功
// -1 失败
let payResult = 0
let interval = null
let cont = 0
let myRes = null
function getRandomRes () {
  let num = Math.random()
  if (num < 0.8) {
    return 0
  } else if (num >= 0.8 && num < 0.9) {
    return 1
  } else {
    return -1
  }
}
// 得到付款结果
const getPayResult = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      payResult = getRandomRes();
      console.log('payResult', payResult)
      res(payResult)
    }, 1000)
  })
}
// 支付成功逻辑
const paySuccess = (message = '付款完成') => {
  console.log('付款完成 ', message)
}
// 支付失败逻辑
const payError = (message = '付款失败') => {
  console.log('付款失败 ', message)
}
// 付款获取付款结果
const getPayFn = () => {
  console.log('获取付款结果')
  interval && clearInterval(interval)
  cont = 0
  interval = setInterval(async () => {
    if (cont === 5) {
      clearInterval(interval)
      payError()
      return
    } else if (myRes) {
      clearInterval(interval)
      return
    }
    const res = await getPayResult()
    cont++
    console.log(res)
    if (res === 1) {
      myRes = res
      clearInterval(interval)
      paySuccess()
    } else if (res === -1) {
      myRes = res
      clearInterval(interval)
      payError()
    }
  }, 1000)
}
// 下单发起付款
const pay = async () => {
  console.log('发起付款')
  getPayFn()
  // ...
  // let inter = setInterval(()=>{
  //   const res = await getPayResult()
  // },1000)
  // console.log(res)
}
// setTimeout(() => { payResult = 1 }, 3000)
pay()

// 二、使用延时器轮询订单查询
// const POLLING_INTERVAL = 2000; // 轮询间隔2秒
// const MAX_POLLING_TIME = 120000; // 最大轮询时间2分钟
const POLLING_INTERVAL = 1000; // 轮询间隔2秒
const MAX_POLLING_TIME = 20000; // 最大轮询时间2分钟
let pollingCount = 0;
let timer = null
// 付款获取付款结果
function startPollingPayment (orderId, successCallback, failCallback) {
  if (timer) {
    clearTimeout(timer);
  }

  const startTime = Date.now();

  const pollingFunction = async () => {
    // 检查是否超时
    if (Date.now() - startTime > MAX_POLLING_TIME) {
      stopPolling();
      failCallback('支付超时');
      return;
    }
    try {
      const paymentStatus = await checkPaymentStatus(orderId);

      switch (paymentStatus.status) {
        case 'SUCCESS':
          stopPolling();
          successCallback(paymentStatus.data);
          break;
        case 'FAIL':
          stopPolling();
          failCallback(paymentStatus.message || '支付失败');
          break;
        case 'PENDING':
          // 继续轮询
          timer = setTimeout(pollingFunction, POLLING_INTERVAL);
          break;
        default:
          timer = setTimeout(pollingFunction, POLLING_INTERVAL);
      }
    } catch (error) {
      console.error('轮询支付状态失败:', error);
      timer = setTimeout(pollingFunction, POLLING_INTERVAL);
    }

    pollingCount++;
    console.log('pollingCount', pollingCount)
  }
  // 首次执行
  pollingFunction();
}
/**
 * 检查支付状态
 */
function checkPaymentStatus (orderId) {
  let num = Math.random()
  // let res={status:'',data:{},message:''}
  // return { status: 'PENDING', data: {}, message: '继续轮询' }
  if (num < 0.8) {
    return { status: 'PENDING', data: {}, message: '继续轮询' }
  } else if (num >= 0.8 && num < 0.9) {
    return { status: 'SUCCESS', data: {}, message: '支付成功' }
  } else {
    return { status: 'FAIL', data: {}, message: '支付失败' }
  }
  // return res.data.data;
}
/**
 * 停止轮询
 */
function stopPolling () {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  pollingCount = 0;
  console.log('停止轮询')
}

// 下单发起付款
function handlePay () {
  startPollingPayment('1331', paySuccess, payError)
}
// handlePay()