import { ModelItem } from "@/interface";
import { Divider } from "./Divider";
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from "react";

interface ModelCardProps {
    modelItem: ModelItem;
    onDelete: (id: string) => void;
    onVisibilityChange: (id: string) => void;
    onSelect?: (id: string) => void;
    isSelected?: boolean;
}

export function ModelCard({ modelItem, onVisibilityChange, onDelete, onSelect, isSelected}: ModelCardProps) {
    return (
      <div 
        onClick={() => onSelect?.(modelItem?._id)}
        className={`w-full text-blue-900 rounded-lg shadow cursor-pointer 
        transition-colors duration-200
        hover:bg-gray-300
        ${isSelected ? 'bg-blue-200 hover:bg-blue-200' : ''}
      `}>
        <div className="flex-col justify-between items-center">
            <h3 className="text-base font-semibold text-blue-900">{modelItem.name}</h3>
            
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
        <Divider />
      </div>
    );
  }