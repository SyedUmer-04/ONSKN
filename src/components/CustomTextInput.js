import {
  Image,
  StyleSheet,
  TextInput,
  View,
  ImageURISource,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../utils/theme';
import { vh, vw } from '../utils/measurements';
import CustomText from './CustomText';
import { maxWorkers } from '../../metro.config';
import { asset } from '../assets/asset';
import { useState } from 'react';

interface textInputI {
  leftImageSource?: ImageURISource;
  rightImageSource?: ImageURISource;
  label?: String;
  placeholder: String;
  placeholderColor?: String;
  isrequired?: Boolean;
  inputStyle?: ViewStyle;
  secureText?: Boolean;
}

const CustomTextInput = props => {
  const [isHidden, setIsHidden] = useState(() => !!rightImageSource) 

  const {
    leftImageSource,
    rightImageSource,
    label,
    placeholder,
    placeholderColor = colors.LoginText,
    isrequired,
    inputStyle,
    rightImageFunction
  } = props;
  return (
      <View style={styles.inputContainer}>
        {leftImageSource && (
          <Image style={styles.image} source={leftImageSource} />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          cursorColor={colors.LoginText}
          secureTextEntry={isHidden}
          {...props}
        />
        {rightImageSource && (
          rightImageFunction ?
            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
              <Image style={styles.image} source={rightImageSource} />
            </TouchableOpacity> 
          : 
            <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
              <Image style={styles.image} source={rightImageSource} />
            </TouchableOpacity>
        )}
      </View>
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    height: vh * 6,
    flexDirection: 'row',
    backgroundColor: colors.white,
    alignItems: 'center',
    borderRadius: vw,
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginTop: vh * 2,
  },

  input: {
    flex: 1,
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: vw * 3.5,
  },

  image: {
    marginVertical: vh,
    marginHorizontal: vh * 1.5,
    height: vh * 2.5,
    width: vw * 5,
    resizeMode: 'contain',
  },
});

export default CustomTextInput;
