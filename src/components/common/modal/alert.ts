import Swal from 'sweetalert2';

// 기본 alert창
export const Alert = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: '로그인 되었습니다.',
    showConfirmButton: false,
    timer: 1000,
  });
};

// alert창 (error)
export const AlertError = () => {
  Swal.fire({
    icon: 'error',
    title: '에러가 발생했습니다.',
    text: '다시 시도해 주세요!',
  });
};

// 삭제 시 confirm 창
export const ConfirmDelete = () => {
  Swal.fire({
    title: '정말 삭제하시겠습니까?',
    text: '이 작업은 되돌릴 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '네, 삭제하겠습니다.',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('삭제됨', '해당 내용은 삭제되었습니다.', 'success');
    }
  });
};

// 수정사항 저장 시 confirm 창
export const ConfirmSave = () => {
  Swal.fire({
    title: '변경사항을 저장하시겠습니까?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: '저장',
    denyButtonText: `저장하지 않음`,
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('변경사항이 저장되었습니다!', '', 'success');
    } else if (result.isDenied) {
      Swal.fire('변경사항이 반영되지 않았습니다.', '', 'info');
    }
  });
};

// 아래는 컴포넌트에서 사용하는 방법입니다.

// import { Alert, AlertError, ConfirmDelete, ConfirmSave } from '../components/common/modal/alert';

// const Intro = () => {
//   const handleClick = () => {
//     Alert();
//   };
//   const handleClick2 = () => {
//     AlertError();
//   };
//   const handleClick3 = () => {
//     ConfirmDelete();
//   };
//   const handleClick4 = () => {
//     ConfirmSave();
//   };
//   return (
//     <div>
//       <button onClick={handleClick}>클릭!</button>
//       <button onClick={handleClick2}>클릭!</button>
//       <button onClick={handleClick3}>클릭!</button>
//       <button onClick={handleClick4}>클릭!</button>
//     </div>
//   );
// };

// export default Intro;
