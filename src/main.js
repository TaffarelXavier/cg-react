import chalk from 'chalk';
import fs from 'fs';
import { FolderServices, FileConfigApi, createFile } from './templates/utils';

import { CreateComponentRead } from './templates/ReadComponent';
import { CreateComponentCreate } from './templates/CreateComponent';
import { CreateComponentEdit } from './templates/EditComponent';

import {
  CreateComponent,
  EditComponent,
  ReadComponent,
} from './templates/graphql/index';

function createDirEqualsComponentName(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (error) {
    console.log(
      '% Houve um erro ao tentar criar o diretório' + error.toString(),
      chalk.red.bold('ERROR:')
    );
  }
}

function criarPastaServices() {
  let servicesDir = process.cwd() + '/services';

  createDirEqualsComponentName(servicesDir); //Cria a pasta services

  fs.exists(`${servicesDir}/axios.jsx`, function (exists) {
    if (!exists) {
      createFile(
        `${servicesDir}/axios.jsx`,
        FolderServices(),
        '%s O arquivo axios.jsx foi criado na pasta services.'
      );
    }
  });

  fs.exists(`${servicesDir}/config.jsx`, function (exists) {
    if (!exists) {
      createFile(
        `${servicesDir}/config.jsx`,
        FileConfigApi(),
        '%s O arquivo config.jsx foi criado na pasta services.'
      );
    }
  });
}

export async function createComponent(options) {
  let componentName = options.componentName;

  let dirComponentNameWithFileName =
    '/components/' + componentName + '/' + componentName;

  let componentsDir = process.cwd() + '/components/';

  criarPastaServices();

  createDirEqualsComponentName(componentsDir); // Cria a pasta components

  // Cria a pasta com o mesmo nome do componente dentro da pasta 'components'
  createDirEqualsComponentName(componentsDir + componentName);

  let fileName = `${componentsDir}${componentName}/${componentName}`;

  if (options.typeApi == 'rest') {
    switch (options.selectCrudOption) {
      case 'all':
        createFile(
          `${fileName}Read.jsx`,
          CreateComponentRead(options),
          '%s O componente ' +
            `${dirComponentNameWithFileName}Read.jsx` +
            ' foi criado.'
        );
        createFile(
          `${fileName}Create.jsx`,
          CreateComponentCreate(options),
          `%s O componente ${dirComponentNameWithFileName}Create.jsx foi criado.`
        );
        createFile(
          `${fileName}Edit.jsx`,
          CreateComponentEdit(options),
          `%s O componente ${dirComponentNameWithFileName}Edit.jsx foi criado.`
        );
        break;
      case 'create':
        createFile(
          `${fileName}Create.jsx`,
          CreateComponentCreate(options),
          `%s O componente ${dirComponentNameWithFileName}Create.jsx foi criado.`
        );
        break;
      case 'read':
        createFile(
          `${fileName}Read.jsx`,
          CreateComponentRead(options),
          '%s O componente ' +
            `${dirComponentNameWithFileName}Read.jsx` +
            ' foi criado.'
        );
        break;
      case 'update':
        createFile(
          `${fileName}Edit.jsx`,
          CreateComponentEdit(options),
          `%s O componente ${dirComponentNameWithFileName}Edit.jsx foi criado.`
        );
        break;
      default:
        break;
    }
  } else if (options.typeApi == 'graphql') {
    switch (options.selectCrudOption) {
      case 'all':
        createFile(
          `${fileName}Read.jsx`,
          ReadComponent(options),
          '%s O componente ' +
            `${dirComponentNameWithFileName}Read.jsx` +
            ' foi criado.'
        );
        createFile(
          `${fileName}Create.jsx`,
          CreateComponent(options),
          `%s O componente ${dirComponentNameWithFileName}Create.jsx foi criado.`
        );
        createFile(
          `${fileName}Edit.jsx`,
          EditComponent(options),
          `%s O componente ${dirComponentNameWithFileName}Edit.jsx foi criado.`
        );
        break;
      case 'create':
        createFile(
          `${fileName}Create.jsx`,
          CreateComponent(options),
          `%s O componente ${dirComponentNameWithFileName}Create.jsx foi criado.`
        );
        break;
      case 'read':
        createFile(
          `${fileName}Read.jsx`,
          ReadComponent(options),
          '%s O componente ' +
            `${dirComponentNameWithFileName}Read.jsx` +
            ' foi criado.'
        );
        break;
      case 'update':
        createFile(
          `${fileName}Edit.jsx`,
          EditComponent(options),
          `%s O componente ${dirComponentNameWithFileName}Edit.jsx foi criado.`
        );
        break;
      default:
        break;
    }
  }
  return true;
}
