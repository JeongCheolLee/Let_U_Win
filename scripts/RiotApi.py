import requests
from urllib.parse import urlparse



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


https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/hide%20on%20bush?api_key=RGAPI-5274f047-ce83-4884-aed4-61d158c09582

def getPuuid(id_list):
    puuid_list = []
    
    for sum_id in id_list:
        try:
            url = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ sum_id +'?api_key='+api_key
            result = requests.get(urlparse(url).geturl()).json()
            puuid = result['puuid']
            puuid_list.append(puuid)
            
        except:
            pass
        
    return puuid_list


def getMatchId(puuid_list):
    match_id_list = []
    
    for puuid in puuid_list:
        url = 'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/'+ puuid +'/ids?type=ranked&start=0&count=100&api_key='+ api_key
        result = requests.get(urlparse(url).geturl()).json()
        match_id_list.append(result)
        
    match_id_list = sum(match_id_list,[])
    match_id_list = list(set(match_id_list))
    
    return match_id_list


from pymongo import MongoClient

def getMatchData(match_id_list):

    mongodb_URI = "mongodb+srv://<id>:<pw>@master.kxfv4.mongodb.net/test?retryWrites=true&w=majority"
    client = MongoClient(mongodb_URI)
    
    db = client['main']
    collection = db['match']
    
    collection.insert_one(result)
    
    for match_id in match_id_list:
        url = 'https://asia.api.riotgames.com/lol/match/v5/matches/'+ match_id + '?api_key=' + api_key
        result = requests.get(urlparse(url).geturl()).json()
        
    
        


        
    

getChallengerUser()
getGrandmasterUser()
getMasterUser()

        
