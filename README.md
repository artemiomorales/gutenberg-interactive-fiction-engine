# Gutenberg Interactive Fiction Engine

This plugin is an early attempt at providing blocks and scripts to support the creation of interactive fiction in Gutenberg.

## Installation

You can find a ZIP file containing a Wordpress plugin to upload under 'Releases' in this repository. Activating this plugin will give you access to the `Interactive Fiction Engine - Choice` block.

You can also build the plugin yourself using the Development instructions below.

## Usage

Populate a Choice block with content, then use the block settings to configure its `Element ID` and `Choices`.

Create additional Choice blocks, configuring their `Parent ID` and `Condition` to match the information of block their dependent on.

Note: `Condition` starts at index 0.

## Development

Download the codebase, and run `npm install` to get the dependencies.
Use `npm run start:choice` to build the Choice block for use in the Gutenberg editor and watch the source files.
Use `npm run start:js` to do the same for scrips on the user-facing frontend.
