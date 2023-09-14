import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('testes do requisito 2', () => {
  test('se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon'
  + 'da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(nextPokemon).toBeInTheDocument();
  });

  test('se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const typePokemons = screen.getAllByTestId('pokemon-type-button');
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const all = screen.getByRole('button', { name: /all/i });

    typePokemons.forEach((button) => {
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const textButton = button.textContent;
      const pokemonListFiltered = pokemonList.filter(({ name }) => name === textButton);

      pokemonListFiltered.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        fireEvent.click(nextPokemon);
      });
    });

    expect(all).toBeInTheDocument();
  });
  test('', () => {});
  test('', () => {});
});
