import plugins from '../plugins/manifest'
// We search comment strings for these commands and assemble all the data that the
// handler will need to process the bot summons
// Each plugin contains the methods for doing each of these things
// and we just access those plugins through the plugin manifest
export function detectTrigger(comment){
    // Default to null incase we find nothin
    let lastTriggerDetected = null;
    // Check through our list of plugins
    plugins.list.map(plugin => {
        console.log(plugins.meta[plugin], 'here');
        // If we find a trigger
        if( typeof plugins.meta[plugin].trigger !== 'undefined' && plugins.meta[plugin].trigger(comment) )
            // return the data structure required for the trigger
            lastTriggerDetected = plugin.meta[plugin].command(comment)
    })
    return lastTriggerDetected
}
