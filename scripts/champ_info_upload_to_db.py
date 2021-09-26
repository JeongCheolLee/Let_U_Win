import json
from pymongo import MongoClient

#pip install dnspython
#pip install pymongo

with open("c:/data/champion.json", encoding= 'UTF8') as jsonFile:
    jsonObject = json.load(jsonFile)
    jsonFile.close()

mongodb_URI = "mongodb+srv://cheolphone-cheolcom:dlemr132!@master.kxfv4.mongodb.net/champions?retryWrites=true&w=majority"
client = MongoClient(mongodb_URI)

#데이터베이스 확인
print(client.list_database_names())

db = client['champions']
collection = db['champions']


# list 로 만들기

final = []

for i in list(jsonObject['data']):
    final.append(jsonObject['data'][i])


collection.insert_many(final)
