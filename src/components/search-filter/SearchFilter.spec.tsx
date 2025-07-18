import { render } from '@testing-library/react';
import SearchFilter from './SearchFilter';
import type { CategoryType } from '../../services/movie-list/type';

const mockData = {
  keyword: '',
  setKeyword: () => undefined,
  handleKeyDown: () => undefined,
  category: 'now_playing' as CategoryType,
  handleChangeCategory: () => undefined,
};

describe('SearchFilter Component', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <SearchFilter {...mockData}/>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
