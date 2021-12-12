import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import Weather from './weather';
import { data } from '../../test_data';

it('Weather renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Weather />, div);
});


describe("receives and displays weather data", () => {
    const wrapper = mount(<Weather weather={data} />);
    it("accepts weather props", () => {
      expect(wrapper.props().weather.name).toEqual("Wellington");
      expect(wrapper.props().weather.main.temp).toEqual(14.25);
    });
});