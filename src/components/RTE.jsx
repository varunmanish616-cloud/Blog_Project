import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form'
function RTE({name,control,label,defaultValue=''}) {
  return (
   <div className='w-full'>
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    <Controller 
      name={name || "content"}
      control={control}
      render={({field:{onChange}})=>(
       <Editor
  apiKey="h7l9a3oczvre14kshch2fnx21psduk6ahilnj6f345sqpyd3"
  onEditorChange={onChange}
  init={{
    height: 500,
    menubar: true,

    plugins: [
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'insertdatetime',
      'media',
      'table',
      'help',
      'wordcount'
    ],

    toolbar:
      'undo redo | blocks | bold italic underline | ' +
      'alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image media | ' +
      'removeformat | help',

    content_style:
      'body { font-family: Helvetica, Arial, sans-serif; font-size:14px }'
  }}
/>


      )}
    />
   </div>
  )
}

export default RTE