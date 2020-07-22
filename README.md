# __Gerador de CRUD para React JS - Cliente__

__Este é um pacote simples de código aberto para criar CRUD para React JS__

# Características
- Automatização de operações crud
- Ganho em produtividade;
- Crie um crud completo;
- Crie partes do crud separadamente;
- Uso interativo das bibliotecas `Chalk, inquirer e esm`;
- Desenvolvido utilizando ES6.

# Motivação
Não sei vocês, mas, para mim, umas das coisas mais chatas em programação é criar um crud completo do zero, principalmente, na questão de update, porque exige que façamos a busca e, somente depois, a atualização. Ou seja, temos que fazer uma requisição buscando os dados e, em seguida, fazer outra requisição para a atualização, usando, geralmente, formulários.

Eu percebi que eu não estava tendo muita produtividade, porque sempre me perdia muito temo no __U__, do CRUD. Sempre o deixava para a última hora. E, sinceramente, eu já programo há muito tempo (não sou um *expert* da programação), mas sempre me empanco nisso.

Foi pensando nisso, que veio ao meu pensando a ideia de criar uma *CLI* capaz de resolver esse problema para mim. A sua usabilidade é muito simples, porque uso o inquirer para interação de usuário com o terminal em 5 passos somente.

# __Vamos lá!__

# Sistemas Operacionais suportados testados.
- Windows
- Linux

# Os formatos das requisições podem ser em:
 - GraphQL
 - Rest

# Como utilizar

Instale:

```sh
$ npm i cg-react
```

__Para criar um crud, por exemplo, denominado User, com os campos: *nome, idade, senha, email e celular*, siga estes passos:__

Na raiz do projeto React Js, execute o comando:

```sh
$ cg-react
```

- Na opção __1/6__, digite: __User__
- Na opção __2/6__, escolha: __controller__
- Na opção __3/6__, digite os campos separados por ponto e vírgula, assim: __nome; idade; senha; email; celular__
- Na opção __4/6__, escolha: __all__
- Na opção __5/6__, escolha: __rest__
- Na opção __6/6__, escolha: __criar arquivos na pasta components__

Existem duas opções de saída:
- Criação dos componentes na pasta `components`
- Cópia para a área de transferência

![A saída final no terminal](https://github.com/TaffarelXavier/crud-generator-node-graphql-and-rest-api/raw/master/assets/crud-generator-node.png)


> Ao finalizar, serão criada duas pastas caso não existam:
- components
- services


![A saída final no terminal](https://github.com/TaffarelXavier/crud-generator-node-graphql-and-rest-api/raw/master/assets/imagem_dois.png)

# Conteúdos dos componentes criados:

> ## UserCreate

``` javascript
import React, { useState, useEffect } from 'react';
import api from '../../services/axios';

const UserCreate = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const onSubmit = async (ev) => {
    const { data } = await api.post(
      '/users',
      { nome, idade, senha, email, celular },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(data); // Data
    ev.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="nome_1">Nome</label>
          <input
            name="nome"
            id="nome_1"
            value={nome}
            onChange={({ target }) => {
              setNome(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="idade_1">Idade</label>
          <input
            name="idade"
            id="idade_1"
            value={idade}
            onChange={({ target }) => {
              setIdade(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="senha_1">Senha</label>
          <input
            name="senha"
            id="senha_1"
            value={senha}
            onChange={({ target }) => {
              setSenha(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email_1">Email</label>
          <input
            name="email"
            id="email_1"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="celular_1">Celular</label>
          <input
            name="celular"
            id="celular_1"
            value={celular}
            onChange={({ target }) => {
              setCelular(target.value);
            }}
          />
        </div>
        <button className="" type="submit">
          Salvar
        </button>
      </form>
    </>
  );
};

export default UserCreate;
```
> ## UserEdit

``` javascript
import React, { useState, useEffect } from 'react';
import api from '../../services/axios';

const UserEdit = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');

  const getUser = async (ev) => {
    const { data } = await api.get('/user/INPUT_ID_FROM_USER_HERE', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setNome(data.nome);
    setIdade(data.idade);
    setSenha(data.senha);
    setEmail(data.email);
    setCelular(data.celular);
    console.log(data); // Data
    ev.preventDefault();
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit = async (ev) => {
    const { data } = await api.put(
      '/users',
      { nome, idade, senha, email, celular },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(data); // Data
    ev.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="nome_1">Nome</label>
          <input
            name="nome"
            id="nome_1"
            value={nome}
            onChange={({ target }) => {
              setNome(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="idade_1">Idade</label>
          <input
            name="idade"
            id="idade_1"
            value={idade}
            onChange={({ target }) => {
              setIdade(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="senha_1">Senha</label>
          <input
            name="senha"
            id="senha_1"
            value={senha}
            onChange={({ target }) => {
              setSenha(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email_1">Email</label>
          <input
            name="email"
            id="email_1"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="celular_1">Celular</label>
          <input
            name="celular"
            id="celular_1"
            value={celular}
            onChange={({ target }) => {
              setCelular(target.value);
            }}
          />
        </div>
        <button className="" type="submit">
          Salvar alterações
        </button>
      </form>
    </>
  );
};

export default UserEdit;
```
> ## UserRead

``` javascript
import React, { useState, useEffect } from 'react';
import api from '../../services/axios';

const UserRead = () => {
  const [users, setUsers] = useState('');

  const getUsers = async () => {
    const { data } = await api.get('/users');
    setUsers([...users, data]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>NOME</th>
          <th>IDADE</th>
          <th>SENHA</th>
          <th>EMAIL</th>
          <th>CELULAR</th>
        </tr>
      </thead>
      <tbody>
        {(users || []).map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.senha}</td>
              <td>{item.email}</td>
              <td>{item.celular}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserRead;
```


## A estrutura final é esta:


```
raíz do projeto:
├── components/                 # A pasta components, onde os componentes ficarão
|   ├── User/                   # O novo componente criado
|   |   ├── UserCreate.js/      # O arquivo para criar
|   |   ├── UserEdit.js/        # O arquivo para editar
|   |   └── UserRead.js         # O arquivo para listagem
├── services/ 
|   ├── api.js/                 # O arquivo axios
|   └── config.js               # Arquivo de configuração do sistema.
└── ...
```
> Não se esqueça de dá aquele velho shift+alt+f em cada arquivo gerado para formatá-lo.

A estrutura acima pode ser realocada de acordo com as suas necessidades.

Você tem liberdade para brincar com o pacote, fique à vontade.

## __Seja um contribuidor deste projeto ❤️.__

