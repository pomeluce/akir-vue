export default defineComponent<{}>(() => {
  window.$message = useMessage();
  window.$modal = useModal();

  return () => <></>;
});
