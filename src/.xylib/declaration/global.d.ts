// 路由配置声明
export interface IRouterConfig {
  /** 地址 */
  path?: string | string[];
  /** 用于面包屑显示的title，网页标题 */
  title?: string | string[];
  /** 是否完全匹配 */
  exact?: boolean;
  /** 路由根组件 */
  component?: () => Promise<any>;
  /** 路由依赖的rematch模块 */
  model?: any;
  /** 组件props，重定向路由时为Redirect的props */
  props?: {
    [key: string]: any;
  };
  /** 是否是重定向路由 */
  redirect?: boolean;
  /** 子路由 */
  children?: IRouterConfig[];
  /** 是否懒加载，默认懒加载 */
  lazy?: boolean;
}
