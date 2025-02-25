# Teste Frontend V4

## Visão Geral

Este projeto utiliza **Vue 3** com **Nuxt 3**, desenvolvido com **TypeScript** e estilizado com **Vuetify v3**. O objetivo desta escolha é fornecer uma aplicação moderna e com grande desempenho.

Para a API do mapa foi utilizado o Leaflet como módulo do Nuxt ([Documentação do Módulo do Leaflet](https://leaflet.nuxtjs.org/)).

Além disso foi utilizado o Pinia para gerenciamento de estado.

Foi implementado o linter para formatação e padronização do código.

## Estrutura do Projeto
```
├── components/      # Componentes Vue reutilizáveis
├── composables/     # Funções reutilizáveis (composables API)
├── layouts/         # Layouts globais da aplicação
├── pages/           # Páginas da aplicação
├── plugins/         # Plugins Vue/Nuxt (ex: Axios, Vuetify)
├── public/          # Servir os ativos estáticos
├── store/           # Gerenciamento de estado (Pinia)
├── server/          # Registrar manipuladores de API e um servidor
├── utils/           # Funções auxiliares
├── nuxt.config.ts   # Configurações do Nuxt
├── eslint.config.js # Configurações do Lint
├── package.json     # Dependências e scripts
└── tsconfig.json    # Configuração do TypeScript
```

## Configuração e Instalação
1. Instale as dependências:
  ```sh
   npm install
   #ou
   yarn install
  ```
2. Inicie o servidor de desenvolvimento:
  ```sh
   npm run dev
   # ou
   yarn dev
  ```

## Build e Deploy
Para gerar a versão de produção:
```sh
npm run build
```
Para rodar o projeto em modo de produção:
```sh
npm run start
```

## Detalhes do Nuxt

Para mais detalhes: [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction)