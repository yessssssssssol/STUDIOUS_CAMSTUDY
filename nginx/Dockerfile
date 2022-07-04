FROM nginx:latest

RUN mkdir ./ssl

COPY nginx/ssl /ssl
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

