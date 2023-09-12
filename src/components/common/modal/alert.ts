import Swal from 'sweetalert2';
import icon_warning from '../../../assets/imgs/common/icon_alert_warning.png';
import icon_trash from '../../../assets/imgs/common/icon_alert_trash.png';
import icon_check from '../../../assets/imgs/common/icon_alert_check.png';
import icon_error from '../../../assets/imgs/common/icon_alert_error.png';

type AlertProps = {
  title: string;
  position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
};

type AlertErrorProps = {
  title?: string;
  text?: string;
};

type ConfirmCustomProps = {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmMessage: string;
  message: string;
};

const swalCustomButtons = Swal.mixin({
  customClass: {
    confirmButton: 'alert-btn alert-btn-confirm',
    cancelButton: 'alert-btn alert-btn-cancel',
  },
  buttonsStyling: false,
});

// 기본 alert창 -> position과 title 바꿔서 재사용 가능
export const Alert = ({ title, position = 'center' }: AlertProps) => {
  swalCustomButtons.fire({
    position,
    imageUrl: icon_check,
    imageWidth: 88,
    imageAlt: '체크 아이콘',
    title,
    showConfirmButton: false,
    timer: 1200,
    showClass: {
      popup: 'animate__animated animate__fadeIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut',
    },
  });
};

export const AlertWarning = ({ title, position = 'center' }: AlertProps) => {
  swalCustomButtons.fire({
    position,
    imageUrl: icon_warning,
    imageWidth: 88,
    imageAlt: '느낌표 아이콘',
    title,
    showConfirmButton: false,
    timer: 1200,
    showClass: {
      popup: 'animate__animated animate__fadeIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut',
    },
  });
};

// alert창 (error) -> title과 text 바꿔서 재사용 가능
export const AlertError = ({ title = '에러가 발생했습니다.', text = '다시 시도해 주세요!' }: AlertErrorProps) => {
  swalCustomButtons.fire({
    imageUrl: icon_error,
    imageWidth: 88,
    imageAlt: '엑스 아이콘',
    title,
    text,
    confirmButtonText: '확인',
    showClass: {
      popup: 'animate__animated animate__fadeIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut',
    },
  });
};

// Confirm창 (모든 메시지 커스텀 가능)
export const ConfirmCustom = ({ title, text, confirmButtonText, cancelButtonText, confirmMessage, message }: ConfirmCustomProps): Promise<boolean> => {
  return new Promise((resolve) => {
    swalCustomButtons
      .fire({
        title,
        text,
        imageUrl: icon_warning,
        imageWidth: 88,
        imageAlt: '느낌표 아이콘',
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        showClass: {
          popup: 'animate__animated animate__fadeIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalCustomButtons.fire({ title: confirmMessage, text: message, confirmButtonText: '확인' });
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};

// 취소 시 confirm 창 -> cancelMessage 입력 필수
export const ConfirmCancel = (cancelMessage: string): Promise<boolean> => {
  return new Promise((resolve) => {
    swalCustomButtons
      .fire({
        title: '정말 취소하시겠습니까?',
        text: '이 작업은 되돌릴 수 없습니다.',
        imageUrl: icon_warning,
        imageWidth: 88,
        imageAlt: '느낌표 아이콘',
        showCancelButton: true,
        confirmButtonText: '네, 취소하겠습니다.',
        cancelButtonText: '닫기',
        showClass: {
          popup: 'animate__animated animate__fadeIn',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalCustomButtons.fire({ title: '취소됨', text: cancelMessage, confirmButtonText: '확인' });
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};

// 삭제 시 confirm 창 -> deleteMessage 입력 필수
export const ConfirmDelete = (deleteMessage: string): Promise<boolean> => {
  return new Promise((resolve) => {
    swalCustomButtons
      .fire({
        title: '정말 삭제하시겠습니까?',
        text: '이 작업은 되돌릴 수 없습니다.',
        imageUrl: icon_warning,
        imageWidth: 88,
        imageAlt: '느낌표 아이콘',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 삭제하겠습니다.',
        cancelButtonText: '취소',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut',
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};

// 수정사항 저장 시 confirm 창
export const ConfirmSave = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Swal.fire({
      title: '수정사항을 반영하시겠습니까?',
      imageUrl: icon_warning,
      imageWidth: 88,
      imageAlt: '느낌표 아이콘',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      showClass: {
        popup: 'animate__animated animate__fadeIn',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        swalCustomButtons.fire({ title: '수정되었습니다!', text: '', confirmButtonText: '확인' });
        resolve(true);
      } else resolve(false);
    });
  });
};

// 아래는 컴포넌트에서 사용하는 방법입니다.

// import { Alert, AlertError, ConfirmDelete, ConfirmSave } from '../components/common/modal/alert';

// const Intro = () => {
//   // title 입력 필수, position은 입력하지 않으면 default 값 = center
//   const handleAlert = () => {
//     Alert({ title: '로그인 성공', position: 'top-end' });
//   };

//   // 빈 배열 넣으면 기본 error 메시지로 alert
//   // 다음과 같이 error 메시지 커스텀 가능 -> AlertError({ title: '에러다.', text: '이제 나가줘' });
//   const handleAlertError = () => {
//     AlertError({});
//   };

//   // 삭제 메시지 입력 필수
//   const handleConfirmDelete = async () => {
//     const isConfirmed = await ConfirmDelete('해당 댓글이 삭제되었습니다.');
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       // confirm 확인 눌렀을 떄의 로직 (아래는 alert로 넣어봄)
//       alert('삭제 성공');
//     } catch (error) {
//       // error 시 로직
//     }
//   };

//   const handleConfirmSave = async () => {
//     const isConfirmed = await ConfirmSave();
//     if (!isConfirmed) {
//       return;
//     }
//     try {
//       // confirm 확인 눌렀을 떄의 로직 (아래는 alert로 넣어봄)
//       alert('수정 성공');
//     } catch (error) {
//       // error 시 로직
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleAlert}>Alert 버튼</button>
//       <button onClick={handleAlertError}>AlertError 버튼</button>
//       <button onClick={handleConfirmDelete}>ConfirmDelete 버튼</button>
//       <button onClick={handleConfirmSave}>ConfirmSave 버튼</button>
//     </div>
//   );
// };

// export default Intro;
