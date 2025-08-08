<div align="center">

  <img src="https://github.com/user-attachments/assets/be576345-bd57-43ea-95f8-05970528aac9" alt="logo" width="200" height="auto" />
  <h1>Ponte de Gerações</h1>

  <p>
    Detalhes sobre o front-end do nosso projeto.
  </p>

<p>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/lucasdemattos8/project-ponte_de_geracoes" alt="contributors" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/commits">
    <img src="https://img.shields.io/github/last-commit/lucasdemattos8/project-ponte_de_geracoes" alt="última atualização" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">
    <img src="https://img.shields.io/github/issues/lucasdemattos8/project-ponte_de_geracoes" alt="issues abertas" />
  </a>
  <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/lucasdemattos8/project-ponte_de_geracoes" alt="licença" />
  </a>
</p>

<h4>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/wiki">Documentação</a>
  <span> · </span>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">Reportar Bug</a>
  <span> · </span>
    <a href="https://github.com/lucasdemattos8/project-ponte_de_geracoes/issues/">Solicitar Funcionalidade</a>
  </h4>
</div>

<br />

## :star2: Sobre o Projeto

Este projeto é um desafio para integrar tecnologias modernas de desenvolvimento web. A proposta é construir um **backend** usando **Spring Boot** e **JPA/Hibernate** com persistência em memória e banco de dados PostgreSQL, além de integrar com **Swagger** para documentação da API. O frontend é construído utilizando **React** com **Vite** e **TypeScript** para proporcionar uma interface interativa e dinâmica.

### :camera: Capturas de Tela

<div align="center">
  <img src="https://github.com/user-attachments/assets/c22001b2-f677-46b8-8058-5190c8d2b347"
 alt="captura de tela" />
  <hr>
  <img src="https://github.com/user-attachments/assets/b4b51fbb-8750-46fd-b3b4-9cbdfefcc442"
 alt="captura de tela2" />
</div>

### :desktop_computer: Tecnologias

<details>
  <summary>Front-end</summary>
  <ul>
    <li><a href="https://react.dev/">React</a></li>
    <li><a href="https://react.dev/learn/typescript">TypeScript</a></li>
    <li><a href="https://nodejs.org/pt">Node.js</a></li>
    <li><a href="https://swagger.io/">Swagger</a></li>
    <li><a href="https://moqups.com/">Moqups</a></li>
    
  </ul>
</details>

<details>
  <summary>Ferramentas</summary>
  <ul>
    <li><a href="https://code.visualstudio.com/">VS Code</a></li>
    <li><a href="https://git-scm.com/">Git</a></li>
    <li><a href="https://www.postman.com/">Postman</a></li>
  </ul>
</details>

## :toolbox: Início Rápido

<!-- Pré-requisitos -->
### :exclamation: Pré-requisitos

Certifique-se de ter os seguintes programas instalados:

- Uma IDE de sua preferência. Nós utilizamos o VS Code.
- [Node.js](https://nodejs.org/) (versão 14.18+).
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js).
- Um navegador moderno (como Chrome).

Se você não tem certeza se tem o Node instalado, execute:
`node -v` e `npm -v. Se ambos os comandos retornarem a versão, você está pronto para prosseguir.

### :gear: Instalação

1. Clone o repositório:
```bash
  git clone https://github.com/lucasdemattos8/project-ponte_de_geracoes/
```

2. Acesse o diretório do projeto:
```bash
  cd project-ponte_de_geracoes
```

3. Acesse o diretório do Front-end:
```bash
  cd Front-end
```

4. Instale as dependências do npm:
```bash
  npm install
```

5. Instale as dependências do react + vite
```bash
  npm install vite --save-dev
```

6. Instale as dependências do axios:
```bash
  npm install axios
  npm install --save-dev @types/axio
```

<!-- Rodando Localmente -->
### :running: Rodando Localmente

Inicie o front-end:
```bash
  npm run dev
```
O front rodará em `http://localhost:5173/`, a API estará disponível em `http://localhost:8080` e a documentação do Swagger pode ser acessada em `http://localhost:8080/swagger-ui.html`.

## :eyes: Uso
Este projeto oferece um fluxo básico entre **React** e **Spring Boot** para demonstrar a comunicação entre o frontend e o backend. A API foi documentada utilizando **Swagger**, e o backend oferece endpoints RESTful. A solução pode ser usada como um modelo para projetos semelhantes ou como recurso educativo.

## :wave: Contribuindo

