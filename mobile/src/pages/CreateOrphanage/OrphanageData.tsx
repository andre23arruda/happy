import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

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
		dataForm.append('open_on_weekends', String(open_on_weekends))

		images.forEach((image, index) => {
			dataForm.append('images', {
        name: `image_${ index }.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    });

		await api.post('orphanages/', dataForm)
		Alert.alert('Uhulll!','Cadastro realizado com sucesso!')

		navigation.navigate('OrphanagesMap')
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
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

      <Text style={styles.label}>Horario de visitas</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesContainer: {
    flexDirection: 'row',
  },

  imagePreview: {
    width: 64,
    height: 64,
    margin: 2,
    borderRadius: 5,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 10,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  }
})