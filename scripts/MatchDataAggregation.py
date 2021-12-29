from pymongo import MongoClient
from itertools import combinations


mongodb_URI = "mongodb://localhost:27017/"
client = MongoClient(mongodb_URI)

db = client['main']
collection = db['champions']
champ_list = collection.find({},{'id' : 1, '_id' : 0})

#get champion list from db

champions = []
for i in champ_list:
    champions.append(i['id'])

collection_top = db['matchTop']
collection_jungle = db['matchJungle']
collection_mid = db['matchMid']
collection_bot = db['matchBot']
collection_sup = db['matchSup']

collection_top_perk = db['perksTop']
collection_jungle_perk = db['perksJungle']
collection_mid_perk = db['perksMid']
collection_bot_perk = db['perksBot']
collection_sup_perk = db['perksSup']

err_collection = []

#get KDA
# champions
# = ['Aatrox', 'Ahri', 'Akali', 'Akshan', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Aphelios', 'Ashe', 'AurelionSol', 'Azir', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', 'Chogath', 'Corki', 'Darius', 'Diana', 'Draven', 'DrMundo', 'Ekko', 'Elise', 'Evelynn

positions = ['TOP','JUNGLE','MIDDLE','BOTTOM','UTILITY']

collection = db['match']

search_target = list(combinations(champions,2))
my_champions = list(map(lambda x : x[0], search_target))
enemy_champions = list(map(lambda x : x[1], search_target))

