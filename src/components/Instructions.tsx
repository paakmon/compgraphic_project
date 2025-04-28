export function Instructions() {
  return (
    <div className="mt-5 flex w-full flex-col bg-white text-blue-900">
      <h3 className="text-lg font-semibold">Instructions</h3>
      <h2 className="pl-4 font-semibold">Camera Controls</h2>
      <p className="pl-8">W/S: Move up/down</p>
      <p className="pl-8">A/D: Move left/right</p>
      <p className="pl-8">Q/E: Rotate left/right</p>
      <p className="pl-8">I/O: Zoom in/out</p>

      <h2 className="pl-4 font-semibold">Model Controls</h2>
      <p className="pl-8">Select a model in Model Manager</p>
      <p className="pl-8">1: Translate</p>
      <p className="pl-8">2: Rotate</p>
      <p className="pl-8">3: Scale</p>
    </div>
  );
}
