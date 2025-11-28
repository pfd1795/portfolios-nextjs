'use client';
import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Components
import { Button } from '@/components/common';
import { PopupModal } from '@/components/customized';
// Icons
import { IconRestartAlt } from '@/utils/IconsGoogle';

interface Card {
  index: number;
  symbol: string | number | React.JSX.Element;
  isFlipped: boolean;
  isMatched: boolean;
}

interface GameState {
  board: Card[];
  flippedCards: number[];
  moves: number;
  isGameWon: boolean;
  isInteractionBlocked: boolean;
}

type GameAction =
  | { type: 'INITIALIZE_GAME' }
  | { type: 'FLIP_CARD'; index: number }
  | { type: 'HANDLE_MATCH'; indices: number[] }
  | { type: 'RESET_FLIPPED' }
  | { type: 'INCREMENT_MOVES' }
  | { type: 'BLOCK_INTERACTION'; isBlocked: boolean };

const CARD_FLIP_DELAY = 1000;
const SYMBOL_POOL = ['🐒', '🐨', '🐸', '🐼', '🐻', '🦁'];

const initialState: GameState = {
  board: [],
  flippedCards: [],
  moves: 0,
  isGameWon: false,
  isInteractionBlocked: false,
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'INITIALIZE_GAME': {
      return {
        ...initialState,
        board: SYMBOL_POOL.concat(SYMBOL_POOL)
          .sort(() => Math.random() - 0.5)
          .map((symbol, index) => ({ index, symbol, isFlipped: false, isMatched: false })),
      };
    }
    case 'FLIP_CARD': {
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.index],
        board: state.board.map((card) =>
          card.index === action.index ? { ...card, isFlipped: true } : card
        ),
      };
    }
    case 'HANDLE_MATCH': {
      const isGameWon = state.board.every((card) =>
        card.isMatched || action.indices.includes(card.index)
      );
      return {
        ...state,
        flippedCards: [],
        board: state.board.map((card) =>
          action.indices.includes(card.index) ? { ...card, isMatched: true } : card
        ),
        isGameWon,
      };
    }
    case 'RESET_FLIPPED': {
      return {
        ...state,
        flippedCards: [],
        board: state.board.map((card) =>
          card.isMatched ? card : { ...card, isFlipped: false }
        ),
      };
    }
    case 'INCREMENT_MOVES': {
      return { ...state, moves: state.moves + 1 };
    }
    case 'BLOCK_INTERACTION': {
      return { ...state, isInteractionBlocked: action.isBlocked };
    }
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};

function Card({ card, onClick }: { card: Card; onClick: () => void }) {
  const { tones } = useThemeController();

  return (
    <div
      className={`${card.isFlipped ? tones.bgColor.dark : "bg-stone-800 hover:bg-stone-700"} rounded-xl flex items-center justify-center p-4 ${card.isFlipped ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      role="button"
      aria-label={card.isFlipped ? `Card with ${card.symbol} icon` : "Hidden card"}
    >
      <span className="text-7xl">{card.isFlipped ? card.symbol : '❔'}</span>
    </div>
  );
}

function MemoryGame() {
  const { state, dispatch } = useGame();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { UI_COLORS, tones } = useThemeController();

  const onCardClick = (index: number) => {
    if (
      state.isGameWon ||
      state.isInteractionBlocked ||
      state.flippedCards.includes(index) ||
      state.board[index].isFlipped
    ) return;

    dispatch({ type: 'FLIP_CARD', index });

    if (state.flippedCards.length === 1) {
      dispatch({ type: 'INCREMENT_MOVES' });
      dispatch({ type: 'BLOCK_INTERACTION', isBlocked: true });

      const [firstIndex] = state.flippedCards;
      const isMatch = state.board[firstIndex].symbol === state.board[index].symbol;

      setTimeout(() => {
        if (isMatch) {
          dispatch({ type: 'HANDLE_MATCH', indices: [firstIndex, index] });
        } else {
          dispatch({ type: 'RESET_FLIPPED' });
        }
        dispatch({ type: 'BLOCK_INTERACTION', isBlocked: false });
      }, CARD_FLIP_DELAY);
    }
  };

  const initializeGame = useCallback(() => {
    dispatch({ type: 'INITIALIZE_GAME' });
    setModalVisible(false);
  }, [dispatch]);

  useEffect(() => {
    setIsClient(true);
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (state.isGameWon) {
      setModalVisible(true);
    }
  }, [state.isGameWon]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <section className={`${UI_COLORS.container} rounded-xl p-4 space-y-4`}>
        <header className={`border-b-2 ${tones.borderColor.normal} pb-4 flex flex-col md:flex-row justify-between items-center gap-4`}>
          <h3 className="text-3xl font-bold text-nowrap">Juego de memoria</h3>

          <div className={`md:border-l-4 ${tones.borderColor.normal} md:pl-4 flex justify-between items-center w-full`}>
            <p className="text-xl">movimientos: {state.moves}</p>
            <Button onClick={initializeGame} text="reiniciar juego" rightIcon={<IconRestartAlt />} />
          </div>
        </header>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {state.board.map((card) => (
            <Card key={card.index} card={card} onClick={() => onCardClick(card.index)} />
          ))}
        </div>
      </section>

      <PopupModal show={isModalVisible} onClose={() => setModalVisible(false)}>
        <div className="p-4 flex flex-col justify-center text-center gap-4">
          <h2 className="text-3xl font-bold">¡Felicitaciones!</h2>
          <p>Completaste el juego en {state.moves} movimientos.</p>
          <Button text={"reiniciar juego"} onClick={initializeGame} styles={"self-center"} />
        </div>
      </PopupModal>
    </>
  );
}

export function AppMemoryGame() {
  return (
    <GameProvider>
      <MemoryGame />
    </GameProvider>
  );
}
