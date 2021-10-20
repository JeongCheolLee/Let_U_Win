from pymongo import MongoClient

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)



#데이터베이스 확인
#print(client.list_database_names())
db = client['main']
#collection = db['match']


#챔피언 이름 - 키 매칭
collection = db['champions']
result = collection.find()

champKey = {}

for champ in result:
    champKey[champ['key']] = champ['id']

champKey = dict(sorted(champKey.items()))


collection = db['championKeys']
collection.insert_one(champKey)
