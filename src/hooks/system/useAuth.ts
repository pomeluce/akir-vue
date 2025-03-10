const { get } = useStorage();

export default () => {
  /**
   * 判断用户是否登录
   *
   * @returns {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isAuthenticated = (): boolean => {
    return !!get(CacheKey.ACCESS_TOKEN);
  };

  return { isAuthenticated };
};
