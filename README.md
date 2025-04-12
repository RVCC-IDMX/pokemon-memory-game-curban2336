# Pokémon Memory Game

A fun, interactive browser-based memory matching game featuring Pokémon! Test your memory by finding pairs of matching Pokémon cards.

<!-- ![Pokémon Memory Game](https://via.placeholder.com/800x400?text=Pokemon+Memory+Game) -->

## 🎮 Game Overview

The Pokémon Memory Game challenges players to find matching pairs of Pokémon cards. The game features:

- 12 cards arranged in a grid (6 unique Pokémon pairs)
- Randomly shuffled card positions for each new game
- Card flipping animations
- Match detection with visual feedback
- Game completion tracking
- Responsive design for all device sizes

Built using vanilla JavaScript with ES Modules, HTML5, and CSS3, this game fetches Pokémon data from the [PokéAPI](https://pokeapi.co/).

<!-- ## 🚀 Live Demo

Check out the live demo: [Pokémon Memory Game](https://your-pokemon-memory-game-url.netlify.app) -->

## 🛠️ Technologies Used

- **JavaScript (ES6+)** - Core game logic and DOM manipulation
- **HTML5 & CSS3** - Structure and styling with animations
- **ES Modules** - Modern JavaScript module system
- **Vite** - Fast development server and build tool
- **PokéAPI** - Data source for Pokémon information
- **Netlify** - Hosting and deployment

## 🎯 How to Play

1. Start a new game by loading the page
2. Click on any card to flip it and reveal a Pokémon
3. Try to remember the position of each Pokémon
4. Click a second card to find a matching Pokémon
5. If the two cards match, they stay face up
6. If they don't match, they flip back face down
7. Continue until all pairs are matched
8. Complete the game in as few moves as possible!

## ⚡ Features

- **Random Pokémon Selection**: Each game features a random set of Pokémon from all generations
- **Card Matching Logic**: Robust pair detection with user-friendly feedback
- **Game State Management**: Tracks flipped cards, matches, and game completion
- **Responsive Design**: Play on any device, from mobile to desktop
- **Error Handling**: Graceful handling of API failures or connectivity issues
- **Performance Optimized**: Fast loading and smooth animations

## 🖥️ Local Development

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (included with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokemon-memory-game.git
   cd pokemon-memory-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
pokemon-memory-game/
├── public/assets/      # Static assets (images, sounds)
│   └── pokeball.png    # Card back image
├── css/                # Stylesheets
│   └── styles.css      # Main stylesheet
├── js/                 # JavaScript modules
│   ├── app.js          # Main application logic
│   └── pokemon.js      # Pokémon API service
├── docs/               # Documentation
├── index.html          # Main HTML file
├── package.json        # Project metadata and dependencies
├── vite.config.mjs     # Vite configuration
└── README.md           # Project documentation
```

## 🧩 Game Implementation

The memory game is built using a feature branch workflow, with each game feature implemented incrementally:

1. **Create Pokémon Pairs**: Fetch and create pairs of identical Pokémon cards
2. **Track Card Selections**: Implement logic to track first and second card selections
3. **Match Detection**: Check if selected cards show the same Pokémon
4. **Game Completion**: Detect when all pairs have been found and show completion message
5. **Code Cleanup**: Refactor and optimize the codebase

## 🔄 API Usage

This game uses the free [PokéAPI](https://pokeapi.co/) to fetch Pokémon data. The API provides sprites, names, types, and other Pokémon information that we use to create the game cards.

## 📱 Responsive Design

The game is fully responsive and adapts to different screen sizes:
- **Desktop**: 4x3 grid for comfortable play
- **Tablet**: 3x4 grid with adjusted card sizes
- **Mobile**: 2x6 grid with optimized touch targets

## 🔮 Future Enhancements

Planned features for future updates:
- Score tracking based on moves and time
- Difficulty levels (more pairs, shorter display time)
- Sound effects and background music
- Theme selection (filter by Pokémon type or generation)
- Local leaderboard using localStorage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgements

- [PokéAPI](https://pokeapi.co/) for the Pokémon data
- [Vite](https://vitejs.dev/) for the excellent development experience
- Pokémon is a trademark of Nintendo, Game Freak, and Creatures Inc.
- This is a fan project for educational purposes and is not affiliated with or endorsed by the Pokémon brand.

---

Developed with ❤️ by [Christopher Urban]
