import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as St from './style';
import './textEditor.css';

type editorHtmlProps = {
  editorHtml: string;
  setEditorHtml: React.Dispatch<React.SetStateAction<string>>;
};

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ color: [] }, { background: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image', 'video'],
];

const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'align', 'blockquote', 'list', 'bullet', 'background', 'color', 'link', 'image', 'video', 'height', 'width'];

const modules = {
  toolbar: {
    container: toolbarOptions,
  },
  imageActions: {},
  imageFormats: {},
};

const SoptShareEditor = ({ editorHtml, setEditorHtml }: editorHtmlProps) => {
  return (
    <St.EditorBox>
      <ReactQuill className="ql-custom" theme="snow" modules={modules} formats={formats} value={editorHtml} onChange={setEditorHtml} />
    </St.EditorBox>
  );
};

export default SoptShareEditor;
