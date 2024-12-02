"use client";
import { useEffect, useState } from "react";
import dice1 from "../../assets/1.png";
import dice2 from "../../assets/2.png";
import dice3 from "../../assets/3.png";
import dice4 from "../../assets/4.png";
import dice5 from "../../assets/5.png";
import dice6 from "../../assets/6.png";

export default function DiceGame() {
  const [diceRoll, setDiceRoll] = useState<number | null>(1);
  const [score, setScore] = useState(0);

  // Optimized dice image selector
  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];
  const getDiceImage = (type: number) => diceImages[type - 1].src; // Access the .src property of StaticImageData

  useEffect(() => {
    // Initialize Telegram WebApp environment
    if (typeof window !== "undefined" && "Telegram" in window) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.MainButton.text = "Submit Score";
      tg.MainButton.show();
      tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify({ score })); // Send score to the bot
      });
    }
  }, [score]);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    setDiceRoll(result);
    setScore((prev) => prev + result); // Add result to the total score
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        marginTop: "50px",
      }}
    >
      <h1>Roll the Dice 🎲</h1>
      <p>Click the button below to roll the dice and increase your score!</p>

      {diceRoll !== null ? (
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <h2>You rolled: {diceRoll}</h2>
            <img
              src={getDiceImage(diceRoll)} // Use the .src here
              alt={`Dice showing ${diceRoll}`}
              style={{ width: "100px" }}
            />
          </div>
        </div>
      ) : (
        <div style={{ margin: "20px 0" }}>
          <h2>Roll the dice to start the game!</h2>
        </div>
      )}

      <h2>Total Score: {score}</h2>
      <button
        onClick={rollDice}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Roll Dice
      </button>
    </div>
  );
}
