const userID = 'cheolphone-hocom';
const userPW = 'dlghwjd60!';
const dbName = 'main';

module.exports = {
  mongoURI: `mongodb+srv://${userID}:${userPW}@master.kxfv4.mongodb.net/${dbName}?retryWrites=true&w=majority`,
};
