/*
以下是一个模拟重发起支付到查询支付的轮询全过程的 JavaScript 脚本。
该脚本模拟了以下场景：

支付失败 → 重发起支付
支付成功 → 停止轮询
支付失败 / 超时 → 持续轮询直到超时或支付成功
支付状态查询 → 每隔 3 秒查询一次支付状态
本脚本使用 setTimeout 模拟支付状态，实际使用时应替换为真实 API 调用。

✅ 脚本功能说明：

模拟支付失败后重发起支付
每 3 秒轮询一次支付状态
支付成功则停止轮询
支付失败 / 超时则继续轮询或报错
支持自定义超时时间（默认 30 秒）
*/

// 模拟支付状态：0=未支付，1=支付成功，2=支付失败，3=支付超时
const PAY_STATUS_NOT_PAID = 0;
const PAY_STATUS_SUCCESS = 1;
const PAY_STATUS_FAIL = 2;
const PAY_STATUS_TIMEOUT = 3;

// 模拟支付结果：true 为成功，false 为失败
const simulatePayment = () => {
  // 80% 成功，20% 失败（模拟真实场景）
  const successRate = Math.random();
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(successRate > 0.2)
    }, 1000); // 模拟支付时间
  }); // 80% 成功
};

// 模拟支付状态查询
const simulateQueryPaymentStatus = (paymentId) => {
  const status = Math.floor(Math.random() * 4);
  // 模拟状态
  return new Promise((res, rej) => {
    if (status === PAY_STATUS_SUCCESS) {
      return res({ status: PAY_STATUS_SUCCESS, message: "支付成功" });
    } else if (status === PAY_STATUS_FAIL) {
      return res({ status: PAY_STATUS_FAIL, message: "支付失败" });
    } else if (status === PAY_STATUS_TIMEOUT) {
      return res({ status: PAY_STATUS_TIMEOUT, message: "支付超时" });
    } else {
      // 未支付
      return res({ status: PAY_STATUS_NOT_PAID, message: "支付未完成" });
    }
  })
};

// 轮询函数
const pollPaymentStatus = (paymentId, timeoutSeconds = 30) => {
  const interval = 3000; // 3秒轮询一次
  const maxRetries = Math.floor(timeoutSeconds / 3) + 1; // 估算最大重试次数

  let retries = 0;

  const poll = () => {
    retries++;

    if (retries > maxRetries) {
      console.warn(`支付超时，已重试 ${retries} 次，超过 ${timeoutSeconds} 秒`);
      return;
    }

    console.log(`第 ${retries} 次轮询支付状态...`);

    // 模拟查询支付状态
    simulateQueryPaymentStatus(paymentId).then(result => {
      if (result.status === PAY_STATUS_SUCCESS) {
        console.log(`🎉 支付成功！${result.message}`);
        clearInterval(pollInterval); // 停止轮询
      } else if (result.status === PAY_STATUS_FAIL) {
        console.warn(`⚠️ 支付失败：${result.message}`);
        // 可选：重发起支付
        console.log("🔄 重发起支付...");
        // 重发起支付逻辑（可替换为真实调用）
        simulatePayment().then(success => {
          if (success) {
            console.log("✅ 重发起支付成功！");
            // 可选：再次轮询
            poll(); // 重新轮询
          } else {
            console.error("❌ 重发起支付失败！");
            clearInterval(pollInterval);
          }
        }).catch(err => {
          console.error("❌ 重发起支付异常：", err);
          clearInterval(pollInterval);
        });
      } else if (result.status === PAY_STATUS_NOT_PAID) {
        // 未支付，继续轮询
        setTimeout(poll, interval);
      } else if (result.status === PAY_STATUS_TIMEOUT) {
        console.warn(`⏳ 支付超时：${result.message}`);
        clearInterval(pollInterval);
      }
    }).catch(err => {
      console.error("❌ 查询支付状态失败：", err);
      clearInterval(pollInterval);
    });
  };

  // 启动轮询
  const pollInterval = setInterval(poll, interval);

  // 手动触发第一次轮询
  poll();
};

// 重发起支付的模拟函数
const reinitiatePayment = (paymentId) => {
  console.log("🔁 重发起支付...");
  const success = simulatePayment();
  if (success) {
    console.log("✅ 重发起支付成功！");
    return true;
  } else {
    console.error("❌ 重发起支付失败！");
    return false;
  }
};

// 主流程：模拟支付失败 → 重发起 → 轮询
const main = () => {
  const paymentId = "PAY123456"; // 模拟支付单号
  const timeoutSeconds = 30; // 超时时间（秒）

  console.log("🚀 开始模拟支付流程...");

  // 模拟首次支付失败
  const firstPaymentSuccess = simulatePayment();
  if (!firstPaymentSuccess) {
    console.warn("⚠️ 首次支付失败，将重发起支付...");
    // 重发起支付
    reinitiatePayment(paymentId);
  }

  // 启动轮询
  pollPaymentStatus(paymentId, timeoutSeconds);
};

// 执行主流程
main();
