import { ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Backdrop } from './Backdrop'
import { useStore } from 'src/store'

type Props = {
  children: ReactNode,
  className?: string
}

export function FileDropzone ({
  children,
  className,
}: Props) {
  const store = useStore()

  const onDrop = useCallback((files: File[]) => {
    const [ file ] = files
    console.log('got request to upload file:', file)
    store.loadFile(file)
  }, [ store ])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  })

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {
        children
      }
      <Backdrop open={isDragActive} />
    </div>
  )
}
