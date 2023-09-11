import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useCallback, useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../../api/supabase/supabaseClient';
import { AlertWarning } from '../../common/modal/alert';
import * as St from './style';
import './textEditor.css';

type Props = {
  editorHtml: string;
  setEditorHtml: React.Dispatch<React.SetStateAction<string>>;
  postImageUrlArray: string[];
  setPostImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
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
  ['link', 'image'],
];

const SoptShareEditor = ({ editorHtml, setEditorHtml, setPostImageUrl, postImageUrlArray }: Props) => {
  const changeContent = useCallback((content: string) => {
    setEditorHtml(content);
  }, []);

  const quillRef = useRef<any>();
  const imageHandler = () => {
    if (postImageUrlArray.length > 50) {
      AlertWarning({ title: '이미지가 너무 많습니다.' });
      return;
    }
    try {
      // 1. 이미지를 저장할 input type=file DOM을 만든다.
      const input = document.createElement('input');
      // 속성 써주기
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
      input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files![0];
        const fileNewName = uuidv4();
        const { data, error } = await supabase.storage.from('quillImgs').upload(`quill_imgs/${fileNewName}`, file);
        if (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } else {
          console.log('이미지가 성공적으로 업로드되었습니다:', data);
        }
        const response = supabase.storage.from('quillImgs').getPublicUrl(`quill_imgs/${fileNewName}`);

        if (response.data) {
          const postImageUrl = response.data.publicUrl;
          setPostImageUrl((prev) => [...prev, `quill_imgs/${fileNewName}`]);
          const editor = quillRef.current!.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', postImageUrl);
          editor.setSelection(range.index + 1);
        } else {
          console.error('No public URL found in response data.');
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'align', 'blockquote', 'list', 'bullet', 'background', 'color', 'link', 'image', 'height', 'width'];
  return (
    <St.EditorBox>
      <ReactQuill className="ql-custom" theme="snow" modules={modules} formats={formats} ref={quillRef} placeholder="멋진 스팟을 공유해 보세요." value={editorHtml} onChange={changeContent} />
    </St.EditorBox>
  );
};

export default SoptShareEditor;
