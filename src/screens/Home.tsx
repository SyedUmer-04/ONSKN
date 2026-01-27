import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import { asset } from '../assets/asset';
import { vh, vw } from '../utils/measurements';
import { colors } from '../utils/theme';
import SwiperFlatList from 'react-native-swiper-flatlist';
import AlertModal from '../components/AlertModal';
import CustomText from '../components/CustomText';
import { ScrollView } from 'react-native-gesture-handler';

function Home({ navigation }: any) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={asset.navicon} style={styles.navicon} />
          <Image source={asset.logoIcon} style={styles.headerLogo} />
        </View>

        <View style={styles.body}>
          <View style={styles.greetAndIcons}>
            <View>
              <Text style={styles.greet}>Welcome!</Text>
              <TouchableOpacity>
                <Text style={styles.createAccount}>'USER'</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image source={asset.homeSearch} style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={asset.homeBag} style={styles.icons} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
                <Image source={asset.homefilter} style={styles.icons} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <SwiperFlatList
              index={1}
              showPagination
              paginationStyleItemActive={{ backgroundColor: colors.Primary }}
              paginationStyleItem={{
                width: vw * 2.5,
                height: vw * 2.5,

              }}
              paginationStyle={{ bottom: -vh * 5 }}
              data={[
                asset.sliderImage1,
                asset.sliderImage1,
                asset.sliderImage1,
              ]}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: vw * 90,
                    height: vh * 25,
                    justifyContent: 'center',
                    alignSelf: 'center',

                  }}
                >
                  <ImageBackground
                    source={item}
                    style={{ width: '100%', height: '100%' }} 
                  />
                </View>
              )}
            />
          </View>

          <View style={styles.categoryContainer}>
            <CustomText textStyles={styles.headings}>Categories</CustomText>

            <FlatList
              horizontal
              data={[
                asset.sliderImage1,
                asset.sliderImage1,
                asset.sliderImage1,
                asset.sliderImage1,
              ]}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  style={{
                    width: vw * 32,
                    height: vh * 9.5,
                    borderRadius: vw * 2,
                    marginRight: vw * 4,
                    resizeMode: 'contain',
                  }}
                />
              )}
            />
          </View>

          <View style={styles.ourProductsContainer}>
            <CustomText textStyles={styles.headings}>Our Products</CustomText>

            <FlatList
              horizontal
              data={[
                asset.sliderImage1,
                asset.sliderImage1,
                asset.sliderImage1,
                asset.sliderImage1,
              ]}
              renderItem={({ item }) => (
                <View style = {{flexDirection: 'column'}}>
                  <View style={{ flexDirection: 'column' }}>
                    <Image
                      source={item}
                      style={{
                        width: vw * 40,
                        height: vh * 11.75,
                        borderRadius: vw * 2,
                        marginRight: vw * 4,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text >Sweeter</Text>
                    <Text >$25</Text>
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                    <Image
                      source={item}
                      style={{
                        width: vw * 40,
                        height: vh * 11.75,
                        borderRadius: vw * 2,
                        marginRight: vw * 4,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text >Sweeter</Text>
                    <Text >$25</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* <AlertModal imgSource={asset.loginAlert} line1="Success!" line2="Your account has been created." navigation={navigation} navigateToScreen="SignIn"/> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: vh * 1.5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: vh * 1.5,
    paddingHorizontal: vw * 6,
  },

  headerLogo: {
    width: vw * 40,
    height: vh * 5,
    resizeMode: 'contain',
  },

  navicon: {
    width: vw * 6,
    height: vh * 3.5,
    resizeMode: 'contain',
    marginRight: vw * 20,
  },

  body: {
    flex: 1,
    backgroundColor: colors.Bg,
    // paddingLeft: vw * 6,
  },

  greetAndIcons: {
    flexDirection: 'row',
    paddingVertical: vh * 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: vw * 5,
  },

  greet: {
    color: colors.text,
  },

  createAccount: {
    color: colors.text,
    fontSize: vw * 6,
    fontWeight: 600,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  icons: {
    height: vw * 5,
    width: vw * 5,
    resizeMode: 'contain',
    margin: vw * 2,
  },

  sliderContainer: {
    height: vh * 25,
    marginBottom: vh * 4,
    marginHorizontal: vw * 5,

  },

  ourProductsContainer: {
    marginLeft: vw * 5,
  },

  categoryContainer: {
    marginLeft: vw * 5,
  },

  headings: {
    fontSize: vw * 6,
    fontWeight: '800',
    color: colors.text,
    marginVertical: vh * 2,
  },
});

export default Home;
