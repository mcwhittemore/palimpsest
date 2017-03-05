# Palimpsest

The goal of this project is to make it very easy to merge a set of pictures using a custom pixel indexer.

The pixel indexer is a function which takes an input object describing a single pixel and returns an output object.

**Input Object**

The input object is comprised of the following attributes and represents a single pixel.

- color: an object with `{r, g, b}` where each color channel is a number between 0 and 255.
- loc: an object with `{x, y, s}` where `x` is the `x` coordinate of the pixel, `y` is the `y` coordinate and `s` indicates which image the pixel is from in the series.
- progress: an object with `{x, y, s}` where each attribute is the percent version the `loc` eqivilant.
- about: an object with `{numSeries, width, height}` where each is a number.

**Output Object**

The output object should always be the same for each input object.

Explaining this will take time

## Examples

![](./examples/average.jpg)
![](./examples/water-color.jpg)

## Todo

- support multiple images in final step
- pass object to the indexer rather than a list of params
- add ability to control the order in which pixels are indexed

