declare namespace XyLib {
  /** 路由数据声明 */
  type IRouterConfig = {
    /** 路由地址 */
    path?: string | string[];
    /** 标题（面包屑、title 显示等） */
    title?: string | string[];
    /** 路由组件 */
    component?: () => Promise<{ readonly default: any }>;
    /** 隐藏自己和子菜单 */
    hideInMenu?: boolean;
    /** 隐藏子菜单 */
    hideChildrenInMenu?: boolean;
    /** 菜单图标 */
    icon?: any;
    /**
     * @description 是否完全匹配
     */
    exact?: boolean;
    /**
     * @description 是否是重定向路由
     * @default false
     */
    redirect?: boolean;
    /** 路由 props */
    props?: Record<string, any>;
    /**
     * @description 路由组件 component props
     */
    componentProps?: Record<string, any>;
    /**
     * @description 是否需要懒加载
     * @default true
     */
    lazy?: boolean;
    /** 子路由 */
    children?: IRouterConfig[];
    /** 权限控制 */
    access?: string | string[];
    /** 菜单权限 code */
    code?: string;
  };
}
