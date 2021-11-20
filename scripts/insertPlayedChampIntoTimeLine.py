from pymongo import MongoClient

mongodb_URI = 
client = MongoClient(mongodb_URI)

#db 연결 확인

print(client.list_database_names())
db = client['main']
collectionTL = db['timeline']

timeline_sample = collectionTL.find().limit(4)
matchId = []
cnt = 0
for i in timeline_sample:
    try:
        cnt += 1
        if cnt %1000 == 0:
            print(str(cnt) + ' / 190000 of match data added')
        matchId.append(i['metadata']['matchId'])
    except:
        pass
    
print('adding matchId finished')
    

collectionPC = db['playedChamp']
played = []

cnt = 0
for i in matchId:
    try:
        cnt += 1
        if cnt % 1000 == 0:
            print(str(cnt) + ' / 190000 has finished')
            
        temp = collectionPC.find_one({i:{ '$exists': True}},{'_id': False})
        temp = temp[i]
        updateTarget = collectionTL.update_one({'metadata.matchId':i},{'$addToSet':{"info.playedChamp" : temp}})
    except:
        print('error!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        pass    
    
print('update finished')
    
