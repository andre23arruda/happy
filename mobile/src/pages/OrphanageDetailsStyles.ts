import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
		flex: 1,
	},

	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	imagesContainer: {
		height: 240,
	},

	image: {
		width: Dimensions.get('window').width,
		height: 240,
		resizeMode: 'cover',
	},

	detailsContainer: {
		padding: 24,
	},

	title: {
		color: '#4D6F80',
		fontSize: 30,
	},

	description: {
		color: '#5c8599',
		lineHeight: 24,
		marginTop: 16,
	},

	mapContainer: {
		borderRadius: 20,
		overflow: 'hidden',
		borderWidth: 1.2,
		borderColor: '#B3DAE2',
		marginTop: 40,
		backgroundColor: '#E6F7FB',
	},

	mapStyle: {
		width: '100%',
		height: 150,
	},

	routesContainer: {
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},

	routesText: {
		color: '#0089a5',
		fontSize: 12,
	},

	separator: {
		height: 0.8,
		width: '100%',
		backgroundColor: '#D3E2E6',
		marginVertical: 40,
	},

	scheduleContainer: {
		marginTop: 24,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	scheduleItem: {
		width: '48%',
		padding: 20,
	},

	scheduleItemBlue: {
		backgroundColor: '#E6F7FB',
		borderWidth: 1,
		borderColor: '#B3DAE2',
		borderRadius: 20,
	},

	scheduleItemGreen: {
		backgroundColor: '#EDFFF6',
		borderWidth: 1,
		borderColor: '#A1E9C5',
		borderRadius: 20,
	},
	scheduleItemRed: {
		backgroundColor: '#f492a5',
		borderWidth: 1,
		borderColor: '#A1E9C5',
		borderRadius: 20,
	},
	scheduleText: {
		fontSize: 16,
		lineHeight: 24,
		marginTop: 20,
	},
	scheduleTextBlue: {
		color: '#5C8599'
	},

	scheduleTextGreen: {
		color: '#37C77F'
	},
	scheduleTextRed: {
		color: '#FFF'
	},
	contactButton: {
		backgroundColor: '#3CDC8C',
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		marginTop: 40,
	},

	contactButtonText: {
		color: '#FFF',
		fontSize: 16,
		marginLeft: 16,
	}
})