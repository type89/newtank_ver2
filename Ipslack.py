import slackweb
import netifaces

PiAd = netifaces.ifaddresses('wlan0')[netifaces.AF_INET][0]['addr']

IPslack=slackweb.Slack(url="webhookのURL")

IPslack.notify(text="http://" + PiAd + ":8000", username="Newtank console")
