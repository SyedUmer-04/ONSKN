import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../utils/theme";
import { asset } from "../assets/asset";
import { vh, vw } from "../utils/measurements";

const Filter = ({navigation} : any) => {


    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <TouchableOpacity onPress={() => navigation.replace('Home')}>
                    <Image source={asset.backIcon} style={styles.backButton} />
                </TouchableOpacity>
                <Text style = {styles.heading}> Filter </Text>
            </View>

            <View style = {styles.categoryContainer}>
                <Text style = {styles.subHeading}> Category</Text>
                //Categories Here
            </View>

            <View style = {styles.priceRangeContainer}>
                <Text style = {styles.subHeading}> Price</Text>
                //Categories Here
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.Bg,
        paddingHorizontal: vw * 4,
    },

    header: {
        width: vw * 100,
        height: vh * 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vh * 4,
    },

    backButton: {
        height: vh * 4,
        width: vw * 8,
        marginRight: vw * 3,
    },

    heading:{
        fontSize: vw * 7,
        color: colors.text,
        fontWeight: 700,
    },

    categoryContainer: {
        height: vh * 20,
        marginTop: vh * 3,
    },

    priceRangeContainer: {
        height: vh * 20,
        marginTop: vh * 3,
    },

    subHeading: {
        fontSize: vw * 5,
        color: colors.text,
        fontWeight: 500,
    }
})


export default Filter;