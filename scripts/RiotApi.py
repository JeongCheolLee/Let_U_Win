import requests
from urllib.parse import urlparse
import time


def getChallengerUser():
    url = 'https://kr.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key='+api_key
    result = requests.get(urlparse(url).geturl()).json()
    
    target = result['entries']
    
    user = []
    for t in target:
        user.append(t['summonerName'])
        
    return user

def getGrandmasterUser():
    url = 'https://kr.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5?api_key='+api_key
    result = requests.get(urlparse(url).geturl()).json()
    
    target = result['entries']
    
    user = []
    for t in target:
        user.append(t['summonerName'])
        
    return user

def getMasterUser():
    url = 'https://kr.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5?api_key='+api_key
    result = requests.get(urlparse(url).geturl()).json()
    
    target = result['entries']
    
    user = []
    for t in target:
        user.append(t['summonerName'])
        
    return user


def getPuuid(id_list):
    puuid_list = []
    err_list = []
    
    cnt = 0
    length = str(len(id_list))
    for sum_id in id_list:
        try:
            cnt += 1
            url = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ sum_id +'?api_key='+api_key
            result = requests.get(urlparse(url).geturl())
            
            while result.status_code == 429: ## wait untill rate limit ended
                result = requests.get(urlparse(url).geturl())
                time.sleep(5)
                print("waiting.. because of rate limit")
                
            puuid = result.json()['puuid']
            puuid_list.append(puuid)
            print(str(cnt) + " /" + length + " finished")
            
        except:
            time.sleep(30)
            print("waiting for 30sec")
            pass
        
        
    return puuid_list


def getMatchId(puuid_list):
    match_id_list = []
    
    cnt = 0
    length = str(len(puuid_list))
    for puuid in puuid_list:
        try:
            cnt += 1            
            url = 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/'+ puuid +'/ids?type=ranked&start=0&count=100&api_key='+ api_key
            result = requests.get(urlparse(url).geturl())
            
            while result.status_code == 429: ## wait untill rate limit ended
                result = requests.get(urlparse(url).geturl())
                time.sleep(5)
                print("waiting.. because of rate limit")
                
            match_id_list.append(result.json())
                
            print(str(cnt) + " /" + length + " finished")
                
        except:
            print("waiting for 30sec")
            time.sleep(30)
            print("wrong with " + puuid)
            pass
        
    match_id_list = sum(match_id_list,[])
    match_id_list = list(set(match_id_list))
    
    return match_id_list


from pymongo import MongoClient

def getMatchData(match_id_list):

    mongodb_URI = "mongodb://localhost:27017/"
    client = MongoClient(mongodb_URI)
    
    db = client['main']
    collection = db['match']
    
    cnt = 0
    length = str(len(match_id_list))
    
    for match_id in match_id_list:
        cnt += 1
        
        try:
            url = 'https://asia.api.riotgames.com/lol/match/v5/matches/'+ match_id + '?api_key=' + api_key
            result = requests.get(urlparse(url).geturl())
            
            while result.status_code == 429: ## wait untill rate limit ended
                result = requests.get(urlparse(url).geturl())
                time.sleep(5)
                print("waiting.. because of rate limit")
                
            collection.insert_one(result.json())
            print(str(cnt) + " /" + length + " added")
        except:
            time.sleep(30)
            print("waiting for 30sec")
            pass
        
        
    return print("finished!")     



def getMatchTimeLineData(match_id_list):

    mongodb_URI = "mongodb://localhost:27017/"
    client = MongoClient(mongodb_URI)
    
    db = client['main']
    collection = db['timeline']
    
    cnt = 0
    length = str(len(match_id_list))
    
    for match_id in match_id_list:
        cnt += 1
        try:
            url = 'https://asia.api.riotgames.com/lol/match/v5/matches/'+ match_id + '/timeline?api_key=' + api_key
            result = requests.get(urlparse(url).geturl())
            
            while result.status_code == 429: ## wait untill rate limit ended
                result = requests.get(urlparse(url).geturl())
                time.sleep(5)
                print("waiting.. because of rate limit")
                
            collection.insert_one(result.json())
            print(str(cnt) + " /" + length + " added")
        except:
            time.sleep(30)
            print("waiting for 30sec")
            pass
        
        
    return print("finished!")    



chal = getChallengerUser()
puuid = getPuuid(chal)
matchId = getMatchId(puuid)
getMatchData(matchId)
getMatchTimeLineData(matchId)


