// Import React
import React from 'react'

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from 'spectacle'

import CodeSlide from 'spectacle-code-slide'

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'

// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Import custom component
import BarChart from '../assets/bar_chart'
import Proportion from '../assets/proportion'

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')


const images = {
  city: require('../assets/city.jpg'),
  twonlogo: require('../assets/2n_logo_black.png'),
  barchart: require('../assets/lets-make-a-barchart.png'),
  sunset: require('../assets/sunset.jpeg'),
  waves: require('../assets/waves.jpeg'),
  waveform: require('../assets/waveform.jpg'),
  circularBarchart: require('../assets/circular_bar_chart.png'),
  scale: require('../assets/d3scale.png'),
  oilChart: require('../assets/oilchart.jpg'),
  grammarOfGraphics: require('../assets/grammar_of_graphics.jpg')
}

const videos = {
  d3reel: require('../assets/D3 Show Reel-HD.mp4')
}

preloader(images)

const theme = createTheme({
  primary: '#ff4081'
})

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit caps>
              Building a Graphical Grammar in D3
            </Heading>
            <Heading size={3} fit textColor="secondary" textFont="primary">
              (or: Why is D3 so complicated?)
            </Heading>
          </Slide>
          <Slide transition={["zoom"]} bgColor="primary" notes="
            Hi I'm Adam Krebs, I'm a developer at 2N, a data visualization design agency here in New York
            Today I want to talk about graphics, the elements that make up a graphic, and how to create graphics in D3
          ">
            <Heading size={1} fit caps lineHeight={1} textColor="secondary">
              Adam Krebs
            </Heading>
            <Link href="http://www.two-n.com"><Image width="25%" src={images.twonlogo}/></Link>
            <Link href="https://github.com/akre54">
              <Text bold caps textColor="tertiary">Github: akre54</Text>
            </Link>
          </Slide>
          <Slide transition={["slide"]} bgColor="secondary"
            notes="A lot of the core ideas of this talk are borrowed from Leland Wilkinson's book The Grammar of Graphics
                  and Hadley Wickham's paper A Layered Grammar of Graphics. Those guys are really smart.
                  If you're interested, definitely check those out">
            <Image src={images.grammarOfGraphics.replace("/", "")} margin="0px auto 40px" height="100%"/>
          </Slide>
          <Slide transition={["slide"]} bgColor="secondary" notes="
              Just to gauge the room: How many people here have used D3 before?
              How many are intermediate in D3?
              Ok. And how many would say they're advanced?
            ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              D3?
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgImage={images.waves.replace("/", "")} bgDarken={0.75} notes="
            We're going to start with some definitions, then apply them to making a bar chart, then make the bar chart a bit fancy, then finally finish with a demo of TalentLab, a really cool app bult by some of my colleagues">
            <List>
              <ListItem textColor="primary">Definitions</ListItem>
              <ListItem textColor="primary">Let's make a chart</ListItem>
              <ListItem textColor="primary">Demo</ListItem>
            </List>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" notes="
            Let's get some definitions out of the way.
            I want to quickly define what a graphic is and what a grammar is, and then I want to show how they apply to something like a bar chart or a scatterplot.
          ">
            <Heading size={1} caps lineHeight={1} textColor="secondary">
              Definitions
            </Heading>
            <List>
              <ListItem>Graphic</ListItem>
              <ListItem>Grammar</ListItem>
              <ListItem>Bar Chart</ListItem>
              <ListItem>Scatterplot</ListItem>
            </List>
          </Slide>
          <Slide transition={["slide"]} notes="
            Some visual representation of data, allows us to gain deeper insight into a story than just words or a dataset alone could.
            There are many different types of graphics. Here are a few just to get a sense. I want you to pay attention to how the shapes retain or change their meaning as the type of graphic changes
          ">
            <Heading size={1} caps lineHeight={1} margin="30px auto" textColor="secondary">
              What is a "graphic"?
            </Heading>
            <video src={videos.d3reel} height={360} width={640} autoPlay loop muted />
          </Slide>
          <Slide transition={["zoom"]} bgColor="secondary" notes="
            [NOTE TO AK: click next to show slide!!] We are going to simplyfy a bit.
            <ul>
              <li>Think of the language of graphics like any other language.
                  It's composed of smaller pieces. In this case, shapes, colors, positions, size, are the words, sentences, nouns, verbs, all the parts that make up a language.
                  A grammar is a way of referring to the parts that make up the graphic.
                  More generally, it's how we assign meaning to what we see in the graphic.
              </li>
              <li>
                You might represent categories by using distinct colors or shapes, or you might map
                continuous values (like quantity, temperature, or price) to a spectrum of colors, positions, and sizes.
                We call these 'Scales'
              </li>
              <li>
                Your chart might have axes to help give a clearer picture of the scales in relation to the data.
              </li>
              <li>
                And finally, your chart may have animations, which help guide you user to understand deeper relationships in their data
                over different scales or even chart types. We'll come back to this in a bit.
              </li>
            </ul>
          ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              What is a "grammar"?
            </Heading>
            <List>
              <Appear><ListItem textColor="primary">"Language" of graphics</ListItem></Appear>
              <Appear><ListItem textColor="primary">Shapes, colors, positions, sizes</ListItem></Appear>
              <Appear><ListItem textColor="primary">Scales, axes</ListItem></Appear>
              <Appear><ListItem textColor="primary">Animations</ListItem></Appear>
            </List>
          </Slide>
          <Slide transition={["slide"]} bgColor="secondary" notes="
              Most graphics tools (like Excel or Tableau) take in data and output predefined chart types.
              They're easy to use, but masively limiting.
              It's really hard to do anything more advanced than just basic manipulation with these types of tools.
              Even some programming language tools, like C3 or Highcharts, give you more customization, but are still severly limited.
          ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              Most graphics tools
            </Heading>
            <Appear>
              <Text lineHeight={2} textColor="primary">
                Data => Chart
                <br />
                (Excel, Tableau, C3, Highcharts)
              </Text>
            </Appear>
          </Slide>
          <Slide transition={["spin"]} bgColor="primary" notes="
            D3 takes the opposite tact. *It doesn't come with a notion of a graphical grammar at all.*
            What it gives you is a way to bridge your data to a presentation layer.
            D3 doesn't know what a bar chart is. You create the rectangles that make up a bar chart, then assign each bar's
            position, color, height, width, etc.
            This gives you much more flexibility.
          ">
            <Heading size={1} caps lineHeight={1} textColor="secondary">
              D3
            </Heading>
            <Text caps lineHeight={1} textColor="secondary">
              Data => D3 Primitives (Scales, Shapes) => Chart
            </Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="tertiary" notes="
            One of the core primitives of D3, scales, can be used to map the world of your data (called the *domain*) to the 'renderer' (called the *range*)
            In most cases that would be the DOM, SVG or Canvas.
            You can also project geography (say countries or states), from a coordinate system like Latitude / Longitude to the coordinates on your screen.
          ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              Scales
            </Heading>
            <Image src={images.scale} width="100%" margin="50px auto" />
            <Text lineHeight={1} textColor="secondary">
              Map or project data from data to renderer
            </Text>
          </Slide>
          <Slide transition={["spin"]} bgColor="secondary" notes="
            Scales take a value from our dataset in, and return a value that can be displayed.
            For simple linear scales, this is very similar to proportions, which we learned in 4th grade.
          ">
            <Heading size={1} caps lineHeight={2} textColor="primary">
              Scales
            </Heading>
            <CodePane
              lang='js'
              source={require('raw!../assets/scale.example')}
              margin="20px auto 100px auto"
            />
            <Proportion />
          </Slide>
          <Slide transition={["slide"]} bgImage={images.city.replace("/", "")} bgDarken={0.75}>
            <Heading size={1} caps fit textColor="primary">
              Let's make a bar chart
            </Heading>
            <Heading size={1} caps fit textColor="tertiary">
              Scales, Colors, Shapes, Axes
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" notes="
            Let's look at what a bar chart is made up of.
            This chart shows the relative frequency of letters in the English language.
            A bar chart is effective because it allows us to compare relative amounts of discrete
            data, such as the letters in this example.
            <ul>
              <li>
                Shapes: Each bar is a rectangle. Simple.
              </li>
              <li>
                Scales:
                The height of each bar is mapped to the 'frequency' variable from our dataset.
                The width is mapped to however many categories there are.
                In this case, each bar a 26th of the graphic width because there are 26 letters.
              </li>
              <li>
                Color: Could also represent a quantity.
                In this case, we're using color for interaction purposes.
                Hovering over a bar highlights it.
              </li>
              <li>
                Axes: Allow us to reference the quantity represented by the bar height
              </li>
            </ul>
          ">
            <Image src={images.barchart} width={"100%"} />
          </Slide>
          <CodeSlide
            lang="js"
            transition={["slide", "fade"]}
            code={require("raw!../assets/deck.example")}
            ranges={[
              { loc: [26, 26], title: "Let's make a bar chart"},
              { loc: [46, 54], note: "Start with our shape" },
              { loc: [46, 47]},
              { loc: [47, 48]},
              { loc: [48, 49], note: "Append an SVG rectangle"},
              { loc: [52, 54], note: "Bar height"},
              { loc: [52, 53], note: "Bar height"},
              { loc: [7, 9], note: "Scales: map graphic height..." },
              { loc: [29, 30], note: "Scales: ...to the min and max of the data" },
              { loc: [14, 18], note: "Create an axis from the scale" },
              { loc: [36, 39], note: "Append the axis" },
              { loc: [39, 45], note: "Labels" }
            ]}
            margin="20px auto"
            notes="
              [NOTE TO AK: use up/down arrow keys to navigate the code]
              With that in mind. Let's make a bar chart
            "
          />
          <Slide transition={["slide"]} bgColor="secondary" notes="
            It's not a huge leap then, with D3, to take the core language of a bar chart and tweak it to say something more advanced.
            This image, by Szabo Haslam, shows a waveform of Aphex Twin.
            It retains the language of a bar chart, mapping the song's amplitude to bar height.
            But instead of treating the x-axis as simply in the horizontal plane, the x-axis in this graphic is radial around a circle
          ">
            <Image src={images.waveform} width={"100%"} />
            <Text>
              <Link href="http://www.szabohaslam.co.uk/waveform-soundwave-posters.html" textColor="primary">
                Waveform series, by Szabo Haslam
              </Link>
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="secondary" notes="
            Similarly, these radial bar chart
          ">
            <Layout>
              <Fill>
                <Image src={images.circularBarchart} width={"100%"} />
              </Fill>
              <Fill>
                <Image src={images.oilChart} width={"100%"} />
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["spin"]} notes="
              Quickly, we'll also cover scatterplot.
              In a scatterplot, you are usually comparing 2 variables on the x- and y-axes.
              One way to describe it is that we are going to draw a point for each observation, and we will position
              the point horizontally according to the value of X, and vertically according to Y
              It's actually quite similar to a bar chart, and that's the point:
              You start to notice patterns in representation as you understand the language of graphics.
          ">
            <Heading size={1} caps fit textColor="tertiary">
              Scatterplot
            </Heading>
            <Layout>
              <Fill>
                <List>
                  <ListItem>
                    Shape: Usually circle, can be multiple shapes to show categories
                  </ListItem>
                  <ListItem>
                    Scales: position by x and y (Two-variable comparison)
                  </ListItem>
                  <ListItem>
                    Color: Can be discrete for categories, or continuous for ranges.
                  </ListItem>
                </List>
              </Fill>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Right
                </Heading>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["zoom"]} notes="
            We can similarly combine the language of a bar chart with a scatterplot to create an even more advanced
            visualization, without much extra code. This would be nearly impossible to do in Excel, but in D3 it's actually
            pretty straightforward.
          ">
            <Text>
            </Text>
          </Slide>
          <Slide transition={["slide"]} bgImage={images.sunset.replace("/", "")} bgDarken={0.75}>
            <Heading size={1} caps fit textColor="primary">
              Demo
            </Heading>
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary">
            <Heading caps fit>Flexible Layouts</Heading>
            <Layout>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Left
                </Heading>
              </Fill>
              <Fill>
                <Heading size={4} caps textColor="secondary" bgColor="white" margin={10}>
                  Right
                </Heading>
              </Fill>
            </Layout>
          </Slide>
          <Slide transition={["slide"]} bgColor="primary">
            <BarChart />
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="tertiary" notes="Any questions?">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Thanks!
            </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    )
  }
}
