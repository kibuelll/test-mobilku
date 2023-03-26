FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install --production
ENV PORT=4002
ENV NODE_ENV=production
ENV DATABASE_URL=
EXPOSE 3001
CMD ["npm", "run", "start"]