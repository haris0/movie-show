import { render } from '@testing-library/react';
import Home from './Home';

describe('Home Page', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <Home />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
