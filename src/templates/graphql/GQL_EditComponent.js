import {
  sanitizeStringWithComma,
  nameCapitalized,
  TemplateComponentReact,
} from './utils';

export function CreateComponentEdit(options) {
  let createTableArray = [...sanitizeStringWithComma(options.fields)];

  let componentName = options.componentName.toLowerCase();

  let content = '';

  createTableArray.map((field) => {
    content += `const [${field}, set${nameCapitalized(
      field
    )}] = useState("")\n`;
  });

  content += `
const get${nameCapitalized(componentName)} = async (ev) => {
  const { data } = await api.get(
    '/${componentName}/INPUT_ID_FROM_${componentName.toUpperCase()}_HERE',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });`;

  createTableArray.map((field) => {
    content += `set${nameCapitalized(field)}(data.${field.toLowerCase()})\n`;
  });

  content += `console.log(data); // Data
  ev.preventDefault();
};

useEffect(() => {
  get${nameCapitalized(componentName)}();
}, []);
`;

  content += `\nconst onSubmit = async (ev) => {
    const { data } = await api.put(
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

  content += '</form></>';
  return TemplateComponentReact(options, 'Edit', content);
}
