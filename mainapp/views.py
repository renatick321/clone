from django.shortcuts import render
import requests as r
from bs4 import BeautifulSoup
from django.http import HttpResponse



def home_page(request):
	#with open("templates/mainapp/home_page.html", 'w', encoding="utf-8") as f:
		#soup = BeautifulSoup(r.get("https://hyiplogs.com", verify=False).text, "html.parser").find('div', class_='time-line fs12')
		#print(soup)
	#	f.write(str(r.get("https://hyiplogs.com", verify=False).text))
	return render(request, 'mainapp/home_page.html')


def home_reboot(request):
	r2 = r.get("https://hyiplogs.com/d/css/style.css?v=70", verify=False).text
	r1 = r.get("https://hyiplogs.com", verify=False).text
	a, b = map(str, r1.split("</body>"))
	with open("templates/mainapp/home_page.html", 'w', encoding="utf-8") as f:
		f.write(a + '<style type="text/css">' + r2 + '</style>' + b)
	return HttpResponse("Good")