import { ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Backdrop } from "./Backdrop"

type Props = {
  children: ReactNode,
  className?: string
}

export const FileDropzone = function FileDropzone ({
  children,
  className
}: Props) {

  const onDrop = useCallback((files: File[]) => {
    const [ file ] = files
    console.log('got request to upload file:', file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true
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
