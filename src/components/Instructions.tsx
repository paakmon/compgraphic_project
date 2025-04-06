export function Instructions() {
  return (
    <div className="mt-5 flex w-full flex-col bg-white text-blue-900">
      <h3 className="text-lg font-semibold">Instructions</h3>
      <h2 className="pl-4 font-semibold">Camera Controls</h2>
      <p className="pl-8">W - Move up</p>
      <p className="pl-8">S - Move down</p>
      <p className="pl-8">A - Move left</p>
      <p className="pl-8">D - Move right</p>

      <h2 className="pl-4 font-semibold">Resolution Control</h2>
      <p className="pl-8">Q - Increase resolution</p>
      <p className="pl-8">E - Decrease resolution</p>
    </div>
  );
}