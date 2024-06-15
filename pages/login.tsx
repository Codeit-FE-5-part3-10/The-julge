import { Box, Button, Center, Container, TextInput } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MantineProvider, Box, Button, Center, Container, TextInput, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoImage from '@/public/images/login-logo.svg';
import { useToken } from '@/src/utils/TokenProvider';

type Inputs = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const tokenContext = useToken();
  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      try {
        await tokenContext.login(data.email, data.password);
      } catch (error) {
        setApiError('비밀번호가 일치하지 않습니다.');
      }
    },
    [router, tokenContext]
  );
  console.log(tokenContext);
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

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <Container
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box style={{ maxWidth: 400, width: '100%' }}>
          <Center>
            <Button
              onClick={handleLogoClick}
              style={{
                padding: 0,
                background: 'none',
                width: '100%',
                height: 45,
              }}
            >
              <Image src={logoImage} alt="로고" />
            </Button>
          </Center>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 30,
            }}
          >
            <TextInput
              label="이메일"
              placeholder="입력"
              {...register('email', { required: '이메일을 입력해 주세요.' })}
              onBlur={handleEmailBlur}
              error={emailError || (errors.email && errors.email.message)}
              styles={{
                label: { fontSize: 16, color: '#111322', fontWeight: 400 },
                input: {
                  width: 350,
                  height: 58,
                  borderRadius: 6,
                  border: '1px solid #CBC9CF',
                  fontSize: 16,
                },
              }}
              style={{ marginBottom: 15, color: '#A4A1AA' }}
            />

            <TextInput
              label="비밀번호"
              placeholder="입력"
              type="password"
              {...register('password', { required: '비밀번호를 입력해 주세요.' })}
              onBlur={handlePasswordBlur}
              error={passwordError || (errors.password && errors.password.message)}
              styles={{
                label: { fontSize: 16, color: '#111322', fontWeight: 400 },
                input: {
                  width: 350,
                  height: 58,
                  borderRadius: 6,
                  border: '1px solid #CBC9CF',
                  fontSize: 16,
                },
              }}
              style={{ marginBottom: 15 }}
            />
            {apiError && (
              <Text color="red" style={{ fontSize: 12, marginBottom: 15 }}>
                {apiError}
              </Text>
            )}
            <Center>
              <Button
                type="submit"
                style={{
                  width: 350,
                  height: 48,
                  background: '#EA3C12',
                  borderRadius: 6,
                  fontSize: 16,
                }}
              >
                로그인
              </Button>
            </Center>
          </Box>
          <Center style={{ marginTop: 15 }}>
            <Text>회원이 아니신가요?</Text>
            <a href="/signup" style={{ marginLeft: 8, fontSize: 12, color: '#5534DA' }}>
              회원가입하기
            </a>
          </Center>
        </Box>
      </Container>
    </MantineProvider>
  );
};
