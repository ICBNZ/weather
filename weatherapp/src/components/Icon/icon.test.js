import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import { Icon } from './icon';
import { data } from '../../test_data';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Icon />, div);
});

describe("receives weather data", () => {
    const wrapper = mount(<Icon overview={data.weather[0].main} />);
    it("accepts weather overview props", () => {
      expect(wrapper.props().overview).toEqual("Clouds");
    });
    it("sets icon to current weather", () => {
        const value = wrapper.find(".data-icon").text();
        expect(value).toEqual("3");
    });
});
  