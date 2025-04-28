/**
 * ModelManager component
 *
 * This component renders the right sidebar (Model Manager) for managing uploaded 3D models.
 * Users can:
 * - Toggle model visibility
 * - Toggle model's outline
 * - Delete individual models with confirmation
 *
 * Internally maps each model to a ModelCard, which handles per-model actions.
 */

import React from "react";
import * as AiIcons from "react-icons/ai";
import Link from "next/link";
import "./ModelManager.css";
import { IconContext } from "react-icons";
import { ModelCard } from "./ModelCard";
import { Divider } from "./Divider";
import { ModelItem } from "@/interface";

type ModelManagerProps = {
  models: ModelItem[];
  setModels: React.Dispatch<React.SetStateAction<ModelItem[]>>;
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
};

function ModelManager({
  models,
  setModels,
  selectedModelId,
  setSelectedModelId,
  isOpen,
  onClose,
}: ModelManagerProps) {
  const handleSelect = (id: string) => {
    if (selectedModelId === id) {
      setSelectedModelId(null); // Deselect
    } else {
      setSelectedModelId(id); // Select new model
    }
  };

  const handleVisibilityChange = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isVisible: !m.isVisible } : m))
    );
  };
  const handleOutlineChange = (id: string) => {
    console.log("change outline at", id);
    setModels((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isOutline: !m.isOutline } : m))
    );
  };
  const handleOutlineThicknessChange = (id: string, input: number) => {
    setModels((prev) =>
      prev.map((m) => (m._id === id ? { ...m, outLineThickness: input } : m))
    );
  };
  const handleOutlineColorChange = (id: string, input: string) => {
    setModels((prev) =>
      prev.map((m) => (m._id === id ? { ...m, outlineColor: input } : m))
    );
  };
  const deleteModel = (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (confirm) {
      setModels((prev) => prev.filter((m) => m._id !== id));
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav
          className={(isOpen ? "rnav-menu active" : "rnav-menu") + " h-screen"}
        >
          <div className="rnav-menu-items flex flex-col h-full">
            <div className="rnavbar-toggle" onClick={onClose}>
              <Link href="#" className="rmenu-bars">
                <AiIcons.AiOutlineClose style={{ color: "#1E3A8A" }} />
              </Link>
            </div>

            {/* Scrollable Area */}
            <div className="px-6 flex-1 overflow-y-auto">
              <h2 className="text-2xl font-semibold text-blue-900">
                Model Manager
              </h2>
              <Divider />

              {models.map((model) => (
                <ModelCard
                  key={model._id}
                  modelItem={model}
                  onSelect={() => handleSelect(model._id)}
                  isSelected={selectedModelId === model._id}
                  onVisibilityChange={handleVisibilityChange}
                  onDelete={deleteModel}
                  onOutlineChange={handleOutlineChange}
                  onOutlineThicknessChange={handleOutlineThicknessChange}
                  onOutlineColorChangle={handleOutlineColorChange}
                />
              ))}
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default ModelManager;
