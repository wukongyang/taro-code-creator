/**
 * @description 条形码生成器
 * @lastModified 2023.11.17
 * @author wukongyang
 */

import { Canvas } from '@tarojs/components'
import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'

import { ScanCodeProps } from '../../index.type'
import drawBarcode from '../../utils/mp_barcode'
import { generateRandomId } from '../../utils/utils'

/**
 * @description 条形码组件
 * @example
 */
const BarCode: React.FC<ScanCodeProps> = ({
  codeText = '',
  color = '#000',
  backgroundColor = '#fff',
  width = 200,
  height = 100,
  callback,
}) => {
  const randomId = `custom_code_${generateRandomId()}`
  useEffect(() => {
    const query = Taro.createSelectorQuery()
    query
      .select(`#${randomId}`)
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const canvasWidth = parseFloat(Taro.pxTransform(width)) / 2
        const canvasHeight = parseFloat(Taro.pxTransform(height)) / 2
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')
        drawBarcode(
          ctx,
          codeText,
          canvasWidth,
          canvasHeight,
          color,
          backgroundColor
        )
        Taro.nextTick(() => {
          Taro.canvasToTempFilePath({
            canvas,
            success: (r) => {
              callback?.(r.tempFilePath)
            },
          })
        })
      })
  }, [])
  return (
    <Canvas
      style={{
        width: Taro.pxTransform(width),
        height: Taro.pxTransform(height),
      }}
      id={randomId}
      type="2d"
    ></Canvas>
  )
}

export default BarCode
