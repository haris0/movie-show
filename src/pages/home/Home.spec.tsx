import { render } from '@testing-library/react';
import Home from './Home';

// Mock gif file imports as string
jest.mock('../../assets/loading.gif', () => 'mocked-gif-string');

describe('Home Page', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Home />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
