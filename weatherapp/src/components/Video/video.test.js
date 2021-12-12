import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import VideoBg from './video';
import { data } from '../../test_data';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VideoBg />, div);
});

describe("receives weather data", () => {
    const wrapper = mount(<VideoBg weather={data.weather[0].main} />);
    it("accepts weather props", () => {
      expect(wrapper.props().weather).toEqual("Clouds");
    });
    it("sets background video to current weather", () => {
        const value = wrapper.find("video").prop("src");
        expect(value).toEqual("clear.mp4");
    });
});
  