import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
}
global.navigator = { geolocation: mockGeolocation }