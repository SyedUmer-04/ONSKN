import { FlatList, FlatListComponent, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../utils/theme"
import { asset } from "../assets/asset"
import { vh, vw } from "../utils/measurements"
import CustomTextInput from "../components/CustomTextInput"

const Search = ({navigation} : any) => {

    const itemsList = [1, 2, 3, 4, 5, 6, 7];
    // const itemsList = []; 



    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <TouchableOpacity onPress={() => navigation.replace('Home')}>
                    <Image source={asset.backIcon} style={styles.backIcon} />
                </TouchableOpacity>

                <Text style = {styles.heading}> Search </Text>

                <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={styles.filterButton}>
                    <Image source={asset.homefilter } style = {styles.filterIcon}/>
                </TouchableOpacity>
            </View>

            <View style = {styles.body}>
                 <CustomTextInput
                    leftImageSource={asset.homeSearch}
                    color={colors.text}
                    placeholder={'Search...'}
                    placeholderColor={colors.text}
                    rightImageSource ={asset.close}
                    // rightImageFunction= 
                    style = {styles.searchInput}
                    // onChangeText={()}
                 ></CustomTextInput>

                 { itemsList.length &&  

                 <View style = {styles.searchResults}>
                    <Text style = {styles.text}>Results</Text>
                    <Text style = {styles.itemsFoundText}>No. of items found: {itemsList.length}</Text>
                 </View>

                }

                 <FlatList
                    data={itemsList}
                    numColumns={2} // This creates the grid
                    key={2} // Changing numColumns requires a fresh 'key' to avoid errors
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle= {styles.flatlistRowStyle}
                    contentContainerStyle={{ paddingBottom: vh * 12, width: vw * 90, }}
                    renderItem={({item}) => (
                            <View style = {styles.renderedItemContainer}>
                                <View style = {styles.itemDetailContainer}>

                                    <Image source={asset.searchExampleImage} style={styles.itemImage} />

                                    <View style = {styles.itemDetails}>
                                        <Text style={styles.text} >Name</Text>
                                        <Image source={asset.heartIcon} style={styles.iconsInItemDetails} />
                                    </View>

                                    <View style = {styles.itemDetails} >
                                        <Text style={styles.text} >$Price</Text>
                                        <Image source={asset.bagIcon} style={styles.iconsInItemDetails} />
                                    </View>
                                </View>

                            </View>
                    )}

                 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Bg,
    },

    header: {
        height: vh * 8,
        width: vw * 100,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: vw * 5,


    },

    backIcon: {
        height: vh * 5,
        width : vw * 10,
        marginRight: vw * 2,
    },

    heading: {
        fontSize: vw * 7,
        fontWeight: 600,
        color: colors.text
    },

    filterButton: {
        flexDirection: 'row',  
        // alignSelf: 'baseline',
    },

    filterIcon: {
        height: vh * 2.5,
        width : vw *   5,
        resizeMode: 'contain',
    },

    body: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: vw * 5,
        paddingVertical: vh,
    },

    searchInput: {
     width: vw * 70,
     color: colors.Bg
    },

    searchResults: {
        width: vw * 90,
        height: vh * 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    text: {
        fontSize: vw * 3.5,
        fontWeight: 500,
        color: colors.text
    },

    itemsFoundText: {
        fontSize: vw * 3.5,
        fontWeight: 500,
        color: colors.lightGrey
    },

    flatlistRowStyle: {
        flex: 1,
        justifyContent: "space-between", 
        marginBottom: vh * 2,
    },

    renderedItemContainer: {
        flexDirection: 'row',
        height: vh * 33,
        marginBottom: vh ,
    },

    itemDetailContainer:{
        height: vh * 33,
        width: vw * 43,
        marginBottom: vh * 2,
    },

    itemImage: {
        height: vh * 25,
        width: vw * 43,
        borderRadius: vw * 5,
        resizeMode: 'contain',
        marginBottom: vh,
    },

    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: vw * 2,
        marginVertical: vh * 0.25,
    },

    iconsInItemDetails: {
        height: vh * 3,
        width: vw * 6,
    },

    // itemDetailText: {
    //     fontSize: vw * 9,
    //     fontWeight: 500,
    //     color:
    // },
})

export default Search