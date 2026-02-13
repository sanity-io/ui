/* eslint-disable no-var */

/**
 * @todo Remove when TypeScript supports this
 */
interface ClipboardItem {
  readonly types: string[]
  readonly presentationStyle: 'unspecified' | 'inline' | 'attachment'
  getType(): Promise<Blob>
}

/**
 * @todo Remove when TypeScript supports this
 */
interface ClipboardItemData {
  [mimeType: string]: Blob | string | Promise<Blob | string>
}

/**
 * @todo Remove when TypeScript supports this
 */
declare var ClipboardItem: {
  prototype: ClipboardItem
  new (itemData: ClipboardItemData): ClipboardItem
}

/**
 * Augment `Clipboard`
 * @todo Remove when TypeScript supports this
 */
interface Clipboard {
  read(): Promise<DataTransfer>
  write(data: ClipboardItem[]): Promise<void>
}
