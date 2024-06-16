import React, { useCallback, useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import {
  MantineProvider,
  Box,
  Button,
  Center,
  Container,
  TextInput,
  Text,
  Radio,
  RadioGroup,
  Modal,
  Group,
} from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoImage from '@/public/images/login-logo.svg';
import { axiosInstance } from '@/src/apis/axiosInstance';

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'employee' | 'employer';
};

const SignupPage = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const emailValue = watch('email');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const checkEmailDuplicate = useCallback(async (email: string) => {
    try {
      const response = await axios.get('https://bootcamp-api.codeit.kr/api/0-1/the-julge/users');
      const users = response.data.users || [];
      const isUserFound =
        Array.isArray(users) &&
        users.some((user: { email: string }) => user.email.toLowerCase() === email.toLowerCase());
      if (isUserFound) {
        setEmailError('????');
      } else {
        setEmailError(null);
      }
    } catch (error) {
      console.error('Email duplicate', error);
    }
  }, []);

  useEffect(() => {
    if (emailValue) {
      checkEmailDuplicate(emailValue);
    }
  }, [emailValue, checkEmailDuplicate]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      if (
        emailError ||
        errors.email ||
        passwordError ||
        errors.password ||
        confirmPasswordError ||
        errors.confirmPassword
      ) {
        return;
      }

      if (data.password !== data.confirmPassword) {
        setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const postData = {
          email: data.email,
          password: data.password,
          type: data.userType,
        };
        await axiosInstance.post('/users', postData);
        alert('가입이 완료되었습니다');
        router.push('/');
      } catch (error) {
        console.error(error);
        setApiError('이미 사용중인 이메일입니다.');
        setModalOpen(true);
      }
    },
    [checkEmailDuplicate, router]
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
  }, [emailValue, errors.email]);

  const handlePasswordBlur = useCallback(() => {
    if (passwordValue && passwordValue.length < 8) {
      setPasswordError('8자 이상 작성해 주세요.');
    } else {
      setPasswordError(null);
    }
  }, [passwordValue, errors.password]);

  const handleConfirmPasswordBlur = useCallback(() => {
    if (confirmPasswordValue !== passwordValue) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(null);
    }
  }, [confirmPasswordValue, passwordValue]);

  const handleLogoClick = () => {
    router.push('index');
  };

  return (
    <MantineProvider>
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
              style={{ marginBottom: 15 }}
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

            <TextInput
              label="비밀번호 확인"
              placeholder="입력"
              type="password"
              {...register('confirmPassword', { required: '비밀번호를 다시 입력해 주세요.' })}
              onBlur={handleConfirmPasswordBlur}
              error={
                confirmPasswordError || (errors.confirmPassword && errors.confirmPassword.message)
              }
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

            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 16, color: '#111322', fontWeight: 400 }}>회원유형</Text>
              <Controller
                control={control}
                name="userType"
                rules={{ required: '회원 유형을 선택해 주세요.' }}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                  >
                    <Group grow>
                      <Radio
                        value="employee"
                        label="알바님"
                        styles={{
                          root: {
                            border: '1px solid #EA3C12',
                            padding: '13px 41px 13px 41px',
                            borderRadius: 30,
                            textAlign: 'center',
                          },
                          label: { fontSize: 14, display: 'block', textAlign: 'center' },
                        }}
                      />
                      <Radio
                        value="employer"
                        label="사장님"
                        styles={{
                          root: {
                            border: '1px solid #EA3C12',
                            padding: '13px 41px 13px 41px',
                            borderRadius: 30,
                            textAlign: 'center',
                          },
                          label: { fontSize: 14, display: 'block', textAlign: 'center' },
                        }}
                      />
                    </Group>
                  </RadioGroup>
                )}
              />
            </Box>

            {apiError && (
              <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Error">
                <Text color="red" style={{ fontSize: 12 }}>
                  {apiError}
                </Text>
              </Modal>
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
                가입하기
              </Button>
            </Center>
          </Box>
          <Center style={{ marginTop: 15 }}>
            <Text>이미 회원이신가요?</Text>
            <a href="/login" style={{ marginLeft: 8, fontSize: 12, color: '#5534DA' }}>
              로그인하기
            </a>
          </Center>
        </Box>
      </Container>
    </MantineProvider>
  );
};

export default SignupPage;
