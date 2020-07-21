import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createComponent } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--all': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    componentName: args._[0],
    ...args,
  };
}

async function promptForMissingOptions(options) {
  if (options.skipPrompts) {
    return {
      ...options,
    };
  }

  const questions = [];

  if (!options.componentName) {
    questions.push({
      type: 'input',
      name: 'componentName',
      message:
        chalk.red.bold('1/5') + ' - Por favor, digite o nome do componente: ',
      default: 'User',
    });
  }

  if (!options.type) {
    questions.push({
      type: 'list',
      name: 'type',
      choices: ['controller'],
      message: chalk.red.bold('2/5') + ' - Escolha o tipo: ',
      default: 'controller',
    });
  }

  if (!options.fields) {
    questions.push({
      type: 'input',
      name: 'fields',
      message:
        chalk.red.bold('3/5') +
        ' - Digite os campos separados por ponto e vírgula: ',
      default: 'firstname; email; phone; password',
    });
  }

  if (!options.isCrudAll) {
    questions.push({
      type: 'list',
      name: 'isCrudAll',
      choices: ['all', 'create', 'read', 'update'],
      message:
        chalk.red.bold('4/5') +
        ' - Selecione uma das opções de crud. Selecione' +
        chalk.cyan.bold(' all ') +
        'para criar o CRUD completo: ',
      default: 'all',
    });
  }

  if (!options.typeApi) {
    questions.push({
      type: 'list',
      name: 'typeApi',
      choices: ['rest', 'graphql'],
      message: chalk.red.bold('5/5') + ' - Selecione a estrutura da API: ',
      default: 'graphql',
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    componentName: options.componentName || answers.componentName,
    type: options.type || answers.type,
    fields: options.fields || answers.fields,
    selectCrudOption: options.isCrudAll || answers.isCrudAll,
    typeApi: options.typeApi || answers.typeApi,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  createComponent(options);
}
