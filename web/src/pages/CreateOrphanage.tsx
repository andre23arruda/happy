import React, { FormEvent, useState, ChangeEvent } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import { useHistory } from 'react-router-dom'

import { FiPlus } from 'react-icons/fi'

import Sidebar from '../components/Sidebar'
import mapIcon from '../components/MapIcon'
import api from '../services/api'

import '../styles/pages/create-orphanage.css'

const MY_CITY_COORDINATES: LatLngTuple = [-19.016357, -57.6099105]


export default function CreateOrphanage() {

	const history = useHistory()

    const [position, setPosition] = useState({ latitude: 0, longitude: 0})
    const [name, setName] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [opening_hours, setOpeningHours] = useState('')
	const [open_on_weekends, setOpenOnWeekends] = useState(true)

    const [images, setImages] = useState<File[]>([])
    const [imagePreview, setImagePreview] = useState<string[]>([])

    function handleMapClick(event: any) {
      	setPosition({ latitude: event.latlng.lat, longitude: event.latlng.lng })
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		const dataForm = new FormData()
		dataForm.append('name', name)
		dataForm.append('whatsapp', whatsapp)
		dataForm.append('name', name)
		dataForm.append('about', about)
		dataForm.append('latitude', String(position.latitude))
		dataForm.append('longitude', String(position.longitude))
		dataForm.append('instructions', instructions)
		dataForm.append('opening_hours', opening_hours)
		dataForm.append('open_on_weekends', String(open_on_weekends))

		if (images.length > 0) {
			images.forEach(image => {
				dataForm.append('images', image)
			})
		}

		await api.post('orphanages/', dataForm)
		alert('Cadastro realizado com sucesso!')

		history.push('/map')
	}

	function handleSelectImages(event: ChangeEvent<HTMLInputElement> ) {
		if (!event.target.files) return
		const selectedImages = Array.from(event.target.files)
		setImages(selectedImages)

		const selectedImagePreview = selectedImages.map(selectedImage => {
			return URL.createObjectURL(selectedImage)
		})
		setImagePreview(selectedImagePreview)
	}

	return (
		<div id="page-create-orphanage">
			< Sidebar />

			<main>
				<form className="create-orphanage-form" onSubmit={ handleSubmit }>
					<fieldset>
						<legend>Dados</legend>

						<Map
							center={ MY_CITY_COORDINATES }
							style={ {width: '100%', height: 280} }
							zoom={ 15 }
							onclick={ handleMapClick }
						>
							<TileLayer
								url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${ process.env.REACT_APP_MAP_TOKEN }`}
							/>

							{ position.latitude !== 0 &&
								<Marker interactive={false} icon={ mapIcon } position={ [position.latitude, position.longitude ] } />
							}

						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input id="name" value={ name } onChange={ event => setName(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="whatsapp">Whatsapp</label>
							<input id="whatsapp" placeholder="67 32326565" value={ whatsapp } onChange={ event => setWhatsapp(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea id="name" maxLength={300} value={ about } onChange={ event => setAbout(event.target.value) }/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos <span>É possível selecionar mais de uma foto</span></label>

							<div className="images-container">
								{ imagePreview.map( (image, index) => (
									<img key={ `preview-image-${ index }` } src={ image } alt="Imagem selecionada" className="new-image"/>
								))}
								<label htmlFor="image[]" className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label>
								<input type="file" id="image[]" multiple onChange={ handleSelectImages } hidden/>
							</div>

						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea id="instructions" value={ instructions } onChange={ event => setInstructions(event.target.value) }/>
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horário de funcionamento</label>
							<input
								id="opening_hours"
								placeholder="8:00 - 18:00"
								value={ opening_hours } onChange={ event => setOpeningHours(event.target.value) }
							/>
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">Atende fim de semana</label>
							<div className="button-select">
								<button type="button" className={ open_on_weekends ? 'active' : ''} onClick={ () => setOpenOnWeekends(true) }>Sim</button>
								<button type="button" className={ !(open_on_weekends) ? 'not-active' : ''} onClick={ () => setOpenOnWeekends(false) }>Não</button>
							</div>
						</div>
					</fieldset>

					<button className="confirm-button" type="submit">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	)
}