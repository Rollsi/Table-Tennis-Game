# Table Tennis Game

A classic Table Tennis (Ping Pong) game built with HTML5 Canvas, CSS, and pure JvaScripat. Play against a computer opponent in this responsive and customizable implementation.


## Features

- Smooth paddle and ball movements
- Realistic ball physics with angle-based bouncing
- Adjustable ball speed using a slider control (3-15 speed units)
- Score tracking system
- Responsive computer AI opponent
- Clean and modern UI with a dark theme
- Dashed center line for better visual appeal

## How to Play

1. Use the **Up** and **Down** arrow keys to move your paddle (left side)
2. Adjust the ball speed using the slider above the game canvas
3. Try to get the ball past the computer's paddle to score points
4. First player to reach the desired score wins!

## Technical Details

The game is built using:
- HTML5 Canvas for rendering
- Pure JavaScript for game logic
- CSS for styling and layout
- Responsive design principles

Key technical features:
- Collision detection system
- Dynamic ball angle calculation based on paddle hit position
- Real-time speed adjustment without breaking ball direction
- Optimized game loop using requestAnimationFrame
- Modular code structure for easy maintenance

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Rollsi/table-tennis-game.git
```

2. Open `index.html` in your web browser

No additional dependencies or build steps required!

## Code Structure

- `index.html` - Game structure and canvas element
- `style.css` - Game styling and layout
- `script.js` - Game logic and controls

## Customization

You can easily customize the game by modifying these variables in `script.js`:
- `paddleWidth` - Width of the paddles
- `paddleHeight` - Height of the paddles
- `ballSize` - Size of the ball
- `canvas.width` - Game width
- `canvas.height` - Game height
- `player.speed` - Player paddle speed
- `computer.speed` - Computer paddle speed

## Browser Compatibility

The game works on all modern browsers that support HTML5 Canvas:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Feel free to fork this project and submit pull requests. You can also open issues for bugs or feature requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by classic Pong arcade game
- Built for educational purposes
- Special thanks to the HTML5 Canvas community

## Author

Robel samuel
- GitHub: [@Rollsi](https://github.com/Rollsi)
- LinkedIn: [Robel Samuel](https://www.linkedin.com/in/robel-samuel-305bb8205/)

---
⭐ Star this repository if you find it helpful! 
