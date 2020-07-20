import chalk from 'chalk';
import fs from 'fs';
import { FolderServices, FileConfigApi } from './templates/utils';
import { CreateComponentRead } from './templates/ReadComponent';
import { CreateComponentCreate } from './templates/CreateComponent';
import { CreateComponentEdit } from './templates/EditComponent';

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

  fs.exists(`${servicesDir}/axios.js`, function (exists) {
    if (!exists) {
      fs.writeFile(
        `${servicesDir}/axios.js`,
        FolderServices(),
        { flag: 'wx' },
        function (err) {
          if (err) throw err;
          console.log(
            '%s O arquivo axios.js foi criado na pasta services.',
            chalk.green.bold('SUCCESS')
          );
        }
      );
    }
  });

  fs.exists(`${servicesDir}/config.js`, function (exists) {
    if (!exists) {
      fs.writeFile(
        `${servicesDir}/config.js`,
        FileConfigApi(),
        { flag: 'wx' },
        function (err) {
          if (err) throw err;
          console.log(
            '%s O arquivo config.js foi criado na pasta services.',
            chalk.green.bold('SUCCESS')
          );
        }
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

  switch (options.selectCrudOption) {
    case 'all':
      fs.writeFile(
        `${fileName}Read.js`,
        CreateComponentRead(options),
        function (err) {
          if (err) throw err;
          console.log(
            '%s O componente ' +
              `${dirComponentNameWithFileName}Read.js` +
              ' foi criado.',
            chalk.green.bold('SUCCESS')
          );
        }
      );

      fs.writeFile(
        `${fileName}Create.js`,
        CreateComponentCreate(options),
        function (err) {
          if (err) throw err;
          console.log(
            `%s O componente ${dirComponentNameWithFileName}Create.js foi criado.`,
            chalk.green.bold('SUCCESS')
          );
        }
      );

      fs.writeFile(
        `${fileName}Edit.js`,
        CreateComponentEdit(options),
        function (err) {
          if (err) throw err;
          console.log(
            `%s O componente ${dirComponentNameWithFileName}Edit.js foi criado.`,
            chalk.green.bold('SUCCESS')
          );
        }
      );
      break;
    case 'create':
      fs.writeFile(
        `${fileName}Create.js`,
        CreateComponentCreate(options),
        function (err) {
          if (err) throw err;
          console.log(
            `%s O componente ${dirComponentNameWithFileName}Create.js foi criado.`,
            chalk.green.bold('SUCCESS')
          );
        }
      );

      break;
    case 'read':
    case 'delete':
      fs.writeFile(
        `${fileName}Read.js`,
        CreateComponentRead(options),
        function (err) {
          if (err) throw err;
          console.log(
            `%s O componente ${dirComponentNameWithFileName} foi criado.`,
            chalk.green.bold('SUCCESS')
          );
        }
      );
      break;
    case 'update':
      fs.writeFile(
        `${fileName}Edit.js`,
        CreateComponentEdit(options),
        function (err) {
          if (err) throw err;
          console.log(
            `%s O componente ${dirComponentNameWithFileName} foi criado.`,
            chalk.green.bold('SUCCESS')
          );
        }
      );
      break;
    default:
      break;
  }

  return true;
}
