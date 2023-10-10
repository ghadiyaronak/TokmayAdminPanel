import { Box } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";

type ChartProps = {
    // using `interface` is also ok
    [x: string]: any;
};
type ChartState = {
    chartData: any[];
    chartOptions: any;
};

class ColumnChart extends React.Component<ChartProps, ChartState> {
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
            // <Box
            //     w={{ base: "100px", md: "auto", lg: "full", xl: "full" }}
            //     h={{ base: "100px", md: "auto", lg: "full", xl: "full" }}
            //     overflow={"hidden"}
            // >
            //     <Chart
            //         series={this.state.chartData}
            //         options={this.state.chartOptions}
            //         type="bar"
            //         width="100%"
            //         height="100%"
            //     />
            // </Box>
            <Box
                w={{ base: "auto", md: "auto", lg: "full", xl: "full" }}
                h={{ base: "auto", md: "auto", lg: "full", xl: "full" }}
                overflow={"hidden"}
            >
                <Chart
                    options={this.state.chartOptions}
                    series={this.state.chartData}
                    type="bar"
                    width="100%"
                    height="100%"
                />
            </Box>
        );
    }
}

export default ColumnChart;
