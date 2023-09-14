import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('testes do requisito 5', () => {
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
    const types = pokemonList.map(({ type }) => type);

    typePokemons.forEach((button) => {
      const actualType = types.filter((type) => type === button.textContent);
      const textButton = button.textContent;
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(actualType[0]);

      fireEvent.click(button);

      const pokemonListFiltered = pokemonList.filter(({ name }) => name === textButton);

      pokemonListFiltered.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        fireEvent.click(nextPokemon);
      });
    });
    fireEvent.click(all);
    expect(all).toBeInTheDocument();

    pokemonList.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
  });

  test('se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonElement = screen.getAllByTestId('pokemon-name');
    expect(pokemonElement.length).toBe(1);
  });
});
