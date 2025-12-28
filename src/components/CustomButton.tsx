import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import CustomText from './CustomText';

function CustomButton(props) {
  const {
    buttonStyle,
    buttonImgStyle,
    buttonText,
    buttonTextStyles,
    imgSrc,
    onPress,
    loader
  } = props
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]} {...props}>

      {loader ?

        <ActivityIndicator size="small" color={colors.darkText} />

        :

        <>
          {buttonText && (
            <CustomText textStyles={buttonTextStyles}>{buttonText}</CustomText>
          )}

          {imgSrc && <Image style={buttonImgStyle} source={imgSrc} />}
        </>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.button,
    borderRadius: vw,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CustomButton;
