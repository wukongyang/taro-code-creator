# taro-code-creator

**Supports generating barcodes and QR codes**

## Supporting platforms

**weapp h5 tt swan alipay qq rn**

## Installing

```
yarn add taro-code-creator
```

## Basic Usage

```tsx
import QrCode from "taro-code-creator";

const App = () => {
  return <QrCode codeText="123" />;
};
```

## Component API

> Based on [taro-code-creator](https://github.com/wukongyang/taro-code-creator)

|        Prop         |                Description                | Default | type |
| :-----------------: | :---------------------------------------: | :-----: | :--: |
|      **type**       |                 code type                 |  `qr`   | all  |
|    **codeText**     |              QR code content              |         | all  |
|      **color**      |               QR code color               | `#000`  | all  |
| **backgroundColor** |         QR code background color          | `#fff`  | all  |
|      **size**       |               QR code size                |  `200`  |  qr  |
|      **logo**       |                 logo url                  |   ``    |  qr  |
|    **logoSize**     |                 Logo size                 |  `60`   |  qr  |
|    **callback**     | Callback function for generating QR codes |         | all  |
|      **width**      |               barcode width               |         | bar  |
|     **height**      |              barcode height               |         | bar  |
|     **format**      |              barcode format               |         | bar  |
