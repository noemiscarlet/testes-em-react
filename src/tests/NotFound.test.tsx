import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 4', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/alface' });
    const head = screen.getByRole('heading', { name: /page requested not found/i });
    expect(head).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem com o texto alternativo', () => {
    renderWithRouter(<App />, { route: '/alface' });
    const errorImage = screen.getByRole(
      'img',
      {
        name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
      },
    );

    expect(errorImage).toBeInTheDocument();
  });
});
