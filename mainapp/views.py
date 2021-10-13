from django.shortcuts import render
import requests as r
from bs4 import BeautifulSoup
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json



def home_page(request):
	#with open("templates/mainapp/home_page.html", 'w', encoding="utf-8") as f:
		#soup = BeautifulSoup(r.get("https://hyiplogs.com", verify=False).text, "html.parser").find('div', class_='time-line fs12')
		#print(soup)
	#	f.write(str(r.get("https://hyiplogs.com", verify=False).text))
	with open("static_files/data.json", "r") as f:
	    data = json.load(f)
	print(data.values())
	for i in data:
		print(i)
	data['first_today'] = data['col1'][0]
	data['col1'] = data['col1'][1:]
	data['first_yesterday'] = data['col2'][0]
	data['col2'] = data['col2'][1:]
	return render(request, 'mainapp/home_page.html', data)


@csrf_exempt
def home_reboot(request):
	#text = request.POST.dict()['text']
	soup = BeautifulSoup(r.get("https://hyiplogs.com", verify=False).text, "html.parser")
	all_data = {}
	data = []

	columns = soup.find('div', class_='time-line fs12').find_all('div', class_='col')
	for col in columns:
		elements = col.find_all("a", class_='item')
		for elem in elements[:20]:
			num = elem.find("div", class_='fl num').text.replace(".", '')
			name = elem.find("div", class_='fl name').text
			amount = elem.find("div", class_='fr').text
			data.append({"num": num, "name": name, "amount": amount})
		all_data[f'col{columns.index(col)+1}'] = data
		data = []

	#print(soup.find_all('div', class_='row mt15')[2])
	columns = soup.find_all('div', class_='row mt15')[2].find_all('div', class_='col-xs-12')
	print(len(columns))
	for col in columns:
		#print(col)
		elements = col.find_all("div", class_='item')
		for elem in elements:
			link = elem.find("a", class_='fs13 tdu lh14 sd-link')['href']
			second_link = elem.find("a", class_='fs13 tdu lh14 sd-link').text
			name = elem.find("div", class_='fw700 fs14 t-up lh14').text
			#date = elem.find("div", class_='laad-date').text
			data.append({"link": link, "second_link": second_link, "name": name})
		all_data[f'info{columns.index(col)+1}'] = data
		data = []

	with open("static_files/data.json", "w") as f:
	    json.dump(all_data, f)

	#with open("/home/renatick321/clone/templates/mainapp/parsing_page.html", 'w', encoding="utf-8") as f:
#		f.write(text)
		#data = {"chat_id": 705853549, "text": text[:100:]}
		#r.post("https://api.telegram.org/bot1886738087:AAGUPPqs2Ipkpo5HyzLZsoPwwUFIAnoPg6w/sendMessage", data=data)
	return HttpResponse("Good")