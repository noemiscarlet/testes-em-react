import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do requisito 2', () => {
  test('É exibida na tela a mensagem No favorite pokemon found'
  + 'caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />);
  });
});
