import React, { useCallback, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../../api/supabase/supabaseClient';
import * as St from './style';
import './textEditor.css';

type editorHtmlProps = {
  editorHtml: string;
  setEditorHtml: React.Dispatch<React.SetStateAction<string>>;
};

const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ color: [] }, { background: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link', 'image'],
];

export const uploadImage = async (selectedFile: any) => {
  const fileExtension = selectedFile.name.split('.').pop(); //파일확장자추출
  const newFileName = `${selectedFile.name.split('.')[0] + Math.random()}fileExtension}`;
  const sanitizedFileName = newFileName.replace(/[^a-zA-Z0-9]/g, ''); // 잘못된 문자 제거
  const postedFilePath = `quill_imags/${sanitizedFileName}`;

  try {
    const { data, error: uploadError } = await supabase.storage.from('quillImgs').upload(postedFilePath, selectedFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return;
    }
    const response = supabase.storage.from('quillImgs').getPublicUrl(postedFilePath);

    if (response.data) {
      const publicUrl = response.data.publicUrl;
    } else {
      console.error('No public URL found in response data.');
    }

    const publicUrl = response.data.publicUrl;
    return publicUrl;
  } catch (error) {
    console.error(error);
  }
};

const SoptShareEditor = ({ editorHtml, setEditorHtml }: editorHtmlProps) => {
  // const quillRef = useRef<ReactQuill | null>(null);

  const changeContent = useCallback((content: string) => {
    setEditorHtml(content);
  }, []);

  const quillRef = useRef<any>();
  const imageHandler = async () => {
    try {
      console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
      // 1. 이미지를 저장할 input type=file DOM을 만든다.
      const input = document.createElement('input');
      // 속성 써주기
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
      input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files![0];
        console.log('file', file);
        const src = await uploadImage(file);
        const editor = quillRef.current!.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', src);
        editor.setSelection(range.index + 1);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'align', 'blockquote', 'list', 'bullet', 'background', 'color', 'link', 'image'];
  return (
    <St.EditorBox>
      <ReactQuill className="ql-custom" theme="snow" modules={modules} formats={formats} ref={quillRef} placeholder="멋진 스팟을 공유해 보세요." value={editorHtml} onChange={changeContent} />
    </St.EditorBox>
  );
};

export default SoptShareEditor;
