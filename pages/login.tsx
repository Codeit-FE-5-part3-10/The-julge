import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Center, Container, TextInput, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoImage from '@/public/images/global-logo.svg';

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      try {
        const response = await axios.post(
          'https://bootcamp-api.codeit.kr/api/0-1/the-julge/token',
          data
        );
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        router.push('/index');
      } catch (error) {
        setApiError('비밀번호가 일치하지 않습니다.');
      }
    },
    [router]
  );

  const handleEmailBlur = useCallback(() => {
    if (!errors.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue || '')) {
        setEmailError('이메일 형식으로 작성해 주세요.');
      } else {
        setEmailError(null);
      }
    }
  }, [emailValue]);

  const handlePasswordBlur = useCallback(() => {
    if (!errors.password) {
      if (passwordValue.length < 8) {
        setPasswordError('8자 이상 작성해 주세요.');
      } else {
        setPasswordError(null);
      }
    }
  }, [passwordValue]);

  const handleLogoClick = () => {
    router.push('/index');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ width: '100%', maxWidth: 400 }}>
        <Center>
          <Button onClick={handleLogoClick} style={{ padding: 0 }}>
            <Image src={logoImage} alt="로고" width={248} height={45} />
          </Button>
        </Center>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextInput
            my={24}
            label="이메일"
            placeholder="입력"
            {...register('email', { required: '이메일을 입력해 주세요.' })}
            onBlur={handleEmailBlur}
            error={emailError || (errors.email && errors.email.message)}
            w={350}
            h={58}
          />

          <TextInput
            my={24}
            label="비밀번호"
            placeholder="입력"
            type="password"
            {...register('password', { required: '비밀번호를 입력해 주세요.' })}
            onBlur={handlePasswordBlur}
            error={passwordError || (errors.password && errors.password.message)}
            w={350}
            h={58}
          />
          {apiError && <Text color="red">{apiError}</Text>}
          <Center>
            <Button type="submit" w={350} style={{ width: '100%' }}>
              로그인
            </Button>
          </Center>
        </Box>
        <Center>
          <Text>회원이 아니신가요?</Text>
          <Button variant="link" my={8} onClick={handleSignUpClick}>
            회원가입하기
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default LoginPage;
