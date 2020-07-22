import {
  sanitizeStringWithComma,
  nameCapitalized,
  TemplateComponentReact,
} from '../utils';

export function ReadComponent(options) {
  let createTableArray = [...sanitizeStringWithComma(options.fields)];

  let componentName = options.componentName.toLowerCase() + 's';

  let content = `const [${componentName}, set${nameCapitalized(
    componentName
  )}] = useState("")\n
    
    const get${nameCapitalized(componentName)} = async () => {

        try {
          const query = \`{
            {
              teste
            }
          }\`;
      const { data } = await api.post(
        '/graphql',{
        query,
        headers: { 'content-type': 'application/json' },
        },);
      setUsers([...${componentName}, data.data]);
      } catch (error) {
          console.error(error);
      }
    };
  
    useEffect(() => {
      get${nameCapitalized(componentName)}();
    }, []);\n`;

  content += `return <table className="table"><thead><tr>`;

  createTableArray.map((field) => {
    content += `<th>${field.toUpperCase()}</th>`;
  });

  content += `</tr></thead><tbody>`;

  content += `{(${componentName} || []).map(item => {
      return <tr key={item.id}>`;
  createTableArray.map((field) => {
    content += `<td>{item.${field.toLowerCase()}}</td>`;
  });
  content += `</tr>})}`;

  content += '</tbody></table>';
  return TemplateComponentReact(options, 'Read', content);
}
