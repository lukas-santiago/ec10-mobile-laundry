# Aplicativo de Lavanderia

Este é um projeto de um aplicativo de lavanderia, desenvolvido com um backend Node.js e um frontend Expo (React Native). O aplicativo permite que os usuários realizem pedidos de serviços de lavanderia, acompanhem o status de seus pedidos e recebam notificações relevantes.

## Backend

### Tecnologias Utilizadas
- Node.js
- PostgreSQL (Banco de Dados)
- JWT (Autenticação)

### Configuração

1. **Instalação de Dependências:**
   ```bash
   cd backend
   npm install
   ```

2. **Configuração do Banco de Dados:**
   - Crie um banco de dados PostgreSQL.
   - Atualize as configurações de conexão no arquivo `backend/config/database.js`.

3. **Execução do Backend:**
   ```bash
   npm start
   ```

O backend estará disponível em [http://localhost:3000](http://localhost:3000).

## App Mobile (Expo, React Native)

### Tecnologias Utilizadas
- Expo
- React Native

### Configuração

1. **Instalação de Dependências:**
   ```bash
   cd mobile
   npm install
   ```

2. **Configuração do Backend:**
   - Atualize a URL da API no arquivo `mobile/services/api.js` para apontar para o backend.

3. **Execução do App Mobile:**
   ```bash
   npm start
   ```

   Siga as instruções do Expo para visualizar o aplicativo no emulador ou dispositivo físico.

### Funcionalidades Principais

- **Tela de Login:**
  - Autenticação de usuários.
  - Cadastro de novos usuários.

- **Área Administrativa:**
  - Gerenciamento de serviços de lavanderia.
  - Acompanhamento de pedidos.

- **Dashboards e Gráficos:**
  - Exibição de estatísticas relevantes.

- **Sistema de Notificação:**
  - Alertas sobre o status dos pedidos.

### Estrutura do Projeto

- **backend/:**
  - Lógica de controle, modelos, rotas e configurações.

- **mobile/:**
  - Telas, componentes, navegação, serviços e utilitários.

### Observações

- Certifique-se de ter o Node.js e o PostgreSQL instalados localmente.
- Personalize o esquema do banco de dados conforme necessário.
- Consulte a documentação específica de cada diretório para mais detalhes.

---

Esse README.md serve como um guia básico para configurar e executar o projeto. Certifique-se de adaptar as instruções conforme necessário para atender às especificidades do seu ambiente de desenvolvimento.