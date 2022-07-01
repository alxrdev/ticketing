# Criar as secrets do microsserviço:
  Deve criar o arquivo ".env" dentro da pasta "auth/", com os seguintes paramentros:
  
  ```
  AUTH_DATABASE_USERNAME=
  AUTH_DATABASE_PASSWORD=
  AUTH_DATABASE_HOST=auth-mysql-service
  AUTH_DATABASE=auth
  DATABASE_URL=mysql://DB_USER:DB_PASSWORD@auth-mysql-service:3306/auth
  ```
  
  Depois rodar o comando:

  ```
  kubectl create secret generic auth-credentials --from-env-file ./auth/.env
  ```

# Como gerar as migrations do microserviço:
  Rodar o comando para expor o banco de dados
  
  ```
  kubectl port-forward nome-do-pod-do-mysql 3306:3306 --address 0.0.0.0
  ```

  Configurar a variável de ambiente dentro do arquivo ".env"

  ```
  DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/auth
  ```
  
  Rodar o comando para excutar as migrations

  ```
  npx prisma mgirate dev
  ```
