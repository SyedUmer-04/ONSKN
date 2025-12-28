import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';

function GetStarted({navigation}: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={asset.logoIcon} style={styles.logo} />
          <Image source={asset.lineIcon} style={styles.lineIcon} />
        </View>

        <View style={styles.row}>
          <Image
            source={asset.moisturizerSplashImage}
            style={styles.gridImage1}
          />
          <Image
            source={asset.lifeStyleCleanserImage}
            style={styles.gridImage2}
          />
        </View>
        <View style={styles.row2}>
          <Image source={asset.lifeStyleSerumImage} style={styles.gridImage3} />
          <Image source={asset.lifestyleBoxesImage} style={styles.gridImage4} />
        </View>

        <View style={styles.sloganTexts}>
          <Text style={styles.slogan}>Radiant Skin Starts Here</Text>
          <Text style={styles.tagline}>
            Enhance your natural glow and shine effortlessly with radiant,
            healthy skin
          </Text>
        </View>

        <TouchableOpacity style={styles.getStartedView} onPress={() => navigation.navigate('SignIn')}>
          <View style={styles.getStartedTextArrow}>
            <Text style={styles.getStartedText}>Get Started</Text>
            <Image
              source={asset.getStartedArrow}
              style={styles.getStartedArrow}
            />
          </View>
          <View>
            <Image source={asset.getStartedArrowBG} style={styles.arrowBG} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Bg,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 9,
  },

  logoContainer: {
    width: vw * 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    height: vh * 10,
    width: vw * 40,
    resizeMode: 'contain',
  },

  lineIcon: {
    width: vw * 10,
    resizeMode: 'contain',
    position: 'relative',
    transform: [{ rotate: '90deg' }],
    left: vw * 5,
  },

  gridImage1: {
    height: vh * 18,
    width: vw * 40,
    resizeMode: 'contain',
    marginRight: vw,
  },

  gridImage2: {
    height: vh * 34,
    width: vw * 40,
    resizeMode: 'contain',
    marginLeft: vw,
  },

  gridImage3: {
    height: vh * 34,
    width: vw * 40,
    resizeMode: 'contain',
    marginRight: vw,
  },

  gridImage4: {
    height: vh * 18,
    width: vw * 40,
    resizeMode: 'contain',
    marginLeft: vw,
  },

  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: vh * 2,
  },

  row2: {
    position: 'relative',
    flexDirection: 'row',
    bottom: vh * 17,
    alignItems: 'flex-end',
  },

  sloganTexts: {
    position: 'relative',
    bottom: vh * 14,
    color: colors.text,
  },

  slogan: {
    fontSize: vw * 5,
    color: colors.text,
    fontWeight: '600',
  },

  tagline: {
    fontSize: vw * 3,
    color: colors.text,
    marginTop: vh,
  },

  getStartedView: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: 0,
    bottom: vw * 7,
  },

  getStartedTextArrow: {
    position: 'relative',
    left: vw * 4,
    top: vw * 3,
    zIndex: 1000,
  },

  getStartedArrow: {
    width: vw * 25,
    resizeMode: 'contain',
  },

  getStartedText: {
    marginBottom: -vh * 4,
    fontWeight: 700,
  },

  arrowBG: {
    height: vh * 17,
    width: vw * 14,
    resizeMode: 'contain',

  }
});

export default GetStarted;
