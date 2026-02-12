# 🛠️ MVP — Sistema de Gestão de Projetos com Análise Preditiva

## 🎯 Objetivo

Desenvolver um MVP funcional e simples para gestão de projetos com análise preditiva básica, utilizando regras estatísticas simples e dados históricos para prever prazos, esforço e risco.

---

## 🧱 Stack Tecnológica

### Front-end
- `HTML5`
- `CSS3`
- `JavaScript ES6`
- `FullCalendar.js` (opcional para visualização de cronograma)

### Back-end
- `Python`
- `FastAPI` (estrutura de rotas REST)
- `MySQL` (armazenamento dos dados)

---

## 🗃️ Estrutura do Banco de Dados

### Tabela: `projetos`
| Campo            | Tipo        | Descrição                          |
|------------------|-------------|------------------------------------|
| id               | INT (PK)    | Identificador do projeto           |
| nome             | VARCHAR     | Nome do projeto                    |
| data_inicio      | DATE        | Data de início                     |
| data_fim_prevista| DATE        | Previsão de término                |
| data_fim_real    | DATE        | Data real de término               |
| status           | VARCHAR     | Status atual                       |
| custo_estimado   | FLOAT       | Custo previsto                     |
| custo_real       | FLOAT       | Custo final                        |

### Tabela: `tarefas`
| Campo           | Tipo        | Descrição                                 |
|------------------|-------------|--------------------------------------------|
| id               | INT (PK)    | Identificador da tarefa                    |
| projeto_id       | INT (FK)    | Relacionamento com tabela `projetos`      |
| nome             | VARCHAR     | Nome da tarefa                            |
| responsavel      | VARCHAR     | Nome do responsável                       |
| estimativa_horas | FLOAT       | Estimativa em horas                       |
| horas_reais      | FLOAT       | Horas reais trabalhadas                   |
| status           | VARCHAR     | Status da tarefa                          |

---

## ✅ Funcionalidades do MVP

### 📌 Cadastro de Projetos
- CRUD completo (`GET`, `POST`, `PUT`, `DELETE`)

### 📝 Cadastro de Tarefas
- Relacionadas ao projeto
- CRUD completo

---

## 📊 Funcionalidades Preditivas (Simples e Estatísticas)

### ⏱️ Cálculo Automático de Duração Média
- Baseado em média de duração dos últimos projetos semelhantes.

### 📉 Previsão de Prazo (Básica)
- Exemplo de Regra:
  - Se tarefas concluídas estão **20% acima** da estimativa → prever **atraso proporcional**
  - Técnica: média, regra de três ou **regressão linear simples (em JS)**

### ⏳ Estimativa de Esforço
- Média de horas de tarefas com mesmo nome ou tipo.

### 📈 Gráficos
- Progresso planejado **vs** progresso real
- Custo estimado **vs** custo real

### ⚠️ Indicador de Risco
- Regras:
  - `> 15%` da estimativa de horas → **risco médio**
  - `> 30%` → **risco alto**

---

## 🔍 Análise Preditiva Simples

### Técnicas Utilizadas
- Média histórica
- Desvio percentual
- Regressão linear simples
- Detecção de tendência de atraso

### Exemplo:
```text
Projeto 1: atraso de 10%
Projeto 2: atraso de 15%
Projeto 3: atraso de 20%
➡ Tendência crescente → alerta de risco alto
