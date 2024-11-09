
# Maze Runner

**Maze Runner** is a 3D game built using **Three.js** for rendering, featuring basic physics, player movement, and game mechanics such as collecting coins. The game is designed with realistic physics and includes a dynamic leaderboard and user interface to track performance.

## Features

- **Realistic Physics**: The player experiences gravity, jumping, and collision detection with the ground plane.
- **3D World**: The game world is rendered with a dynamic skybox, player controls, and moving coins scattered across the ground.
- **Camera Control**: The camera follows the player from behind, providing a dynamic view of the action.
- **Coin Collection**: The player collects coins scattered across the world, earning points as they move through the maze.
- **Leaderboard**: Displays a list of players with their scores.
- **Responsive Design**: The game adjusts to different screen sizes and works across devices.

## Game Controls

- **Arrow keys**: Move the player in 3D space (Up, Down, Left, Right).
- **Spacebar**: Jump to navigate through the maze.
  
## Tech Stack

- **Three.js**: A 3D library used for rendering the game world, handling player models, camera setup, and objects like coins.
- **Cannon.js**: A physics engine used to handle realistic player movement and interactions with the environment.
- **TypeScript**: Provides type safety and enhances the development experience.
- **Bun & Vite**: A fast and modern development environment used for bundling and building the game.

## File Structure

The project is organized as follows:

```
maze-runner/
├── src/
│   ├── objects/
│   │   ├── coin.object.ts          # Defines coin logic and animation
│   │   ├── ground.object.ts        # Ground plane and its physics
│   │   ├── player.object.ts        # Player object with movement and physics
│   ├── scenes/
│   │   └── index.scene.ts          # Main game scene where objects are added
│   ├── ui/
│   │   ├── components/
│   │   │   ├── game-status.component.ts # Displays game stats like score
│   │   │   ├── game-leaderboard.component.ts # Displays player leaderboard
│   ├── utils/
│   │   └── random.utils.ts         # Helper functions for random number generation (e.g., for coin positioning)
│   ├── __mock__/
│   │   └── player.mock.ts          # Mock player data for the leaderboard
│   ├── main.ts                     # The entry point that initializes the game
│   ├── style.css                   # Global CSS styles for the game
├── assets/                         # Contains 3D assets like textures and models
├── package.json                    # Contains dependencies and scripts
├── README.md                       # This file
└── tsconfig.json                   # TypeScript configuration
```

## Packages Used

- **three**: For 3D rendering and object management in the game.
- **cannon**: For physics, including collision detection and realistic movement.
- **vite**: For bundling the application and providing a development server.
- **bun**: A fast JavaScript bundler used for building the game.

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/maze-runner.git
   cd maze-runner
   ```

2. **Install dependencies:**

   Using **npm**:
   ```bash
   npm install
   ```

   Or, if using **bun**:
   ```bash
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Or, with **bun**:

   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to start playing.

## Code Explanation

### `GamePlayer` Class

- **Constructor**: Initializes the player with a `THREE.Mesh` object, velocity, and basic physics properties (gravity and jump force).
- **move()**: Moves the player based on input.
- **jump()**: Makes the player jump by applying an upward force if they are on the ground.
- **update()**: Handles the physics of the player, including gravity and collision with the ground.

### `GroundPlane` Class

- **Constructor**: Creates a large ground plane using `THREE.PlaneGeometry` with a standard material and places it at the specified position.
- **getMesh()**: Returns the ground plane mesh to be added to the scene.

### `GameScene` Class

- **Constructor**: Initializes the main scene, camera, and renderer. It also sets up lights and the background.
- **addSkyBox()**: Adds a skybox to the scene using a set of 6 textures.
- **render()**: Renders the scene with the current camera.
- **updateCameraPosition()**: Keeps the camera positioned behind the player to follow them during the game.

### `Game` Class

- **Constructor**: Initializes the game, including setting up the scene, player, ground, coins, and UI components (leaderboard and game status).
- **handlePlayerControls()**: Listens for key events and updates the player's movement based on input.
- **animate()**: The main game loop that updates the player's position, renders the scene, and updates the camera's position.

### `Coin` Class

- **Constructor**: Creates coin objects that are randomly placed in the world.
- **animateCoins()**: Moves the coins and handles their animation (if applicable).

### `UI Components`

- **game-status.component.ts**: Displays the current score, number of collected coins, and other game metrics.
- **game-leaderboard.component.ts**: Displays the leaderboard with player names and scores.

## Contributing

Feel free to fork this project and submit pull requests. If you want to report a bug or request a new feature, please create an issue in the GitHub repository.
