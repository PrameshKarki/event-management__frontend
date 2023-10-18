import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  label: string;
  title: string;
  description?: string;
  data: { key: string; value: number }[];
}

const PieChart = (props: IProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { title, description, data, label } = props;

  useEffect(() => {
    setIsInitialized(true);
    return () => {
      setIsInitialized(false);
    };
  }, []);

  const values = {
    labels: data?.map((el) => el.key),
    datasets: [
      {
        label,
        data: data?.map((el) => el.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (data?.length === 0) {
    return null;
  }
  return (
    <div className="mt-3">
      <h3 className="text-center">{title}</h3>
      <p className="text-center">{description}</p>
      <div className="shadow-sm p-4">
        {isInitialized && <Pie data={values} />}
      </div>
    </div>
  );
};

export default PieChart;
