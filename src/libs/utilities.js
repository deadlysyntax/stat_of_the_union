

export function convertTabularDataToMarkdownTable(data, caption){
    // Convert the table data into reddit markdown
    // See tables here https://www.reddit.com/wiki/commenting
    let commentString = (caption) ? `### ${caption}\n` : ''
    let dividerString = ''
    // Start with the header row ( row 0 is always header row )
    data[0].map( ( row, index ) => {
        let label = ( row.label === '#' ? 'Rank' : row.label )
        // The title row
        commentString +=  label + ( index < (data[0].length -1) ? ' | ' : '\n' )
        // The dividing row
        dividerString += '-' //label.split('').map(() => { return '-' }).join('') // We need the same number of hyphens as characters in the header
            + ( index < (data[0].length -1) ? '|' : '\n' )
    })
    // Need to combine the header row string and the dividing string before we add the data rows
    commentString += dividerString
    // Now do the data rows
    // Start by hiding the header row
    let dataRows = data.filter((row, index) => {
        return index > 0
    })
    dataRows.map( (row, index) => {
        let rowString = ''
        // Each column
        row.map( ( column, key ) => {
            rowString += column.data + ( key < (row.length -1) ? '|' : '\n' )
        })
        // Add the row to the comment
        commentString += rowString
    })

    return commentString
}