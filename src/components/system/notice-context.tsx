export default defineComponent({
  setup() {
    window.$message = useMessage();
    window.$modal = useModal();
    return () => <></>;
  },
});
