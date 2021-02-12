import { ReactNode, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Backdrop } from './Backdrop'
import { readFile } from './readFile'

type Props = {
  children: (data?: string) => ReactNode,
  className?: string
}

export function FileDropzone ({
  children,
  className
}: Props) {
  const [ data, setData ] = useState<string>('hello')

  const onDrop = useCallback(async (files: File[]) => {
    const [ file ] = files
    console.log('got request to upload file:', file)
    const fileContent = await readFile(file)
    // TODO: handle exception
    // TODO: show spinner
    // TODO: implement abort
    setData(fileContent)
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
        children(data)
      }
      <Backdrop open={isDragActive} />
    </div>
  )
}
