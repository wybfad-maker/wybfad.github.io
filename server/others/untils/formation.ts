// 格式化百分比
export function formatPercentage (percentage: number) {
  return `${percentage}%`;
}

// 格式化时间(12小时制)
export function formatTime12 (time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 格式化时间(24小时制)
export function formatTime24 (time: number) {
  return time.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// 格式化时间戳
export function formatTimestamp (timestamp: number, isIntl: boolean = false) {
  if (isIntl) {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date(timestamp));
  }
  return new Date(timestamp).toLocaleString('zh-CN');
}

// 格式化日期
export function formatDate (date: Date, isIntl: boolean = false) {
  if (isIntl) {
    return Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  }
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// 格式化金额（货币格式）(zh-CN)
export function formatAmount (amount: number, decimal: number = 2, isIntl: boolean = false) {
  if (isIntl) {
    return Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    }).format(amount);
  }
  return amount.toLocaleString('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  });
}

// 格式化金额（货币格式）(en-US)
export function formatAmountUS (amount: number, decimal: number = 2, isIntl: boolean = false) {
  if (isIntl) {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    }).format(amount);
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal
  });
}

// 格式化金额（货币格式）(en-GB)
export function formatAmountGB (amount: number) {
  return amount.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP'
  });
}

// 格式化金额（货币格式）(de-DE)
export function formatAmountDE (amount: number) {
  return amount.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });
}

// 格式化金额（保留两位小数）
export function formatAmountTwoDecimal (amount: number) {
  return amount.toFixed(2);
}

// 格式化金额（保留三位小数）
export function formatAmountThreeDecimal (amount: number) {
  return amount.toFixed(3);
}

// 格式化数字
export function formatNumber (number: number) {
  return number.toLocaleString();
}
