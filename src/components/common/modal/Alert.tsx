// alert 사용 방법 입니다.

import Swal from 'sweetalert2';

const Alert = () => {
  // 기본 alert창은 아래 복사해서 사용
  const handleAlertClick = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '로그인 되었습니다.',
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // error난 경우 -> 아래 복사해서 사용
  const handleErrorClick = () => {
    Swal.fire({
      icon: 'error',
      title: '에러가 발생했습니다.',
      text: '다시 시도해 주세요!',
    });
  };

  // 삭제 하는 경우 아래의 confirm 창 사용
  const handleDeleteClick = () => {
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

  // 수정사항 저장하는 경우 아래의 confirm 창 사용
  const handleSaveClick = () => {
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

  return (
    <div>
      <button onClick={handleAlertClick}>alert창 (기본)</button>
      <button onClick={handleErrorClick}>alert창 (error)</button>
      <button onClick={handleDeleteClick}>alert창 (delete)</button>
      <button onClick={handleSaveClick}>alert창 (save)</button>
    </div>
  );
};

export default Alert;
