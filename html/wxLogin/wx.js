// wyb.js
class Wyb {
  constructor() {
    this.isLoggedIn = false;
    this.userInfo = null;
  }

  login (options) {
    return new Promise((resolve, reject) => {
      // 模拟登录过程
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% 成功率

        if (success) {
          const loginRes = {
            code: 'mock_login_code_' + Date.now(),
            message: '登录成功'
          };

          if (options && options.success) {
            options.success(loginRes);
          }
          resolve(loginRes);
        } else {
          const err = {
            errCode: 'LOGIN_FAILED',
            errMsg: '登录失败'
          };

          if (options && options.fail) {
            options.fail(err);
          }
          reject(err);
        }
      }, 500);
    });
  }

  logout (options) {
    return new Promise((resolve, reject) => {
      // 模拟登出过程
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% 成功率

        if (success) {
          const res = {
            message: '登出成功'
          };

          if (options && options.success) {
            options.success(res);
          }
          resolve(res);
        } else {
          const err = {
            errCode: 'LOGOUT_FAILED',
            errMsg: '登出失败'
          };

          if (options && options.fail) {
            options.fail(err);
          }
          reject(err);
        }
      }, 300);
    });
  }

  getUserInfo (options) {
    return new Promise((resolve, reject) => {
      // 模拟获取用户信息
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% 成功率

        if (success) {
          const res = {
            userInfo: {
              nickName: '测试用户',
              // avatarUrl: 'https://example.com/avatar.jpg',
              avatarUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
              gender: 1,
              country: '中国',
              province: '北京',
              city: '北京'
            }
          };

          if (options && options.success) {
            options.success(res);
          }
          resolve(res);
        } else {
          const err = {
            errCode: 'GET_USER_INFO_FAILED',
            errMsg: '获取用户信息失败'
          };

          if (options && options.fail) {
            options.fail(err);
          }
          reject(err);
        }
      }, 400);
    });
  }
}

// 创建全局实例
const wyb = new Wyb();

// 如果是浏览器环境，挂载到 window 对象
if (typeof window !== 'undefined') {
  window.wyb = wyb;
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = wyb;
}