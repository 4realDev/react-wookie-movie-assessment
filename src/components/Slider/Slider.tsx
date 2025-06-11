import React from 'react';
import SlickSlider, { Settings } from 'react-slick';
import { IMovie } from 'types/movie';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlickSliderOverrides.scss';
import MovieItem from 'components/MovieItem/MovieItem';

type SliderProps = {
	sliderData: IMovie[];
};

type SliderArrowProps = {
	currentSlide?: number;
	slideCount?: number;
	className?: string;
	onClick?: () => void;
};

const GalleryPrevArrow = ({ currentSlide, slideCount, ...props }: SliderArrowProps) => {
	const { onClick } = props;

	return (
		<div
			{...props}
			className='custom-prevArrow'
			onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'>
				<path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
			</svg>
		</div>
	);
};
const GalleryNextArrow = ({ currentSlide, slideCount, ...props }: SliderArrowProps) => {
	const { onClick } = props;

	return (
		<div
			{...props}
			className='custom-nextArrow'
			onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'>
				<path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z' />
			</svg>
		</div>
	);
};

var settings: Settings = {
	dots: false,
	arrows: true,
	infinite: false,
	speed: 500,
	focusOnSelect: true,
	centerPadding: '0px',
	className: 'center',
	centerMode: false,
	slidesToShow: 5,
	// slidesToScroll: 5,
	nextArrow: <GalleryNextArrow />,
	prevArrow: <GalleryPrevArrow />,
	responsive: [
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 5,
				centerPadding: '0px',
			},
		},
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 5,
				centerPadding: '0px',
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				centerPadding: '0px',
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				centerPadding: '100px',
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				centerPadding: '60px',
			},
		},
	],
};

const Slider = ({ sliderData }: SliderProps) => {
	if (!Array.isArray(sliderData) || sliderData.length <= 0) {
		return null;
	}
	return (
		<SlickSlider {...settings}>
			{sliderData.map((movie) => (
				<MovieItem movie={movie} />
			))}
		</SlickSlider>
	);
};

export default Slider;
