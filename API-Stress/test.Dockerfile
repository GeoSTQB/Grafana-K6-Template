FROM grafana/k6

ARG environment=default

WORKDIR /scripts

COPY . .

ENTRYPOINT []

CMD ["sh", "-c", "k6 run testWithAuthPrecondition.js"]

RUN echo "Building for environment: $environment"

#დაბილდვა იმიჯის უშუალოდ გარემოსთვის 
#docker build --build-arg environment={გარემოს სახელი} -t {იმიჯის დასახელება}:{tag} .

#დოკერის იმიჯის დაბილდვა
#docker build -t {doker_image_name}:tag .   

#CMD ში დოკერი იმიჯში რა სახელიც წერია მაგის გაშვება
#docker run --rm -e environment={გარემოს სახელი} {docker_image_name}:{tag}

#cmd ში რაც არ უნდა გწეროს ნებისმიერი ტესტის გაშვება
#docker run --rm -e environment={გარემოს სახელი} {docker_image_name}:{tag} {ტესტის.ჯს}

#პარალელური ტესტების გამშვები
#ENTRYPOINT []
#CMD ["sh", "-c", "k6 run test.js & k6 run test2.js & wait"]

#ინდივიდუალური ტესტების გამშვები
#ENTRYPOINT ["k6", "run"]
#CMD ["test.js"]