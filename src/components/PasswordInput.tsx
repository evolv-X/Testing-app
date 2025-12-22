import { useState } from "react";
import styled from "@emotion/styled";

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${(p) => p.theme.colors.text};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  min-width: 392px;
  padding: 10px 40px 10px 12px;
  border: 0.5px solid #09090B;
  border-radius: ${(p) => p.theme.radius.md};
  font-size: 14px;

  &:focus {
    outline: none;
    background: #E8F5FF;
    border-color: #4094F7;
  }
`;

const Eye = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  color: ${(p) => p.theme.colors.text};
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const EyeIcon = ({ open, onClick }) => (
  <Eye onClick={onClick} type="button">
    {open ? (
      <svg
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.68397 10.5288C1.21427 10.0619 0.979455 9.8284 0.829969 9.37012C0.72336 9.04328 0.723327 8.45657 0.829969 8.12974C0.979501 7.67147 1.2148 7.43745 1.68544 6.96967C3.46488 5.20065 6.56641 2.75 10.0971 2.75C13.6277 2.75 16.731 5.20208 18.5104 6.97111C18.9798 7.43775 19.2149 7.67187 19.3644 8.13C19.471 8.45684 19.4712 9.04378 19.3646 9.37061C19.2154 9.82788 18.9804 10.0614 18.5117 10.5272L18.5089 10.5303C16.7295 12.2993 13.6277 14.75 10.0971 14.75C6.56641 14.75 3.46341 12.2978 1.68397 10.5288Z"
          stroke="#DDE2E4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.0971 8.75C12.0971 9.85457 11.2016 10.75 10.0971 10.75C8.99249 10.75 8.09706 9.85457 8.09706 8.75C8.09706 7.64543 8.99249 6.75 10.0971 6.75C11.2016 6.75 12.0971 7.64543 12.0971 8.75Z"
          stroke="#DDE2E4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.09706 0.75L18.0971 16.75M14.5971 13.5059C13.2445 14.2345 11.7157 14.7499 10.0971 14.7499C6.56641 14.7499 3.46341 12.2978 1.68397 10.5288C1.21427 10.0619 0.979455 9.8284 0.829969 9.37012C0.72336 9.04328 0.723327 8.45657 0.829969 8.12974C0.979501 7.67147 1.2148 7.43745 1.68544 6.96967C2.58232 6.07821 3.81518 5.01359 5.26936 4.17676M17.5971 11.3835C17.9301 11.0905 18.2351 10.8023 18.5089 10.5303L18.5117 10.5272C18.9804 10.0614 19.2154 9.82788 19.3646 9.37061C19.4712 9.04378 19.471 8.45684 19.3644 8.13C19.2149 7.67187 18.9798 7.43775 18.5104 6.97111C16.731 5.20208 13.6277 2.75 10.0971 2.75C9.75956 2.75 9.42597 2.77241 9.09706 2.81448M11.42 10.25C11.0674 10.5612 10.6043 10.75 10.0971 10.75C8.99249 10.75 8.09706 9.85457 8.09706 8.75C8.09706 8.2105 8.31067 7.72108 8.65794 7.36133"
          stroke="#DDE2E4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )}
  </Eye>
);

export function PasswordInput({ label }) {
  const [show, setShow] = useState(false);

  return (
    <Field>
      <Label>{label}</Label>

      <InputWrapper>
        <Input type={show ? "text" : "password"} />
        <EyeIcon open={show} onClick={() => setShow((v) => !v)} />
      </InputWrapper>
    </Field>
  );
}
