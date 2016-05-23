import React, { Component } from "react"
import { Heading } from "spectacle"
import { scaleLinear } from 'd3-scale'

const margin = {top: 20, right: 20, bottom: 30, left: 40}
const width = 960 - margin.left - margin.right
const height = 500 - margin.top - margin.bottom

export default class BarChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bars: []
    }

    this.x = scaleLinear()
      .range([0, width])

    this.y = scaleLinear()
      .range([height, 0])

  }
  render() {
    const { x, y } = this
    const { bars } = this.state

    return (
      <div>
        <Heading size={1} caps fit>
          Interactive
        </Heading>
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {bars.map(d => (
              <rect
                className='bar'
                x={x(d)}
                width={x.rangeBand()}
                y={y(d.frequency)}
                height={height - y(d.frequency)}
              />
            ))}
          </g>
        </svg>
      </div>
    )
  }
}
