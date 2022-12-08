import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import Sidebar from '../components/Sidebar'
import mapIcon from '../components/MapIcon'

import api from '../services/api'

const ORPHANAGE_IMG_DEFAULT = 'http://localhost:3000/orphanage_default.png'

interface Orphanage {
	name: string
	latitude: number
	longitude: number
	about: string
	instructions: string
	opening_hours: string
	open_on_weekends: boolean
	images: string[]
}
interface HeaderParams { id: string }

export default function Orphanage() {
	const headerParams = useParams<HeaderParams>()
	// console.log(headerParams)
	const [ orphanage, setOrphanage ] = useState<Orphanage>() // Informações do orfanato
	const [ imageIndex, setImageIndex ] = useState(0) // Imagem atual exibida, começa com zero

	useEffect( () => {
		api.get(`happy/orphanages/${ headerParams.id }/`)
    .then(response => {
			// console.log(response.data);
			setOrphanage(response.data)
		})
	}, [headerParams.id] ) // tem que colocar dentro do array pq ele pode mudar

	if (!orphanage) { // Para dar aquela esperadinha
		return <p>Carregando...</p>
	}

  return (
    <div id="page-orphanage">
      < Sidebar />

      <main>
        <div className="orphanage-details">
        { orphanage.images ? (
          <img
            src={ orphanage.images[imageIndex] }
            alt={ orphanage.name }
          />
        ) : (
          <img
            src={ ORPHANAGE_IMG_DEFAULT }
            alt={ orphanage.name }
          />
        )}

          <div className="images">
            { orphanage.images?.map((image, index) => (
              <button
                key={`image_${index}`}
                className={ imageIndex === index ? 'active': ''}
                type="button"
                onClick={ () => { setImageIndex(index) } }
              >
                <img src={ image } alt={ orphanage.name } />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{ orphanage.name }</h1>
            <p>{ orphanage.about }</p>

            <div className="map-container">
              <Map
                center={ [orphanage.latitude, orphanage.longitude] }
                zoom={ 16 }
                style={{ width: '100%', height: 280 }}
                dragging={ false }
                touchZoom={ false }
                zoomControl={ false }
                scrollWheelZoom={ false }
                doubleClickZoom={ false }
              >
                <TileLayer
                  url={ `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${ process.env.REACT_APP_MAP_TOKEN }` }
                />

                <Marker
                  interactive={ false }
                  icon={ mapIcon }
                  position={ [orphanage.latitude, orphanage.longitude] }
                />
              </Map>

			        {/* Link para abrir rota no maps */}
              <footer>
                <a target="_blank" rel="noopener noreferrer" href={ `https://www.google.com/maps/dir/?api=1&destination=${ orphanage.latitude },${ orphanage.longitude }` }>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{ orphanage.instructions }</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />

                { orphanage.opening_hours }
              </div>

              { orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="not open-on-weekends">
                  <FiInfo size={32} color="#ba4b41" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  )
}