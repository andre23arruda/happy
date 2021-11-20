import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import { useNavigation, useIsFocused } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import api from '../services/api'

import styles from './OrphanageMapStyles'

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
                initialRegion={{
                    latitude: -19.0058346,
                    longitude: -57.6059316,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}>

                { orphanages.map(orphanage => (
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
                        <Callout tooltip onPress={ () =>  handleNavigateToOrphanageDetails(orphanage.id)}>
                            <View style={ styles.calloutContainer }>
                                <Text style={ styles.calloutText }>{ orphanage.name }</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
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