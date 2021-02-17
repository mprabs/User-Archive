# REPORT

This frontend assignment was a nice challenge to me. On first look it looked pretty easy but in time it turned out to be pretty much interesting to play with.

To carry out the work I had to make two things:

- **Date Range Picker** (for the user to be able to input two dates)
- **Responsive Data Table**

For the date range picker, I found a library [ReactSuite](https://rsuitejs.com/) which provided a component **DateRangePicker** which was the exact thing I required for the date range picker.

**Table**, I created using pure _HTML5_ & _CSS_.

> It was a hard time reflecting the web display to mobile display with the same html template so I decided to write a different table body template for each of web & mobile view.

To play around date formats and types, I used [moment.js](https://momentjs.com/) library.

The algorithm looks like this

- User selects a date range from the date range picker
- The emails whose date lies between the date selected by the user are displayed in the table
- A count of the number of results is shown at the top
- If user is on mobile, they can sort the table data according to the emails of **From** column alphabetically and on web, they can sort by the **Date**

Overall, it was a nice experience building the mockup from the design.
