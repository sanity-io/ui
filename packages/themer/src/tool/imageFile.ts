import {PixelData} from './imagePalette'

/**
 * The longest side the image is scaled down to before its colors are read —
 * a few thousand pixels are plenty for a palette, and keep it instant
 */
const SAMPLE_SIZE = 96

/**
 * Reads the pixels of an image file on device: the image is decoded, drawn
 * onto a small canvas and read back, so nothing leaves the browser.
 *
 * @internal
 */
export async function readImagePixels(file: Blob): Promise<PixelData> {
  const image = await decodeImage(file)

  try {
    const scale = Math.min(1, SAMPLE_SIZE / Math.max(image.width, image.height))
    const width = Math.max(1, Math.round(image.width * scale))
    const height = Math.max(1, Math.round(image.height * scale))
    const canvas = document.createElement('canvas')

    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d', {willReadFrequently: true})

    if (!context) throw new Error('Could not draw the image')

    context.drawImage(image, 0, 0, width, height)

    return {data: context.getImageData(0, 0, width, height).data, width, height}
  } finally {
    // Where `createImageBitmap` is missing, `ImageBitmap` may be too
    if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close()
  }
}

async function decodeImage(file: Blob): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file)
    } catch {
      // Some browsers cannot decode every format this way (e.g. SVG) — an
      // image element handles whatever the browser can display
    }
  }

  const url = URL.createObjectURL(file)

  try {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image()

      image.addEventListener('load', () => resolve(image), {once: true})
      image.addEventListener('error', () => reject(new Error('Could not decode the image')), {
        once: true,
      })
      image.src = url
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}
