import { IAccessState } from '@xylib/hooks/useAccess';
import { defineAccessCodeKeyName } from '@xylib/config';

export default function hasAccess(
  currentAccess: string | string[] | undefined,
  accessInfo: IAccessState,
): boolean {
  if (!currentAccess) {
    // 当前项未配置 --- 有权限
    return true;
  }
  if (typeof currentAccess === 'string') {
    // 当前项为字符串且权限信息中为 false --- 无权限
    return Boolean(accessInfo?.[currentAccess]);
  }
  let hasAccess = false;
  if (currentAccess instanceof Array) {
    // 当前项为数组且权限信息中至少有一项为 true --- 有权限
    currentAccess.forEach((accessItem) => {
      if (accessInfo?.[accessItem]) {
        hasAccess = true;
      }
    });
  }
  return hasAccess;
}

export function hasCodeAccess(currentCode: string | undefined, accessInfo: IAccessState) {
  const codes = accessInfo?.[defineAccessCodeKeyName.menu];
  if (!currentCode) {
    // 当前项未配置 code --- 有权限
    return true;
  }
  if (!codes?.length) {
    // 未配置权限 code 列表 --- 无权限
    return false;
  }
  return codes.includes(currentCode);
}
