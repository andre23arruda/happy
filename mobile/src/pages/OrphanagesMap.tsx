import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import api from '../services/api'

interface Orphanage {
	id: number
	name: string
	latitude: number
	longitude: number
}

export default function OrphanagesMap() {
    const navigation = useNavigation()

    const isFocused = useIsFocused()

    const [ orphanages, setOrphanages ] = useState<Orphanage[]>( [] )

    useEffect(() => {
        api.get(`orphanages/`).then(response => {
            setOrphanages(response.data)
        })
    }, [isFocused])

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id } )
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                initialRegion={ {
                latitude: -19.0058346,
                longitude: -57.6059316,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
                }}>

                { orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={ orphanage.id }
                            icon={ mapMarker }
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            {/* Aqui tem que passar uma arrowfunction. Se passar apenas a função, ela já será executada. */}
                            <Callout tooltip onPress={ () =>  handleNavigateToOrphanageDetails(orphanage.id)}>
                                <View style={ styles.calloutContainer }>
                                <Text style={ styles.calloutText }>{ orphanage.name }</Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}


            </MapView>

            <View style={ styles.footer }>
                <Text style={ styles.footerText }>{ `${ orphanages.length} orfanatos encontrados` }</Text>
                <TouchableOpacity style={ styles.createButton } onPress={ handleNavigateToCreateOrphanage }>
                    <Feather name='plus' size={ 20 } color='#FFF'></Feather>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutContainer: {
        width: 150,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    footerText: {
        color: '#8fa7b3',
    },
    createButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})