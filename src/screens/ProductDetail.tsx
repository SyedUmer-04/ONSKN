import {
    Image,
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { asset } from '../assets/asset';
  import { vh, vw } from '../utils/measurements';
  import { colors } from '../utils/theme';
  import { useEffect, useRef, useState } from 'react';
  import { Text } from 'react-native-gesture-handler';
  
  
function ProductDetails({ navigation }: any) {
  
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={asset.productImage} />
        <View style={styles.topBarView } >
            <Image source = {asset.backIcon} style={styles.topBarIcons}/>
            <View>
                <Text style={styles.heading} >Product Details</Text>
                <Image source={asset.heartIcon} style={styles.topBarIcons} />
            </View>
        </View>
  
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
        
        </View>
           
        {/* </ScrollView> */}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },

    topBarView: {
        position: 'absolute',
        top: vh * 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

    heading : {

    },

    topBarIcons:{
        height: vh * 6,
        width: vw * 8
    },

    bgImage: {
        height: vh * 35,
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
});

export default ProductDetails;
