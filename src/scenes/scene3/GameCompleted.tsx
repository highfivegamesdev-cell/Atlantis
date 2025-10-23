export const GameCompleted = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-75">
      <h1 className="text-4xl text-white mb-4">You did it!</h1>
      <p className="text-white text-center px-4">
        You completed the game! Thank you for participating in the adventure in
        Atlantis.
      </p>
    </div>
  );
};
