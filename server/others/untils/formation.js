// 格式化金额
export function formatAmount (amount) {
  return amount.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  });
}

// 格式化日期
export function formatDate (date) {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// 格式化时间
export function formatTime (time) {
  return time.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 格式化时间戳
export function formatTimestamp (timestamp) {
  return new Date(timestamp).toLocaleString('zh-CN');
}

// 格式化百分比
export function formatPercentage (percentage) {
  return `${percentage}%`;
}

// 格式化数字
export function formatNumber (number) {
  return number.toLocaleString('zh-CN');
}

// 格式化金额（保留两位小数）
export function formatAmountTwoDecimal (amount) {
  return amount.toFixed(2);
}
// 格式化金额（保留三位小数）
export function formatAmountThreeDecimal (amount) {
  return amount.toFixed(3);
}
