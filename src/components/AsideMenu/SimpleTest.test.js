import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

// Prostszy mock store bez redux-devtools-extension
const rootReducer = (state = {}, action) => state;
const mockStore = createStore(rootReducer);

const renderWithProviders = (component) => {
	return render(
		<Provider store={mockStore}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);
};

// Prosty test sprawdzający czy środowisko działa
describe('Simple Test', () => {
	test('should run basic test', () => {
		expect(1 + 1).toBe(2);
	});

	test('should render simple div', () => {
		renderWithProviders(<div>Test</div>);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