total_cnt = 0
for position in positions:
    kda = {}
    perk = {}
    
    for idx in range(len(my_champions)):
        
        try:
            total_cnt += 1
            my_champion = my_champions[idx]
            enemy_champion = enemy_champions[idx]
                    
            print(total_cnt, ' / 12246 has finished')
            print(position,my_champion,'vs',enemy_champion,'is processing..')
            
            if total_cnt % 10 == 0:
                break
    
    
            result = collection.find(
                {    "$and" : [{
                     "info.participants": {
                         '$elemMatch' : {"championName" : my_champion,
                                         'teamPosition' : position}
                         }
                    },
                    {
                        "info.participants": {
                         '$elemMatch' : {"championName" : enemy_champion,
                                         'teamPosition' : position}
                         }
                    }
                    ]},
                {
                     '_id' : False,
                     'info.participants.championName' : True,
                     'info.participants.teamPosition' : True,
                     'info.participants.kills' : True,
                     'info.participants.deaths' : True,
                     'info.participants.assists' : True,
                     'info.participants.champLevel' : True,
                     'info.participants.perks' : True,
                     'info.participants.totalDamageDealtToChampions' : True,
                     'info.participants.win' : True
                 }
                )
            #for cleansing
            # my_data = my_pick, enemy_data = enemy_pick
    
            for res in result:
                for info in res['info']['participants']:
                    if info['championName'] == my_champion:
                        my_data = info
                    elif info['championName'] == enemy_champion:
                        enemy_data = info
                        
                #Data aggregation
                if my_data['win']:
                    win = 1
                    lose = 0
                else:
                    win = 0
                    lose = 1
    
                    #kda,perk dict
                if my_champion not in kda.keys():
                    kda[my_champion] = [{enemy_champion : {'kills' : my_data['kills'],
                                                         'deaths' : my_data['deaths'],
                                                         'assists' : my_data['assists'],
                                                         'cnt' : 1,
                                                         'champLevel' : my_data['champLevel'],
                                                         'totalDamageDealtToChampions' : my_data['totalDamageDealtToChampions'],
                                                         'win' : win}}]
    
    
                    perk[my_champion] = [{enemy_champion : [{
                                                         'perks' : my_data['perks'],
                                                         'win' : win,
                                                         'cnt' : 1}]}]
    
    
                elif enemy_champion not in kda.keys():
                    
                    kda[enemy_champion] = [{my_champion : {'kills' : enemy_data['kills'],
                                                         'deaths' : enemy_data['deaths'],
                                                         'assists' : enemy_data['assists'],
                                                         'cnt' : 1,
                                                         'champLevel' : enemy_data['champLevel'],
                                                         'totalDamageDealtToChampions' : enemy_data['totalDamageDealtToChampions'],
                                                         'win' : not win}}]
                    
    
                    perk[enemy_champion] = [{my_champion : [{
                                                         'perks' : enemy_data['perks'],
                                                         'win' : not win,
                                                         'cnt' : 1}]}]
    
                elif my_champion in kda.keys():
                    now = [list(i.keys())[0]  for i in kda[my_champion]]
                    now_ene = [list(i.keys())[0]  for i in kda[enemy_champion]]
                    
                    if enemy_champion not in now:
                        kda[my_champion].append({enemy_champion : {'kills' : my_data['kills'],
                                                                 'deaths' : my_data['deaths'],
                                                                 'assists' : my_data['assists'],
                                                                 'cnt' : 1,
                                                                 'champLevel' : my_data['champLevel'],
                                                                 'totalDamageDealtToChampions' : my_data['totalDamageDealtToChampions'],
                                                                 'win' : win}})
                        
                        perk[my_champion].append({enemy_champion : {
                                                         'perks' : my_data['perks'],
                                                         'win' : win,
                                                         'cnt' : 1}})
    
                            
                        kda[enemy_champion].append({my_champion : {'kills' : enemy_data['kills'],
                                                                     'deaths' : enemy_data['deaths'],
                                                                     'assists' : enemy_data['assists'],
                                                                     'cnt' : 1,
                                                                     'champLevel' : enemy_data['champLevel'],
                                                                     'totalDamageDealtToChampions' : enemy_data['totalDamageDealtToChampions'],
                                                                     'win' : not win}})
                            
                        perk[enemy_champion].append({my_champion : {
                                                            'perks' : enemy_data['perks'],
                                                            'win' : not win,
                                                            'cnt' : 1}})
    
                        
                    elif enemy_champion in now:
    
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['kills'] += my_data['kills']
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['deaths'] += my_data['deaths']
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['assists'] += my_data['assists']
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['cnt'] += 1
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['champLevel'] += my_data['champLevel']
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['totalDamageDealtToChampions'] += my_data['totalDamageDealtToChampions']
                        kda[my_champion][now.index(enemy_champion)][enemy_champion]['win'] += win
    
    
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['kills'] += enemy_data['kills']
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['deaths'] += enemy_data['deaths']
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['assists'] += enemy_data['assists']
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['cnt'] += 1
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['champLevel'] += enemy_data['champLevel']
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['totalDamageDealtToChampions'] += my_data['totalDamageDealtToChampions']
                        kda[enemy_champion][now_ene.index(my_champion)][my_champion]['win'] += not win
                        
                        #data at the moment
    
                        my_perk_lst = []
                        my_perk_lst += list(my_data['perks']['statPerks'].values())
    
                        #primaryStyle
                        for pri in my_data['perks']['styles'][0]['selections']:
                            my_perk_lst.append(pri['perk'])
    
                        #SubStyle
                        for sub in my_data['perks']['styles'][1]['selections']:
                            my_perk_lst.append(sub['perk'])
    
                        cnt = 0
                        start_idx = list(map(lambda x : list(x.keys())[0], perk[my_champion])).index(enemy_champion)
    
                        for pk in perk[my_champion][start_idx:]:
                            cnt += 1
                            try:                            
                                #preserved data(pk)                            
                                pk_lst = []
                                pk_lst += list(pk[enemy_champion]['perks']['statPerks'].values())
                                #primaryStyle
                                for pri in pk[enemy_champion]['perks']['styles'][0]['selections']:
                                    pk_lst.append(pri['perk'])
                                #SubStyle
                                for sub in pk[enemy_champion]['perks']['styles'][1]['selections']:
                                    pk_lst.append(sub['perk'])
                                
                                length = len(perk[my_champion][start_idx:])
                                
                            except:
                                #preserved data(pk)                            
                                pk_lst = []
                                pk_lst += list(pk[enemy_champion][0]['perks']['statPerks'].values())
                                #primaryStyle
                                for pri in pk[enemy_champion][0]['perks']['styles'][0]['selections']:
                                    pk_lst.append(pri['perk'])
                                #SubStyle
                                for sub in pk[enemy_champion][0]['perks']['styles'][1]['selections']:
                                    pk_lst.append(sub['perk'])
                                
                                length = len(perk[my_champion][start_idx:])
                                
                            if set(my_perk_lst) == set(pk_lst):
                                target_idx = perk[my_champion][start_idx:].index(pk)
                                try:
                                    perk[my_champion][start_idx:][target_idx][enemy_champion]['cnt'] += 1
                                    perk[my_champion][start_idx:][target_idx][enemy_champion]['win'] += win
                                except:
                                    perk[my_champion][start_idx:][target_idx][enemy_champion][0]['cnt'] += 1
                                    perk[my_champion][start_idx:][target_idx][enemy_champion][0]['win'] += win
                                break
                                
                            if cnt == length:
                                perk[my_champion].append({enemy_champion : {
                                                                 'perks' : my_data['perks'],
                                                                 'win' : win,
                                                                 'cnt' : 1}})
                                
    
                        
                        #data at the moment
    
                        enemy_perk_lst = []
                        enemy_perk_lst += list(enemy_data['perks']['statPerks'].values())
    
                        #primaryStyle
                        for pri in enemy_data['perks']['styles'][0]['selections']:
                            enemy_perk_lst.append(pri['perk'])
    
                        #SubStyle
                        for sub in enemy_data['perks']['styles'][1]['selections']:
                            enemy_perk_lst.append(sub['perk'])
    
                        cnt = 0
                        start_idx = list(map(lambda x : list(x.keys())[0], perk[enemy_champion])).index(my_champion)
    
                        for pk in perk[enemy_champion][start_idx:]:
                            cnt += 1
                            try:                            
                                #preserved data(pk)                            
                                pk_lst = []
                                pk_lst += list(pk[my_champion]['perks']['statPerks'].values())
                                #primaryStyle
                                for pri in pk[my_champion]['perks']['styles'][0]['selections']:
                                    pk_lst.append(pri['perk'])
                                #SubStyle
                                for sub in pk[my_champion]['perks']['styles'][1]['selections']:
                                    pk_lst.append(sub['perk'])
                                
                                length = len(perk[enemy_champion][start_idx:])
                                
                            except:
                                #preserved data(pk)                            
                                pk_lst = []
                                pk_lst += list(pk[my_champion][0]['perks']['statPerks'].values())
                                #primaryStyle
                                for pri in pk[my_champion][0]['perks']['styles'][0]['selections']:
                                    pk_lst.append(pri['perk'])
                                #SubStyle
                                for sub in pk[my_champion][0]['perks']['styles'][1]['selections']:
                                    pk_lst.append(sub['perk'])
                                
                                length = len(perk[enemy_champion][start_idx:])
                                
                            if set(enemy_perk_lst) == set(pk_lst):
                                target_idx = perk[enemy_champion][start_idx:].index(pk)
                                try:
                                    perk[enemy_champion][start_idx:][target_idx][my_champion]['cnt'] += 1
                                    perk[enemy_champion][start_idx:][target_idx][my_champion]['win'] += not win
                                except:
                                    perk[enemy_champion][start_idx:][target_idx][my_champion][0]['cnt'] += 1
                                    perk[enemy_champion][start_idx:][target_idx][my_champion][0]['win'] += not win
                                    
                                break
                                
                            if cnt == length:
                                perk[enemy_champion].append({my_champion : {
                                                                 'perks' : enemy_data['perks'],
                                                                 'win' : not win,
                                                                 'cnt' : 1}})
                                
                                
            print(my_champion,'vs',enemy_champion,'is finished!')
        
        except:
            print('error with ',my_champion,'vs',enemy_champion)
            err_collection.append((my_champion,enemy_champion))
            pass


    #Data insert to mongo    
    if position == 'TOP': 
        for i in kda:
            collection_top.insert_one({i:kda[i]})
            collection_top_perk.insert_one({i:perk[i]})
        print('TOP insert finished!')

            
    elif position == 'JUNGLE':
        for i in kda:
            collection_jungle.insert_one({i:kda[i]})
            collection_jungle_perk.insert_one({i:perk[i]})
        print('JG insert finished!')
            
    elif position == 'MIDDLE':
        for i in kda:
            collection_mid.insert_one({i:kda[i]})
            collection_mid_perk.insert_one({i:perk[i]})
        print('MID insert  finished!')
            
    elif position == 'BOTTOM':
        for i in kda:
            collection_bot.insert_one({i:kda[i]})
            collection_bot_perk.insert_one({i:perk[i]})
        print('BOT insert finished!')
            
    else:
        for i in kda:
            collection_sup.insert_one({i:kda[i]})
            collection_sup_perk.insert_one({i:perk[i]})
        print('SUP insert finished!')
