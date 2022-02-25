import * as app from '@/index';

type IApp = typeof app & Record<string, any>;

export default app as IApp;
