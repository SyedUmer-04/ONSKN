import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { Schema } from '../components/schema';
import { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native-gesture-handler';
import { getToken } from '../utils/notificationService';
import { LoginAction, setRememberMe } from '../redux/slicers/authSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';


function SignIn({ navigation }: any) {
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const [loginLoader, setLoginLoaderVisibility] = useState(false)

  useEffect(() => {
    const deviceToken = getToken()
  })

  const loginSubmit = async val => {
    setLoginLoaderVisibility(true)
    
    dispatch(LoginAction(val))
      .unwrap()
      .then(() => showToast({type:'success', text1: 'Congrats!!', text2: 'Login Successful'}))
      .catch(err => {
        showToast({type:'error', text1: "Error Signing In", text2: err})
        console.log("error from dispatch ====> ", err);
        
      })
      .finally(() => setLoginLoaderVisibility(false))

      isChecked &&  
      dispatch(setRememberMe({...val, token: getToken()})) 
  }



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
            <Text style={[styles.toggleText, styles.textUnderline]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.toggleText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.greetings}>Welcome Back</Text>

        <Text style={styles.tagLine}>
          Welcome! Unlock Your Personalized Experience.
        </Text>

        <Formik
          initialValues={{
            // email: '',
            // password: '',
            email: 'jamesanderson21@gmail.com',
            password: '1234567',
          }}
          validationSchema={Schema.LoginSchema}
          onSubmit={loginSubmit}
        >
          {({ handleChange, errors, values, handleSubmit }) => (
            <>
              <CustomTextInput
                leftImageSource={asset.profileIcon}
                placeholder={'Enter your email'}
                placeholderColor={colors.text}
                key={'email'}
                isrequired={true}
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email}
                onSubmitEditing={() => passwordRef?.current?.focus()}
              />

              {errors.email && (
                <CustomText
                  textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
                >
                  {errors.email}
                </CustomText>
              )}

              <CustomTextInput
                placeholder={'Enter your password'}
                placeholderColor={colors.text}
                leftImageSource={asset.lockIcon}
                rightImageSource={asset.eyeIcon}
                key={'password'}
                isrequired={true}
                secureText={true}
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
              />
              {errors.password && (
                <CustomText
                  textStyles={{ color: colors.red, alignSelf: 'flex-start' }}
                >
                  {errors.password}
                </CustomText>
              )}

              <CustomButton
                buttonStyle={{
                  width: vw * 90,
                  height: vh * 6.5,
                  marginVertical: vh * 2,
                }}
                buttonText={'Login into your Account'}
                buttonTextStyles={{
                  color: colors.white,
                  fontWeight: '900',
                  fontSize: vh * 2.5,
                }}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
        <View style={styles.extraLoginFeaturesConatainer}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isChecked && styles.checkedBox]}
              onPress={() => setIsChecked(!isChecked)}
            >
              {isChecked && <Text style={styles.tick}>✓</Text>}
            </TouchableOpacity>
            <CustomText textStyles={styles.rememberMe}>Remember Me</CustomText>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordStep1')}
          >
            <CustomText textStyles={{ color: colors.text }}>
              Forgot password?
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.continueWithContainer}>
          <View style={styles.line}></View>

          <CustomText
            textStyles={{
              color: colors.shadow,
              fontSize: vw * 4,
              fontWeight: 400,
              marginHorizontal: vw * 2,
            }}
          >
            Or Continue With
          </CustomText>

          <View style={styles.line}></View>
        </View>
        <View style={styles.bottomIconContainer}>
          <CustomButton
            buttonImgStyle={styles.appIcon}
            imgSrc={asset.googleIcon}
            buttonStyle={styles.appIconBox}
          />
          <CustomButton
            buttonImgStyle={styles.appIcon}
            imgSrc={asset.appleIcon}
            buttonStyle={styles.appIconBox}
          />
          <CustomButton
            buttonImgStyle={styles.appIcon}
            imgSrc={asset.facebookIcon}
            buttonStyle={styles.appIconBox}
          />
        </View>
        <CustomText
          textStyles={{
            color: colors.darkText,
            marginTop: vh * 2,
            flex: 1,
            textAlign: 'center',
          }}
        >
          Don't have an account?
          <CustomText
            textStyles={{
              color: colors.Primary,
            }}
            onPress={() => navigation.navigate('SignUp')}
          >
            {' '}
            Sign Up
          </CustomText>
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

  greetings: {
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

export default SignIn;
