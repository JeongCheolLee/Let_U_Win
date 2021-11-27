from pymongo import MongoClient

mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

#데이터베이스 확인
#print(client.list_database_names())
db = client['main']
#collection = db['match']

#챔피언 리스트 불러오기
collection = db['championKeys']
result = collection.find_one()
champ_list = list(result.values())[1:]
champ_list.sort()


collection_match = db['match']

kda_dict = {}

championName = 'Nasus'
for championName in champ_list:
    deaths = 0
    kills = 0
    assists = 0
    kda = 0
    totalData = collection_match.find({'info.participants.championName' : ''+championName + ''},{"info.participants.$": 1})
    for data in totalData:
        deaths += data['info']['participants'][0]['deaths']
        kills += data['info']['participants'][0]['kills']
        assists += data['info']['participants'][0]['assists']
        try:
            kda = (kills + assists)/deaths
        except:
            kda = '통계 없음'
    kda_dict[championName] = kda
    print(championName + ' added')


collection = db['kda']
collection.insert_one(kda_dict)
        
