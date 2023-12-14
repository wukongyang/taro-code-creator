type BarcodeFormat =
  | "CODE39"
  | "CODE128"
  | "CODE128A"
  | "CODE128B"
  | "CODE128C"
  | "EAN13"
  | "EAN8"
  | "EAN5"
  | "EAN2"
  | "UPC"
  | "UPCE"
  | "ITF14"
  | "ITF"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "pharmacode"
  | "codabar"
  | "GenericBarcode";
export type ScanCodeProps = QrCodeProps &
  BarCodeProps & {
    /**码内容*/
    codeText: string;
    /**
     * 类型
     * @default qr
     */
    type?: "bar" | "qr";
    /**
     * 码颜色
     * @default #000
     * */
    color?: string;
    /**
     * 背景颜色
     * @default #fff
     * */
    backgroundColor?: string;

    /**
     * @description 成功后的回调
     * @param {string} url 二维码图片临时地址，微信小程序时为本地地址，RN为base64
     */
    callback?(url: string): void;
  };

export interface QrCodeProps {
  /**
   * 二维码大小,仅支持二维码设置
   * @default 200
   * */
  size?: number;

  /**
   * logo图片地址,仅支持二维码设置
   * */
  logo?: string;
  /**
   * logo大小,仅支持二维码设置
   * @default 60
   * */
  logoSize?: number;
}
export interface BarCodeProps {
  /**
   * 条形码宽度,只支持条形码设置
   * @default 200
   * */
  width?: number;
  /**
   * 条形码高度度,只支持条形码设置
   * @default 100
   * */
  height?: number;
  /**
   * 条形码类型,只支持条形码设置
   * @default CODE128
   * */
  format?: BarcodeFormat;
}
