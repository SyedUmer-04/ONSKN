import { Image, StyleSheet, View, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { Schema } from '../components/schema';
import { useState } from 'react';
import { showToast } from '../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { VerifyOtpAction } from '../redux/slicers/authSlice';

function ForgotPasswordStep2({navigation} : any) {
  const [loader, setLoaderVisibility] = useState(false)
  const dispatch = useDispatch()

  const onSubmitOTP = (data) => {
      setLoaderVisibility(true)
      const otpEmail = useSelector(state => state?.auth?.verifyOTPEmail)
      
  
      dispatch(VerifyOtpAction({email: otpEmail, ...data}))
      .unwrap()
      .then((res) => {
        console.log('OTP check successs ==> ', res);
        
        showToast({
            type: 'success',
            text1: 'Verified!'
          })

        navigation.navigate('ForgotPasswordStep3')
      })
      .catch((err) => {
        console.log('OTP check fail ==> ', err);
  
        showToast({
          type: 'error',
          text1: 'Invalid OTP',
          text2: err?.message,
        })
      })
      .finally(() => {
        setLoaderVisibility(false)
      })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.bgImage} source={asset.LoginBg} />
      <Image style={styles.logoIcon} source={asset.logoIcon} />

      <View style={styles.formContainer}>
        <CustomText textStyles={[styles.toggleText, styles.textUnderline]}>Step 2/3</CustomText>

        <View style={styles.headingContainer}>
          <TouchableOpacity>
            {/* <Image source={asset.} />*/}
          </TouchableOpacity>
          <CustomText textStyles={styles.forgotPasswordHeading}>Forgot Password?</CustomText>
        </View>


        <CustomText textStyles={styles.tagLine}>
          Please check your email for verification code. your code is 6 digital in length
        </CustomText>

        <Formik
          initialValues={{
            code: '',
          }}
          validationSchema={Schema.forgotPasswordStep2Schema}
          onSubmit={(data) => onSubmitOTP(data)}
        >
          {({ handleChange, errors, values, handleSubmit }) => (
            <>
              <CustomTextInput
                leftImageSource={asset.profileIcon}
                placeholder={'Enter the code'}
                placeholderColor={colors.text}
                key={'code'}
                isrequired={true}
                error={errors.code}
                onChangeText={handleChange('code')}
                value={values.code}
              />
              ({errors.code} &&
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.code}
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

  ToggleView: {
    flexDirection: 'row',
    paddingVertical: vh * 2,
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


export default ForgotPasswordStep2;
