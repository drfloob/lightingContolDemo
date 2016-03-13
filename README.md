# Digital Lighting Control System UI Prototype

A proof-of-concept web dashboard for a (hypothetical) digital interior lighting control system.



## Implementation

Created with Bootstrap, Underscore.js, and SVG (HTML, CSS, and JavaScript implied).



## Research and Design

With all the possibilities available in digital lighting systems, it was a challenge to limit this demo to a reasonable scope. I chose to implement one kind of light and a global daylight sensor, that live in a simulated classroom with exterior windows, a whiteboard, a group area, a group of student desks, and a video screen.



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
 * A Node.js / Sqlite3 backend*


## *Node.js / Sqlite3 backend

In writing this demo, I found a bug related to the express.js web framework that prevents a server using Sqlite3-based session storage from ever closing a connection, apparently due to an incorrect Content-length response header. I'll follow up with this bug, and hopefully improve the project.