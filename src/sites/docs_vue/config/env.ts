type EnvConfig = {
  baseUrl: string;
  isPrd: boolean;
};

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * articleUrl: 文章地址
 */

const config: EnvConfig = {
  baseUrl: '',
  isPrd: true // 是否为线上
};
switch ((import.meta as any).env.MODE) {
  case 'development':
    /*
     * 开发环境    => npm run dev
     */
    config.isPrd = false;
    config.baseUrl = '/devServer';
    break;
  case 'production':
    /*
     * 线上环境 => npm run build
     */
    config.isPrd = true;
    config.baseUrl = 'http://47.94.37.123:30201';
    break;
}
export default config;
