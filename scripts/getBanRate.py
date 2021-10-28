#pip install pymongo

#########################BAN RATE#################################

from pymongo import MongoClient
import collections

mongodb_URI = ""
client = MongoClient(mongodb_URI)

#db 연결 확인

print(client.list_database_names())
db = client['main']


#챔피언 키 불러오기
collection = db['championKeys']
champ_key = collection.find_one({},{'_id' : 0})

#플레이 한 챔피언 목록 추출


collection = db['match']
data = collection.find({},{ '_id' : 0,
                                'info.teams.bans.championId' : 1})

#밴당한 챔피언 list 만들기
banned = []

cnt = 0
for temp in data:
    try:
        cnt +=1     
        temp = temp['info']
        temp = temp['teams']
    
        for team in temp:
            for ban in team['bans']:
                banned.append(str(ban['championId']))
    
        if cnt % 1000 == 0:
            print(str(cnt)+'has finished')
            
    except:
        print(str(cnt) + "error")
        pass

banCount = collections.Counter(banned)

#한 경기 밴 10개 -> 게임수는 약 193994개
len(banned)#1939946
match_num = 193994

#밴율 = 밴당한 횟수 / 게임 수
banRate= {}
for i in list(champ_key.keys()):
    try:
        banRate[champ_key[i]] = round(banCount[i]/match_num * 100,2)
    except:
        print('i')
        pass

#db에 insert
collection = db['banRate']
collection.insert_one(banRate)
