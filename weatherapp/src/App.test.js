import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

async function dataFetch() {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=Wellington&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
  const json = await res.json()
  return json
}

describe('dataFetch', () => {
  test('fetch works', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve([]) })
      )
    const json = await dataFetch()
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/weather/?q=Wellington&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )

    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})