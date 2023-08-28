import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from '@looop/quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import * as St from './style';

type editorHtmlProps = {
  editorHtml: string;
  onEditorChange: (newHtml: string) => void;
  quillRef: React.MutableRefObject<undefined>;
};

// Quill 모듈의 타입 정보 선언
declare module 'react-quill' {
  interface Quill {
    getEditor(): { root: { innerHTML: string } };
  }
}

const SoptShareEditor = ({ editorHtml, onEditorChange }: editorHtmlProps) => {
  const toolbarOptions = [['link', 'image'], [{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }], [{ color: [] }, { background: [] }], [{ align: [] }]];

  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'align', 'blockquote', 'list', 'bullet', 'background', 'color', 'link', 'image'];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
    imageResize: {
      modules: ['Resize'],
    },
  };

  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.getEditor().root.innerHTML = editorHtml;
    }
  }, [editorHtml]);

  const handleChangeEditor = (newHtml: string) => {
    onEditorChange(newHtml);
  };

  return (
    <>
      <St.SpotShareBox>
        <ReactQuill style={{ height: '40vh' }} theme="snow" modules={modules} formats={formats} value={editorHtml} onChange={handleChangeEditor} />
      </St.SpotShareBox>
      <div>임시 미리보기</div>
      <ReactQuill value={editorHtml} readOnly={true} theme={'bubble'} />
    </>
  );
};

export default SoptShareEditor;
