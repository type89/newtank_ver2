import netifaces
import re
import subprocess, sys

file_name = "/home/pi/work/webiopi/rctank.html"

with open(file_name, encoding="utf-8") as f:
    data_lines = f.read()

PiAd = netifaces.ifaddresses('wlan0')[netifaces.AF_INET][0]['addr']
#PiAd = netifaces.ifaddresses('wlp3s0')[netifaces.AF_INET][0]['addr']

#print('Piad ==> ' + PiAd)

data_lines = re.sub(r'192.168.*:8080', str(PiAd) + ":8080", data_lines)
#print(data_lines)
# 同じファイル名で保存
with open(file_name, mode="w", encoding="utf-8") as f:
    f.write(data_lines)

subprocess.run("sudo systemctl restart webiopi", shell=True)