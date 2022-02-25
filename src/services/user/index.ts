import request from '@/services/request';

export type ICurrentUser = {
  /** 用户 id */
  id: number;
  /** 用户名称 */
  name: string;
};

/**
 * @description 获取当前用户信息
 */
export function getCurrentUserInfo() {
  return request.post<ICurrentUser>('/api/currentUser');
}
