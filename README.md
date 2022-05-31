<h1 align="center">
    <img alt="Happy" src="web/src/images/logo.svg" width="200px" />
</h1>

<h4 align="center">
  🚀 Next Level Week 3
</h4>


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
- [Expo](https://docs.expo.dev/get-started/installation/)

### Backend
#### No terminal, rodar
```sh
# Entrar na pasta dos arquivos do backend
cd backend

# Renomear env_example.py para env.py
cp setup/env_example.py setup/env.py
# ADICIONE OS VALORES CORRETOS

# Criar um ambiente virtual
python -m venv venv

# Ativar o ambiente virtual
. activate.sh
# ou
. venv/Scripts/activate # windows
. venv/bin/activate # linux

# Instalar os pacotes necessários
pip install -r requirements.txt

# Executar as migrações
python manage.py migrate

# Criar superusuário (poderá fazer login e entrar no admin)
. create_su.sh
# username -> teste
# password -> teste1234

# Start
. run.sh
```


### Frontend
#### No terminal, rodar
```sh
# Entrar na pasta dos arquivos do projeto frontend
cd web

# Renomear .env_example para .env
cp .env_example .env
# ADICIONE OS VALORES CORRETOS

# Instalar os pacotes do projeto
yarn install

# Rodar
yarn start
```


<div align="center">
    <img alt="Screen 1" title="Screen 1" src="images/web_1.png?raw=true" width="400px" />
</div>
<p align="center">Screen 1</p>
<hr>

<div align="center">
    <img alt="Screen 2" title="Screen 2" src="images/web_2.png?raw=true" width="400px" />
</div>
<p align="center">Screen 2</p>
<hr>

<div align="center">
    <img alt="Screen 3" title="Screen 3" src="images/web_3.png?raw=true" width="400px" />
</div>
<p align="center">Screen 3</p>
<hr>


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