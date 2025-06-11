import variables from './variables.json';

export const antdTheme = {
	token: {
		colorPrimary: variables['$color-green-main'],
		fontFamily: 'Calibre-R, sans-serif',
	},
	components: {
		Typography: {
			fontSizeHeading1: 40,
			fontWeightStrong: 700,
			linkDecoration: 'underline',
			colorLink: variables['$color-green-light'],
			colorText: variables['$color-black'],
			fontSize: 18,
		},
		Tabs: {
			fontSize: 16,
			margin: 33,
		},
		Button: {
			colorBorder: variables['$color-green-main'],
			colorText: variables['$color-green-main'],
		},
		Upload: {
			colorText: variables['$color-green-main'],
			colorPrimary: variables['$color-green-main'],
		},
		Select: {
			controlHeight: 40,
			fontSize: 16,
		},
		DatePicker: {
			controlHeight: 40,
			fontSize: 16,
		},
	},
};
