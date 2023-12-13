 <h1 align="center">Trazler</h1> 

<p align="center">
<img src="https://img.shields.io/badge/Next.js-Framework-000000?style=for-the-badge&logo=nextdotjs&logoColor=%23000000&color=%23000000"/>
<img src="https://img.shields.io/static/v1?label=Vercel&message=deploy&color=black&style=for-the-badge&logo=vercel&logoColor=%23000000"/>
<img src="https://img.shields.io/badge/typescript-linguagem-fff?style=for-the-badge&logo=typescript&logoColor=%233178C6&color=%233178C6"/>
<img src="https://img.shields.io/badge/Tailwind-Estilo-fff?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4&color=%2306B6D4"/>
<img src="https://img.shields.io/badge/Zod-Valida%C3%A7%C3%A3o-fff?style=for-the-badge&logo=zod&logoColor=%233E67B1&color=%233E67B1"/>
</p>

 ## Descrição do projeto 

- Projeto desenvolvido com o framework [***Next.js***](https://nextjs.org/), utilizando [***React***](https://react.dev/) e [***TypeScript***](https://www.typescriptlang.org/) para a matéria de Frontend Jamstack com Next, da [***Pós-Graduação em Desenvolvimento Web Full Stack***](https://posgraduacao.infnet.edu.br/ead/pos-graduacao-desenvolvimento-web-full-stack/) da [***Infnet***](https://www.infnet.edu.br/infnet/home/).

- O projeto consiste de um blog de destinos de viagem com nome fictício de [***Trazler***](https://infnet-projeto-jamstack-next.vercel.app/), com artigos escritos na liguagem de marcação [***.mdx***](https://mdxjs.com/), formulário para inscrição em lista de notificação (*fictícia*), área de login/cadastro e sistema de comentários em post para usuários autenticados.

- Utiliza recursos do [***Google Firebase***](https://firebase.google.com) para cadastro | autenticação de usuários e [***Google Firestore***](https://firebase.google.com/docs/firestore) para armazenamento dos dados.

- Layout responsivo criado com metodologia ***mobile-first*** utilizando [***TailwindCSS***](https://tailwindcss.com/)

- Utiliza pipeline de deploy automático na [***Vercel***](https://vercel.com/) em conjunto com o [***GitHub***](https://github.com/)

## Deploy da aplicação
[Link Trazler na Vercel](https://infnet-projeto-jamstack-next.vercel.app/)

## Teste de Performance do LightHouse
<!-- ![resultado teste de performance](./assets/lighthouse-performance-test.png) -->
<p align="center">
<img src="./assets/lighthouse-performance-test.png" width="520px"/>
</p>

## Instalação do Projeto
### Projeto desenvolvido com Next.js versão 14.

### Requerimentos
[Node.js](https://nodejs.org/en)

### Instalação das dependências
```bash
npm install --legacy-peer-deps
```

### Executar servidor de desenvolvimento
```bash
npm run dev 
```

### Executar build e iniciar servidor de produção
```bash
npm run build
npm run serve 
```