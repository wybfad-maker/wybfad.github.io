import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin, urlparse
from urllib.request import urlretrieve
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

def is_valid_url(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

def get_static_resources(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # 获取所有图片
    images = [img['src'] for img in soup.find_all('img', src=True)]
    # 获取所有视频（这里假设视频通过<source>标签加载）
    videos = [source['src'] for source in soup.find_all('source', src=True)]
    # 获取所有音乐（这里假设音乐通过<audio><source>标签加载）
    audios = [source['src'] for audio in soup.find_all('audio') for source in audio.find_all('source', src=True)]

    # 过滤无效URL
    images = [urljoin(url, img) for img in images if is_valid_url(img)]
    videos = [urljoin(url, video) for video in videos if is_valid_url(video)]
    audios = [urljoin(url, audio) for audio in audios if is_valid_url(audio)]

    return images, videos, audios

def get_dynamic_resources(url):
    # 设置Chrome选项
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 无头模式
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")

    # 初始化WebDriver
    service = Service('path/to/chromedriver')  # 替换为你的chromedriver路径
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        # 打开网页
        driver.get(url)
        time.sleep(5)  # 等待页面加载完成

        # 解析页面
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        # 获取所有图片
        images = [img['src'] for img in soup.find_all('img', src=True)]
        # 获取所有视频（这里假设视频通过<source>标签加载）
        videos = [source['src'] for source in soup.find_all('source', src=True)]
        # 获取所有音乐（这里假设音乐通过<audio><source>标签加载）
        audios = [source['src'] for audio in soup.find_all('audio') for source in audio.find_all('source', src=True)]

        # 过滤无效URL
        images = [urljoin(url, img) for img in images if is_valid_url(img)]
        videos = [urljoin(url, video) for video in videos if is_valid_url(video)]
        audios = [urljoin(url, audio) for audio in audios if is_valid_url(audio)]

    finally:
        # 关闭WebDriver
        driver.quit()

    return images, videos, audios

def download_files(urls, folder_name):
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

    for url in urls:
        try:
            file_name = url.split('/')[-1]
            file_path = os.path.join(folder_name, file_name)
            urlretrieve(url, file_path)
            print(f"已下载: {file_name}")
        except Exception as e:
            print(f"下载失败: {url}, 错误: {e}")

def main():
    url = input("请输入目标网页URL: ")

    print("选择资源获取方式:")
    print("1. 获取静态资源")
    print("2. 获取动态加载的资源")
    resource_choice = input("请输入选项编号 (1 或 2): ")

    if resource_choice == '1':
        images, videos, audios = get_static_resources(url)
    elif resource_choice == '2':
        images, videos, audios = get_dynamic_resources(url)
    else:
        print("无效的选择, 退出程序.")
        return

    # 打印找到的图片资源
    print("\n找到的图片资源:")
    for i, img in enumerate(images):
        print(f"{i + 1}. {img}")

    # 打印找到的视频资源
    print("\n找到的视频资源:")
    for i, video in enumerate(videos):
        print(f"{i + 1}. {video}")

    # 打印找到的音频资源
    print("\n找到的音频资源:")
    for i, audio in enumerate(audios):
        print(f"{i + 1}. {audio}")

    # 用户选择下载图片
    image_choice = input("\n请输入要下载的图片编号（多个编号用逗号分隔，例如1,2,3），留空不下载: ")
    if image_choice:
        image_numbers = [int(num) for num in image_choice.split(',')]
        selected_images = [images[num - 1] for num in image_numbers if 0 < num <= len(images)]
        download_files(selected_images, 'images')

    # 用户选择下载视频
    video_choice = input("请输入要下载的视频编号（多个编号用逗号分隔，例如1,2,3），留空不下载: ")
    if video_choice:
        video_numbers = [int(num) for num in video_choice.split(',')]
        selected_videos = [videos[num - 1] for num in video_numbers if 0 < num <= len(videos)]
        download_files(selected_videos, 'videos')

    # 用户选择下载音频
    audio_choice = input("请输入要下载的音频编号（多个编号用逗号分隔，例如1,2,3），留空不下载: ")
    if audio_choice:
        audio_numbers = [int(num) for num in audio_choice.split(',')]
        selected_audios = [audios[num - 1] for num in audio_numbers if 0 < num <= len(audios)]
        download_files(selected_audios, 'audios')

if __name__ == "__main__":
    main()
