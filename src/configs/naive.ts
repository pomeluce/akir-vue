import { GlobalThemeOverrides } from 'naive-ui';

const baseBgColor = { light: '#ffffff', dark: '#232324' };

export const themeOverrides: { light: GlobalThemeOverrides; dark: GlobalThemeOverrides } = {
  light: {
    common: {
      primaryColor: '#0066ff',
      primaryColorHover: '#008cff',
      primaryColorPressed: '#005Ae0',
      primaryColorSuppl: '#008cff',
      infoColor: '#34495e',
      infoColorHover: '#44586c',
      infoColorPressed: '#263747',
      infoColorSuppl: '#44586c',
      cardColor: baseBgColor.light,
    },
    Layout: {
      color: baseBgColor.light + '00',
      siderColor: baseBgColor.light,
      headerColor: baseBgColor.light,
    },
  },
  dark: {
    common: {
      primaryColor: '#57A9FB',
      primaryColorHover: '#3491FA',
      primaryColorPressed: '#4080FF',
      primaryColorSuppl: '#3491FA',
      infoColor: '#86909c',
      infoColorHover: '#6b7785',
      infoColorPressed: '#a9aeb8',
      infoColorSuppl: '#6b7785',
      cardColor: baseBgColor.dark,
    },
    Layout: {
      color: baseBgColor.dark + '00',
      siderColor: baseBgColor.dark,
      headerColor: baseBgColor.dark,
    },
  },
};
