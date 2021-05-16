<h1 align="center">
    <img alt="Happy" title="#delicinha" src="web/src/images/logo.svg" width="200px" />
</h1>

<h4 align="center">
  🚀 Next Level Week 3
</h4>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>
</p>

## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Django](https://www.djangoproject.com/)
- [Django-Rest-Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

## 💻 Projeto
### Instalação
#### Para o backend, é necessário ter o Python instalado em sua máquina. De preferência 3.6 para cima.
No terminal, rodar:
```sh
cd backend_django
python -m venv venv
. venv/Scripts/activate
pip install -r requirements.txt
python manage.py runserver SEU_IPV4
```
Repectivamente:
- Para entrar na pasta dos arquivos do backend
- Criar um ambiente virtual
- Ativar o ambiente virtual
- Instalar todos os pacotes necessários para rodar a aplicação
- Rodar API

Depois:
- Abrir e renomear env_example.py para env.py

##### Esse SEU_IPV4 é seu IPv4 encontrado no terminal com ipconfig/all. Necessário para o seu pc servir os dados da API para os dispostivos da sua rede.
Deixe o runserver rodando, ele é a API que fornecerá as informações
![API 0](/images/api_0.png?raw=true)

![API 1](/images/api_1.png?raw=true)
![API 2](/images/api_2.png?raw=true)

![API 3](/images/api_3.png?raw=true)

#### Para o frontend é necessário ter o node e o yarn instalados na máquina
No terminal, rodar:
```sh
cd web
yarn start
```
Repectivamente:
- Para entrar na pasta dos arquivos do frontend
- Instalar os pacotes do projeto e rodar

Depois:
- Abrir api.ts e adicionar o endereço da sua API

![Web 1](/images/web_1.png?raw=true)

![Web 2](/images/web_2.png?raw=true)

![Web 3](/images/web_3.png?raw=true)

#### Para o mobile é preciso ter o node, yarn e expo instalados na máquina e ter o expo instalado no celular
Fica melhor rodar no celular para não comer a memória do pc com emulador
No terminal, rodar:
```sh
cd mobile
expo start
```

Repectivamente:
- Para entrar na pasta com os arquivos do mobile
- Instalar pacotes do projeto e rodar

Depois:
- Abrir api.ts e adicionar o endereço da sua API

![Mobile 1](/images/mobile_1.png?raw=true)