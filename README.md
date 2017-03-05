# Palimpsest

The goal of this project is to make it very easy to merge a set of pictures that are all the same size.

This project provides a cli tool that accepts three inputs.

1. The path to an indexer
2. The path to a folder of images
3. The path where the final image is saved

The indexer is a simple javascript module that exports a function. This function takes the arguments `x, y, r, g, b` and returns a string. This string can be anything. The key requirement is that the same `x, y, r, g, b` should create the MUST create the same string.

## Examples

![](./process/default/data-series-0001.jpg)
![](./process/water-color/max-x-min-y.jpg)

## Todo

- support globs for opening images
- support multiple images in final step
- pass object to the indexer rather than a list of params
  - color: [r,g,b],
  - ratio: width/height,
  - progress: {xp, yp},
  - next: {x, y}
  - loc: {x, y}
- let indexer return an object of params rther than a string
 - color: the new color value
 - index: the string
 - next: where to go next, can't loop
 - weight: how important this pixel is

