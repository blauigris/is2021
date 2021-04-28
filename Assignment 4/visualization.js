window.addEventListener('paste', function(event){
    event.preventDefault();
    var new_data = event.clipboardData.getData('Text');
    var cell = IPython.notebook.get_cell(4)
    var raw = cell.get_text();
    var data_div = $.parseHTML(raw)[0];
    var content_div = data_div.firstChild;
    var raw_data = content_div.textContent;

    var data = JSON.parse(raw_data);
    
    var timestamp = Date.now();
    var timeFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' });
    var formattedTimestamp = timeFormatter.format(timestamp);
    
    data[formattedTimestamp] = new_data;
    raw_data = JSON.stringify(data);
    
    content_div.textContent = raw_data
    cell.set_text(data_div.outerHTML)
        cell.render()

    
    console.log(cell.get_text());

});