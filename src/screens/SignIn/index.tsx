import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import * as Yup from 'yup';

import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input'; 
import { PasswordInput } from '../../components/PasswordInput'; 

import theme from '../../styles/theme';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';

export function SignIn(){

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  async function handleSignIn(){
    try{
      const schema = Yup.object().shape({
        mail: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('A senha é obrigatoria')
      });
      await schema.validate({mail, password })
      Alert.alert('tudo OK');
      //fazer login
    }catch(error){
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      }else{
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
      }
    }
   
  }

  function handleNewAccount(){
    navigation.navigate('SignUpFirstStep');
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar {'\n'}
              uma esperiência incrível
            </SubTitle>
          </Header>
          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setMail}
              value={mail}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}          
            />        
          </Form>
          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled={true}
              loading={false }
            />
            <Button
              title='Criar conta gratuita'
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}