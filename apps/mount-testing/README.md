# Mount testing tool

This is a basic mount testing tool used to vet component render times.

The app is quite manually driven right now: edit the count in the page of the UI library you want to test. The page will render count number of components specified in the iterator.map of that page, and this render will be wrapped in React’s Profiler component in order to gauge the render time.

To test, open the relevant route in the browser. The ms/component number for that test run will be copied to your clipboard (open the browser console for more stats for that run). Refresh 5 times and log the ms/component number for each for that run of N components. Our approach thus far has been to do runs of 100, 500, 1000, 2000, and 5000 components to get a sense of low and high numbers of components and how render times are stacking up.

This isn't intended to be a longterm testing solution, but rather a little something for the interim to get us a non vibe coded look at how we're doing performance wise.
