import translations from './zh';

export default function translate(template: string, replacements: Record<string, string>) {
  replacements = replacements || {};

  // Translate
  const temp = translations[template] || template;

  // Replace
  return temp.replace(/{([^}]+)}/g, function (_, key: string) {
    let str = replacements[key];
    if (translations[replacements[key]] !== null && translations[replacements[key]] !== 'undefined') {
      str = translations[replacements[key]];
    }
    return str || '{' + key + '}';
  });
}
