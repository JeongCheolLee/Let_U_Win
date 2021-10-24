import requests
from urllib.parse import urlparse
from pymongo import MongoClient

url = "http://ddragon.leagueoflegends.com/cdn/11.21.1/data/ko_KR/champion.json"
result = requests.get(urlparse(url).geturl()).json()

type(result['data'])

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

db = client['main']
collection = db['champions']

# list 로 만들기

final = []

for i in list(result['data']):
    final.append(result['data'][i])

collection.insert_many(final)
