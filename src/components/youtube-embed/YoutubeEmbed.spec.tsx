import { render } from '@testing-library/react';
import YoutubeEmbed from './YoutubeEmbed';

describe('YoutubeEmbed Component', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <YoutubeEmbed embedid=''/>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
