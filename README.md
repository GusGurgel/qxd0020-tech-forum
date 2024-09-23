# Tech Forum

Um forum online de tecnologia

Para executar este projeto siga os passos descritos no arquivo [passo-a-passo](passo-a-passo.md)

## Membros da equipe

Gustavo Gurgel Medeiros, 539226, Ciência da Computação

## Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## Entidades ou tabelas do sistema

- Usuário (User)
- Resposta (Response)
- Tópico (Thread)
- Conjunto (ThreadSet)

## Principais funcionalidades da aplicação

- Todos os Usuários

  - Podem ver todos os conjuntos de tópicos e respostas de tópicos

- Usuários registrados

  - Criar tópicos
  - Responder tópicos

- Adiministradores
  - Fixar tópicos
  - Excluir tópicos
  - Criar novos conjuntos
  - Banir usuários
  - Mover tópico de um conjunto para outro

## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS v3.0, Vue-Router e Pinia.
- Axios

**Backend:**

- Strapi

## Operações implementadas para cada entidade da aplicação

| Entidade | Criação | Leitura | Atualização | Remoção |
| -------- | ------- | ------- | ----------- | ------- |
| Usuário  | X       | X       | X           |         |
| Tópico   | X       | X       | X           | X       |
| Resposta | X       | X       |             | X       |
| Conjunto | X       | X       | X           | X       |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

Boa parte das rotas utilizada está na pasta `Back_End_Requests\`