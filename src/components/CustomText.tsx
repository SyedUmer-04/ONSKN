import { StyleSheet, Text, TextStyle } from "react-native";
import { colors } from "../utils/theme";
import { vh } from "../utils/measurements";
import { FC } from "react";

interface TexTI {
    textStyles?: TextStyle,
    children: React.ReactNode
    // onPress: React.ReactNode
}

const  CustomText: FC<TexTI> = ({ children, textStyles, onPress})=> {



    return (
        <Text style={[styles.text, textStyles, onPress={onPress}]}>
            {children}
        </Text>

    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.text,
        fontSize: vh * 1.5,
        margin: 0,
        padding: 0,

    }
})

export default CustomText;