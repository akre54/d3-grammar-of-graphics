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

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')


const images = {
  city: require('../assets/city.jpg'),
  twonlogo: require('../assets/2n_logo_black.png'),
  barchart: require('../assets/lets-make-a-barchart.png'),
  // demo: require('../assets/waves.jpeg'),
  demo: require('../assets/sunset.jpeg'),
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
              (or: Why is D3 built like that?)
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
            ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              D3?
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="secondary" notes="
            We're going to start with some definitions, then apply them to making a bar chart, then make the bar chart a bit fancy, then finally finish with a demo of TalentLab, a really cool app bult by some of my colleagues">
            <List>
              <ListItem textColor="primary">Definitions</ListItem>
              <ListItem textColor="primary">Let's make a bar chart (fancy)</ListItem>
              <ListItem textColor="primary">Demo</ListItem>
            </List>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary" notes="
            Let's get some definitions out of the way. I want to quickly define what a graphic is and what a grammar is, and then I want to show how they apply to something like a bar chart or a scatterplot.
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
          ">
            <Heading size={1} caps lineHeight={1} margin="20px auto" textColor="secondary">
              What is a "graphic"?
            </Heading>
            <video src={videos.d3reel} height={360} width={640} autoPlay loop muted />
          </Slide>
          <Slide transition={["zoom"]} bgColor="secondary" notes="
            [NOTE TO AK: click next to show slide!!]
            <ul>
              <li>Think of the language of graphics like any other language.
                  It's composed of smaller pieces. In this case, shapes, colors, positions, size, are the words, sentences, nouns, verbs, all the parts that make up a language.
                  A grammar is a way of referring to the parts that make up the graphic.
              </li>
              <li>
                You might represent categories by using distinct colors or shapes, or you might map
                continuous values (like quantity, temperature, or price) to a spectrum of colors, positions, and sizes.
                We call these 'Scales'
              </li>
              <li>
                Your chart might have axes to help give a clearer picture of the scales in relation to the data. It's usually
                represented as a line with tick marks every so often to delimit change.
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
          ">
            <Heading size={1} caps lineHeight={1} textColor="secondary">
              D3
            </Heading>
            <Text caps lineHeight={1} textColor="secondary">
              Data => D3 Primitives (Scales, Shapes) => Chart
            </Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" notes="
            D3 is a way of mapping the world of your data to the 'renderer'
            One of the core primitives of D3, scales, can be used to
            You can also project
            In most cases that would be the DOM, SVG or Canvas.
          ">
            <Heading size={1} caps lineHeight={1} textColor="primary">
              Scales
            </Heading>
            <Text lineHeight={1} textColor="tertiary">
              Map or project data from data to renderer
            </Text>
          </Slide>
          <Slide transition={["spin"]} bgColor="secondary" notes="

          ">
            <Heading size={1} caps lineHeight={2} textColor="primary">
              Scales
            </Heading>
            <CodePane
              lang='js'
              source={require('raw!../assets/scale.example')}
            />
          </Slide>
          <Slide transition={["slide"]} bgImage={images.city.replace("/", "")} bgDarken={0.75}>
            <Heading size={1} caps fit textColor="primary">
              Let's make a bar chart
            </Heading>
            <Heading size={1} caps fit textColor="tertiary">
              Scales, Colors, Shapes, Axes
            </Heading>
            <Heading size={1} caps fit textColor="primary">

            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="secondary" notes="
            Let's look at what a bar chart is made up of. This chart shows the relative frequency of letters in the English language.
            <ul>
              <li>
                Shapes: Each bar is a rectangle. Simple.
              </li>
              <li>
                Scales:
                The height of each bar is mapped to the 'frequency' variable from our dataset.
                The width is mapped to how ever many categories there are. In this case, each bar a 26th of the graphic width
              </li>
              <li>
                Color: Could also represent a quantity. In this case, we're using color to
              </li>
              <li>
                Axes:
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
          <Slide transition={["slide"]} bgImage={images.demo.replace("/", "")} bgDarken={0.75}>
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
          <Slide transition={["slide"]} bgColor="secondary">
            <BlockQuote>
              <Quote>Wonderfully formatted quotes</Quote>
              <Cite>Ken Wheeler</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["spin", "zoom"]} bgColor="tertiary">
            <Heading caps fit size={1} textColor="primary">
              Inline Markdown
            </Heading>
            <Markdown>
              {`

You can write inline images, [Markdown Links](http://commonmark.org), paragraph text and most other markdown syntax
* Lists too!
* With ~~strikethrough~~ and _italic_
* And lets not forget **bold**
              `}
            </Markdown>
          </Slide>
          <Slide transition={["slide", "spin"]} bgColor="primary">
            <Heading caps fit size={1} textColor="tertiary">
              Smooth
            </Heading>
            <Heading caps fit size={1} textColor="secondary">
              Combinable Transitions
            </Heading>
          </Slide>
          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} caps fit textColor="tertiary">
              Your presentations are interactive
            </Heading>
            <BarChart />
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Thanks!
            </Heading>
          </Slide>
        </Deck>
      </Spectacle>
    )
  }
}
