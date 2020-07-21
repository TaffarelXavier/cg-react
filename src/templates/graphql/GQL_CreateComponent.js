import {
  sanitizeStringWithComma,
  nameCapitalized,
  TemplateComponentReact,
} from '../utils';

export function CreateComponent(options) {
  let createTableArray = [...sanitizeStringWithComma(options.fields)];

  let content = '';

  createTableArray.map((field) => {
    content += `const [${field}, set${nameCapitalized(
      field
    )}] = useState("")\n`;
  });

  content += `\nconst onSubmit = async (ev) => {
  
  const { data } = await api.post("/graphql", {
  query: \`mutation {
      save(`;

  content += createTableArray
    .map((field) => {
      return field.trim() + ':${' + field.trim() + '}';
    })
    .join(',');

  content += `)\n{`;
  content += createTableArray
    .map((field) => {
      return field.trim();
    })
    .join(', ');
  content += `
}}\`,\n},{
  headers: {
    'Content-Type': 'application/json',
  },
}).then().catch()\n`;

  content += `ev.preventDefault();
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
  return TemplateComponentReact(options, 'Create', content);
}
