import { forwardRef } from 'react';
import { Button as DefaultButton } from 'antd';
import { ButtonProps } from 'antd/es/button/button';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <DefaultButton {...props} ref={ref} />;
});

Button.displayName = 'Button';

export default Button;
