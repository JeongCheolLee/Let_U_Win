FROM node:12
# 앱 디렉터리 생성 다음으로 이미지 안에 애플리케이션 코드를 
#넣기 위해 디렉터리를 생성할 것입니다. 
#이 디렉터리가 애플리케이션의 작업 디렉터리가 됩니다.
WORKDIR /app/backend


COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "main.js" ]
