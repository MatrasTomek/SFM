import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import AsideMenu from './AsideMenu';
import { clearSubcontarctor } from '../../data/actions';

jest.mock('../../data/actions', () => ({
	clearSubcontarctor: jest.fn(),
}));

const mockStore = configureStore({
	reducer: {
		test: (state = {}) => state,
	},
});

const renderWithProviders = (component) => {
	return render(
		<Provider store={mockStore}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};

describe('AsideMenu', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders all navigation links', () => {
		renderWithProviders(<AsideMenu />);

		expect(screen.getByText('Start')).toBeInTheDocument();
		expect(screen.getByText('Dodaj klienta')).toBeInTheDocument();
		expect(screen.getByText('Znajdź klienta')).toBeInTheDocument();
		expect(screen.getByText('Dopasowania')).toBeInTheDocument();
		expect(screen.getByText('Terminarz')).toBeInTheDocument();
	});

	test('menu starts in closed state', () => {
		renderWithProviders(<AsideMenu />);

		const wrapper = screen.getByRole('complementary').parentElement;
		expect(wrapper).toHaveStyle('left: -180px');
	});

	test('toggles menu open and closed when tap is clicked', () => {
		renderWithProviders(<AsideMenu />);

		const wrapper = screen.getByRole('complementary').parentElement;
		const tapButton = wrapper.querySelector('div[role="button"], div:first-child');

		fireEvent.click(tapButton);
		expect(wrapper).toHaveStyle('left: 0px');

		fireEvent.click(tapButton);
		expect(wrapper).toHaveStyle('left: -180px');
	});

	test('rotates arrow icon when menu is toggled', () => {
		renderWithProviders(<AsideMenu />);

		const svg = screen.getByRole('img', { hidden: true });
		const tapButton = svg.parentElement;

		expect(svg).toHaveStyle('transform: rotate(0deg)');

		fireEvent.click(tapButton);
		expect(svg).toHaveStyle('transform: rotate(-180deg)');

		fireEvent.click(tapButton);
		expect(svg).toHaveStyle('transform: rotate(0deg)');
	});

	test('dispatches clearSubcontarctor when add subcontractor link is clicked', () => {
		const mockDispatch = jest.fn();
		jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

		renderWithProviders(<AsideMenu />);

		const addLink = screen.getByText('Dodaj klienta');
		fireEvent.click(addLink);

		expect(mockDispatch).toHaveBeenCalledWith(clearSubcontarctor());
	});

	test('dispatches clearSubcontarctor when find subcontractor link is clicked', () => {
		const mockDispatch = jest.fn();
		jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

		renderWithProviders(<AsideMenu />);

		const findLink = screen.getByText('Znajdź klienta');
		fireEvent.click(findLink);

		expect(mockDispatch).toHaveBeenCalledWith(clearSubcontarctor());
	});

	test('does not dispatch clearSubcontarctor for other navigation links', () => {
		const mockDispatch = jest.fn();
		jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

		renderWithProviders(<AsideMenu />);

		fireEvent.click(screen.getByText('Start'));
		fireEvent.click(screen.getByText('Dopasowania'));
		fireEvent.click(screen.getByText('Terminarz'));

		expect(mockDispatch).not.toHaveBeenCalled();
	});

	test('navigation links have correct href attributes', () => {
		renderWithProviders(<AsideMenu />);

		expect(screen.getByText('Start').closest('a')).toHaveAttribute('href', '/');
		expect(screen.getByText('Dodaj klienta').closest('a')).toHaveAttribute('href', '/add-subcontractor');
		expect(screen.getByText('Znajdź klienta').closest('a')).toHaveAttribute('href', '/find-subcontractor');
		expect(screen.getByText('Dopasowania').closest('a')).toHaveAttribute('href', '/statistics');
		expect(screen.getByText('Terminarz').closest('a')).toHaveAttribute('href', '/calendar');
	});
});
