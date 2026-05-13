# Potential Trams in NYC


Inspired by my experience in a Sustainible Planning course in Amsterdam, this project seeks to spark a discussion about how 
trams can be incorporated into NYCs existing MTA system. It is an interactive web map on corridors (lines) that I believe would benefit from this transit mode.

[The full project can be accessed here](https://kr3418.github.io/finalproject_trams/)



<img width="1420" height="863" alt="Screenshot 2026-05-13 at 1 55 27 PM" src="https://github.com/user-attachments/assets/3a3f5ea2-b63b-4e93-be0b-448c0b436a64" />


### Purpose of this Project

The rationale is that trams are a "missing middle" mass transit option, not quite a subway but better than a bus.


Tram infrastructure could:

-complement exisiting subway service

-support-transit oriented streets

-Improve neighborhood accessibility

-And create more people-focused corridors

The subway is the backbone of the city's transportation system, but the reality is that it is mostly designed to get people into and out of midtown. There are many corridors and inter-borough crosstown connections that deserve higher quality transit options that the current bus system simply cannot provide. Downtown Flushing and Downtown Jamaica may never get a direct subway connection due to astronomically high subway construction costs; a tram is much more feasible for this type of connection.


### Features and Framework of the project

-**Interactive Map**: Utilizes a standard night version of Mapblox GL JS centered on New York City.

-**Legend**: Includes my 4 potential lines, each color coded. Each line represents an example of the different funcitonality that trams can serve (crosstown service vs closing a transit gap)
  -Clicking on one centers the camera on that line and opens up an info panel on the right.

-**Info Panel**: Each line has details (concept image, transfer points, why it matters). The user is then prompted to click on one of the "sections" of the line.

  -The info panel updates to show details of the selected section of the line.
    
  -The camera pans to that section and highlights it through an **ant path** animation.
    
  -**Interactive Popups**: Points of interest are markers displayed around that section. Clicking on one opens a popup, focusing on transit connections.

  
### Files

-`index.html` - Main HTML file

-`style.css` - Stylesheet customizing map, intro modal, legend, corriodors etc.

-`script.js` - Javascript file containing map configuration and interactive features

-`data` - contains GEOjason files: subwaylines, full potential lines, sections of each line

-`images` - JPG renders for each line 
