# 💈 ClickBeard - Sistema de Agendamento para Barbearia

Sistema completo para gerenciamento de agendamentos em barbearia, desenvolvido com Node.js, React e PostgreSQL.

Funcionalidades:

Autenticação
- Cadastro e login de clientes
- Autenticação JWT
- E-mail único por usuário

Barbeiros e Especialidades
- Cadastro de barbeiros (nome, idade, data de contratação)
- Cadastro de especialidades (corte, barba, sobrancelha, etc.)
- Associação de múltiplas especialidades por barbeiro

Agendamentos
- Agendamentos das 8h às 18h (30min por atendimento)
- Escolha de especialidade e barbeiro disponível
- Cancelamento até 2 horas antes do horário
- Visualização de agendamentos por cliente
- Dashboard administrativo

Tecnologias

- **Backend:** Node.js, Express, JWT, PostgreSQL
- **Frontend:** React, Context API, CSS Modules
- **Banco:** PostgreSQL
- **Autenticação:** JWT

Pré-requisitos

- Node.js 16+
- PostgreSQL 12+
- npm 

Como Executar

1. Clone o repositório
```bash
git clone https://github.com/Kassiano-Santos/Kassiano-Santos/ClickBeard_Kassiano.git
cd ClickBeard

### Configuração do Ambiente
	1. **Renomeie o arquivo:**
   - Mude `BackEnd/.env.example` para `BackEnd/.env`

	2. **Edite o `BackEnd/.env`:**
   - Coloque SEU usuário e senha do PostgreSQL
	
	# Substitua com suas credenciais PostgreSQL:
		DB_USER=seu_usuario_postgres      # ← Seu usuário do PostgreSQL
		DB_PASSWORD=sua_senha_postgres    # ← Sua senha do PostgreSQL

	# O resto pode manter padrão:
		DB_HOST=localhost
		DB_PORT=5432
		DB_NAME=clickbeard
		PORT=3000
		JWT_SECRET=uma_chave_secreta_forte_aqui
		DATABASE_URL=postgresql://usuario:senha@localhost:5432/clickbeard

### 1. Banco de dados
  O Diagrama Entidade-Relacionamento se encontra no arquivo DiagramaEntidadeRelacionamento.pdf.

  Execucar os scripts na pasta db na ordem:
   delta-001.txt
   delta-002.txt
   delta-003.txt
	 
	Principais Tabelas:
		users - Clientes e administradores
		barbers - Barbeiros cadastrados
		specialties - Especialidades disponíveis
		barber_specialties - Relação barbeiro-especialidade
		appointments - Agendamentos

### 2. Backend (Servidor)
	```bash
	cd BackEnd
	npm install          
	npm run dev    
	Servidor rodando na porta 3000

### 3. Frontend
	```bash
	cd FrontEnd
	npm install
	npm run dev
	# Aplicação: http://localhost:5173
	
Usuários de Teste: 
	Administrador:
		Email: admin@email.com
		Senha: 123456

	Cliente:
		Email: joao@email.com
		Senha: 123456
		(Ou Faça cadastro pela interface)

API Endpoints
	Autenticação
		POST /users/createuser - Cadastro de usuário
		POST /users/login - Login
	
	Usuários
	GET /users - Lista todos os usuários
	
	Barbeiros
		GET /barbers - Listar barbeiros
		POST /barbers/createbarbers - Criar barbeiro
		POST /assocbarbspec/bulk - Associa Barbeiros com Especialidades

	Especialidades
		GET /specialties - Listar especialidades
		POST /specialties/createspecialty - Criar especialidade
		

	Agendamentos
		GET /appointments - Listar agendamentos
		GET /appointments/occupied - Listar agendamentos já agendado de um barbeiro específico 
		POST /appointments/createappoint - Criar agendamento
		POST /appointments/deleteappoint - Cancelar agendamento

Regras de Negócio Implementadas
	Horário de funcionamento: 8h às 18h
	Duração do atendimento: 30 minutos
	Barbeiro não pode ter dois agendamentos no mesmo horário
	Cancelamento permitido até 2 horas antes
	Cliente visualiza apenas seus agendamentos
	Admin visualiza todos os agendamentos
	
Licença
	Este projeto é para fins educacionais.

Desenvolvedor
[Kassiano Santos Macario]

Email: kassiano.santos122@gmail.com

LinkedIn: www.linkedin.com/in/kassiano-santos