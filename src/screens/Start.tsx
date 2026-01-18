import { Image, StyleSheet, View } from 'react-native';
import { colors } from '../utils/theme';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import React, { use, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Start({navigation}: any) {
    const token = useSelector(state => state?.auth?.token);
    const user = useSelector(state => state?.auth?.user);

  useEffect(() => {

    const timer = setTimeout(() => {
      if (token) {
        navigation.replace('Home'); 
      } else {
        navigation.replace('SignIn');
      }
    }, 3000); 

    return () => clearTimeout(timer); // Cleanup
  }, [navigation, token]);

  return (
    <View style={styles.start}>
      <Image style={styles.image} source={asset.logoIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  start: {
    flex: 1,
    backgroundColor: colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: vw * 70,
    resizeMode: 'contain',
  },
});

export default Start;
