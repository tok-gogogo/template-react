declare namespace API {
  type IGlobalResponse<D = unknown> = {
    /** 接口响应状态 */
    status: number;
    /** 响应数据 */
    data: D;
    /** 接口响应信息 */
    msg: string;
  };
}
