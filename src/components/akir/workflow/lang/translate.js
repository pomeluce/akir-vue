import translations from './zh';

export default function translate(template, replacements) {
  replacements = replacements || {};

  // Translate
  const temp = translations[template] || template;

  // Replace
  return temp.replace(/{([^}]+)}/g, function (_, key) {
    let str = replacements[key];
    if (translations[replacements[key]] !== null && translations[replacements[key]] !== 'undefined') {
      str = translations[replacements[key]];
    }
    return str || '{' + key + '}';
  });
}
