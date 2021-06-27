import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Header(props: any) {
    const navigation = useNavigation()

    function handleNavigateToHome() {
        navigation.navigate('OrphanagesMap')
    }

    return (
        <View style={ styles.container }>
            <BorderlessButton onPress={ navigation.goBack }>
                <Feather name='arrow-left' size={ 24 } color='#15b6d6'></Feather>
            </BorderlessButton>

           <Text style={ styles.title }>{ props.title }</Text>
            { props.showCancel === false ?
                <View style={ styles.hidden }>
                    <Feather name='x' size={ 24 } color='#15b6d6'></Feather>
                </View>
             :
                <BorderlessButton onPress={ handleNavigateToHome }>
                    <Feather name='x' size={ 24 } color='#15b6d6'></Feather>
                </BorderlessButton>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: '#8fa7b3',
        fontSize: 16,
    },

    hidden: {
        opacity: 0,
    }
})