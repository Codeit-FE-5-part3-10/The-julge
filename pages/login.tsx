import { Box, Button, Center, Container, TextInput } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

  // console.log(watch('id'));
  // const [formVal, setFormVal] = useState<Inputs>({
  //   id: '',
  //   password: '',
  // });

  // const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const fieldValues = Object.fromEntries(formData.entries());
  //   console.log('iswork', fieldValues);
  // }, []);
  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    console.log('iswork', data);
  }, []);

  return (
    <Container p={32}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          my={24}
          {...register('id')}
          // onChange={(e) => setFormVal((prev) => ({ ...prev, id: e.target.value }))}
        />
        <TextInput
          my={24}
          {...register('password', { required: true })}
          // onChange={(e) => setFormVal((prev) => ({ ...prev, password: e.target.value }))}
        />
        {errors.password && <span>This field is required</span>}
        <Center>
          <Button w="100%" type="submit">
            로그인
          </Button>
        </Center>
      </Box>
    </Container>
  );
};

export default LoginPage;
