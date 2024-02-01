import { TextInput, TextInputProps } from '@mantine/core';
import { useEffect, useState } from 'react';

interface Props extends TextInputProps {
  masktype: string;
}

const InputMask: React.FC<Props> = (props) => {
  const [inputValue, setMask] = useState<string>();

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{4})(\d{0,1})/, '$1-$2');
  };

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const maskRG = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{1})\d+?$/, '$1');
  };

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1');
  };

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const onlyNumber = (value: string) => {
    return value.replace(/\D/g, '');
  };

  const setMaskInput = (propety: Props, value: string) => {
    if (typeof value !== 'string') return;
    if (propety.masktype === 'phoneNumber') {
      setMask(maskPhone(value));
    } else if (propety.masktype === 'cpf') {
      setMask(maskCPF(value));
    } else if (propety.masktype === 'birth') {
      setMask(maskDate(value));
    } else if (propety.masktype === 'cep') {
      setMask(maskCEP(value));
    } else if (propety.masktype === 'rg') {
      setMask(maskRG(value));
    } else if (propety.masktype === 'number') {
      setMask(onlyNumber(value));
    }
  };

  useEffect(() => {
    if (props.value) {
      setMaskInput(props, String(props.value));
    }
  }, [props.value]);

  return (
    <>
      <TextInput
        {...props}
        onChange={(e) => {
          setMaskInput(props, e.target.value);
          props.onChange && props.onChange(e);
        }}
        value={inputValue}
      />
    </>
  );
};

export default InputMask;
