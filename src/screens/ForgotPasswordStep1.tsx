import { Image, StyleSheet, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { Schema } from '../components/schema';
import { useDispatch } from 'react-redux';
import { ForgotPasswordAction } from '../redux/slicers/authSlice';
import Toast from 'react-native-toast-message';
import { showToast } from '../utils/toast';
import { useState } from 'react';

function ForgotPasswordStep1({navigation} : any) {
  const dispatch = useDispatch()
  const [loader, setLoaderVisibility] = useState(false)

  const onSubmitEmailInForgotPassword = (data) => {
    setLoaderVisibility(true)

    dispatch(ForgotPasswordAction(data))
    .unwrap()
    .then((res) => {
      console.log('Forgot Pass successs ==> ', res);
      

      showToast({
          type: 'success',
          text1: 'Email Sent!'
        })
    })
    .catch((err) => {
      console.log('Forgot Pass fail ==> ', err);


      showToast({
        type: 'error',
        text1: 'Error',
        text2: err?.message,
      })
    })
    .finally(() => {
      navigation.navigate('ForgotPasswordStep2')
      setLoaderVisibility(false)
    })

    
  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.bgImage} source={asset.LoginBg} />
      <Image style={styles.logoIcon} source={asset.logoIcon} />

      <View style={styles.formContainer}>
        <CustomText textStyles={[styles.toggleText, styles.textUnderline]}>Step 1/3</CustomText>

        <View style={styles.headingContainer}>
          <TouchableOpacity>
            {/* <Image source={asset.} />*/}
          </TouchableOpacity>
          <CustomText textStyles={styles.forgotPasswordHeading}>Forgot Password?</CustomText>
        </View>


        <CustomText textStyles={styles.tagLine}>
          Please enter your email to verify your identity.
        </CustomText>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Schema.forgotPasswordStep1Schema}
          onSubmit={(data) => onSubmitEmailInForgotPassword(data)}
        >
          {({ handleChange, errors, values, handleSubmit }) => (
            <>
              <CustomTextInput
                leftImageSource={asset.profileIcon}
                placeholder={'Enter your email'}
                placeholderColor={colors.text}
                key={'email'}
                isrequired={true}
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                onSubmitEditing={() => passwordRef?.current?.focus()}
              />
              ({errors.email} &&
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.email}
              </CustomText>
              )
              
              <CustomButton
                buttonStyle={{
                  width: vw * 90,
                  height: vh * 6.5,
                  marginVertical: vh * 2,
                }}
                buttonText={'Continue'}
                buttonTextStyles={{
                  color: colors.white,
                  fontWeight: '900',
                  fontSize: vh * 2.5,
                }}
                loader = {loader}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <CustomText
          textStyles={{
            fontSize:vw * 4,
            color: colors.darkText,
            marginTop: vh * 2,
            flex: 1,
            textAlign: 'center',
          }}
        >
          Back to
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <CustomText
              textStyles={{
                color: colors.Primary,
                fontSize: vw * 4,
                fontWeight: 700,
              }}
            >
              {' '}
              Login
            </CustomText>
          </TouchableOpacity>
        </CustomText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    height: vh * 25,
    width: vw * 100,
    resizeMode: 'cover',
    opacity: 1.5,
  },

  logoIcon: {
    width: vw * 55,
    height: vh * 15,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1000,
    alignSelf: 'center',
  },

  formContainer: {
    flex: 1,
    backgroundColor: colors.Bg,
    width: vw * 100,
    paddingHorizontal: vw * 5,
    paddingTop: vh * 6,
  },

  toggleText: {
    width: vw * 20,
    color: colors.text,
    fontSize: vw * 5,
    marginRight: vw * 5,
    fontWeight: 800,
  },

  textUnderline: {
    borderBottomWidth: vw / 3,
    borderBottomColor: colors.Primary,
    paddingBottom: vh / 2,
  },

  headingContainer: {
    flexDirection: 'row',
  },

  forgotPasswordHeading: {
    fontSize: vw * 8,
    fontWeight: 800,
    color: colors.text,
    marginTop: vh,
  },

  tagLine: {
    fontSize: vw * 3.5,
    color: colors.text,
  },
});


export default ForgotPasswordStep1;
