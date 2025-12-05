export const openfile = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = file.name;
      a.click();
    };
  }
}
export const openWinfileImg0 = (file) => {
  const file = await window.showOpenFilePicker();
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    const img = new Image();
    img.src = fileReader.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = file.name;
      a.click();
    };
  }
}
// 图片转为base64格式（异步）（推荐）（成功）
export const openWinfileImg1 = () => {
  // 打开窗口选择指定类型文件
  const files = await window.showOpenFilePicker({
    type: 'open-file',
    accepts: [
      {
        description: 'Images',
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico'],
      },
    ],
  });
  if (files) {
    const fileHandle = files[0];
    // 图片转为base64格式
    const fileBlob = await fileHandle.getFile();
    // 输出文件内容text
    // const file = await fileBlob.text();
    // console.log('file', file);
    // 创建读取器读取base64格式图片文件内容
    const fileReader = new FileReader();
    // 读取文件内容作为url数据链接
    fileReader.readAsDataURL(fileBlob);
    fileReader.onload = (e) => {
      userInfoFrom.value.avatar = e.target.result;
    };
  }
}
export const openfileInput = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    openfile(file);
  });
  fileInput.click();
  fileReader.readAsDataURL(file);
  fileReader.onload = (e) => {
    userInfoFrom.value.avatar = e.target.result;
  };
}