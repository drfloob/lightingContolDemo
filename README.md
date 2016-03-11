# Digital Lighting Control System UI Prototype

A proof-of-concept web dashboard for a (hypothetical) digital interior lighting control system.



## Research and Design

With all the possibilities available in digital lighting systems, the big challenge here is to limit the scope of this demo to a reasonable size. I chose to implement one kind of light and a daylight sensor, that live in a simulated classroom with exterior windows, a whiteboard, a group area, and a video screen. You can choose from a handful of lighting presets, control individual lights, query individual lights for their status, and simulate various daylight conditions to see how the lighting presets react.



## Implementation

Front-end created with Bootstrap, riot.js, Underscore.js, and SVG (HTML, CSS, and JavaScript implied). Backend implemented in Node.js and Sqlite3.



## Fun things that didn't get implemented in this prototype

 * individual light control
 * light & sensor groups
 * lighting-group-specific presets
 * occupancy detection
 * smart (reactive) occupancy settings
 * multiple concurrent lighting presets (potentially with conflicted settings)
 * the ability to burn out lights
 * custom configuration rules, programmable from the UI
 * location- and environment-aware lighting algorithms (e.g. lights learn settings by working together on an optimization task, rather than being instructed how to operate)
 * multiple rooms, exterior lighting
 * es6 detection
 * svg capability detection
 * mobile and portrait-aspect-ratio compatibility