import dynamic from 'next/dynamic'

export const AsyncCodeEditor = dynamic(import('./codeEditor'), {ssr: false})
