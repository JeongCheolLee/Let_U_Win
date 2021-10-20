from pymongo import MongoClient



mongodb_URI = "<yourid,pw>"
client = MongoClient(mongodb_URI)


#데이터베이스 확인
print(client.list_database_names())
db = client['main']
collection = db['match']



#전체 챔피언 이름 목록
collection = db['champions']
result = collection.find()

champions = []

for champ in result:
    champions.append(champ['id'])


#챔피언의 라인별 승률
collection = db['match']
position = ['TOP','JUNGLE','MIDDLE','BOTTOM','UTILITY']

insert_col = db['winRate']
for champ in champions:
    winRate = {'id' : champ, 
               'total' : {'play' : None, 'win' : None, 'winRate': None} ,
               'top' : {'play' : None, 'win' : None, 'winRate': None, 'enemyWin':{}, 'enemyLose':{}},
               'jungle' : {'play' : None, 'win' : None, 'winRate': None,'enemyWin':{}, 'enemyLose':{}},
               'middle' : {'play' : None, 'win' : None, 'winRate': None,'enemyWin':{}, 'enemyLose':{}},
               'bottom' : {'play' : None, 'win' : None, 'winRate': None,'enemyWin':{}, 'enemyLose':{}},
               'utility' : {'play' : None, 'win' : None, 'winRate': None,'enemyWin':{}, 'enemyLose':{}}
               }
    try:    
        play = collection.count_documents({ "info.participants": { "$elemMatch":{ "championName": champ}}})
        win = collection.count_documents({ "info.participants": { "$elemMatch":{ "championName": champ, "win": True}}})
        
        winRate['total']['play'] = play
        winRate['total']['win'] = win
        winRate['total']['winRate'] = round(win/play,2)
    except:
        winRate['total']['winRate'] = None

    for pos in position:
        try:
            enemies = collection.find({ "info.participants": { "$elemMatch":{ "championName": champ, "teamPosition": pos}}},{
                "_id" : 0,
                "info.participants.teamPosition" : 1,
                "info.participants.championName" : 1,
                "info.participants.win" : 1})
                
            for enemy in enemies:
                idx = position.index(pos)
                participant = enemy['info']['participants']
                    
                if participant[idx]['championName'] == champ and participant[idx]['win']:
                    if participant[idx+5]['championName'] not in winRate[pos.lower()]['enemyWin'].keys():
                        winRate[pos.lower()]['enemyWin'][participant[idx+5]['championName']]= 1
                    else:
                        winRate[pos.lower()]['enemyWin'][participant[idx+5]['championName']] += 1

                elif participant[idx]['championName'] == champ and participant[idx]['win'] == False:
                    if participant[idx+5]['championName'] not in winRate[pos.lower()]['enemyLose'].keys():
                        winRate[pos.lower()]['enemyLose'][participant[idx+5]['championName']] = 1
                    else:
                        winRate[pos.lower()]['enemyLose'][participant[idx+5]['championName']] += 1
                            
                elif participant[idx]['championName'] != champ and participant[idx]['win']:
                    if participant[idx]['championName'] not in winRate[pos.lower()]['enemyLose'].keys():
                        winRate[pos.lower()]['enemyLose'][participant[idx]['championName']] = 1
                    else:
                        winRate[pos.lower()]['enemyLose'][participant[idx]['championName']]+= 1
                        
                elif participant[idx]['championName'] != champ and participant[idx]['win'] == False:
                    if participant[idx]['championName'] not in winRate[pos.lower()]['enemyWin'].keys():
                        winRate[pos.lower()]['enemyWin'][participant[idx]['championName']] = 1
                    else:
                        winRate[pos.lower()]['enemyWin'][participant[idx]['championName']] += 1
                        
            play = collection.count_documents({ "info.participants": { "$elemMatch":{ "championName": champ,"teamPosition": pos}}})
            win = collection.count_documents({ "info.participants": { "$elemMatch":{ "championName": champ,"teamPosition": pos, "win":True}}})
            winRate[pos.lower()]['play'] = play
            winRate[pos.lower()]['win'] = win
            winRate[pos.lower()]['winRate'] = round(win/play,2)
                
        except:
            winRate[pos.lower()]['winRate'] = None
            
    insert_col.insert_one(winRate)
    
                        

