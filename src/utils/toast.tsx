import Toast from "react-native-toast-message";

export const showToast = props => {
    Toast.show({
      type: props?.type,
      text1: props?.text1,
      text2: props?.text2,
    });
  };