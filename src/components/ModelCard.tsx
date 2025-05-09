/**
 * ModelCard component to display individual model information and controls
 * it contains
 * - model's name
 * - visibility checkbox
 * - outline checkbox
 * - delete button
 * - outline adjustment
 *
 */

import { ModelItem } from "@/interface";
import { Divider } from "./Divider";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import Slider from "@mui/material/Slider";
import React from "react";

interface ModelCardProps {
  modelItem: ModelItem;
  onDelete: (id: string) => void;
  onVisibilityChange: (id: string) => void;
  onOutlineChange: (id: string) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
  onOutlineThicknessChange: (id: string, input: number) => void;
  onOutlineColorChangle: (id: string, input: string) => void;
}

export function ModelCard({
  modelItem,
  onVisibilityChange,
  onDelete,
  onSelect,
  isSelected,
  onOutlineChange,
  onOutlineThicknessChange,
  onOutlineColorChangle,
}: ModelCardProps) {
  return (
    <div
      onClick={() => onSelect?.(modelItem?._id)}
      className={`w-full text-blue-900 rounded-lg shadow cursor-pointer 
        transition-colors duration-200
        hover:bg-gray-300
        ${isSelected ? "bg-blue-200 hover:bg-blue-200" : ""}
      `}
    >
      <div className="flex-col justify-between items-center">
        <h3 className="text-base font-semibold text-blue-900">
          {modelItem.name}
        </h3>

        <div className="flex justify-between items-center">
          {/* Visibility Toggle */}
          <div className="flex items-center space-x-2 right-2">
            <span className="text-sm">Visible:</span>
            <Checkbox
              size="small"
              checked={modelItem.isVisible}
              icon={<VisibilityOffIcon />}
              checkedIcon={<VisibilityIcon />}
              onChange={(e) => {
                e.stopPropagation();
                onVisibilityChange(modelItem._id);
              }}
            />
          </div>
          {/* Outline Toggle */}
          <div className="flex items-center space-x-2 right-2">
            <span className="text-sm">Outline:</span>
            <Checkbox
              size="small"
              checked={modelItem.isOutline}
              icon={<SelectAllIcon />}
              checkedIcon={<CropSquareIcon />}
              onChange={(e) => {
                e.stopPropagation();
                onOutlineChange(modelItem._id);
              }}
            />
          </div>
          {/* Delete Button */}
          <div className="flex items-center space-x-1">
            <span className="text-sm">Delete:</span>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(modelItem._id);
              }}
            >
              <DeleteIcon
                fontSize="small"
                className="text-gray-600 hover:text-red-600 transition-colors"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="flex-col justify-between items-center">
        {/* Outline Thickness Slider */}
        Outline thickness:
        <Slider
          defaultValue={13}
          min={1}
          max={250}
          aria-label="Default"
          onChange={(e, value) => {
            e.stopPropagation();
            onOutlineThicknessChange(
              modelItem._id,
              typeof value === "number" ? value : 13
            );
          }}
          valueLabelDisplay="auto"
        />
        <div className="flex items-center">
          {/* Outline Color Picker */}
          Outline Color :
          <img src="/color-picker.svg" alt="color" className="h-6 w-6 m-0" />
          <input
            type="color"
            onChange={(e) => {
              e.stopPropagation();
              onOutlineColorChangle(modelItem._id, e.target.value);
            }}
            className="h-8 w-8 appearance-none p-0 border-none"
          />
        </div>
      </div>
      <Divider />
    </div>
  );
}
