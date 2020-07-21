import {
  sanitizeStringWithComma,
  nameCapitalized,
  TemplateComponentReact,
} from './utils';

export function CreateComponentCreate(options) {
  let createTableArray = [...sanitizeStringWithComma(options.fields)];

  // let componentName = options.componentName.toLowerCase() + 's';

  let content = '';

  createTableArray.map((field) => {
    content += `const [${field}, set${nameCapitalized(
      field
    )}] = useState("")\n`;
  });

  content += `\nconst onSubmit = async (ev) => {
    const { data } = await api.post(
      '/users',
      {`;

  content += createTableArray
    .map((field) => {
      return field.trim();
    })
    .join(',');
    
  content += ` },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    );
    console.log(data); // Data
    ev.preventDefault();
    };\n\n`;

  content += `return <>
  <form onSubmit={onSubmit}>`;

  let increment = 1;

  createTableArray.map((field) => {
    content += `<div>
    <label htmlFor="${field.toLowerCase() + '_' + increment}">${nameCapitalized(
      field.toLowerCase()
    )}</label>
    <input name="${field.toLowerCase()}" id="${
      field.toLowerCase() + '_' + increment
    }" value={${field.toLowerCase()}} onChange={({ target }) => {
      set${nameCapitalized(field.toLowerCase())}(target.value);
    }} /></div>`;
  });

  content += '<button className="" type="submit">Salvar</button></form></>';
  return TemplateComponentReact(options, 'Create', content);
}
