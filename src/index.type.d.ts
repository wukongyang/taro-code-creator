export interface QrCodeProps {
  /**
   * 二维码大小
   * @default 200
   * */
  size?: number;
  /**logo图片地址*/
  logo?: string;
  /**
   * logo大小
   * @default 60
   * */
  logoSize?: number;
  /**二维码内容*/
  codeText: string;
  /**
   * 二维码颜色
   * @default #000
   * */
  color?: string;
  /**
   * 二维码背景颜色
   * @default #fff
   * */
  backgroundColor?: string;
  /**
   * @description成功后的回调
   * @param {string} url 二维码图片临时地址，微信小程序时为本地地址，RN为base64
   */
  callback?(url: string): void;
}
