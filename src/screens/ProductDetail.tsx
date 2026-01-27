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
import { addListener } from '@reduxjs/toolkit';


function ProductDetails({ navigation }: any) {
    const [counter, setCounter] = useState(0);
    const [toggleItem, setToggleItem] = useState('')

    return (
        <View style={styles.container}>
            <Image style={styles.bgImage} source={asset.productImage} />
            <View style={styles.topIconTextContainer} >
                <Image source={asset.whiteBackIcon} style={styles.topBarIcons} />
                <View style={styles.topHeadingView}>
                    <Text style={styles.topheadingText} >Product Details</Text>
                    <TouchableOpacity><Image source={asset.whiteHeartIcon} style={styles.topBarIcons} /></TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <Text style={styles.mainHeading}>Bundles</Text>

                <View style={styles.priceAndCountContainer}>
                    <Text style={styles.price}>$45</Text>
                    <View style={styles.counterContainer}>
                        <TouchableOpacity style={styles.cartCounterButtons} onPress={() => setCounter(counter - 1)}><Text style={styles.counterButtonText} >-</Text></TouchableOpacity>
                        <View style={styles.cartCounterButtons}><Text style={styles.counterButtonText}>{counter}</Text></View>
                        <TouchableOpacity style={styles.cartCounterButtons} onPress={() => setCounter(counter + 1)}><Text style={styles.counterButtonText} >+</Text></TouchableOpacity>
                    </View>
                </View>

                <View style={styles.toggleButtonContainer} >
                    { toggleItem == "Details" ?
                    <>
                        <TouchableOpacity style={[styles.toggleButtons,  {backgroundColor: colors.lightGrey}]} onPress={() => setToggleItem('Details')} ><Text style={styles.toggleButtonsText} >Details</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.toggleButtons} onPress={() => setToggleItem('Review')} ><Text style={styles.toggleButtonsText} >Review</Text></TouchableOpacity>
                    </> : <>
                        <TouchableOpacity style={styles.toggleButtons} onPress={() => setToggleItem('Details')} ><Text style={styles.toggleButtonsText} >Details</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.toggleButtons,  {backgroundColor: colors.lightGrey}]} onPress={() => setToggleItem('Review')} ><Text style={styles.toggleButtonsText} >Review</Text></TouchableOpacity>
                    </>
                    }
                </View>

                { toggleItem == 'Details' ?
                    <View style={styles.detailsReviewContainer}>
                        <Text style={styles.itemDetailsText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </Text>
                    </View>
                    :
                    <View>

                    </View>

                }
            </View>

                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add To Cart</Text>
                </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    topIconTextContainer: {
        position: 'absolute',
        top: vh * 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: vw * 7

    },

    topHeadingView: {
        flex: 1,
        marginLeft: vw * 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    topheadingText: {
        fontSize: vw * 5,
        color: colors.white,
        fontWeight: 500,
    },

    topBarIcons: {
        height: vh * 3,
        width: vw * 5,
        resizeMode: 'contain'
    },

    bgImage: {
        height: vh * 30,
        width: vw * 100,
        resizeMode: 'stretch',
    },

    body: {
        flex: 1,
        backgroundColor: colors.Bg,
        paddingVertical: vh * 3,
        paddingHorizontal: vw * 7,

    },
    
    mainHeading: {
        fontSize: vw * 8,
        fontWeight: 600,
        color: colors.text,
    },

    priceAndCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: vh,
    },

    price: {
        fontSize: vw * 5,
        fontWeight: 500,
        color: colors.black,
    },

    counterContainer: {
        flexDirection: 'row',
    },

    cartCounterButtons: {
        height: vh * 3.5,
        width: vh * 3.5,
        backgroundColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },

    counterButtonText: {
        fontSize: vw * 5,
        fontWeight: 300, 
    },

    toggleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: vh * 3
    },

    toggleButtons: {
        height: vh * 4,
        width: vw * 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: vh * 2,

    },

    toggleButtonsText: {
        fontSize: vw * 3.5,
        fontWeight: 500,

    },

    detailsReviewContainer: {
        flex: 1, 
        // backgroundColor: 'red'
    },

    itemDetailsText: {
        fontSize: vw * 4,
        color: colors.grey,
        marginTop: vh,
        lineHeight: vh * 2.5,
    },

    addToCartButton: {
        height: vh * 7,
        width: vw * 100,
        backgroundColor: colors.Primary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    addToCartText: {
        fontSize: vw * 4,
        fontWeight: 600, 
        color: colors.white
    }


});

export default ProductDetails;
