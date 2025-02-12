import AutoImport from 'unplugin-auto-import/vite';

/* 自动导入 */
export default [
  AutoImport({
    // .ts, .tsx, .js, .jsx, .vue, .md
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    imports: ['vue', 'vue-router', 'pinia', 'vee-validate', { 'naive-ui': ['useMessage', 'useDialog', 'useModal', 'useNotification', 'useLoadingBar'] }],
    // 自定义函数导入
    dirs: ['src/store/**/*', 'src/constants/**/*', 'src/hooks/**/*'],
    // 声明生成的位置
    dts: 'types/akir/auto-imports.d.ts',
    // 根据文件名称自动设置默认导出的变量名
    defaultExportByFilename: true,
  }),
];
