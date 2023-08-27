import { BtnStyleType } from '../../../types/styleTypes';
import * as St from './style';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  styleType: BtnStyleType;
  disabled?: boolean | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({ type = 'button', children, styleType, disabled, onClick }: ButtonProps) => {
  return (
    <St.Button type={type} $styleType={styleType} disabled={disabled} onClick={onClick}>
      {children}
    </St.Button>
  );
};

export default Button;

export const CommentButton = ({ type, children, styleType, disabled, onClick }: ButtonProps) => {
  return (
    <St.CommentButton type={type} styleType={styleType} disabled={disabled} onClick={onClick}>
      {children}
    </St.CommentButton>
  );
};
