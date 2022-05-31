import React, { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';
import styles from './OrphanageDataStyles'

interface RouteParams {
  params: {
    position: {
      latitude: number,
      longitude: number,
    }
  }
}

export default function OrphanageData() {
  const navigation = useNavigation()
  const route = useRoute() as RouteParams
  const { latitude, longitude } = route.params.position

  const [ name, setName ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')
  const [ about, setAbout ] = useState('')
  const [ instructions, setInstructions ] = useState('')
  const [ opening_hours, setOpeningHours ] = useState('')
  const [ open_on_weekends, setOpenOnWeekends ] = useState(true)
  const [ images, setImages ] = useState<string[]>([])

  async function handleCreateOrphanage() {
    const dataForm = new FormData()
    dataForm.append('name', name)
    dataForm.append('whatsapp', whatsapp)
		dataForm.append('about', about)
		dataForm.append('latitude', String(latitude))
		dataForm.append('longitude', String(longitude))
		dataForm.append('instructions', instructions)
		dataForm.append('opening_hours', opening_hours)
		dataForm.append('open_on_weekends', open_on_weekends ? String(open_on_weekends) : '')

		images.forEach((image, index) => {
			dataForm.append('images', {
        name: `image_${ index }.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    });

		await api.post('happy/orphanages/', dataForm)
		Alert.alert('Uhulll!','Cadastro realizado com sucesso!')

		navigation.navigate('OrphanagesMap')
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Ops', 'Precisamos de acesso às suas fotos...')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) return
    const { uri: image } = result
    setImages([...images, image])

  }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={ name }
        onChangeText={ setName }
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        keyboardType='numeric'
        style={styles.input}
        value={ whatsapp }
        onChangeText={ setWhatsapp }
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={ about }
        onChangeText={ setAbout }
      />

      <Text style={styles.label}>Foto</Text>
      <ScrollView horizontal style={styles.imagesContainer }>
        { images.map( (image, index) => {
          return (
            <Image style={styles.imagePreview } key={ index } source={{ uri: image }} />
          )
        })}
      </ScrollView>

      <TouchableOpacity style={styles.imagesInput} onPress={ handleSelectImages }>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={ instructions }
        onChangeText={ setInstructions }
      />

      <Text style={styles.label}>Horário de visitas</Text>
      <TextInput
        style={styles.input}
        value={ opening_hours }
        onChangeText={ setOpeningHours }
        placeholder="8:00 - 18:00"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana? </Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={ open_on_weekends }
          onValueChange={ setOpenOnWeekends }
        />
      </View>

      <RectButton style={styles.nextButton} onPress={ handleCreateOrphanage }>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}
