# taro-svga

## Supporting platforms

**weapp h5 tt rn**

## Installing

```
yarn add taro-svga
```

### Extra Installing For React Native

> Based on [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg)

android

```
react-native link react-native-qrcode-svg
```

OR
auto link

Go to your ios folder and run:

```
pod install
```

## Basic Usage

```tsx
import QrCode from "taro-qrcode";

const App = () => {
  return <QrCode codeText="123" />;
};
```

## Component API

> Based on [taro-qrcode](https://github.com/wukongyang/taro-qrcode)

|        Prop         |                Description                | Default | Platform |
| :-----------------: | :---------------------------------------: | :-----: | :------: |
|    **codeText**     |              QR code content              |         |   all    |
|      **color**      |               QR code color               | `#000`  |   all    |
| **backgroundColor** |         QR code background color          | `#fff`  |   all    |
|      **size**       |               QR code size                |  `200`  |   all    |
|    **logoSize**     |                 Logo size                 |  `60`   |   all    |
|    **callback**     | Callback function for generating QR codes |         |   all    |
