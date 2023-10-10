import { Box } from "@chakra-ui/react";
import React from "react";
import ReactApexChart from "react-apexcharts";

type ChartProps = {
    // using `interface` is also ok
    [x: string]: any;
};
type ChartState = {
    chartData: any[];
    chartOptions: any;
};

class LineChart extends React.Component<ChartProps, ChartState> {
    constructor(props: { chartData: any[]; chartOptions: any }) {
        super(props);

        this.state = {
            chartData: [],
            chartOptions: {}
        };
    }

    componentDidMount() {
        this.setState({
            chartData: this.props.chartData,
            chartOptions: this.props.chartOptions
        });
    }

    render() {
        return (
            <Box
                w={{ base: "auto", md: "full", lg: "90%", xl: "full" }}
                h={{ base: "auto", md: "full", lg: "full", xl: "full" }}
                overflow={"hidden"}
            >
                <ReactApexChart
                    options={this.state.chartOptions}
                    series={this.state.chartData}
                    type="line"
                    width="100%"
                    height="100%"
                />
            </Box>
        );
    }
}

export default LineChart;
