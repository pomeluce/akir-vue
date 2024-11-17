const { get } = useStorage();

export const useAuth = () => {
  /**
   * 判断用户是否登录
   *
   * @returns {boolean} 返回一个 Boolean 类型的判断结果
   */
  const isAuthenticated = (): boolean => {
    return !!get(CacheKey.TOKEN_NAME);
  };

  return { isAuthenticated };
};
