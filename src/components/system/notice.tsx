export default defineComponent({
  setup() {
    window.$message = useMessage();
    return () => <></>;
  },
});
