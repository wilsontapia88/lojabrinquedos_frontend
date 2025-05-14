# 🎯 Desafio Loja de Brinquedos – Frontend

## 💻 Frontend – Interface Web (React + Vite)

Este projeto implementa a interface web do sistema de gerenciamento de **clientes** e **vendas** de uma loja de brinquedos. Ele consome a API RESTful construída com Laravel e apresenta uma interface intuitiva com filtros, estatísticas e autenticação.

---

## ✅ Funcionalidades Implementadas

- ✅ Autenticação de usuário com token (via API Laravel Sanctum)  
- ✅ Listagem e visualização de clientes  
- ✅ Listagem e visualização de vendas  
- ✅ Filtros por nome, e-mail e data de venda  
- ✅ Exibição de estatísticas:
  - Top clientes
  - Vendas por dia
  - Ticket médio  
- ✅ Integração com API externa via Axios  
- ✅ UI responsiva e amigável

---

## 🚀 Como Rodar o Frontend

**Pré-requisitos:**  
- Node.js 18+  
- npm ou yarn  

### Passos:

```bash
# Instale as dependências
npm install

#verificar o IP do computador local com onde esta funcionando o laravel 
ipconfig

#configurar a rota de consumo do backend, esta no aquivo environment.tsx
baseurl: 'http://seu-ip-local:9085'

# Rode o projeto em modo desenvolvimento
npm run dev
```

> A aplicação estará disponível por padrão em: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Integração com Backend

O frontend consome os seguintes endpoints da API:

- `POST /api/login` – Login e autenticação  
- `GET /api/clientes` – Listagem de clientes  
- `GET /api/vendas` – Listagem de vendas  
- `GET /api/estatisticas/top-clientes` – Top clientes  
- `GET /api/estatisticas/vendas-por-dia` – Vendas por dia  

Os tokens obtidos após login são enviados automaticamente via **Authorization: Bearer {token}** nas requisições protegidas.

---

## 🧾 Estrutura de Pastas (principais)

```bash
src/
├── components/
│   ├── ClienteList.jsx
│   ├── VendaList.jsx
│   ├── Estatisticas.jsx
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
```

---

## 🧰 Tecnologias Utilizadas

- React  
- Vite  
- Axios  
- React Router DOM  
- Tailwind CSS (opcional)  
- Context API (para autenticação)

---

## 🔒 Autenticação

Após o login, o token recebido da API é armazenado localmente e utilizado em todas as requisições autenticadas.

Exemplo de requisição com token:

```js
 const response = await apiBrinquedos.get('/api/clientes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
```
## 📝 Desafio com Ruidos

Foi ciada uma rota no backend para pegar e normalizar o exemploi que foi encaminhado no
desafio esta sendo consomida na rota:

- `GET /api/teste-clientes` – Rota que trz o exemplo encaminado com ruido  

ele esta sendo tracido e tratado adapters, e juntado a os dados que vem sem ruido para depois aparecer na listagem de clientes

## 📝 Observações

Certifique-se de que o backend esteja rodando corretamente em `http://localhost:9085` ou atualize a URL base no arquivo `src/environment.tsx` conforme necessário.
---