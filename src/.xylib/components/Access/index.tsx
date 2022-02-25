import React, { useMemo } from 'react';
import { IAccessState } from '@xylib/hooks/useAccess';
import { useAccess } from '@xylib';
import { defineAccessCodeKeyName } from '@xylib/config';

type IProps = {
  /** 权限验证 */
  accessible?: boolean | ((access: IAccessState) => boolean);
  /** 没有权限时的渲染内容 */
  fallback?: React.ReactElement;
  /** 权限 code 验证 */
  code?: string;
};

const Access: React.FC<IProps> = (props) => {
  const { accessible, fallback, code, children } = props;
  const accessInfo = useAccess();

  const renderContent = useMemo(() => {
    let accessFlag = false;

    if (typeof accessible === 'function') {
      accessFlag = accessible(accessInfo);
    }

    if (typeof accessible === 'boolean') {
      accessFlag = accessible;
    }

    if (code && accessInfo?.[defineAccessCodeKeyName.function]?.includes?.(code)) {
      accessFlag = true;
    }

    return accessFlag ? (children as React.ReactElement) : fallback;
  }, [accessible, fallback, code, children]);

  return renderContent;
};

Access.defaultProps = {
  fallback: null,
};

export default Access;
