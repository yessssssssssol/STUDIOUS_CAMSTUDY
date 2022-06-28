FROM nginx:latest

RUN mkdir ./content
RUN mkdir ./ssl

COPY front/out /content
COPY nginx/ssl /ssl
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]