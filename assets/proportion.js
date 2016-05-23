import React, { Component } from 'react'
import { Layout, Fill, Text } from 'spectacle'
import { scaleLinear } from 'd3-scale'

const max = 58
const height = 960

const scale = scaleLinear()
                .range([0, height])
                .domain([0, max])

export default class Proportion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: 30,
      output: '??'
    }

    window.addEventListener('storage', e => {
      if (e.key === 'proportion') {
        const { input, output } = JSON.parse(e.newValue)
        this.setState({ input, output })
      }
    })

    this.update = this.update.bind(this)
  }

  update(e) {
    const input = e.target.value

    // const output = Math.floor( input * height / max * 10 ) / 10
    const output = Math.floor( scale(input) * 10) / 10

    localStorage.setItem('proportion', JSON.stringify({ input, output }))

    this.setState({ input, output })
  }

  render() {
    const { input, output } = this.state

    return (
      <div>
        <Layout>
          <Fill>
            <Text textColor='tertiary'>
              <input type='number' value={input} style={{width: '1.5em', color: 'black'}} onChange={this.update} /> (data point)
            </Text>
          </Fill>
          <Fill>
            <Text textColor='primary'>
              {output} px (y-position)
            </Text>
          </Fill>
        </Layout>
        <Layout>
          <Fill>
            <Text textColor='tertiary'>
              =
            </Text>
          </Fill>
        </Layout>
        <Layout>
          <Fill>
            <Text textColor='tertiary'>
              {max} (max value)
            </Text>
          </Fill>
          <Fill>
            <Text textColor='tertiary'>
              {height}px (viz height)
            </Text>
          </Fill>
        </Layout>
      </div>
    )
  }
}
