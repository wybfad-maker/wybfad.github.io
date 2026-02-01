import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin, urlparse
from urllib.request import urlretrieve

def is_valid_url(url):
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

def get_resources(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # 获取所有图片
    images = [img['src'] for img in soup.find_all('img', src=True)]
    # 获取所有视频（这里假设视频通过<source>标签加载）
    videos = [source['src'] for source in soup.find_all('source', src=True)]

    # 过滤无效URL
    images = [urljoin(url, img) for img in images if is_valid_url(img)]
    videos = [urljoin(url, video) for video in videos if is_valid_url(video)]

    return images, videos

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
    images, videos = get_resources(url)

    print("\n找到的图片资源:")
    for i, img in enumerate(images):
        print(f"{i + 1}. {img}")

    print("\n找到的视频资源:")
    for i, video in enumerate(videos):
        print(f"{i + 1}. {video}")

    image_choice = input("\n请输入要下载的图片编号（多个编号用逗号分隔，例如1,2,3），留空不下载: ")
    video_choice = input("请输入要下载的视频编号（多个编号用逗号分隔，例如1,2,3），留空不下载: ")

    if image_choice:
        image_numbers = [int(num) for num in image_choice.split(',')]
        selected_images = [images[num - 1] for num in image_numbers if 0 < num <= len(images)]
        download_files(selected_images, 'images')

    if video_choice:
        video_numbers = [int(num) for num in video_choice.split(',')]
        selected_videos = [videos[num - 1] for num in video_numbers if 0 < num <= len(videos)]
        download_files(selected_videos, 'videos')

if __name__ == "__main__":
    main()
