import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiPlus, FiArrowRight } from 'react-icons/fi'

import '../styles/pages/orphanages-map.css'

import logoMap from '../images/map-marker.svg'
import mapIcon from '../components/MapIcon'
import api from '../services/api'

interface Orphanage {
	id: number
	name: string
	latitude: number
	longitude: number
}

function OrphanagesMap() {
	const [ orphanages, setOrphanages ] = useState<Orphanage[]>( [] )
	// isso é bem massa. O use statate nos retorna uma variável e uma função.
  // E essa função que será responsável por atualizar a variável
	// esse <Orphanage[]> informa que a variável será uma lista do tipo Orphanage
	// renderiza de acordo com mudança
  	useEffect( () => {
		api.get('orphanages/').then(response => {
			setOrphanages(response.data) // results porque está vindo do django
		})
	}, [] )

    return (
        <div id="page-map">
          <aside>
            <header>
              <img src={ logoMap } alt="Happy"/>
              <h2>Escolha um orfanato no mapa</h2>
              <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>

            <footer>
              <strong>Corumbá</strong>
              <span>Mato Grosso do Sul</span>
            </footer>
          </aside>

          <Map
            center={ [-19.016357,-57.6099105] }
            zoom={ 13 }
            style={ {width: '100%', height: '100%'} }
          >
            {/* API de map bostinha, mas funciona */}
            {/* <TileLayer
              url={ `https://a.tile.openstreetmap.org/{z}/{x}/{y}.png` }
            /> */}
            <TileLayer
              url={ `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${ process.env.REACT_APP_MAP_TOKEN }` }
            />

			{ orphanages.map(orphanage => {
				return (
					<Marker
						key={ orphanage.id }
						position={ [ orphanage.latitude, orphanage.longitude ] }
						icon={ mapIcon } >
						<Popup closeButton={ false } minWidth={ 240 } maxWidth={ 240 } className="map-popup">
							{ orphanage.name }

							<Link to={`/orphanages/${orphanage.id}`}>
							< FiArrowRight size={ 20 } color="#FFF"/>
							</Link>
						</Popup>


					</Marker>
				)
			})}
          </Map>

          <Link to="/orphanages/create" className="create-orphanage"> <FiPlus/> </Link>
        </div>
      )
}
export default OrphanagesMap