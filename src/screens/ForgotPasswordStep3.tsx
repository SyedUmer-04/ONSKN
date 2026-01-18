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
import { resetPasswordAction } from '../redux/slicers/authSlice';
import { showToast } from '../utils/toast';
import { useState } from 'react';

function ForgotPasswordStep3({navigation, route} : any) {

  const {email, otp} = route.params
  const dispatch = useDispatch()
  const [loader, setLoaderVisibility] = useState(false)

  const onPasswordChange = (data) => {
    setLoaderVisibility(true)
    const { password } = data


    dispatch(resetPasswordAction({email, otp, password}))
    .unwrap()
    .then((res) => {
      console.log("reset pass success =====> ", res);

      showToast({
        type: 'success',
        text1: 'Password changed successfully!',
        text2: 'Login now!'
      })

      navigation.navigate('SignIn')
      
    })
    .catch((err) => {
      console.log("reset pass error =====> ", err);

      showToast({
        type: 'error',
        text1: 'Error',
        text2: err?.message
      })
    })
    .finally(
      setLoaderVisibility(false)
    )
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image style={styles.bgImage} source={asset.LoginBg} />
      <Image style={styles.logoIcon} source={asset.logoIcon} />

      <View style={styles.formContainer}>
        <CustomText textStyles={[styles.toggleText, styles.textUnderline]}>Step 3/3</CustomText>

        <View style={styles.headingContainer}>
          <TouchableOpacity>
            {/* <Image source={asset.} />*/}
          </TouchableOpacity>
          <CustomText textStyles={styles.forgotPasswordHeading}>Forgot Password?</CustomText>
        </View>


        <CustomText textStyles={styles.tagLine}>
          Create a password
        </CustomText>

        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Schema.forgotPasswordStep3Schema}
          onSubmit={(data) => {onPasswordChange(data)}}
        >
          {({ handleChange, errors, values, handleSubmit }) => (
            <>
              <CustomTextInput
                leftImageSource={asset.profileIcon}
                placeholder={'Enter the password'}
                placeholderColor={colors.text}
                key={'password'}
                isrequired={true}
                error={errors.password}
                onChangeText={handleChange('password')}
                value={values.password}
              />
              ({errors.password} &&
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.password}
              </CustomText>
              )
              
              <CustomTextInput
                leftImageSource={asset.profileIcon}
                placeholder={'Confirm password'}
                placeholderColor={colors.text}
                key={'confirmPassword'}
                isrequired={true}
                error={errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
              />
              ({errors.confirmPassword} &&
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.confirmPassword}
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


export default ForgotPasswordStep3;
