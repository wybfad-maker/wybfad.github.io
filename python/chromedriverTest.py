from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
 
# 初始化浏览器
driver = webdriver.Chrome()
driver.get("https://www.baidu.com/")
 
# 等待搜索框可见并输入
search_box = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'kw'))
)
search_box.send_keys('小那同学')
 
# 等待搜索按钮可点击并点击
search_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, 'su'))
)
search_button.click()
 
# 等待搜索结果加载
sleep(3)
 
# 关闭浏览器
driver.close()