import KPI_Gauges from "./components/guage";

export default function Home() {
  const Data = [
    {
      name: "Site Visit",
      y: 79,
      // color: "#FF0000",
      status: "onPar",
      radius: "112%",
      innerRadius: "88%",
      icon: "filter",
      iconColor: "#303030",
    },
    {
      name: "Support",
      y: 65,
      // color: "#00FF00",
      status: "ahead",
      radius: "87%",
      innerRadius: "63%",
      icon: "comments-o",
      iconColor: "#ffffff",
    },
    {
      name: "Revenue",
      y: 70,
      // color: "#0000FF",
      status: "behind",
      radius: "62%",
      innerRadius: "38%",
      icon: "commenting-o",
      iconColor: "#303030",
    },
  ];
  return (
    <div className="flex flex-row justify-between mt-10 mx-auto font-lato">
      <KPI_Gauges title="Weekly Goal" seriesData={Data} />
    </div>
  );
}
