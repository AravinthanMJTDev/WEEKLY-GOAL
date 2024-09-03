"use client";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import React from "react";

interface StatusProps {
  seriesData: {
    name: string;
    y: number;
    status: "onPar" | "ahead" | "behind";
    radius: string;
    innerRadius: string;
    icon: string;
    iconColor: string;
  }[];
  colors: Highcharts.ColorType[];
}

// Background and text colors based on status
const bgColorForStatus = {
  onPar: "#d8f7ca",
  ahead: "#9ad3fd",
  behind: "#f29d97",
};

const textColorForStatus = {
  onPar: "#499a25",
  ahead: "#1d87d7",
  behind: "red",
};

// Mapping status to icons
const statusIconComponent = {
  onPar: Check,
  ahead: ChevronUp,
  behind: ChevronDown,
};

const Status: React.FC<StatusProps> = ({ seriesData, colors }) => {
  return (
    <div className="min-w-[300px] flex flex-row justify-around sm:flex-col sm:items-start sm:ml-auto mt-5 text-slate-600">
      {seriesData.map((data, index) => {
        const IconComponent = statusIconComponent[data.status];
        return (
          <div key={index} className="flex flex-col space-y-4">
            <div
              key={index}
              className="flex flex-col justify-between sm:flex-row sm:space-x-2 "
            >
              <div
                className="w-full h-2 sm:w-2 sm:h-auto border rounded-xl"
                style={{ backgroundColor: colors[index], opacity: "1" }}
              ></div>

              <div className="flex flex-col justify-between sm:flex-row sm:space-x-2">
                <div className="flex flex-col">
                  <p>{data.name}</p>
                  <strong className="sm:text-4xl text-gray-700">
                    {data.y}%
                  </strong>
                </div>
                <div className="flex items-end">
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      backgroundColor: bgColorForStatus[data.status],
                      color: textColorForStatus[data.status],
                      borderRadius: "30px",
                      padding: "5px",
                      width: "120%",
                      justifyContent: "center",
                    }}
                    className="flex items-center"
                  >
                    <IconComponent className="w-auto h-auto" />
                    <span className="font-semibold mx-2">{data.status}</span>
                  </div>
                </div>
              </div>
            </div>
            {index < seriesData.length - 1 && (
              <div className="hidden sm:block w-auto h-px bg-slate-200"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Status;
