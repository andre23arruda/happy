import React, { useEffect, useState } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import {
	Image, View, ScrollView, Text,
	ActivityIndicator, TouchableOpacity, Linking
} from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Feather, FontAwesome } from '@expo/vector-icons'
import MapView, { Marker } from 'react-native-maps'

import api from '../services/api'
import mapMarkerImg from '../images/map-marker.png'

import styles from './OrphanageDetailsStyles'


const ORPHANAGE_IMG_DEFAULT = '../images/orphanage_default.png'

interface Orphanage {
	name: string
	whatsapp: string
	latitude: number
	longitude: number
	about: string
	instructions: string
	opening_hours: string
	open_on_weekends: boolean
	images: string[]
}

interface RouteParams {
	params: { id: number }
}

export default function OrphanageDetails() {

	const route = useRoute() as RouteParams
	const [ orphanage, setOrphanage ] = useState<Orphanage>()

	useEffect( () => {
		api.get(`orphanages/${ route.params.id }/`).then(response => {
		console.log(response.data)
		setOrphanage(response.data)
		})
	}, [route.params.id] ) // tem que colocar dentro do array pq ele pode mudar

	if (!orphanage) { // Aquela esperadinha
		return (
			<View style={styles.loading}>
				<ActivityIndicator color={"#fff"} size={ 30 }/>
			</View>
		)
	}

	function handleOpenGoogleMaps() {
		Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${ orphanage?.latitude },${ orphanage?.longitude }`)
	}

	const message = `Olá ${ orphanage.name }, gostaria de ter informações sobre o abrigo. Aguardo retorno.`
	function sendMessage() {
		Linking.openURL(`whatsapp://send?phone=55${ orphanage?.whatsapp }&text=${ message }`)
	}


	return (
		<ScrollView style={styles.container}>
			<View style={styles.imagesContainer}>
				<ScrollView horizontal pagingEnabled>
					{ orphanage.images.length == 0 ?
						<Image style={styles.image} source={ require(ORPHANAGE_IMG_DEFAULT) } />
					:
						orphanage.images.map((image, index) => (
							<Image key={ index } style={styles.image} source={{ uri: image }} />
						))
					}
				</ScrollView>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.title}>{ orphanage.name }</Text>
				<Text style={styles.description}>{ orphanage.about }</Text>

				<View style={styles.mapContainer}>
					<MapView
						initialRegion={{
							latitude: orphanage.latitude,
							longitude: orphanage.longitude,
							latitudeDelta: 0.008,
							longitudeDelta: 0.008,
						}}
						zoomEnabled={ false }
						pitchEnabled={ false }
						scrollEnabled={ false }
						rotateEnabled={ false }
						style={styles.mapStyle}
					>
						<Marker
							icon={mapMarkerImg}
							coordinate={{
								latitude: orphanage.latitude,
								longitude: orphanage.longitude
							}}
						/>
					</MapView>

					<TouchableOpacity onPress={ handleOpenGoogleMaps } style={styles.routesContainer}>
						<Text style={styles.routesText}>Ver rotas no Google Maps</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.separator} />

				<Text style={styles.title}>Instruções para visita</Text>
				<Text style={styles.description}>{ orphanage.instructions }</Text>

				<View style={styles.scheduleContainer}>
					<View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
						<Feather name="clock" size={40} color="#2AB5D1" />
						<Text style={[styles.scheduleText, styles.scheduleTextBlue]}>{ orphanage.opening_hours }</Text>
					</View>

					{ orphanage.open_on_weekends ?
						<View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
							<Feather name="info" size={40} color="#39CC83" />
							<Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
						</View>
					:
						<View style={[styles.scheduleItem, styles.scheduleItemRed]}>
							<Feather name="info" size={40} color="#FFF" />
							<Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
						</View>
					}
				</View>

				<RectButton style={styles.contactButton} onPress={ sendMessage }>
					<FontAwesome name="whatsapp" size={24} color="#FFF" />
					<Text style={styles.contactButtonText}>Entrar em contato</Text>
				</RectButton>
			</View>
		</ScrollView>
	)
}
