import { render } from '@testing-library/react';
import PaginationButton from './PaginationButton';

const mockData = {
  currentPage: 2,
  totalPage: 10,
  onClickPageChange: () => undefined,
};

describe('PaginationButton Component', () => {
  it('should render correctly', () => {
    const { baseElement } = render(
      <PaginationButton {...mockData}/>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
