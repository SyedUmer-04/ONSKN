import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { useRef, useState } from 'react';
import { Schema } from '../components/schema';
import { useSelector, useDispatch } from 'react-redux';
import { SignUpAction } from '../redux/slicers/authSlice';
import Toast from 'react-native-toast-message';

function SignUp({navigation}) {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const dispatch = useDispatch();

  const signupSubmit = val => {
    setLoaderVisibility(true);

    const data = {
      name: 'simeone',
      email: val?.email,
      password: val?.password,
      token: 123,
    };

    dispatch(SignUpAction(data))
      .unwrap()
      .then(res => {
        console.log('response from Signup Component dispatch done!', res);

        showToast({
          type: 'success',
          text1: 'SignUp Successfull',
          text2: 'Login!',
        });

        navigation.navigate('SignIn')
      })
      .catch(err =>{
          showToast({ type: 'error', text1: 'Error Signing Up', text2: err?.message})
      }
      )
      .finally(() => setLoaderVisibility(false));
  };1

  const showToast = props => {
    Toast.show({
      type: props?.type,
      text1: props?.text1,
      text2: props?.text2,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1 }}
          > */}
      <Image style={styles.bgImage} source={asset.LoginBg} />
      <Image style={styles.logoIcon} source={asset.logoIcon} />

      <View style={styles.formContainer}>
        <View style={styles.ToggleView}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <CustomText textStyles={styles.toggleText}>Sign In</CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <CustomText textStyles={[styles.toggleText, styles.textUnderline]}>
              Sign Up``
            </CustomText>
          </TouchableOpacity>
        </View>

        <CustomText textStyles={styles.createAccountHeading}>
          Create Account
        </CustomText>

        <CustomText textStyles={styles.tagLine}>
          Welcome! Unlock Your Personalized Experience.
        </CustomText>

        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Schema.SignUpSchema}
          onSubmit={signupSubmit}
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
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              ({errors.email} &&
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.email}
              </CustomText>
              )
              <CustomTextInput
                label={'Password'}
                placeholder={'Enter your password'}
                placeholderColor={colors.text}
                leftImageSource={asset.lockIcon}
                rightImageSource={asset.eyeIcon}
                key={'password'}
                isrequired={true}
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
                ref={passwordRef}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
              />
              ({errors.password} &&{' '}
              <CustomText
                textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
              >
                {errors.password}
              </CustomText>
              )
              <CustomTextInput
                label={'Confirm Password'}
                placeholder={'Confirm your password'}
                placeholderColor={colors.text}
                leftImageSource={asset.lockIcon}
                rightImageSource={asset.eyeIcon}
                key={'confirmPassword'}
                isrequired={true}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                error={errors.confirmPassword}
                ref={confirmPasswordRef}
              />
              ({errors.confirmPassword} &&{' '}
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
                buttonText={'Sign Up'}
                buttonTextStyles={{
                  color: colors.white,
                  fontWeight: '900',
                  fontSize: vh * 2.5,
                }}
                loader={loaderVisibility}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>

        <CustomText
          textStyles={{
            color: colors.darkText,
            marginTop: vh * 2,
            flex: 1,
            textAlign: 'center',
            alignItems: 'flex-end',
          }}
        >
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <CustomText
              textStyles={{
                color: colors.Primary,
              }}
            >
              {' '}
              Sign In
            </CustomText>
          </TouchableOpacity>
        </CustomText>
      </View>
      {/* </ScrollView> */}
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
    color: colors.text,
    fontSize: vw * 4,
    marginRight: vw * 5,
    fontWeight: 700,
  },

  textUnderline: {
    borderBottomWidth: vw / 3,
    borderBottomColor: colors.Primary,
    paddingBottom: vh / 2,
  },

  createAccountHeading: {
    fontSize: vw * 8,
    fontWeight: 800,
    color: colors.text,
  },

  tagLine: {
    fontSize: vw * 3.5,
    color: colors.text,
  },

  extraLoginFeaturesConatainer: {
    flexDirection: 'row',
    marginBottom: vh,
    justifyContent: 'space-between',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: vh * 2,
    height: vh * 2,
    borderWidth: vw / 3,
    borderColor: colors.Primary,
    borderRadius: vw,
  },

  checkedBox: {
    backgroundColor: colors.Primary,
    borderColor: colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
  },

  tick: {
    color: colors.white,
    fontSize: vh,
    fontWeight: 'bold',
  },

  rememberMe: {
    color: colors.text,
    marginLeft: vw * 2,
    fontSize: vw * 3.5,
  },

  continueWithContainer: {
    marginTop: vh * 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  line: {
    height: vh / 20,
    width: vw * 10,
    backgroundColor: colors.darkText,
  },

  bottomIconContainer: {
    marginTop: vh * 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  appIconBox: {
    width: vh * 12,
    height: vh * 6,
    backgroundColor: colors.white,
    borderRadius: vh * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appIcon: {
    width: vh * 3,
    height: vw * 6,
    resizeMode: 'contain',
  },
});

export default SignUp;