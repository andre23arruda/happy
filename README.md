<h1 align="center">
    <img alt="Happy" src="web/src/images/logo.svg" width="200px" />
</h1>

<h4 align="center">
  🚀 Next Level Week 3
</h4>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>
</p>


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Django](https://www.djangoproject.com/)
- [Django-Rest-Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

## 💻 Projeto
**Happy é uma aplicação feita para listar casas de acolhimento de crianças e jovens em sua cidade. Exibindo horários de visita e instruções.**

## Instalação
### Pré requisitos
Ter instalado:
- [Python](https://www.python.org/downloads/)
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

### Backend
#### Primeiro: renomear arquivo com variáveis de ambiente
-  **Renomear _backend/setup/env_example.py_ para _backend/setup/env.py_**

#### Segundo: no terminal, rodar
```sh
# Entrar na pasta dos arquivos do backend
cd backend

# Renomear env_example.py para env.py
cp setup/env_example.py setup/env.py

# Criar um ambiente virtual
python -m venv venv

# Ativar o ambiente virtual
. venv/Scripts/activate
# ou . venv/bin/activate
# ou source venv/Scripts/activate

# Instalar os pacotes necessários
pip install -r requirements.txt

# Executar as migrações
python manage.py migrate

# Criar superusuário (poderá fazer login e entrar no admin)
. create_su.sh
# username -> teste
# password -> teste1234

# Start
python runserver.py
```

![API 0](/images/api_0.png?raw=true)


### Frontend
#### Primeiro: alterar a chave do mapbox
-  **Renomear _web/.env_example para _web/.env_**

#### Segundo: no terminal, rodar
```sh
# Entrar na pasta dos arquivos do projeto frontend
cd web

# Instalar os pacotes do projeto
yarn install

# Rodar
yarn start
```

![Web 1](/images/web_1.png?raw=true)

![Web 2](/images/web_2.png?raw=true)

![Web 3](/images/web_3.png?raw=true)

### Mobile
#### No terminal, rodar
```sh
# Entrar na pasta dos arquivos do projeto mobile
cd mobile

# Instalar os pacotes do projeto
yarn install

# Rodar
expo start
```

#### Terceiro: rodar expo no celular
- Abrir expo no celular
- Ler QR code e executar o app

![Mobile 1](/images/mobile_1.png?raw=true)