"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsSolidGauge from "highcharts/modules/solid-gauge";
import Status from "./status";
import { Ellipsis } from "lucide-react";

interface KPI_GaugesProps {
  seriesData: {
    name: string;
    y: number;
    status: string;
    radius: string;
    innerRadius: string;
    icon: string;
    iconColor: string;
  }[];
  title: string;
}

const KPI_Gauges: React.FC<KPI_GaugesProps> = ({ seriesData, title }) => {
  useEffect(() => {
    HighchartsMore(Highcharts);
    HighchartsSolidGauge(Highcharts);
  }, []);

  const [trackColors, setTrackColors] = useState<string[]>([]);

  useEffect(() => {
    const colors = Highcharts.getOptions().colors || [];
    const trackColors = colors.map((color) =>
      new Highcharts.Color(color).setOpacity(0.3).get()
    );
    setTrackColors(trackColors);

    function renderIcons(this: Highcharts.Chart) {
      this.series.forEach((series) => {
        if (!series.icon) {
          series.icon = this.renderer
            .text(
              `<i class="fa fa-${series.options.custom.icon}"></i>`,
              0,
              0,
              true
            )
            .attr({ zIndex: 10 })
            .css({
              color: series.options.custom.iconColor,
              fontSize: "1.5em",
            })
            .add(series.group);
        }

        const iconOffset =
          series.points[0].shapeArgs.innerR +
          (series.points[0].shapeArgs.r - series.points[0].shapeArgs.innerR) /
            2;

        series.icon.attr({
          x: this.chartWidth / 2 - 15,
          y: this.plotHeight / 2 - iconOffset + 8,
        });
      });
    }

    Highcharts.chart("solid-gauge-container", {
      chart: {
        type: "solidgauge",
        height: "100%",
        backgroundColor: "transparent",
        events: {
          render: renderIcons,
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "2rem",
        },
      },
      tooltip: {
        borderWidth: 0,
        backgroundColor: "none",
        shadow: false,
        style: {
          fontSize: "16px",
        },
        valueSuffix: "%",
        pointFormat:
          "{series.name}<br>" +
          '<span style="font-size: 2em; color: {point.color}; ' +
          'font-weight: bold">{point.y}</span>',
        positioner(labelWidth, labelHeight) {
          const chart = this.chart;
          const tooltipX = chart.plotLeft + (chart.plotWidth - labelWidth) / 2;
          const tooltipY = chart.plotTop + (chart.plotHeight - labelHeight) / 2;
          return {
            x: tooltipX,
            y: tooltipY,
          };
        },
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        background: seriesData.map((data, i) => ({
          outerRadius: data.radius,
          innerRadius: data.innerRadius,
          backgroundColor: trackColors[i],
          borderWidth: 0,
        })),
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false,
          },
          linecap: "round",
          stickyTracking: false,
          rounded: true,
        },
      },
      series: seriesData.map((data, i) => ({
        name: data.name,
        data: [
          {
            color: Highcharts.getOptions().colors?.[i],
            radius: data.radius,
            innerRadius: data.innerRadius,
            y: data.y,
          },
        ],
        custom: {
          icon: data.icon,
          iconColor: data.iconColor,
        },
      })),
    });
  }, [seriesData]);

  return (
    <div className="max-w-[800px] h-auto mx-auto flex flex-col justify-around bg-slate-100 rounded-xl p-6 shadow-lg ">
      <div className="w-full flex flex-row justify-between items-center px-5 py-3 bg-slate-200 rounded-t-lg">
        <p className="text-xl font-semibold text-slate-600">{title}</p>
        <Ellipsis className="text-gray-500" />
      </div>
      <div className="flex flex-col sm:flex-row p-6 ">
        <Status seriesData={seriesData} colors={trackColors} />
        <div className="flex justify-center items-center w-full ">
          <div
            id="solid-gauge-container"
            className="w-full h-full max-w-[400px] max-h-[400px] mx-auto"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default KPI_Gauges;