Contribuições são bem-vindas! Por favor, envie uma pull request ou abra uma issue para sugerir melhorias.

---

## 🚀 Melhorias Implementadas

### ✅ Boas Práticas Aplicadas

1. **Modularização de Componentes**
   - Separação de responsabilidades em componentes menores
   - Hooks customizados para lógica de negócio
   - Componentes de formulário reutilizáveis

2. **Gerenciamento de Estado**
   - Context API organizada em arquivos separados
   - Hooks customizados para funcionalidades específicas
   - Estado local otimizado

3. **Tipagem TypeScript**
   - Interfaces centralizadas no diretório `types/`
   - Tipos bem definidos para todas as props e estados
   - Eliminação de tipos `any`

4. **Arquitetura de Serviços**
   - Serviços API centralizados
   - Constantes de configuração organizadas
   - Tratamento de erros padronizado

### 🗂️ Nova Estrutura de Pastas

```
src/
├── components/
│   ├── benefit-card/          # Componentes de benefícios
│   ├── carousel/              # Componente de carrossel
│   ├── form/                  # Componentes de formulário reutilizáveis
│   ├── footer/                # Componente de rodapé
│   ├── header/                # Componente de cabeçalho
│   └── navigation/            # Componentes de navegação
├── constants/                 # Constantes da aplicação
│   ├── api.ts                # URLs e endpoints da API
│   ├── benefits.ts           # Dados dos benefícios
│   └── form.ts               # Constantes de formulários
├── contexts/                  # Contextos React
│   └── UserContext.ts        # Context de usuário
├── hooks/                     # Hooks customizados
│   ├── useHelpers.ts         # Hook para buscar ajudantes
│   ├── useNavigationHelpers.ts # Hook para navegação
│   ├── useFormularioCadastro.ts  # Hook para formulário de registro
│   └── useUser.ts            # Hook para contexto de usuário
├── pages/                     # Páginas da aplicação
├── services/                  # Serviços da aplicação
│   ├── apiService.ts         # Serviço principal da API
│   ├── cepService.ts         # Serviço de consulta de CEP
│   └── registrationService.ts # Serviço de registro
├── types/                     # Tipos TypeScript
│   └── index.ts              # Interfaces centralizadas
└── utils/                     # Utilitários
    ├── UserContext.tsx       # Provider do contexto de usuário
    └── validate-*/           # Utilitários de validação
```

### 🔧 Refatorações Realizadas

#### 1. **Header Component**
- **Antes**: Lógica complexa de navegação embutida no componente
- **Depois**: Separação em componente `NavigationLinks` com hook customizado

#### 2. **HomePage Component**
- **Antes**: Lógica de fetch embutida no componente
- **Depois**: Hook customizado `useHelpers` para gerenciar dados

#### 3. **Context de Usuário**
- **Antes**: Context, Provider e hook no mesmo arquivo
- **Depois**: Separação em arquivos específicos para melhor organização

#### 4. **Serviços de API**
- **Antes**: URLs hardcoded espalhadas pelo código
- **Depois**: Serviço centralizado com tratamento de erros

#### 5. **Componentes de Benefícios**
- **Antes**: Dados hardcoded nos componentes
- **Depois**: Constantes centralizadas reutilizáveis

### 🗑️ Código Morto Removido

- `App.tsx` - Componente não utilizado
- `components/fetch/` - Diretório substituído por serviços

### 📊 Benefícios das Melhorias

1. **Manutenibilidade**: Código mais organizado e fácil de manter
2. **Reutilização**: Componentes e hooks reutilizáveis
3. **Testabilidade**: Lógica separada facilita testes unitários
4. **Performance**: Hooks otimizados e re-renderizações controladas
5. **Escalabilidade**: Estrutura preparada para crescimento
6. **Developer Experience**: Melhor IntelliSense e detecção de erros

### 🔍 Próximos Passos Recomendados

1. Implementar testes unitários para hooks e componentes
2. Adicionar tratamento de loading states globais
3. Implementar lazy loading para componentes de página
4. Adicionar cache para requisições API
5. Implementar internacionalização (i18n)
6. Adicionar validações de formulário em tempo real
7. Implementar Progressive Web App (PWA)

## :handshake: Contato

Vitória de Camargo - [@Linkedin](https://www.linkedin.com/in/vpaesi/)

Link do Projeto: [https://github.com/lucasdemattos8/project-ponte_de_geracoes](https://github.com/lucasdemattos8/project-ponte_de_geracoes)
